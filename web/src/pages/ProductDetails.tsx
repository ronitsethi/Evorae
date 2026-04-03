import { useParams, Link } from 'react-router-dom';
import { fetchProductById, type Product } from '../lib/shopify';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem, isLoading: isAdding } = useCart();

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        const data = await fetchProductById(id);
        setProduct(data);
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

  const sizes = product.category === 'Apparel' ? ['XS', 'S', 'M', 'L', 'XL'] : null;

  const handleAddToTote = async () => {
    if (!product?.variants?.length) return;

    let variantId = product.variants[0].id;

    if (sizes) {
      if (!selectedSize) {
        alert('Please select a size first.');
        return;
      }
      // Attempt to match size with Shopify variant title
      const matchedVariant = product.variants.find(v => v.title.toLowerCase() === selectedSize.toLowerCase());
      if (matchedVariant) {
        variantId = matchedVariant.id;
      } else {
        alert('This size is currently unavailable.');
        return;
      }
    }

    await addItem(variantId, 1);
  };

  return (
    <div className="min-h-screen pt-32 pb-32 max-w-screen-2xl mx-auto px-6 md:px-12 bg-surface">
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
            <h1 className="text-5xl md:text-6xl font-headline leading-[1.1] text-on-surface tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-body font-normal text-on-surface">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-xs text-outline font-label uppercase tracking-widest">Inc. of all taxes</span>
            </div>
          </header>

          <div className="space-y-12">
            <p className="text-lg font-body leading-[1.8] text-on-surface-variant font-light">
              {product.description}
            </p>

            <div className="h-[1px] w-full bg-outline-variant/30"></div>

            {/* Size Selection */}
            {sizes && (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface">
                  <span>Size</span>
                  <button className="text-outline hover:text-primary transition-colors underline decoration-1 underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => {
                    const isAvailable = product.variants?.find(v => v.title.toLowerCase() === size.toLowerCase())?.availableForSale;
                    return (
                      <button 
                        key={size}
                        onClick={() => isAvailable ? setSelectedSize(size) : null}
                        disabled={!isAvailable}
                        className={`h-12 w-12 flex items-center justify-center font-label text-xs uppercase tracking-widest transition-all ${
                          !isAvailable ? 'opacity-30 cursor-not-allowed border-dashed' :
                          selectedSize === size 
                            ? 'border border-primary text-primary bg-primary/5' 
                            : 'border border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary relative group'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
              <button 
                onClick={handleAddToTote}
                disabled={isAdding}
                className={`w-full py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3 ${
                  isAdding ? 'bg-surface-container-low text-on-surface-variant cursor-wait' : 'bg-on-surface text-surface hover:bg-primary'
                }`}
              >
                <span>{isAdding ? 'Adding...' : 'Add to Tote'}</span>
                <span className="material-symbols-outlined text-[16px] font-light">shopping_bag</span>
              </button>
            </div>

            <div className="flex flex-col gap-6 pt-8 text-[11px] uppercase tracking-[0.15em] text-outline font-semibold">
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

      {/* Storytelling Section */}
      <section className="mt-32 md:mt-48 pt-24 hairline-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8 md:pr-12">
            <h2 className="text-4xl md:text-5xl font-headline text-on-surface tracking-tight">The Artisan's Canvas</h2>
            <p className="text-on-surface-variant leading-[1.8] text-lg font-light">
              {product.category === 'Apparel' 
                ? "Our cotton is sourced from the rain-fed fields of Central India, spun by hand to preserve its natural strength and softness. The irregular weave is the signature of the handloom, a breathable skin that tells a story of comfort across generations."
                : "Handcrafted using traditional casting and filigree techniques. Each piece carries the distinct touch of the artisan, turning raw elements into elegant daily companions."
              }
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                   <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Material</span>
                   <span className="font-headline text-xl text-on-surface">{product.category === 'Apparel' ? 'Organic Cotton' : 'Sterling Silver'}</span>
                </div>
                <div>
                   <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Origin</span>
                   <span className="font-headline text-xl text-on-surface">{product.category === 'Apparel' ? 'Jaipur, India' : 'Rajasthan'}</span>
                </div>
            </div>
          </div>
          <div className="aspect-[4/3] md:aspect-square overflow-hidden bg-surface-container">
             <img 
               className="w-full h-full object-cover" 
               src={product.category === 'Apparel' ? "/images/491A9109.JPG" : "/images/491A9112.JPG"}
               alt="Material Context"
             />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
