'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '../../../types/blog';

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return;
    
    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'published' | 'draft') => {
    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        setPosts(posts.map(post => 
          post.id === id ? { ...post, status: newStatus } : post
        ));
      }
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="text-[#3D4A3D]">Cargando posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#cedbbf]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-[#3D4A3D] hover:text-[#2C3A2C] transition-colors"
              >
                ← Volver al Panel
              </button>
              <h1 className="text-2xl font-bold text-[#3D4A3D]">Gestión del Blog</h1>
            </div>
            <button
              onClick={() => router.push('/admin/blog/new')}
              className="bg-[#3D4A3D] text-white px-4 py-2 rounded-md hover:bg-[#2C3A2C] transition-colors"
            >
              Nuevo Post
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'all' 
                ? 'bg-[#3D4A3D] text-white' 
                : 'bg-white text-[#3D4A3D] hover:bg-[#cedbbf]'
            }`}
          >
            Todos ({posts.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'published' 
                ? 'bg-[#3D4A3D] text-white' 
                : 'bg-white text-[#3D4A3D] hover:bg-[#cedbbf]'
            }`}
          >
            Publicados ({posts.filter(p => p.status === 'published').length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'draft' 
                ? 'bg-[#3D4A3D] text-white' 
                : 'bg-white text-[#3D4A3D] hover:bg-[#cedbbf]'
            }`}
          >
            Borradores ({posts.filter(p => p.status === 'draft').length})
          </button>
        </div>

        {/* Lista de Posts */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-[#2C2C2C] opacity-70 mb-4">
              {filter === 'all' ? 'No hay posts aún' : `No hay posts ${filter === 'published' ? 'publicados' : 'en borrador'}`}
            </div>
            <button
              onClick={() => router.push('/admin/blog/new')}
              className="bg-[#3D4A3D] text-white px-6 py-2 rounded-md hover:bg-[#2C3A2C] transition-colors"
            >
              Crear el primer post
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#cedbbf]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#3D4A3D] uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#3D4A3D] uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#3D4A3D] uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#3D4A3D] uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#3D4A3D] uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cedbbf]">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#F9F8F6]">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-[#3D4A3D]">
                            {post.title}
                          </div>
                          <div className="text-sm text-[#2C2C2C] opacity-70">
                            {post.excerpt}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? 'Publicado' : 'Borrador'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]">
                        {post.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2C2C]">
                        {formatDate(post.publishedAt)}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => router.push(`/admin/blog/edit/${post.id}`)}
                          className="text-[#3D4A3D] hover:text-[#2C3A2C] transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleStatusChange(
                            post.id, 
                            post.status === 'published' ? 'draft' : 'published'
                          )}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {post.status === 'published' ? 'Despublicar' : 'Publicar'}
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 