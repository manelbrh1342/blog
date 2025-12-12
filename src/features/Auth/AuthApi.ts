import { getApiUrl, getAuthHeaders } from '../../config/api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: any;
}

export const signupUser = async (userData: RegisterData): Promise<AuthResponse> => {
  const url = getApiUrl('AUTH', '/register');
  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};

export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  const url = getApiUrl('AUTH', '/login');
  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(loginData),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};
