import { getApiUrl, fetchWithAuth } from '../../config/api';

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  category_id?: number;
  category?: string;
  featured_image?: string;
  image?: string;
  date: string;
  created_at?: string;
  published_at?: string;
  author_id?: number;
  user_id?: number;
  author_name?: string;
  author_avatar?: string;
  status?: string;
  tags?: string;
}

const transformArticle = (article: any): Article => {
  return {
    id: article.id,
    title: article.title,
    content: article.content || '',
    excerpt: article.excerpt,
    slug: article.slug,
    category_id: article.category_id,
    featured_image: article.featured_image,
    image: article.featured_image,
    date: article.published_at 
      ? new Date(article.published_at).toLocaleDateString("en-US", { 
          month: "long", 
          day: "numeric", 
          year: "numeric" 
        })
      : article.created_at 
      ? new Date(article.created_at).toLocaleDateString("en-US", { 
          month: "long", 
          day: "numeric", 
          year: "numeric" 
        })
      : '',
    created_at: article.created_at,
    published_at: article.published_at,
    author_id: article.author_id,
    user_id: article.author_id,
    status: article.status,
    tags: article.tags,
  };
};

export const fetchArticles = async (params?: {
  status?: string;
  category_id?: number;
  author_id?: number;
}): Promise<Article[]> => {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
  if (params?.author_id) queryParams.append('author_id', params.author_id.toString());
  
  const url = getApiUrl('ARTICLES', `/?${queryParams.toString()}`);
  const response = await fetchWithAuth(url);
  if (!response.ok) throw new Error("Error loading articles");
  const data = await response.json();
  return data.map(transformArticle);
};

export const fetchArticleBySlug = async (slug: string): Promise<Article> => {
  const url = getApiUrl('ARTICLES', `/${slug}`);
  const response = await fetchWithAuth(url);
  if (!response.ok) throw new Error("Error loading article");
  const data = await response.json();
  return transformArticle(data);
};

export const fetchRelatedArticles = async (
  categoryId: number
): Promise<Article[]> => {
  return fetchArticles({ category_id: categoryId, status: 'published' });
};

export const createArticle = async (articleData: {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  featured_image?: string;
  author_id: number;
  category_id?: number;
  status?: string;
  tags?: string;
}): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('ARTICLES', '/');
  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(articleData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error creating article");
  }
  return response.json();
};

export const updateArticle = async (
  id: number,
  updatedData: Partial<Article>
): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('ARTICLES', `/${id}`);
  const response = await fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error updating article");
  }
  return response.json();
};

export const deleteArticle = async (id: number): Promise<{ message: string }> => {
  const url = getApiUrl('ARTICLES', `/${id}`);
  const response = await fetchWithAuth(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error deleting article");
  }
  return response.json();
};
