import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost, generateSlug } from '../../../../lib/blog';

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, tags, status = 'draft' } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = generateSlug(title);
    
    const newPost = await createPost({
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      category: category || 'General',
      tags: tags || [],
      status,
      author: 'Admin', // En el futuro implementar autenticación
      publishedAt: new Date(),
      seo: {
        metaTitle: title,
        metaDescription: excerpt || content.substring(0, 160),
        keywords: tags || []
      }
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
} 