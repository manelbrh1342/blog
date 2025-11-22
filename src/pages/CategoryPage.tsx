import React from 'react';
import AuthNav from '../components/AuthNavigation';

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthNav />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
        <p className="text-gray-600">Category page content goes here.</p>
      </div>
    </div>
  );
}
