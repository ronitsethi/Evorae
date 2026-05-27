import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchOverlay from './SearchOverlay';

const CustomLink = ({ to, children, isActive }: { to: string, children: React.ReactNode, isActive: boolean }) => (
  <Link to={to} className={`uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 ease-in-out relative group ${isActive ? 'text-primary' : 'text-current opacity-75 hover:opacity-100'}`}>
    {children}
    <span className={`absolute -bottom-1.5 left-0 h-[1px] bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navBg = isScrolled ? 'glass-nav text-on-surface shadow-sm bg-surface/95 backdrop-blur' : 'bg-transparent text-on-surface';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${navBg} ${isScrolled ? 'py-3' : 'py-5 md:py-8'} pt-[calc(var(--safe-top,0px)+0.5rem)] lg:pt-[calc(var(--safe-top,0px)+1.5rem)]`}>
        <div className="grid grid-cols-3 items-center w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          
          {/* Left: Mobile Trigger & Desktop Links */}
          <div className="flex items-center justify-start">
            <button 
              className="md:hidden text-current hover:opacity-80 z-50 mr-2 interactive touch-native min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[28px] font-light">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <div className="hidden md:flex gap-8 lg:gap-10 items-center">
              <CustomLink to="/" isActive={location.pathname === '/'}>New In</CustomLink>
              <CustomLink to="/collection" isActive={location.pathname === '/collection' && !location.search.includes('Jewellery')}>Apparel</CustomLink>
              <CustomLink to="/collection?category=Jewellery" isActive={location.search.includes('Jewellery')}>Jewellery</CustomLink>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
            <Link to="/" className="flex items-center justify-center transition-opacity hover:opacity-80">
              <img src="/logo.png" alt="Evorae Brand Logo" className="h-[34px] md:h-[56px] w-auto object-contain" />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-5 md:space-x-6 justify-end">
             <div className="hidden lg:flex gap-8 lg:gap-10 items-center mr-6">
                <CustomLink to="/summer-breath" isActive={location.pathname === '/summer-breath'}>Summer Breath</CustomLink>
                <CustomLink to="/about" isActive={location.pathname === '/about'}>Story</CustomLink>
            </div>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="interactive touch-native min-w-[44px] min-h-[44px] flex justify-center items-center text-current"
              aria-label="Open search"
            >
              <span className="material-symbols-outlined font-light text-[24px]">search</span>
            </button>
            <button 
              onClick={openCart} 
              className="interactive touch-native min-w-[44px] min-h-[44px] flex justify-center items-center text-current relative -mr-2 lg:mr-0 group"
            >
              <span className="material-symbols-outlined font-light text-[24px]">shopping_bag</span>
              {itemCount > 0 && (
                <span className="absolute top-1 right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overscroll-contain ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-surface/95 backdrop-blur-xl"></div>
        <div className="relative h-full flex flex-col justify-center px-12 pb-[var(--safe-bottom,0px)]">
          <div className="flex flex-col gap-6 md:gap-8">
            <Link to="/" className="interactive text-3xl sm:text-4xl md:text-5xl font-headline text-on-surface transition-transform origin-left inline-block w-fit">New In</Link>
            <Link to="/collection" className="interactive text-3xl sm:text-4xl md:text-5xl font-headline text-on-surface transition-transform origin-left inline-block w-fit">Apparel</Link>
            <Link to="/collection?category=Jewellery" className="interactive text-3xl sm:text-4xl md:text-5xl font-headline text-on-surface transition-transform origin-left inline-block w-fit">Jewellery</Link>
            <Link to="/summer-breath" className="interactive text-3xl sm:text-4xl md:text-5xl font-headline text-on-surface transition-transform origin-left inline-block w-fit">Summer Breath</Link>
            <Link to="/about" className="interactive text-3xl sm:text-4xl md:text-5xl font-headline text-on-surface transition-transform origin-left inline-block w-fit">Story</Link>
          </div>
          
          <div className="absolute bottom-[calc(3rem+var(--safe-bottom,0px))] left-12 flex gap-6 text-on-surface-variant">
            <a href="https://www.instagram.com/evorae.official" target="_blank" rel="noopener noreferrer" className="interactive touch-native uppercase tracking-widest text-xs font-semibold flex items-center hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="interactive touch-native uppercase tracking-widest text-xs font-semibold flex items-center hover:text-primary transition-colors">Pinterest</a>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
