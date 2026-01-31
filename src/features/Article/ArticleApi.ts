import { mockArticles } from "../../data/mock";

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

// Mock Article API
export const fetchArticles = async (): Promise<Article[]> => {
  return Promise.resolve(mockArticles);
};

export const fetchArticleById = async (id: number): Promise<Article> => {
  const article = mockArticles.find((a) => a.id === Number(id));
  if (!article) throw new Error("Article not found");
  return Promise.resolve(article);
};

export const fetchRelatedArticles = async (
  category: string
): Promise<Article[]> => {
  const related = mockArticles.filter((a) => a.category === category);
  return Promise.resolve(related);
};

export const createArticle = async (articleData: any): Promise<Article> => {
  const newArticle = {
    id: Math.max(...mockArticles.map(a => a.id)) + 1,
    ...articleData,
    date: new Date().toISOString()
  }
  return Promise.resolve(newArticle);
};

export const updateArticle = async (
  id: number,
  updatedData: any
): Promise<Article> => {
  const article = mockArticles.find(a => a.id === id);
  if (!article) throw new Error("Article not found");
  return Promise.resolve({ ...article, ...updatedData });
};

export const deleteArticle = async (id: number): Promise<void> => {
  return Promise.resolve();
};
