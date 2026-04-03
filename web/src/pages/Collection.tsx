import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts, type Product } from '../lib/shopify';
import ProductCard from '../components/ProductCard';

const Collection = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryFilter = queryParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (e) {
            console.error("Failed to load products", e);
        } finally {
            setLoading(false);
        }
    }
    load();
  }, []);

  const displayedProducts = categoryFilter 
    ? products.filter(p => p.category === categoryFilter)
    : products;

  const regularProducts = displayedProducts;

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <span className="font-label text-outline uppercase tracking-[0.2em] animate-pulse">Loading Archive...</span>
      </div>
    );
  }

  return (
    <div className="collection-page min-h-screen bg-surface">
      {/* Editorial Header */}
      <section className="px-6 md:px-12 pt-40 pb-16 max-w-screen-2xl mx-auto hairline-b">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="uppercase tracking-[0.3em] font-label text-[10px] font-bold text-outline mb-6 block">
              The Archive
            </span>
            <h1 className="text-6xl md:text-8xl font-headline text-on-surface mb-8 leading-[0.9] tracking-tighter">
              {categoryFilter ? categoryFilter : 'The Apparel'} <br/>
              <span className="italic font-normal text-secondary">Edit.</span>
            </h1>
            <p className="text-on-surface-variant font-body text-lg md:text-xl leading-relaxed font-light">
              {categoryFilter === 'Jewellery' 
                ? "Delicate motifs and organic shapes, handcrafted by artisans to complement your everyday wardrobe."
                : "Crafted from the finest organic cotton, our apparel collection honors the ancient tradition of handblock printing. Each piece is a conversation between the artisan's hand and the sun-bleached earth."
              }
            </p>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="sticky top-[52px] md:top-[56px] z-40 bg-surface/95 backdrop-blur-xl hairline-b py-5 px-6 md:px-12 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-12">
            <button className="flex items-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors group">
              <span className="material-symbols-outlined text-[18px] font-light group-hover:rotate-90 transition-transform">tune</span>
              <span>Filter</span>
            </button>
            <div className="hidden lg:flex items-center space-x-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Curated Tags:</span>
              <button className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface hover:text-primary transition-colors relative group">
                Organic Cotton
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all"></span>
              </button>
              <button className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface hover:text-primary transition-colors relative group">
                Linen Blend
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all"></span>
              </button>
              <button className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface hover:text-primary transition-colors relative group">
                Indigo Dye
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all"></span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-xs font-label text-outline uppercase tracking-[0.2em] hidden sm:inline-block font-semibold">{displayedProducts.length} Pieces</span>
            <div className="h-4 w-[1px] bg-outline-variant/30 hidden sm:block"></div>
            <select className="bg-transparent border-none text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface focus:ring-0 cursor-pointer outline-none hover:text-primary transition-colors appearance-none pr-4">
              <option>Sort: Curated</option>
              <option>Sort: Newest</option>
              <option>Price: Ascending</option>
              <option>Price: Descending</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-screen-2xl mx-auto">
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
            {regularProducts.map((product, index) => (
              <div key={product.id} className={`${index % 2 === 1 ? 'md:mt-16' : ''}`}>
                 <ProductCard product={product} />
              </div>
            ))}

            {/* Heritage Quote Interstitial */}
            {regularProducts.length >= 3 && (
              <div className="col-span-full py-32 md:py-48 flex flex-col items-center text-center max-w-3xl mx-auto px-4">
                <span className="material-symbols-outlined text-secondary mb-8 text-4xl font-light">eco</span>
                <h2 className="text-4xl md:text-6xl font-headline italic text-on-surface leading-[1.15] tracking-tight">
                  "The beauty of handblock printing lies in its gentle imperfections—proof of the human heart behind the craft."
                </h2>
                <div className="mt-12 w-px h-16 bg-outline-variant/30"></div>
                <p className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold text-outline">From our Curated Journal</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-40">
            <h3 className="font-headline text-4xl mb-6 text-on-surface">No pieces found in this archive.</h3>
            <p className="font-body text-xl text-on-surface-variant font-light">Please check back soon for our latest arrivals.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Collection;
