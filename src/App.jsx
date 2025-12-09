import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import AuthPage from './pages/Authpage';
import Shop from './pages/Shop';
import Adminpanel from './pages/Adminpanel';
import Footer from './components/Footer';
import Account from './components/Account';
import Cart from './pages/Cart';

const About = () => (
  <div className="p-10 text-black font-press-start text-3xl text-center">
    💡 About GadgetHub
  </div>
);

const Contact = () => (
  <div className="p-10 text-black font-press-start text-3xl text-center">
    📞 Contact Us
  </div>
);

function App() {
  return (
    <BrowserRouter>

      <Toaster position="top-center" />

      <Navbar />



      <main className="bg-gray-50 min-h-screen">
          
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/admin" element={<Adminpanel />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
