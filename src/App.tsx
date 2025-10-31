import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BackgroundAnimation from './components/BackgroundAnimation';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Sectors from './components/Sectors';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import BlogTech from './pages/BlogTech';

// 🆕 Imports Admin
import { AuthProvider } from './admin/hooks/useAuth';
import { QueryProvider } from './admin/providers/QueryProvider';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/layout/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';

// 🆕 Navigation CRUD
import NavigationList from './admin/pages/navigation/NavigationList';
import NavigationCreate from './admin/pages/navigation/NavigationCreate';
import NavigationEdit from './admin/pages/navigation/NavigationEdit';

function App() {
  return (
    <Router>
      <QueryProvider>
        <AuthProvider>
          {/* Toast notifications */}
          <Toaster position="top-right" />

          <Routes>
            {/* Page principale */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-[#0A0A0B] text-white overflow-x-hidden">
                  {/* Animated Background */}
                  <BackgroundAnimation />

                  {/* Main Content */}
                  <div className="relative z-10">
                    <Header />
                    <main>
                      <Hero />
                      <About />
                      <Services />
                      <Sectors />
                      <Portfolio />
                      <Blog />
                      <Contact />
                    </main>
                    <Footer />
                  </div>

                  {/* Floating ChatBot */}
                  <ChatBot />
                </div>
              }
            />

            {/* Page Blog Tech */}
            <Route path="/blog-tech" element={<BlogTech />} />

            {/* 🆕 Routes Admin */}
            <Route path="/admin/login" element={<Login />} />
            
            {/* Admin routes avec layout */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* Redirect /admin to /admin/dashboard */}
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              
              {/* Dashboard */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* 🆕 Navigation CRUD */}
              <Route path="navigation">
                <Route index element={<NavigationList />} />
                <Route path="create" element={<NavigationCreate />} />
                <Route path=":id/edit" element={<NavigationEdit />} />
              </Route>
              
              {/* Autres routes admin seront ajoutées dans les prochaines phases */}
            </Route>
          </Routes>
        </AuthProvider>
      </QueryProvider>
    </Router>
  );
}

export default App;
