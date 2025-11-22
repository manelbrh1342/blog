import React from 'react';

const blogPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
    title: "Consequat",
    date: "December 15, 2024",
    excerpt: "Minim dolor in magna sed, lectus amet urna gravida semper augue nunc id.",
    author: "Cameron Williamson",
    authorImg: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    title: "Consequat",
    date: "December 12, 2024",
    excerpt: "Minim dolor in magna sed, lectus amet urna gravida semper augue nunc id.",
    author: "Cameron Williamson",
    authorImg: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    title: "Consequat",
    date: "December 10, 2024",
    excerpt: "Minim dolor in magna sed, lectus amet urna gravida semper augue nunc id.",
    author: "Cameron Williamson",
    authorImg: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    title: "Consequat",
    date: "December 8, 2024",
    excerpt: "Minim dolor in magna sed, lectus amet urna gravida semper augue nunc id.",
    author: "Cameron Williamson",
    authorImg: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    title: "Consequat",
    date: "December 5, 2024",
    excerpt: "Minim dolor in magna sed, lectus amet urna gravida semper augue nunc id.",
    author: "Cameron Williamson",
    authorImg: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop",
    title: "Consequat",
    date: "December 3, 2024",
    excerpt: "Minim dolor in magna sed, lectus amet urna gravida semper augue nunc id.",
    author: "Cameron Williamson",
    authorImg: "https://i.pravatar.cc/150?img=6"
  }
];

export default function PopularPosts() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-primary">Popular Blog Posts</h2>
        <p className="text-gray-600 font-secondary">The most popular blog posts this month</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1 font-primary">{post.title}</h3>
              <p className="text-gray-500 text-xs mb-2 font-secondary">{post.date}</p>
              <p className="text-gray-600 text-sm mb-4 font-secondary">{post.excerpt}</p>
              <div className="flex items-center space-x-3">
                <img
                  src={post.authorImg}
                  alt={post.author}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm text-gray-700 font-secondary">{post.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
