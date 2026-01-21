import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import WhatToExpect from "./pages/WhatToExpect";
import Location from "./pages/Location";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import Sermons from "./pages/Sermons";
import SermonDetails from "./pages/SermonDetails";
import Ministries from "./pages/Ministries";
import MinistryDetails from "./pages/MinistryDetails";
import Give from "./pages/Give";
import Campaigns from "./pages/Campaigns";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Connect from "./pages/Connect";
import PrayerRequest from "./pages/PrayerRequest";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/* Auth */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Admin */
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ManageEvents from "./pages/Dashboard/ManageEvents";
import ManageSermons from "./pages/Dashboard/ManageSermons";
import ManageBlog from "./pages/Dashboard/ManageBlog";
import ManageDonations from "./pages/Dashboard/ManageDonations";
import Users from "./pages/Dashboard/Users";
import Navbar from "./components/Navbar/Navbar";

import ProtectedRoute from "./router/ProtectedRoute";

export default function App() {
  // Replace with real auth logic
  const isAuthenticated = false;
  const isAdmin = false;

  return (
    <Router>
            <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-to-expect" element={<WhatToExpect />} />
        <Route path="/location" element={<Location />} />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/sermons" element={<Sermons />} />
        <Route path="/sermons/:id" element={<SermonDetails />} />

        <Route path="/ministries" element={<Ministries />} />
        <Route path="/ministries/:id" element={<MinistryDetails />} />

        <Route path="/give" element={<Give />} />
        <Route path="/campaigns" element={<Campaigns />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/connect" element={<Connect />} />
        <Route path="/prayer" element={<PrayerRequest />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
              <ManageEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sermons"
          element={
            <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
              <ManageSermons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
              <ManageBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
              <ManageDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}
