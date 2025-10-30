import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
