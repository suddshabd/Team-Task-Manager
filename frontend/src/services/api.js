import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
const DEBUG_HTTP = import.meta.env.DEV || import.meta.env.VITE_DEBUG_HTTP === 'true';

const maskSensitiveData = (value) => {
    if (!value || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(maskSensitiveData);
    }

    return Object.fromEntries(
        Object.entries(value).map(([key, currentValue]) => {
            if (['password', 'token', 'authorization'].includes(key.toLowerCase())) {
                return [key, '***'];
            }

            return [key, maskSensitiveData(currentValue)];
        })
    );
};

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (DEBUG_HTTP) {
        console.groupCollapsed(`[API Request] ${String(config.method || 'GET').toUpperCase()} ${config.baseURL}${config.url}`);
        console.log('baseURL:', config.baseURL);
        console.log('url:', config.url);
        console.log('params:', maskSensitiveData(config.params));
        console.log('data:', maskSensitiveData(config.data));
        console.log('headers:', maskSensitiveData(config.headers));
        console.groupEnd();
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        if (DEBUG_HTTP) {
            console.groupCollapsed(`[API Response] ${response.status} ${response.config.url}`);
            console.log('data:', maskSensitiveData(response.data));
            console.groupEnd();
        }

        return response;
    },
    (error) => {
        if (error.code === 'ECONNABORTED') {
            error.message = 'Request timed out. Check that the backend server is running.';
        } else if (error.message === 'Network Error') {
            error.message = 'Network error. Check that the frontend proxy and backend server are running.';
        }

        if (DEBUG_HTTP) {
            console.groupCollapsed(`[API Error] ${error.config?.url || 'unknown request'}`);
            console.log('message:', error.message);
            console.log('code:', error.code);
            console.log('status:', error.response?.status);
            console.log('response:', maskSensitiveData(error.response?.data));
            console.groupEnd();
        }

        return Promise.reject(error);
    }
);

export const authService = {
    signup: (data) => api.post('/auth/signup', data),

    login: (data) => api.post('/auth/login', data),

    getCurrentUser: () => api.get('/auth/me'),
};

export const projectService = {
    createProject: (data) => api.post('/projects', data),

    getProjects: () => api.get('/projects'),

    getProjectById: (projectId) => api.get(`/projects/${projectId}`),

    addProjectMember: (projectId, data) =>
        api.post(`/projects/${projectId}/members`, data),

    getProjectMembers: (projectId) => api.get(`/projects/${projectId}/members`),
};

export const taskService = {
    createTask: (projectId, data) => api.post(`/tasks/projects/${projectId}/tasks`, data),

    getTasks: (projectId, filters) =>
        api.get(`/tasks/projects/${projectId}/tasks`, { params: filters }),

    updateTask: (taskId, data) => api.put(`/tasks/${taskId}`, data),

    deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),

    getTaskStats: (projectId) => api.get(`/tasks/projects/${projectId}/stats`),
};

export default api;
