import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogLanding from './pages/LandingPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProfileDetails from './pages/ProfileDetails'

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

import Home from './features/Events/pages/Home';
import Events from './features/Events/pages/Events';
import EventDetail from './features/Events/pages/EventDetail';
import AddEvent from './features/Events/pages/AddEvent';
import EditEvent from './features/Events/pages/EditEvent';
import Calendar from './features/Events/pages/Calendar';
import Search from './features/Events/pages/Search';
import Users from './features/Events/pages/Users';
import Stats from './features/Events/pages/Stats';
import NotFound from './features/Events/pages/NotFound';
import AuthorProfile from './features/Events/pages/AuthorProfile';

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

        <Route path="/event" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/author/:authorId" element={<AuthorProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/users" element={<Users />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<NotFound />} />
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
