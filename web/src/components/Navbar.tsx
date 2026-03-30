import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navBg = isScrolled ? 'glass-nav text-on-surface shadow-sm' : 'bg-transparent text-on-surface';

  // For the homepage hero section, we might want the text to be white when NOT scrolled.
  // But since the hero is a light image in Evorae, text-current is fine.

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${navBg} ${isScrolled ? 'py-3' : 'py-5 md:py-8'}`}>
        <div className="grid grid-cols-3 items-center w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
          
          {/* Left: Mobile Trigger & Desktop Links */}
          <div className="flex items-center justify-start">
            <button 
              className="md:hidden text-current hover:opacity-80 transition-all z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[28px] font-light">
                {isMobileMenuOpen ? 'close' : 'menu_open'}
              </span>
            </button>
            <div className="hidden md:flex gap-8 lg:gap-10 items-center">
              <Link to="/" className={`uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 ease-in-out relative group ${location.pathname === '/' ? 'text-primary' : 'text-current opacity-75 hover:opacity-100'}`}>
                New In
                <span className={`absolute -bottom-1.5 left-0 h-[1px] bg-primary transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link to="/collection" className={`uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 ease-in-out relative group ${location.pathname === '/collection' && !location.search ? 'text-primary' : 'text-current opacity-75 hover:opacity-100'}`}>
                Apparel
                <span className={`absolute -bottom-1.5 left-0 h-[1px] bg-primary transition-all duration-300 ${location.pathname === '/collection' && !location.search ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link to="/collection?category=Jewellery" className={`uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 ease-in-out relative group ${location.search.includes('Jewellery') ? 'text-primary' : 'text-current opacity-75 hover:opacity-100'}`}>
                Jewellery
                <span className={`absolute -bottom-1.5 left-0 h-[1px] bg-primary transition-all duration-300 ${location.search.includes('Jewellery') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center flex-1">
            <Link to="/" className="text-3xl md:text-[40px] font-headline tracking-tighter text-current hover:opacity-80 transition-opacity">
              Evorae
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-5 md:space-x-6 justify-end">
             <div className="hidden lg:flex gap-8 lg:gap-10 items-center mr-6">
               <Link to="/summer-breath" className={`uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 ease-in-out relative group ${location.pathname === '/summer-breath' ? 'text-primary' : 'text-current opacity-75 hover:opacity-100'}`}>
                Summer Breath
                <span className={`absolute -bottom-1.5 left-0 h-[1px] bg-primary transition-all duration-300 ${location.pathname === '/summer-breath' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              <Link to="/about" className={`uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 ease-in-out relative group ${location.pathname === '/about' ? 'text-primary' : 'text-current opacity-75 hover:opacity-100'}`}>
                Story
                <span className={`absolute -bottom-1.5 left-0 h-[1px] bg-primary transition-all duration-300 ${location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </div>
            <button className="hover:opacity-70 transition-opacity text-current flex items-center">
              <span className="material-symbols-outlined font-light text-[24px]">search</span>
            </button>
            <button className="hidden md:flex hover:opacity-70 transition-opacity text-current items-center">
              <span className="material-symbols-outlined font-light text-[24px]">person</span>
            </button>
            <button className="hover:opacity-70 transition-opacity text-current relative flex items-center group">
              <span className="material-symbols-outlined font-light text-[24px]">shopping_bag</span>
              <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-surface/95 backdrop-blur-xl"></div>
        <div className="relative h-full flex flex-col justify-center px-12">
          <div className="flex flex-col gap-8">
            <Link to="/" className="text-5xl font-headline text-on-surface hover:text-primary transition-all hover:translate-x-3 duration-500 ease-out">Home</Link>
            <Link to="/collection" className="text-5xl font-headline text-on-surface hover:text-primary transition-all hover:translate-x-3 duration-500 ease-out">Apparel</Link>
            <Link to="/collection?category=Jewellery" className="text-5xl font-headline text-on-surface hover:text-primary transition-all hover:translate-x-3 duration-500 ease-out">Jewellery</Link>
            <Link to="/summer-breath" className="text-5xl font-headline text-on-surface hover:text-primary transition-all hover:translate-x-3 duration-500 ease-out">Summer Breath</Link>
            <Link to="/about" className="text-5xl font-headline text-on-surface hover:text-primary transition-all hover:translate-x-3 duration-500 ease-out">Our Story</Link>
          </div>
          
          <div className="absolute bottom-12 left-12 flex gap-6 text-on-surface-variant">
            <span className="uppercase tracking-widest text-xs font-semibold hover:text-primary cursor-pointer transition-colors">Instagram</span>
            <span className="uppercase tracking-widest text-xs font-semibold hover:text-primary cursor-pointer transition-colors">Pinterest</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
