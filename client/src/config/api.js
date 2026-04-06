// Centralized API Configuration
// In production, use the Render backend URL provided by the user.
// In dev, use localhost:5000.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.MODE === 'production' 
        ? 'https://academic-currulium-evaluation-platfrom.onrender.com' 
        : 'http://localhost:5000');

export const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    USERS: `${API_BASE_URL}/api/auth/users`,
    USERS_ADMIN: `${API_BASE_URL}/api/auth/users`, // Admin creation/management
    FACULTY: `${API_BASE_URL}/api/auth/faculty`,

    // Courses
    COURSES: `${API_BASE_URL}/api/courses`,
    DEPARTMENTS: `${API_BASE_URL}/api/courses/departments`,

    // Feedback
    FEEDBACK: `${API_BASE_URL}/api/feedback`,

    // Requests
    REQUESTS: `${API_BASE_URL}/api/requests`,

    // Settings
    SETTINGS: `${API_BASE_URL}/api/settings`,
    MAINTENANCE: `${API_BASE_URL}/api/settings/maintenance`,
};

// Helper function for dynamic URLs
export const getApiUrl = (path) => `${API_BASE_URL}${path}`;

export default API_BASE_URL;
