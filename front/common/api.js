/**
 * API配置管理
 * 统一管理所有后端API调用，便于后续部署环境切换
 */

// API基础配置
const API_CONFIG = {
    // 开发环境
    development: {
        baseURL: 'http://localhost:8080',
        timeout: 5000
    },
    // 容器环境（当前使用）
    container: {
        baseURL: 'http://localhost:8080',
        timeout: 5000
    },
    // 生产环境
    production: {
        baseURL: 'http://your-production-domain.com',
        timeout: 10000
    }
};

// 当前环境配置
const CURRENT_ENV = 'container'; // 可切换：development, container, production
const CURRENT_CONFIG = API_CONFIG[CURRENT_ENV];

/**
 * API请求封装
 * @param {string} endpoint - API端点
 * @param {object} options - 请求选项
 * @returns {Promise} - 返回Promise对象
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${CURRENT_CONFIG.baseURL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: CURRENT_CONFIG.timeout
    };

    try {
        console.log('API请求详情:', {
            url: url,
            method: options.method || 'GET',
            body: options.body,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        });
        
        const response = await fetch(url, {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        });

        console.log('API响应状态:', response.status);
        
        if (!response.ok) {
            console.error('API请求失败，状态码:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API响应数据:', responseData);
        return responseData;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

/**
 * 用户相关API
 */
const userAPI = {
    /**
     * 创建用户（注册）
     * @param {object} userData - 用户数据 {username, password, email}
     * @returns {Promise<boolean>} - 返回创建结果
     */
    createUser: async (userData) => {
        return await apiRequest('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    /**
     * 获取用户列表
     * @returns {Promise<Array>} - 返回用户列表
     */
    getUsers: async () => {
        return await apiRequest('/api/users', {
            method: 'GET'
        });
    },

    /**
     * 根据ID获取用户
     * @param {number} id - 用户ID
     * @returns {Promise<object>} - 返回用户对象
     */
    getUserById: async (id) => {
        return await apiRequest(`/api/users/${id}`, {
            method: 'GET'
        });
    },

    /**
     * 更新用户
     * @param {number} id - 用户ID
     * @param {object} userData - 更新数据
     * @returns {Promise<boolean>} - 返回更新结果
     */
    updateUser: async (id, userData) => {
        return await apiRequest(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    },

    /**
     * 删除用户
     * @param {number} id - 用户ID
     * @returns {Promise<boolean>} - 返回删除结果
     */
    deleteUser: async (id) => {
        return await apiRequest(`/api/users/${id}`, {
            method: 'DELETE'
        });
    }
};

// 导出API对象供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { userAPI, apiRequest, CURRENT_CONFIG };
} else {
    window.userAPI = userAPI;
    window.apiRequest = apiRequest;
    window.API_CONFIG = CURRENT_CONFIG;
}