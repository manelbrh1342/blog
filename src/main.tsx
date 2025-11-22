import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import BlogLanding from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import EventPage from "./pages/EventPage";
import ProfileDetails from "./pages/ProfileDetails";
import App from "./App";  

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogLanding />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/profile" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
// Alternatively, you can render the App component directly