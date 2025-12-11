export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  created_at: string;
  updated_at: string;
}

const API_URL = "http://localhost:5004/api/categories";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
  return response.json();
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await fetch(`${API_URL}/${slug}`);
  if (!response.ok) throw new Error("Erreur lors du chargement de la catégorie");
  return response.json();
};

export const createCategory = async (categoryData: Partial<Category>): Promise<{ message: string; id: number }> => {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) throw new Error("Erreur lors de la création de la catégorie");
  return response.json();
};

export const updateCategory = async (id: number, categoryData: Partial<Category>): Promise<{ message: string; id: number }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour de la catégorie");
  return response.json();
};

export const deleteCategory = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression de la catégorie");
  return response.json();
};
