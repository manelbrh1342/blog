import { getApiUrl, fetchWithAuth } from '../../config/api';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export interface AdminArticle {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

export interface AdminComment {
  id: number;
  content: string;
  post_id: number;
  user_id: number;
  created_at: string;
}

export interface AdminStats {
  total_actions: number;
  recent_actions: Array<{
    id: number;
    admin_id: number;
    action_type: string;
    target_type: string;
    target_id: number;
    description: string;
    created_at: string;
  }>;
}

export interface AdminAction {
  id: number;
  admin_id: number;
  action_type: string;
  target_type: string;
  target_id: number;
  description: string;
  metadata?: any;
  created_at: string;
}

// Stats
export const fetchAdminStats = async (): Promise<AdminStats> => {
  const url = getApiUrl('ADMIN', '/stats');
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error loading admin stats");
  }
  return response.json();
};

// Actions
export const fetchAdminActions = async (page: number = 1, perPage: number = 20): Promise<{
  actions: AdminAction[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
  };
}> => {
  const url = getApiUrl('ADMIN', `/actions?page=${page}&per_page=${perPage}`);
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error loading admin actions");
  }
  return response.json();
};

export const logAdminAction = async (actionData: {
  admin_id: number;
  action_type: string;
  target_type: string;
  target_id: number;
  description?: string;
  metadata?: any;
}): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('ADMIN', '/actions');
  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(actionData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error logging admin action");
  }
  return response.json();
};

// Note: The admin service doesn't have direct user/article/comment endpoints
// These would need to be added to the admin service or fetched from respective services
// For now, we'll use the stats and actions endpoints that exist
