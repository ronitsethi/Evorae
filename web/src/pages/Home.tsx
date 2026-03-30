import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page min-h-screen bg-surface">
      
      {/* Editorial Hero Layout */}
      <section className="relative w-full min-h-screen flex flex-col pt-32 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="flex-1 w-full flex flex-col items-center justify-center mb-12 relative z-10 text-center">
            <span className="uppercase tracking-[0.3em] font-label text-[10px] font-bold text-outline mb-6 block">
              Chapter I
            </span>
            <h1 className="font-headline text-6xl md:text-8xl lg:text-[140px] text-on-surface leading-[0.9] tracking-tighter mb-8 md:mb-12">
              Summer Breath
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
              A collection born from the gentle whisper of the Indian summer. Light as air, crafted by hand, designed for the conscious soul.
            </p>
            <div className="mt-12 flex justify-center">
              <Link to="/summer-breath" className="group flex flex-col items-center gap-2 text-on-surface hover:text-primary transition-colors">
                  <span className="font-label text-xs uppercase tracking-[0.2em] font-semibold">Explore Chapter</span>
                  <div className="h-[1px] w-full bg-outline-variant group-hover:bg-primary transition-all duration-500 relative">
                    <span className="absolute right-0 top-1/2 -translate-y-[5px] border-r border-b border-current w-2 h-2 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </div>
              </Link>
            </div>
        </div>

        <div className="w-full relative group">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img 
              alt="Summer Breath Campaign" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
              src="/images/491A9101.JPG"
            />
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden bg-surface-container-low">
              <img 
                alt="Heritage Story" 
                className="w-full h-full object-cover" 
                src="/images/491A9150.JPG"
              />
            </div>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 lg:pr-12">
            <span className="font-label text-[10px] font-bold text-outline tracking-[0.3em] uppercase mb-8 block">Heritage Reimagined</span>
            <h2 className="font-headline text-5xl md:text-7xl text-on-surface mb-10 leading-[1.1] tracking-tight">The Soul of Modern Craftsmanship.</h2>
            <div className="w-16 h-[1px] bg-outline-variant mb-10"></div>
            <p className="font-body text-lg md:text-xl text-on-surface-variant mb-12 leading-[1.8] font-light">
              At Evorae, we believe that luxury lies in the story of the hand. Our pieces are a bridge between the ancient techniques of Indian artisans and the minimalist silhouettes of the modern world. Every stitch, every bead, and every print is a testament to a heritage that refuses to be forgotten.
            </p>
            <Link to="/about" className="text-on-surface font-label text-xs uppercase tracking-[0.2em] font-semibold group flex flex-col w-max">
              Learn our Story
              <span className="h-[2px] w-full bg-outline-variant mt-2 group-hover:bg-primary transition-colors"></span>
            </Link>
          </div>
        </div>

        {/* Secondary Image Offset */}
        <div className="hidden lg:block w-1/3 aspect-square overflow-hidden mt-12 ml-auto mr-[10%] relative z-0 p-4 bg-surface shadow-2xl">
             <img 
                alt="Artisanal Fabric" 
                className="w-full h-full object-cover" 
                src="/images/491A9208.JPG"
              />
        </div>
      </section>

      {/* Featured Collection: Asymmetrical/Carousel Layout */}
      <section className="py-24 md:py-32 bg-surface-container">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="uppercase tracking-[0.3em] font-label text-[10px] font-bold text-outline mb-4 block">Curation</span>
              <h2 className="font-headline text-4xl md:text-6xl text-on-surface tracking-tight">The Selection</h2>
            </div>
            <Link to="/collection" className="group flex items-center gap-4 text-on-surface hover:text-primary transition-colors pb-4">
                <span className="font-label text-xs uppercase tracking-[0.2em] font-semibold">View Arsenal</span>
                <span className="material-symbols-outlined font-light transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={`${index % 2 === 1 ? 'lg:mt-16' : ''}`}>
                 <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Editorial Voice */}
      <section className="py-32 md:py-48 bg-surface-container-low flex flex-col items-center text-center px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto w-full relative z-10">
          <blockquote className="font-headline text-3xl md:text-5xl lg:text-7xl text-on-surface leading-[1.15] tracking-tight mb-16 relative">
             <span className="text-secondary absolute -left-8 md:-left-12 -top-6 text-6xl md:text-8xl font-serif opacity-30 select-none">"</span>
            Clothes should be a gentle companion to your spirit, not a loud statement for the world.
          </blockquote>
          <p className="font-label text-xs tracking-[0.3em] font-bold uppercase text-outline">The Curator's Philosophy</p>
        </div>
      </section>

      {/* Newsletter / Community */}
      <section className="py-24 md:py-40 bg-on-surface text-surface relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="font-label text-[10px] font-bold tracking-[0.3em] uppercase text-outline-variant mb-8 block">Join the Atelier</span>
          <h2 className="font-headline text-5xl md:text-7xl mb-8 tracking-tighter text-surface-container-lowest">A Lasting Dialogue</h2>
          <p className="mb-14 font-body text-lg md:text-xl text-outline-variant leading-relaxed font-light">
            Occasional letters about our new collections, artisan stories, and heritage explorations. No noise, just inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-6 mx-auto">
            <input 
              className="flex-grow font-body text-lg bg-transparent border-0 border-b border-outline-variant/30 text-surface placeholder:text-outline-variant/40 focus:ring-0 focus:border-surface transition-all outline-none py-3" 
              placeholder="Your email address" 
              type="email"
            />
            <button className="bg-surface text-on-surface px-10 py-4 font-label font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-on-primary transition-colors flex-shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
