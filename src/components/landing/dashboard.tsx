import React, { useState, useRef } from 'react';
import {
  Bold, Italic, Link as LinkIcon, Image,
  AlignLeft, AlignCenter, AlignRight, UserPlus, Type,
  List, ListOrdered, Upload, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  "Travel", "Politics", "Selfcare", "Education", "Art", "Fashion",
  "Sports", "Relationships", "Agriculture", "Ocean", "Cosmos",
  "Books", "Movies", "Gaming", "Music", "Chess", "Career"
];

const BlogDashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Personal');

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      executeCommand('insertImage', url);
    }
  };

  const handlePost = () => {
    const content = editorRef.current?.innerHTML || '';
    if (!title && !content) return;

    // Create new article object
    const newArticle = {
      id: Date.now(),
      title: title || "Untitled Post",
      content: content,
      author: "You",
      authorImg: "https://i.pravatar.cc/150?img=12",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: selectedCategory,
      image: coverImage || "https://images.unsplash.com/photo-1499750310159-a7733c26b971?w=800&fit=crop",
      collaborators: collaborators.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const existing = JSON.parse(localStorage.getItem('userPosts') || '[]');
      const updated = [newArticle, ...existing];
      localStorage.setItem('userPosts', JSON.stringify(updated));

      navigate(`/article/${newArticle.id}`);
    } catch (err) {
      console.error("Failed to save post", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        {/* Cover Image Section */}
        <div className="relative h-48 bg-gray-50 border-b border-gray-100 group">
          {coverImage ? (
            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Image size={48} className="mb-2 opacity-20" />
              <span className="text-sm">Add a cover image</span>
            </div>
          )}

          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-medium"
          >
            <Upload className="mr-2" size={20} /> Change Cover
          </button>
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverUpload}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* Editor Toolbar */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex-wrap sticky top-0 z-10">
          <button onClick={() => executeCommand('bold')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Bold">
            <Bold size={18} />
          </button>
          <button onClick={() => executeCommand('italic')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Italic">
            <Italic size={18} />
          </button>
          <button onClick={() => executeCommand('formatBlock', 'h2')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Heading">
            <Type size={18} />
          </button>
          <button onClick={() => {
            const url = prompt('Enter URL:');
            if (url) executeCommand('createLink', url);
          }} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Link">
            <LinkIcon size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button onClick={() => executeCommand('justifyLeft')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">
            <AlignLeft size={18} />
          </button>
          <button onClick={() => executeCommand('justifyCenter')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">
            <AlignCenter size={18} />
          </button>
          <button onClick={() => executeCommand('justifyRight')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">
            <AlignRight size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button onClick={() => executeCommand('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">
            <List size={18} />
          </button>
          <button onClick={() => executeCommand('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">
            <ListOrdered size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Insert Image (Content)">
            <Image size={18} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleContentImageUpload}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="p-8">
          {/* Metadata Row: Category & Collaborators */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Category Selector */}
            <div className="relative group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004aad]/20 cursor-pointer text-sm font-medium"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* Collaborator Input */}
            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-xl flex-1 max-w-md">
              <UserPlus size={16} />
              <input
                type="text"
                placeholder="Invite collaborators..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 placeholder-gray-400"
                value={collaborators}
                onChange={(e) => setCollaborators(e.target.value)}
              />
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Article Title..."
            className="w-full text-4xl font-bold placeholder-gray-300 border-none focus:ring-0 px-0 mb-6 font-primary text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Content Editable Div */}
          <div
            ref={editorRef}
            contentEditable
            className="w-full min-h-[300px] outline-none text-gray-700 text-lg leading-relaxed font-secondary prose prose-lg max-w-none placeholder:text-gray-300"
            data-placeholder="Tell your story..."
            onInput={(e) => {
              // Optional: handle placeholder logic via CSS
            }}
          />
          <style>{`
            [contentEditable]:empty:before {
                content: attr(data-placeholder);
                color: #e5e7eb;
                pointer-events: none;
                display: block;
            }
            /* Explicit List Sytling Fix */
            .prose ul {
                list-style-type: disc;
                padding-left: 1.5em;
                margin-top: 1em;
                margin-bottom: 1em;
            }
            .prose ol {
                list-style-type: decimal;
                padding-left: 1.5em;
                margin-top: 1em;
                margin-bottom: 1em;
            }
            .prose li {
                margin-top: 0.5em;
                margin-bottom: 0.5em;
            }
          `}</style>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 flex items-center justify-end border-t border-gray-100">
          <button
            onClick={handlePost}
            className="px-8 py-3 bg-[#004aad] text-white rounded-xl font-bold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-200"
          >
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;