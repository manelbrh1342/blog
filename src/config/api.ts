// Centralized API configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost',
  ENDPOINTS: {
    COMMENTS: '/api/comments',
    AUTH: '/api/auth',
    ARTICLES: '/api/articles',
    CATEGORIES: '/api/categories',
    EVENTS: '/api/events',
    ADMIN: '/api/admin',
  },
  PORTS: {
    COMMENTS: 5001,
    AUTH: 5002,
    ARTICLES: 5003,
    CATEGORIES: 5004,
    EVENTS: 5005,
    ADMIN: 5006,
  },
} as const;

// Helper to get full API URL
export const getApiUrl = (service: keyof typeof API_CONFIG.PORTS, endpoint: string = '') => {
  const port = API_CONFIG.PORTS[service];
  const baseEndpoint = API_CONFIG.ENDPOINTS[service] || '';
  return `${API_CONFIG.BASE_URL}:${port}${baseEndpoint}${endpoint}`;
};

// Helper to get auth token
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

// Helper to create headers with auth
export const getAuthHeaders = (includeContentType: boolean = true): HeadersInit => {
  const headers: HeadersInit = {};
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper for fetch with auth
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = getAuthHeaders();
  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };
  return fetch(url, mergedOptions);
};

