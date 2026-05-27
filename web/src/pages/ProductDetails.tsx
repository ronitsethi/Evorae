import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts, type Product } from '../lib/shopify';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const { addItem, isLoading: isAdding } = useCart();

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        const data = await fetchProductById(id);
        setProduct(data);

        // Fetch related products
        const allProducts = await fetchProducts();
        const related = allProducts.filter((p: Product) => p.id !== id && p.category === (data?.category || 'Apparel')).slice(0, 4);
        if (related.length < 4) {
          const others = allProducts.filter((p: Product) => p.id !== id && !related.some((r: Product) => r.id === p.id)).slice(0, 4 - related.length);
          related.push(...others);
        }
        setRelatedProducts(related);
      } catch (e) {
        console.error("Failed to load product", e);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-40 text-center min-h-screen bg-surface flex items-center justify-center">
        <span className="font-label text-outline uppercase tracking-[0.2em] animate-pulse">Loading Piece...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-40 text-center min-h-screen bg-surface">
        <h1 className="text-5xl font-headline text-on-surface mb-8">Piece Not Found</h1>
        <Link to="/collection" className="text-primary hover:underline uppercase tracking-[0.2em] text-xs font-bold">
          Return to Archive
        </Link>
      </div>
    );
  }

  // Filter out the "Default Title" placeholder Shopify adds for products with no real variants
  const selectableVariants = (product.variants || []).filter(v => v.title !== 'Default Title');
  const hasVariants = selectableVariants.length > 0;

  const handleAddToCart = async () => {
    if (!product?.variants?.length) return;

    let variantId: string;

    if (hasVariants) {
      if (!selectedVariantId) {
        setSizeError(true);
        // Scroll the size selector into view
        document.getElementById('size-selector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      variantId = selectedVariantId;
    } else {
      // Single default variant — add directly
      variantId = product.variants[0].id;
    }

    setSizeError(false);
    await addItem(variantId, 1);
  };

  return (
    <div className="min-h-screen pt-28 lg:pt-32 pb-24 md:pb-32 max-w-screen-2xl mx-auto px-6 md:px-12 bg-surface">
      {/* Product Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Gallery */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
           {product.images.map((img, idx) => (
              <div key={idx} className={`${idx === 0 ? 'col-span-2' : 'col-span-1'} overflow-hidden relative group bg-surface-container-low`}>
                <img 
                  className={`w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03] ${idx === 0 ? 'aspect-[3/4]' : 'aspect-square'}`} 
                  src={img} 
                  alt={`${product.name} detail ${idx + 1}`} 
                />
              </div>
           ))}
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col pt-8 lg:pt-0">
          <header className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-outline">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline leading-[1.1] text-on-surface tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-body font-normal text-on-surface">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
          </header>

          <div className="space-y-12">
            {/* Size / Variant Selection */}
            {hasVariants && (
              <div className="space-y-6" id="size-selector">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface">
                  <span>Size</span>
                  <button className="interactive touch-native text-outline hover:text-primary transition-colors underline decoration-1 underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectableVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => { variant.availableForSale && setSelectedVariantId(variant.id); setSizeError(false); }}
                      disabled={!variant.availableForSale}
                      className={`interactive touch-native h-[48px] px-5 min-w-[48px] flex items-center justify-center font-label text-xs uppercase tracking-widest transition-all ${
                        !variant.availableForSale
                          ? 'opacity-30 cursor-not-allowed border border-dashed border-outline-variant/40'
                          : selectedVariantId === variant.id
                            ? 'border border-primary text-primary bg-primary/5'
                            : sizeError
                              ? 'border border-error text-on-surface-variant hover:border-primary hover:text-primary'
                              : 'border border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary'
                      }`}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-[11px] text-error font-label uppercase tracking-[0.1em]">
                    Please select a size to continue.
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`interactive touch-native w-full min-h-[56px] py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3 ${
                  isAdding ? 'bg-surface-container-low text-on-surface-variant cursor-wait' : 'bg-on-surface text-surface hover:bg-primary'
                }`}
              >
                <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
                <span className="material-symbols-outlined text-[16px] font-light">shopping_bag</span>
              </button>
            </div>

            <div className="h-[1px] w-full bg-outline-variant/30"></div>

            {/* Product Description */}
            <div 
              className="text-lg font-body leading-[1.8] text-on-surface-variant font-light product-description"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
            />

            <div className="flex flex-col gap-6 pt-4 text-[11px] uppercase tracking-[0.15em] text-outline font-semibold">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[20px] font-light">eco</span>
                Ethically Sourced & Handcrafted
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[20px] font-light">local_shipping</span>
                Complimentary Worldwide Shipping
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 md:mt-48 pt-24 hairline-t">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline text-on-surface tracking-tight mb-4 text-center">You May Also Like</h2>
            <div className="w-12 h-[1px] bg-primary"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
