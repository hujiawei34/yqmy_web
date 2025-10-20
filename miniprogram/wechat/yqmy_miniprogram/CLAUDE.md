# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the WeChat miniprogram for YQMY Web (要钱没用) - a uni-app based mobile application that complements the main web platform. The miniprogram allows users to access the task/freelance platform on WeChat, where users use points instead of money to post and complete tasks.

## Architecture

### Technology Stack
- **Framework**: uni-app (支持多端发布)
- **Vue Version**: Vue 3 (configured for SSR)
- **Build Target**: WeChat Miniprogram (mp-weixin)
- **UI**: Native components with custom styling
- **WeChat AppID**: wx53dab80c6aaf58d1

### Project Structure
- **App.vue**: Main application component with global styles and lifecycle
- **main.js**: Application entry point with Vue 3 SSR setup
- **pages/**: Application pages following uni-app structure
  - **index/**: Homepage with task feed, banners, and features
- **static/**: Static assets including icons and images
- **manifest.json**: Multi-platform configuration for uni-app
- **pages.json**: Page routing and tabBar configuration

### Key Features
- **Tab Navigation**: 5-tab structure (首页/任务/发布/消息/我的)
- **Task System**: Browse and interact with tasks
- **Points Display**: User points balance and management
- **Search**: Task search functionality
- **Announcements**: System announcements display
- **Responsive Design**: Optimized for mobile devices

## Development Commands

### Local Development
Since this is a uni-app project, development typically uses HBuilderX or CLI tools:

```bash
# If using uni-app CLI (not present in this project)
# npm run dev:mp-weixin

# This project appears to be developed with HBuilderX
# Open the project folder in HBuilderX and run to WeChat Developer Tools
```

### Build and Deploy
```bash
# Build for WeChat Miniprogram
# Use HBuilderX: 发行 -> 小程序-微信

# Or if CLI is configured:
# npm run build:mp-weixin
```

### WeChat Developer Tools
- Import the built project from `unpackage/dist/dev/mp-weixin/` or `unpackage/dist/build/mp-weixin/`
- Configure AppID: wx53dab80c6aaf58d1
- Test and preview in WeChat Developer Tools

## Configuration

### Manifest Configuration
- **App Name**: yqmy_miniprogram
- **WeChat AppID**: wx53dab80c6aaf58d1
- **Vue Version**: 3 with SSR support
- **URL Check**: Disabled for development

### Page Configuration
- **Global Style**: Orange theme (#F59E0B) with white navigation
- **Tab Bar**: 5 tabs with custom icons
- **Pull Refresh**: Enabled on homepage

### API Integration
The miniprogram integrates with the YQMY Web backend:
- **Backend URL**: Configured to connect to the main Spring Boot API
- **Authentication**: WeChat login integration
- **Data Sync**: Real-time task and points synchronization

## Code Style and Patterns

### Vue 3 Composition
- Uses Vue 3 SSR setup in main.js
- Component-based architecture with .vue files
- Reactive data binding for real-time updates

### Styling Approach
- CSS custom properties for consistent theming
- rpx units for responsive design
- Utility classes for common styles (flex, spacing, typography)
- Card-based UI components

### Navigation Patterns
- uni.navigateTo() for page navigation
- uni.switchTab() for tab bar navigation
- URL parameters for data passing

## Development Notes

### WeChat Miniprogram Specific
- Uses WeChat's component system and APIs
- Follows WeChat Miniprogram guidelines and limitations
- Icon files optimized for different states (active/inactive)

### Backend Integration
- Connects to the main YQMY Web Spring Boot backend
- Shares user authentication and data with web platform
- Real-time synchronization of points and tasks

### Asset Management
- Icons stored in `/static/icons/` with naming convention (name-a.png for active, name-d.png for inactive)
- Images should be optimized for mobile devices
- Logo and branding consistent with main platform