import PopularPosts from '../components/landing/PopularPosts';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import AuthNav from '../components/AuthNavigation';
import BlogDashboard from '../components/landing/dashboard';
import ActivityFeed from '../components/profile/ActivityFeed';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <AuthNav/>

      {/* Create Post Section */}
      <BlogDashboard/>

      {/* Activity Feed Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <ActivityFeed />
      </div>

      {/* Popular Posts */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <PopularPosts />
      </div>

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
