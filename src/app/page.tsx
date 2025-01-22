'use client';

import { Post } from "@/types/post";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const sections = [
  { title: "La Banda", href: "/nuestra-historia", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
  { title: "Aula de Música", href: "/aula-de-musica", color: "bg-gradient-to-r from-green-500 to-green-700" },
  { title: "Multimedia", href: "/multimedia", color: "bg-gradient-to-r from-yellow-500 to-yellow-700" },
  { title: "Contacto", href: "/contacto", color: "bg-gradient-to-r from-red-500 to-red-700" },
];

const MainPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://municipaldemairena.com/wp-json/wp/v2/posts"
        );
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const featuredPost: Post = news[0];
  const otherPosts = news.slice(1);

  return (
    <div className="bg-gray-100">
      {/* Grid para noticias */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Últimas Noticias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured Post */}
          {featuredPost && (
            <article
              className="md:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden relative hover:shadow-xl transition-shadow"
            >
              <img
                src={
                  featuredPost.featured_image_url?.["post-thumbnail"] ||
                  "https://via.placeholder.com/600x400"
                }
                alt={featuredPost.title.rendered}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-2xl">
                {featuredPost.assigned_categories || "General"}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-900 mb-4">
                  <Link href={`/posts/${featuredPost.slug}`} rel="noopener noreferrer">
                    {featuredPost.title.rendered}
                  </Link>
                </h3>
                <p
                  className="text-gray-600 text-sm line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                ></p>
                <Link
                  href={`/posts/${featuredPost.slug}`}
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-900 font-medium hover:underline"
                >
                  Leer más →
                </Link>
              </div>
            </article>
          )}

          {/* Other Posts */}
          {otherPosts.map((post: Post) => (
            <article
              key={post.id}
              className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={
                  post.featured_image_url?.["post-thumbnail"] ||
                  "https://via.placeholder.com/300x200"
                }
                alt={post.title.rendered}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                {post.assigned_categories || "General"}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-900">
                  <Link href={`/posts/${featuredPost.slug}`} rel="noopener noreferrer">
                    {post.title.rendered}
                  </Link>
                </h3>
                <p
                  className="mt-2 text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                ></p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Acceso a secciones */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Secciones de la Web</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section, index) => (
            <a
              key={index}
              href={section.href}
              className={`flex items-center justify-center h-36 rounded-md text-white font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${section.color}`}
            >
              {section.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
