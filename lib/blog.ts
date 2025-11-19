import { BlogPost, BlogCategory, BlogComment, BlogStats } from '../types/blog';
import { promises as fs } from 'fs';
import path from 'path';

const BLOG_DATA_DIR = path.join(process.cwd(), 'data', 'blog');
const POSTS_FILE = path.join(BLOG_DATA_DIR, 'posts.json');
const CATEGORIES_FILE = path.join(BLOG_DATA_DIR, 'categories.json');
const COMMENTS_FILE = path.join(BLOG_DATA_DIR, 'comments.json');

// Asegurar que el directorio existe
async function ensureDataDir() {
  try {
    await fs.access(BLOG_DATA_DIR);
  } catch {
    await fs.mkdir(BLOG_DATA_DIR, { recursive: true });
  }
}

// Funciones para Posts
export async function getAllPosts(): Promise<BlogPost[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(POSTS_FILE, 'utf-8');
    const posts = JSON.parse(data);
    return posts.map((post: Omit<BlogPost, 'publishedAt' | 'updatedAt'> & { publishedAt: string; updatedAt: string }) => ({
      ...post,
      publishedAt: new Date(post.publishedAt),
      updatedAt: new Date(post.updatedAt)
    }));
  } catch {
    return [];
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const posts = await getAllPosts();
  const newPost: BlogPost = {
    ...post,
    id: generateId(),
    publishedAt: new Date(),
    updatedAt: new Date()
  };
  
  posts.push(newPost);
  await savePosts(posts);
  return newPost;
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) return null;
  
  posts[postIndex] = {
    ...posts[postIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  await savePosts(posts);
  return posts[postIndex];
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  await savePosts(filteredPosts);
  return true;
}

async function savePosts(posts: BlogPost[]) {
  await ensureDataDir();
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

// Funciones para Categorías
export async function getAllCategories(): Promise<BlogCategory[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(CATEGORIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    const defaultCategories: BlogCategory[] = [
      { id: '1', name: 'Diseño', slug: 'diseno', description: 'Artículos sobre diseño y creatividad' },
      { id: '2', name: 'Sustentabilidad', slug: 'sustentabilidad', description: 'Contenido sobre sostenibilidad' },
      { id: '3', name: 'Proceso', slug: 'proceso', description: 'Detrás de escenas de nuestros proyectos' }
    ];
    await saveCategories(defaultCategories);
    return defaultCategories;
  }
}

export async function createCategory(category: Omit<BlogCategory, 'id'>): Promise<BlogCategory> {
  const categories = await getAllCategories();
  const newCategory: BlogCategory = {
    ...category,
    id: generateId()
  };
  
  categories.push(newCategory);
  await saveCategories(categories);
  return newCategory;
}

async function saveCategories(categories: BlogCategory[]) {
  await ensureDataDir();
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
}

// Funciones para Comentarios
export async function getCommentsByPostId(postId: string): Promise<BlogComment[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
    const comments = JSON.parse(data);
    return comments
      .filter((comment: Omit<BlogComment, 'createdAt'> & { createdAt: string }) => comment.postId === postId)
      .map((comment: Omit<BlogComment, 'createdAt'> & { createdAt: string }) => ({
        ...comment,
        createdAt: new Date(comment.createdAt)
      }));
  } catch {
    return [];
  }
}

// Estadísticas
export async function getBlogStats(): Promise<BlogStats> {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  
  return {
    totalPosts: posts.length,
    publishedPosts: publishedPosts.length,
    draftPosts: draftPosts.length,
    totalViews: 0, // Implementar analytics después
    totalComments: 0, // Implementar comentarios después
    topPosts: publishedPosts.slice(0, 5).map(post => ({
      id: post.id,
      title: post.title,
      views: 0
    }))
  };
}

// Utilidades
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}