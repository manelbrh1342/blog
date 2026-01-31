import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogLanding from './pages/LandingPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import CategoryArticlesPage from './pages/CategoryArticlesPage'
import ProfileDetails from './pages/ProfileDetails'
import NotFoundPage from './pages/NotFoundPage'

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPassword from './pages/ForgetPassword';
import ArticlePage from './pages/ArticlePage';
import CommentsPage from './pages/CommentsPage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';
import ArticlesPage from './pages/admin/ArticlesPage';
import AdminCommentsPage from './pages/admin/CommentsPage';

import Events from './features/Events/pages/Events';
import EventDetail from './features/Events/pages/EventDetail';
import AddEvent from './features/Events/pages/AddEvent';
import EditEvent from './features/Events/pages/EditEvent';
import Calendar from './features/Events/pages/Calendar';
import AuthorProfile from './features/Events/pages/AuthorProfile';
import EventsLayout from './features/Events/components/EventsLayout';
import NotificationsPage from './pages/Notifications';
import SearchResultsPage from './pages/SearchResultsPage';

// src/App.tsx
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogLanding />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/profile" element={<ProfileDetails />} />
        <Route path="/test-comments" element={<CommentsPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />

        {/* Article Routes */}
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/comments/:articleId" element={<CommentsPage />} />

        {/* Events Routes with Layout */}
        <Route element={<EventsLayout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>

        <Route path="/author/:authorId" element={<AuthorProfile />} />

        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/category/:category" element={<CategoryArticlesPage />} />

        {/* Static Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="comments" element={<AdminCommentsPage />} />
        </Route>
        {/* Catch all - 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </Router>
  )
}
