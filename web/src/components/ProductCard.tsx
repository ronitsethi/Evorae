import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { type Product } from '../lib/shopify';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  // Per-card loading state — not global, so other cards remain interactive
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;

    // Filter out Shopify's placeholder "Default Title" variant
    const selectableVariants = (product.variants || []).filter(v => v.title !== 'Default Title');
    const hasRealVariants = selectableVariants.length > 0;

    if (hasRealVariants) {
      // Product has multiple sizes — go to the product page so user can choose
      navigate(`/product/${product.id}`);
      return;
    }

    // Single no-variant product — add the first (default) variant directly
    const defaultVariant = product.variants?.[0];
    if (!defaultVariant) {
      navigate(`/product/${product.id}`);
      return;
    }

    setIsAdding(true);
    try {
      await addItem(defaultVariant.id, 1);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group block relative cursor-pointer interactive touch-native">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low mb-6 rounded-sm">
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full absolute top-0 left-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-0"
        />
        {/* Secondary Image for Hover */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternative view`}
            className="object-cover w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-[1.2s] ease-in-out group-hover:opacity-100"
          />
        )}

        {/* Quick Add button */}
        <div className="hidden md:flex absolute bottom-6 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 justify-center">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            aria-label={`Quick add ${product.name} to cart`}
            className="bg-background/95 backdrop-blur-sm text-on-surface text-[10px] uppercase tracking-[0.2em] font-bold py-3.5 px-8 flex items-center gap-2 shadow-xl border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50 disabled:cursor-wait"
          >
            {isAdding ? 'Adding…' : 'Quick Add'}
            <span className="material-symbols-outlined text-[14px]">{isAdding ? 'hourglass_empty' : 'add'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center px-2">
        <span className="text-[8px] md:text-[9px] font-label font-bold text-outline uppercase tracking-[0.25em] mb-2 md:mb-3">
          {product.category}
        </span>
        <h3 className="font-headline text-[1.1rem] md:text-2xl leading-snug mb-1 md:mb-2 text-on-surface group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-label text-xs md:text-sm text-on-surface-variant font-medium">
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        {/* Render sizes if variants exist */}
        {product.variants && product.variants.filter(v => v.title !== 'Default Title').length > 0 && (
          <div className="mt-2 text-[9px] md:text-xs font-label uppercase tracking-widest text-outline">
            {product.variants.filter(v => v.title !== 'Default Title').map(v => v.title).join(' • ')}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
