import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCollectionByHandle, type Product } from '../lib/shopify';
import ProductCard from '../components/ProductCard';

type SortKey = 'curated' | 'newest' | 'price-asc' | 'price-desc';

const TAGS = ['Organic Cotton', 'Linen Blend', 'Indigo Dye', 'Handblock Print', 'Artisan Made'];

const Collection = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryFilter = queryParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & sort state
  const [sortKey, setSortKey] = useState<SortKey>('curated');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  useEffect(() => {
    // Reset filters when the category changes
    setActiveTags(new Set());
    setSortKey('curated');
    setPriceMin('');
    setPriceMax('');
  }, [categoryFilter]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const handle = categoryFilter === 'Jewellery' ? 'the-jewellery-edit' : 'the-apparel-edit';
        const data = await fetchCollectionByHandle(handle);
        setProducts(data);
      } catch (e) {
        console.error('Failed to load products', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [categoryFilter]);

  // Lock body scroll when filter panel is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isFilterOpen]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveTags(new Set());
    setPriceMin('');
    setPriceMax('');
    setSortKey('curated');
  }, []);

  const activeFilterCount = activeTags.size + (priceMin ? 1 : 0) + (priceMax ? 1 : 0);

  // Apply filtering and sorting to the products list
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // Tag filter: client-side — match tag against product name/description
    // (Shopify tags aren't in our current Product type, so we match against name/description text)
    if (activeTags.size > 0) {
      result = result.filter(p => {
        const text = `${p.name} ${p.description}`.toLowerCase();
        return [...activeTags].some(tag => text.includes(tag.toLowerCase()));
      });
    }

    // Price range filter
    const minVal = parseFloat(priceMin);
    const maxVal = parseFloat(priceMax);
    if (!isNaN(minVal)) result = result.filter(p => p.price >= minVal);
    if (!isNaN(maxVal)) result = result.filter(p => p.price <= maxVal);

    // Sorting
    switch (sortKey) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // No createdAt in our schema — reverse the original Shopify order as a proxy
        result.reverse();
        break;
      case 'curated':
      default:
        // Keep Shopify's original order
        break;
    }

    return result;
  }, [products, activeTags, priceMin, priceMax, sortKey]);

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
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-headline text-on-surface mb-8 leading-[0.9] tracking-tighter">
            {categoryFilter ? categoryFilter : 'The Apparel'} <br/>
            <span className="italic font-normal text-secondary">Edit.</span>
          </h1>
          <p className="text-on-surface-variant font-body text-base md:text-lg lg:text-xl leading-relaxed font-light">
            {categoryFilter === 'Jewellery'
              ? 'Delicate motifs and organic shapes, handcrafted by artisans to complement your everyday wardrobe.'
              : 'Crafted from the finest organic cotton, our apparel collection honors the ancient tradition of handblock printing. Each piece is a conversation between the artisan\'s hand and the sun-bleached earth.'
            }
          </p>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="sticky top-[52px] md:top-[56px] z-40 bg-surface/95 backdrop-blur-xl hairline-b py-5 px-6 md:px-12 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-6 md:space-x-12">
            {/* Filter button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined text-[18px] font-light group-hover:rotate-90 transition-transform">tune</span>
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Curated Tag chips (desktop) */}
            <div className="hidden lg:flex items-center space-x-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Tags:</span>
              {TAGS.slice(0, 3).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors relative group ${
                    activeTags.has(tag) ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {tag}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all ${
                    activeTags.has(tag) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-xs font-label text-outline uppercase tracking-[0.2em] hidden sm:inline-block font-semibold">
              {displayedProducts.length} {displayedProducts.length === 1 ? 'Piece' : 'Pieces'}
              {activeFilterCount > 0 && products.length !== displayedProducts.length && (
                <span className="ml-1 text-outline/60">of {products.length}</span>
              )}
            </span>
            <div className="h-4 w-[1px] bg-outline-variant/30 hidden sm:block" />
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SortKey)}
              className="bg-transparent border-none text-[11px] font-semibold uppercase tracking-[0.2em] text-on-surface focus:ring-0 cursor-pointer outline-none hover:text-primary transition-colors appearance-none pr-4"
            >
              <option value="curated">Sort: Curated</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Ascending</option>
              <option value="price-desc">Price: Descending</option>
            </select>
          </div>
        </div>
      </section>

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="px-6 md:px-12 pt-4 pb-0 max-w-screen-2xl mx-auto flex flex-wrap gap-2 items-center">
          {[...activeTags].map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {tag}
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          ))}
          <button
            onClick={clearFilters}
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-outline hover:text-primary transition-colors underline underline-offset-2 ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-screen-2xl mx-auto">
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-12 md:gap-x-10 md:gap-y-20">
            {displayedProducts.map((product, index) => (
              <div key={product.id} className={`${index % 2 === 1 ? 'mt-8 md:mt-16' : ''}`}>
                <ProductCard product={product} />
              </div>
            ))}

            {/* Heritage Quote Interstitial */}
            {displayedProducts.length >= 3 && (
              <div className="col-span-full py-32 md:py-48 flex flex-col items-center text-center max-w-3xl mx-auto px-4">
                <span className="material-symbols-outlined text-secondary mb-8 text-4xl font-light">eco</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline italic text-on-surface leading-[1.15] tracking-tight">
                  "The beauty of handblock printing lies in its gentle imperfections—proof of the human heart behind the craft."
                </h2>
                <div className="mt-12 w-px h-16 bg-outline-variant/30" />
                <p className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold text-outline">From our Curated Journal</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-40">
            <span className="material-symbols-outlined text-outline text-5xl font-light mb-6 block">filter_list_off</span>
            <h3 className="font-headline text-4xl mb-6 text-on-surface">No pieces match your filters.</h3>
            <p className="font-body text-xl text-on-surface-variant font-light mb-10">
              Try adjusting or clearing your active filters.
            </p>
            <button
              onClick={clearFilters}
              className="interactive touch-native border border-on-surface text-on-surface px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-on-surface hover:text-surface transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Filter Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-on-surface/30 backdrop-blur-sm"
          onClick={() => setIsFilterOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[420px] bg-surface shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-6 hairline-b">
            <div>
              <h2 className="font-headline text-2xl text-on-surface tracking-tight">Refine</h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] uppercase tracking-[0.15em] font-semibold text-primary mt-1 hover:opacity-70 transition-opacity"
                >
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="interactive touch-native min-w-[44px] min-h-[44px] flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Close filter panel"
            >
              <span className="material-symbols-outlined text-[24px] font-light">close</span>
            </button>
          </div>

          {/* Drawer content — scrollable */}
          <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">

            {/* Sort section */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-outline mb-5">Sort By</h3>
              <div className="space-y-3">
                {[
                  { key: 'curated', label: 'Curated' },
                  { key: 'newest', label: 'Newest' },
                  { key: 'price-asc', label: 'Price: Low to High' },
                  { key: 'price-desc', label: 'Price: High to Low' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setSortKey(opt.key as SortKey)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] border transition-colors ${
                      sortKey === opt.key
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
                    }`}
                  >
                    {opt.label}
                    {sortKey === opt.key && (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-outline mb-5">Price Range</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-outline font-bold block mb-1.5">Min (₹)</label>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={e => setPriceMin(e.target.value)}
                    placeholder="0"
                    className="w-full bg-surface border border-outline-variant/30 text-on-surface text-sm px-3 py-2.5 outline-none focus:border-primary transition-colors font-label"
                  />
                </div>
                <span className="text-outline-variant mt-5">—</span>
                <div className="flex-1">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-outline font-bold block mb-1.5">Max (₹)</label>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={e => setPriceMax(e.target.value)}
                    placeholder="Any"
                    className="w-full bg-surface border border-outline-variant/30 text-on-surface text-sm px-3 py-2.5 outline-none focus:border-primary transition-colors font-label"
                  />
                </div>
              </div>
            </div>

            {/* Tag filter */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-outline mb-5">Material & Craft</h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] border transition-colors ${
                      activeTags.has(tag)
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer footer */}
          <div className="px-8 py-6 hairline-t">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-on-surface text-surface min-h-[52px] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              View {displayedProducts.length} {displayedProducts.length === 1 ? 'Piece' : 'Pieces'}
              <span className="material-symbols-outlined text-[16px] font-light">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
