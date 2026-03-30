import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface pt-24 pb-12 hairline-t">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 px-6 md:px-12 max-w-screen-2xl mx-auto">
        
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-8 pr-8">
          <Link to="/" className="text-4xl md:text-5xl font-headline tracking-tighter text-on-surface hover:opacity-80 transition-opacity">
            Evorae
          </Link>
          <p className="font-body text-base lg:text-lg text-on-surface-variant leading-relaxed max-w-md w-full font-light">
            Curating a conversation between the artisan’s past and the modern soul's future. Based in Jaipur, crafted for the conscious mind.
          </p>
        </div>
        
        {/* Links Columns */}
        <div className="md:col-span-2 md:col-start-7">
          <h5 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] mb-10 text-outline">Shop</h5>
          <ul className="space-y-6">
            <li><Link to="/summer-breath" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Summer Breath</Link></li>
            <li><Link to="/collection" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Apparel</Link></li>
            <li><Link to="/collection?category=Jewellery" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Jewellery</Link></li>
            <li><Link to="/" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">New In</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2 text-left md:text-left">
          <h5 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] mb-10 text-outline">Concierge</h5>
          <ul className="space-y-6">
            <li><a href="#" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Journal</a></li>
            <li><a href="#" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Shipping</a></li>
            <li><a href="#" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Returns</a></li>
            <li><Link to="/about" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Sustainability</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2 text-left md:text-left">
          <h5 className="font-label text-[10px] font-bold uppercase tracking-[0.2em] mb-10 text-outline">Social</h5>
          <ul className="space-y-6">
            <li><a href="#" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="#" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Pinterest</a></li>
            <li><a href="#" className="font-label text-sm font-medium text-on-surface hover:text-primary transition-colors">Spotify</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-32 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-8 hairline-t">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">© {new Date().getFullYear()} Evorae.</p>
        <div className="flex gap-10 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
