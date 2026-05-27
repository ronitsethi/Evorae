import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { searchProducts, type Product } from '../lib/shopify';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    const data = await searchProducts(q);
    setResults(data);
    setLoading(false);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    doSearch(query);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface/95 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative h-full flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center px-6 md:px-12 pt-[calc(var(--safe-top,0px)+1.25rem)] pb-6 border-b border-outline-variant/20 max-w-screen-2xl mx-auto w-full">
          <span className="material-symbols-outlined text-on-surface-variant text-[22px] font-light mr-4 shrink-0">
            search
          </span>
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Search pieces, stories, materials…"
              className="w-full bg-transparent text-on-surface text-xl md:text-2xl lg:text-3xl font-headline tracking-tight placeholder:text-on-surface-variant/40 outline-none border-none"
            />
          </form>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 interactive touch-native min-w-[44px] min-h-[44px] flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close search"
          >
            <span className="material-symbols-outlined text-[24px] font-light">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-[calc(var(--safe-bottom,0px)+2rem)] max-w-screen-2xl mx-auto w-full">
          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <span className="font-label text-outline uppercase tracking-[0.2em] text-xs animate-pulse">
                Searching archive…
              </span>
            </div>
          )}

          {/* No results */}
          {!loading && hasSearched && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="material-symbols-outlined text-outline text-5xl font-light mb-6">
                search_off
              </span>
              <p className="font-headline text-2xl text-on-surface mb-3">
                Nothing found for "{query}"
              </p>
              <p className="font-body text-on-surface-variant font-light text-sm">
                Try a different material, style, or collection name.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !hasSearched && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="uppercase tracking-[0.3em] font-label text-[10px] font-bold text-outline mb-4">
                The Archive
              </p>
              <p className="font-headline text-3xl md:text-4xl text-on-surface/50 italic">
                Discover something beautiful.
              </p>
            </div>
          )}

          {/* Results grid */}
          {!loading && results.length > 0 && (
            <>
              <p className="uppercase tracking-[0.25em] font-label text-[10px] font-bold text-outline py-6">
                {results.length} {results.length === 1 ? 'Piece' : 'Pieces'} Found
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="group flex flex-col"
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] bg-surface-variant overflow-hidden mb-3 relative">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-outline text-4xl font-light">
                            image
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-outline mb-1">
                      {product.category}
                    </span>
                    <span className="font-headline text-base text-on-surface leading-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </span>
                    <span className="font-label text-sm text-on-surface-variant mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
