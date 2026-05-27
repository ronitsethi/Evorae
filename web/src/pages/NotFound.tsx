import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-6 pt-24">
      <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold text-outline mb-6 block">404</span>
      <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-surface leading-[0.9] tracking-tighter mb-8">
        Page Not <br />
        <span className="italic font-normal text-secondary">Found.</span>
      </h1>
      <p className="font-body text-lg text-on-surface-variant font-light mb-12 max-w-md leading-relaxed">
        The page you're looking for has moved or doesn't exist. Let us guide you back to the archive.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="interactive touch-native bg-on-surface text-surface px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
        >
          Return Home
        </Link>
        <Link
          to="/collection"
          className="interactive touch-native border border-outline-variant text-on-surface px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
