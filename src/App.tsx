import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogLanding from './pages/LandingPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import EventPage from './pages/EventPage'
import ProfileDetails from './pages/ProfileDetails'
import TestComments from './pages/TestComments'

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPassword from './pages/ForgetPassword';
import ArticlePage from './pages/ArticlePage';
import CommentsPage from './pages/CommentsPage';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';
import ArticlesPage from './pages/admin/ArticlesPage';
import AdminCommentsPage from './pages/admin/CommentsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogLanding />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/profile" element={<ProfileDetails />} />
        <Route path="/test-comments" element={<TestComments />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/comments/:articleId" element={<CommentsPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="comments" element={<AdminCommentsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
