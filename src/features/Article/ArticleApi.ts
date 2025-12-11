export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  image?: string;
  date: string;
  user_id?: number;
  author_name?: string;
  author_avatar?: string;
}

const API_URL = "http://192.168.43.17:5000/api/articles";

const transformArticle = (article: any): Article => {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    category: article.category,
    image: article.image
      ? `http://192.168.43.17:5000/uploads/${article.image}`
      : undefined,
    date: new Date(article.date).toLocaleDateString("fr-FR"),
    user_id: article.user_id,
    author_name: article.author_name,
    author_avatar: article.author_avatar
      ? `http://192.168.43.17:5000/uploads/avatars/${article.author_avatar}`
      : undefined,
  };
};

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) throw new Error("Erreur lors du chargement des articles");
  const data = await response.json();
  return data.map(transformArticle);
};

export const fetchArticleById = async (id: number): Promise<Article> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Erreur lors du chargement de l'article");
  const data = await response.json();
  return transformArticle(data);
};

export const fetchRelatedArticles = async (
  category: string
): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/related/${category}`);
  if (!response.ok)
    throw new Error("Erreur lors du chargement des articles liés");
  const data = await response.json();
  return data.map(transformArticle);
};

export const createArticle = async (articleData: any): Promise<Article> => {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(articleData),
  });
  if (!response.ok) throw new Error("Erreur lors de la création d'article");

  const data = await response.json();
  return transformArticle(data);
};

export const updateArticle = async (
  id: number,
  updatedData: any
): Promise<Article> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour");

  const data = await response.json();
  return transformArticle(data);
};

export const deleteArticle = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression");
};
