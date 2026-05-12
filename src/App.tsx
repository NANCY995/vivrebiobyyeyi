import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import './i18n';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PromoBar from './components/PromoBar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import About from './pages/About';
import Local from './pages/Local';
import Blog from './pages/Blog';
import Delivery from './pages/Delivery';
import Legal from './pages/Legal';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#F5F0E8] dark:bg-gray-900 text-[#2A2A2A] dark:text-gray-100 font-['Jost']">
        <PromoBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/local" element={<Local />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </HelmetProvider>
  );
}

export default App;
