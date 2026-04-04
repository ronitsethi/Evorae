import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, itemCount, updateItem, removeItem, isLoading } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-surface/80 backdrop-blur-sm z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[440px] bg-surface shadow-2xl z-[70] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="px-6 md:px-8 py-5 md:py-6 flex items-center justify-between border-b border-outline-variant/30">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface">
            Your Tote ({itemCount})
          </h2>
          <button 
            onClick={closeCart}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-2 -mr-2"
          >
            <span className="material-symbols-outlined font-light text-[22px]">close</span>
          </button>
        </header>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-5 md:py-6 space-y-6 md:space-y-8">
          {!cart || cart.lines.edges.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <span className="material-symbols-outlined text-4xl font-light">shopping_bag</span>
              <p className="text-sm font-label uppercase tracking-widest text-outline">Your tote is empty</p>
            </div>
          ) : (
            cart.lines.edges.map(({ node: line }) => (
              <div key={line.id} className="flex gap-6 group">
                <div className="w-24 aspect-[3/4] bg-surface-container-low flex-shrink-0 overflow-hidden relative">
                  <img 
                    src={line.merchandise.image.url} 
                    alt={line.merchandise.product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 py-1">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className="font-headline text-lg text-on-surface leading-tight">
                      {line.merchandise.product.title}
                    </h3>
                    <button 
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      className="text-outline hover:text-error transition-colors mt-1 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                  
                  {line.merchandise.title !== 'Default Title' && (
                    <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-4">
                      Size: {line.merchandise.title}
                    </p>
                  )}
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center border border-outline-variant/40">
                      <button 
                        onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                        disabled={isLoading || line.quantity <= 1}
                        className="px-3 py-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50"
                      >-</button>
                      <span className="text-xs font-label px-2 min-w-[2rem] text-center">{line.quantity}</span>
                      <button 
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="px-3 py-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-50"
                      >+</button>
                    </div>
                    <span className="font-body text-sm">
                      ₹{parseFloat(line.merchandise.price.amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.edges.length > 0 && (
          <div className="p-6 md:p-8 border-t border-outline-variant/30 bg-surface">
            <div className="flex justify-between items-end mb-5 md:mb-6 text-on-surface">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Subtotal</span>
              <span className="font-headline text-2xl">
                ₹{parseFloat(cart.cost.subtotalAmount.amount).toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs font-label text-on-surface-variant tracking-wide mb-5 md:mb-6">
              Shipping & taxes calculated at checkout.
            </p>
            <a 
              href={cart.checkoutUrl}
              className="w-full flex items-center justify-center gap-3 py-5 bg-on-surface text-surface text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors cursor-pointer"
            >
              Proceed to Checkout
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
