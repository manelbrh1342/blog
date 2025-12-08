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
  article_id: number;
  user_id: number;
  created_at: string;
}

const API_URL = "http://localhost:5006/api/admin";

// Users management
export const fetchUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");
  return response.json();
};

export const deleteUser = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression de l'utilisateur");
  return response.json();
};

// Articles management
export const fetchArticles = async (): Promise<AdminArticle[]> => {
  const response = await fetch(`${API_URL}/articles`);
  if (!response.ok) throw new Error("Erreur lors du chargement des articles");
  return response.json();
};

export const deleteArticle = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression de l'article");
  return response.json();
};

// Comments management
export const fetchComments = async (): Promise<AdminComment[]> => {
  const response = await fetch(`${API_URL}/comments`);
  if (!response.ok) throw new Error("Erreur lors du chargement des commentaires");
  return response.json();
};

export const deleteComment = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression du commentaire");
  return response.json();
};
