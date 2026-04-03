import { Link } from 'react-router-dom';
import { type Product } from '../lib/shopify';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group block relative cursor-pointer">
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
        
        {/* Quick Add overlay */}
        <div className="absolute bottom-6 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 flex justify-center">
          <span className="bg-background/95 backdrop-blur-sm text-on-surface text-[10px] uppercase tracking-[0.2em] font-bold py-3.5 px-8 flex items-center gap-2 shadow-xl border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-colors">
            Quick Add
            <span className="material-symbols-outlined text-[14px]">add</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center px-2">
        <span className="text-[9px] font-label font-bold text-outline uppercase tracking-[0.25em] mb-3">
          {product.category}
        </span>
        <h3 className="font-headline text-2xl mb-2 text-on-surface group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-label text-sm text-on-surface-variant font-medium">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
