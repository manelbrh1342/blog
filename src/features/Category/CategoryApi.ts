import { mockCategories } from "../../data/mock";

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
  return Promise.resolve(mockCategories);
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category> => {
  const category = mockCategories.find((c) => c.slug === slug);
  if (!category) throw new Error("Category not found");
  return Promise.resolve(category);
};

export const createCategory = async (categoryData: Partial<Category>): Promise<{ message: string; id: number }> => {
  return Promise.resolve({ message: "Category created", id: 999 });
};

export const updateCategory = async (id: number, categoryData: Partial<Category>): Promise<{ message: string; id: number }> => {
  return Promise.resolve({ message: "Category updated", id });
};

export const deleteCategory = async (id: number): Promise<{ message: string }> => {
  return Promise.resolve({ message: "Category deleted" });
};
