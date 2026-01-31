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

// Users management
export const fetchUsers = async (): Promise<AdminUser[]> => {
  return Promise.resolve([
    { id: 1, username: "admin", email: "admin@example.com", role: "admin", created_at: new Date().toISOString() },
    { id: 2, username: "user", email: "user@example.com", role: "user", created_at: new Date().toISOString() }
  ]);
};

export const deleteUser = async (id: number): Promise<{ message: string }> => {
  return Promise.resolve({ message: "User deleted" });
};

// Articles management
export const fetchArticles = async (): Promise<AdminArticle[]> => {
  return Promise.resolve([
    { id: 1, title: "Admin Article 1", content: "Content", author_id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ]);
};

export const deleteArticle = async (id: number): Promise<{ message: string }> => {
  return Promise.resolve({ message: "Article deleted" });
};

// Comments management
export const fetchComments = async (): Promise<AdminComment[]> => {
  return Promise.resolve([
    { id: 1, content: "Admin Comment", article_id: 1, user_id: 2, created_at: new Date().toISOString() }
  ]);
};

export const deleteComment = async (id: number): Promise<{ message: string }> => {
  return Promise.resolve({ message: "Comment deleted" });
};
