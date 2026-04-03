import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Campaign from './pages/Campaign';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <CartDrawer />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/summer-breath" element={<Campaign />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
