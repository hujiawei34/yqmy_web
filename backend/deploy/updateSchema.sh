#!/bin/bash

# Health Management Platform - Database Schema Update Script
# This script generates an updated schema.sql from the current database state
# Usage: ./updateSchema.sh [database_name] [username] [host] [port]

set -e  # Exit on any error

# Default configuration (using Docker container settings from deployment guide)
DEFAULT_DB_NAME="osteoporosis-platform"
DEFAULT_USERNAME="postgres"
DEFAULT_HOST="localhost"
DEFAULT_PORT="18201"
DEFAULT_PASSWORD="postgres@osteoporosis"
DOCKER_CONTAINER_NAME="osteoporosis-platform-postgres"
SCHEMA_FILE="../../src/main/resources/sql/schema.sql"

# Parse command line arguments
DB_NAME=${1:-$DEFAULT_DB_NAME}
USERNAME=${2:-$DEFAULT_USERNAME}
HOST=${3:-$DEFAULT_HOST}
PORT=${4:-$DEFAULT_PORT}
PASSWORD=${PGPASSWORD:-$DEFAULT_PASSWORD}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Database Schema Update Tool${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Docker is available and container exists
check_docker_setup() {
    if ! command_exists docker; then
        echo -e "${RED}Error: Docker is not installed or not in PATH${NC}"
        echo "Please install Docker"
        exit 1
    fi
    
    # Check if PostgreSQL container is running
    if ! docker ps | grep -q "$DOCKER_CONTAINER_NAME"; then
        echo -e "${RED}Error: PostgreSQL container '$DOCKER_CONTAINER_NAME' is not running${NC}"
        echo "Please start the PostgreSQL container using:"
        echo "  cd ../deploy && docker compose up -d postgres"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Docker and PostgreSQL container are available${NC}"
}

# Function to test database connection via Docker
test_connection() {
    echo -e "${YELLOW}Testing database connection via Docker container...${NC}"
    
    # Test connection using Docker exec
    if docker exec "$DOCKER_CONTAINER_NAME" pg_isready -U "$USERNAME" -d "$DB_NAME" >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Database connection successful${NC}"
        return 0
    else
        echo -e "${RED}✗ Cannot connect to database${NC}"
        echo "Please check your database configuration:"
        echo "  Container: $DOCKER_CONTAINER_NAME"
        echo "  Database: $DB_NAME"
        echo "  Username: $USERNAME"
        return 1
    fi
}

# Function to backup existing schema
backup_schema() {
    if [ -f "$SCHEMA_FILE" ]; then
        local backup_file="${SCHEMA_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
        echo -e "${YELLOW}Backing up existing schema to: $backup_file${NC}"
        cp "$SCHEMA_FILE" "$backup_file"
        echo -e "${GREEN}✓ Backup created${NC}"
    else
        echo -e "${YELLOW}No existing schema file found${NC}"
    fi
}

# Function to generate schema from database via Docker
generate_schema() {
    echo -e "${YELLOW}Generating schema from database via Docker container...${NC}"
    
    # Create temporary file for new schema
    local temp_schema="/tmp/new_schema_$(date +%s).sql"
    
    # Generate schema dump using Docker exec with pg_dump (including comments)
    docker exec "$DOCKER_CONTAINER_NAME" pg_dump \
        -U "$USERNAME" \
        -d "$DB_NAME" \
        --schema-only \
        --no-owner \
        --no-privileges \
        --no-tablespaces \
        --no-security-labels \
        --exclude-schema=information_schema \
        --exclude-schema=pg_catalog \
        > "$temp_schema" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Schema generated successfully${NC}"
        
        # Add header comment
        local final_schema="/tmp/final_schema_$(date +%s).sql"
        {
            echo "-- Health Management Platform Database Schema (PostgreSQL)"
            echo "-- Generated automatically on $(date)"
            echo "-- Database: $DB_NAME"
            echo "-- Container: $DOCKER_CONTAINER_NAME"
            echo "-- Note: This schema was generated from the live database via Docker"
            echo ""
            cat "$temp_schema"
        } > "$final_schema"
        
        # Move to final location
        mv "$final_schema" "$SCHEMA_FILE"
        rm "$temp_schema"
        
        echo -e "${GREEN}✓ Schema file updated: $SCHEMA_FILE${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to generate schema${NC}"
        rm -f "$temp_schema"
        return 1
    fi
}

# Function to show schema differences
show_differences() {
    # Find the most recent backup file using glob pattern
    local backup_files=(${SCHEMA_FILE}.backup.*)
    if [ ${#backup_files[@]} -gt 0 ] && [ -f "${backup_files[0]}" ]; then
        local latest_backup=$(ls -t "${SCHEMA_FILE}.backup."* 2>/dev/null | head -n1)
        if [ -n "$latest_backup" ] && [ -f "$latest_backup" ]; then
            echo -e "${YELLOW}Schema differences (if any):${NC}"
            echo -e "${BLUE}===========================================${NC}"
            
            # Show differences between old and new schema
            if command_exists diff; then
                diff -u "$latest_backup" "$SCHEMA_FILE" || true
            else
                echo "diff command not available, skipping difference display"
            fi
            echo -e "${BLUE}===========================================${NC}"
        else
            echo -e "${YELLOW}No valid backup file found for comparison${NC}"
        fi
    else
        echo -e "${YELLOW}No backup files found for comparison${NC}"
    fi
}

# Function to validate schema
validate_schema() {
    echo -e "${YELLOW}Validating generated schema...${NC}"
    
    # Basic validation - check if file is not empty and contains expected content
    if [ ! -s "$SCHEMA_FILE" ]; then
        echo -e "${RED}✗ Generated schema file is empty${NC}"
        return 1
    fi
    
    # Check for essential table names that should exist
    local essential_tables=("sys_users" "doctors" "patients" "doctor_patient_bindings")
    local missing_tables=()
    
    for table in "${essential_tables[@]}"; do
        if ! grep -q "CREATE TABLE.*${table}" "$SCHEMA_FILE"; then
            missing_tables+=("$table")
        fi
    done
    
    if [ ${#missing_tables[@]} -eq 0 ]; then
        echo -e "${GREEN}✓ Schema validation passed${NC}"
        return 0
    else
        echo -e "${RED}✗ Schema validation failed${NC}"
        echo "Missing essential tables: ${missing_tables[*]}"
        return 1
    fi
}

# Main execution
main() {
    echo "Configuration:"
    echo "  Database: $DB_NAME"
    echo "  Docker Container: $DOCKER_CONTAINER_NAME"
    echo "  Username: $USERNAME"
    echo "  External Port: $PORT"
    echo "  Schema file: $SCHEMA_FILE"
    echo ""
    
    # Check Docker setup
    check_docker_setup
    
    # Test database connection
    if ! test_connection; then
        exit 1
    fi
    
    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$SCHEMA_FILE")"
    
    # Backup existing schema
    backup_schema
    
    # Generate new schema
    if ! generate_schema; then
        echo -e "${RED}Failed to generate schema${NC}"
        exit 1
    fi
    
    # Validate generated schema
    if ! validate_schema; then
        echo -e "${RED}Schema validation failed - please review the generated file${NC}"
        exit 1
    fi
    
    # Show differences
    show_differences
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Schema update completed successfully!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review the updated schema file: $SCHEMA_FILE"
    echo "2. Test the schema in a development environment"
    echo "3. Commit the changes to version control"
    echo ""
}

# Show usage if help requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [database_name] [username]"
    echo ""
    echo "This script connects to the PostgreSQL Docker container to generate an updated schema.sql"
    echo ""
    echo "Arguments:"
    echo "  database_name  Database name (default: $DEFAULT_DB_NAME)"
    echo "  username       Database username (default: $DEFAULT_USERNAME)"
    echo ""
    echo "Configuration (from deployment guide):"
    echo "  Docker Container: $DOCKER_CONTAINER_NAME"
    echo "  External Port: $DEFAULT_PORT"
    echo "  Password: $DEFAULT_PASSWORD"
    echo ""
    echo "Examples:"
    echo "  $0                        # Use all defaults"
    echo "  $0 cloud-platform        # Custom database name"
    echo "  $0 cloud-platform myuser # Custom database and username"
    echo ""
    echo "Prerequisites:"
    echo "  1. Docker must be installed and running"
    echo "  2. PostgreSQL container '$DOCKER_CONTAINER_NAME' must be running"
    echo "  3. Start container with: cd ../deploy && docker compose up -d postgres"
    echo ""
    exit 0
fi

# Set password automatically from deployment configuration
export PGPASSWORD="$PASSWORD"
echo -e "${GREEN}Using deployment configuration password${NC}"

# Run main function
main