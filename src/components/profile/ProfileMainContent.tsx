import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, Pencil } from 'lucide-react';

interface ProfileMainContentProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  profilePicture: string;
  setProfilePicture: (value: string) => void;
  allCategories: string[];
  expertiseTags: string[];
  setExpertiseTags: (tags: string[]) => void;
  removeTag: (tag: string) => void;
}

export default function ProfileMainContent({
  name,
  setName,
  email,
  setEmail,
  bio,
  setBio,
  profilePicture,
  setProfilePicture,
  allCategories,
  expertiseTags,
  setExpertiseTags,
  removeTag,
}: ProfileMainContentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePencilClick = () => {
    fileInputRef.current?.click();
  };

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    if (!fileInputRef.current?.contains(target)) {
      setShowDropdown(false);
    }
  }, [fileInputRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePicture(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    let filtered: string[] = [];
    if (searchInput.trim() === '') {
      // Show all categories except those already selected
      filtered = allCategories.filter(category => !expertiseTags.includes(category));
      setShowDropdown(true);
    } else {
      filtered = allCategories.filter(
        (category) =>
          category.toLowerCase().includes(searchInput.toLowerCase()) &&
          !expertiseTags.includes(category)
      );
      setShowDropdown(filtered.length > 0);
    }
    setFilteredCategories(filtered);
  }, [searchInput, allCategories, expertiseTags]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleAddCategory = (category: string) => {
    if (!expertiseTags.includes(category)) {
      setExpertiseTags([...expertiseTags, category]);
    }
    setSearchInput('');
    setShowDropdown(false);
  };

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#004DA6] mb-8">Profile Details</h1>

        <div className="space-y-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={profilePicture || "https://i.pravatar.cc/150?img=8"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handlePencilClick}
                className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Name and Email Fields */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#004DA6] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Bio Field */}
          <div>
            <label className="block text-sm font-medium text-[#004DA6] mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          {/* Areas of Expertise */}
          <div className="relative">
            <label className="block text-sm font-medium text-blue-600 mb-2">Areas of expertise</label>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Start typing to search..."
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {showDropdown && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto">
                {filteredCategories.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500 italic select-none">
                    No matching results
                  </li>
                ) : (
                  filteredCategories.map((category) => (
                    <li
                      key={category}
                      onClick={() => handleAddCategory(category)}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                    >
                      {category}
                    </li>
                  ))
                )}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {expertiseTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
