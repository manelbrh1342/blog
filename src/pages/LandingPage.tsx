import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Menu, Search, User } from 'lucide-react';
import CTA from '../components/landing/CTA';
import PopularPosts from '../components/landing/PopularPosts';
import Footer from '../components/landing/Footer';
import BlogHero from '../components/landing/Hero';
import Navigation from '../components/landing/Navigation';

export default function BlogLanding() {

  

  return (
    <div className="min-h-screen bg-white">
        <Navigation/>
        <BlogHero/>
        <PopularPosts/>
        <CTA/>
        <Footer/>



    </div>
  );
}