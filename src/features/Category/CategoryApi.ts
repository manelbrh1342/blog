import { getApiUrl, fetchWithAuth } from '../../config/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  created_at: string;
  updated_at: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const url = getApiUrl('CATEGORIES', '/');
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error loading categories");
  }
  return response.json();
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category> => {
  const url = getApiUrl('CATEGORIES', `/${slug}`);
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error loading category");
  }
  return response.json();
};

export const createCategory = async (categoryData: {
  name: string;
  slug?: string;
  description?: string;
  parent_id?: number;
}): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('CATEGORIES', '/');
  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error creating category");
  }
  return response.json();
};

export const updateCategory = async (id: number, categoryData: Partial<Category>): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('CATEGORIES', `/${id}`);
  const response = await fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error updating category");
  }
  return response.json();
};

export const deleteCategory = async (id: number): Promise<{ message: string }> => {
  const url = getApiUrl('CATEGORIES', `/${id}`);
  const response = await fetchWithAuth(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error deleting category");
  }
  return response.json();
};
