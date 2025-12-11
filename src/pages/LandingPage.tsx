
import CTA from '../components/landing/CTA';
import PopularPosts from '../components/landing/PopularPosts';
import Footer from '../components/landing/Footer';
import BlogHero from '../components/landing/Hero';
import SimpleHeader from '../components/landing/SimpleHeader';

export default function BlogLanding() {



  return (
    <div className="min-h-screen bg-white">
      <SimpleHeader />
      <BlogHero />
      <PopularPosts />
      <CTA />
      <Footer />



    </div>
  );
}