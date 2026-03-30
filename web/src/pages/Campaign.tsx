import { Link } from 'react-router-dom';

const Campaign = () => {
  return (
    <div className="campaign-page min-h-screen bg-surface text-on-surface font-body selection:bg-primary/20">
      
      {/* Hero Section: Editorial Impact */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden py-32 md:py-0 hairline-b">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-screen-2xl mx-auto gap-16 items-center">
          <div className="md:col-span-5 z-10 pr-0 md:pr-12">
            <span className="text-outline font-bold tracking-[0.3em] uppercase text-[10px] mb-8 block">Volume I</span>
            <h1 className="font-headline text-7xl md:text-8xl lg:text-9xl text-on-surface leading-[0.85] tracking-tighter mb-10">
              Summer <br/><span className="italic text-secondary">Breath,</span>
            </h1>
            <p className="font-body text-lg md:text-xl font-light text-on-surface-variant mb-12 leading-[1.8]">
              An ode to the stillness of mid-afternoon. Where handblock printed cotton meets the cool touch of artisanal silver.
            </p>
            <Link to="/collection" className="group flex flex-col w-max">
                <span className="font-label text-xs uppercase tracking-[0.2em] font-semibold mb-2">Explore Volume</span>
                <span className="h-[1px] w-full bg-outline-variant transition-colors group-hover:bg-primary"></span>
            </Link>
          </div>
          
          <div className="md:col-span-7 relative">
            <div className="aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-surface-container-low">
              <img 
                className="w-full h-full object-cover" 
                src="/images/491A9146.JPG" 
                alt="Summer Breath Campaign Hero" 
              />
            </div>
            
            <div className="absolute -bottom-16 -left-8 md:-left-16 w-48 md:w-64 aspect-[3/4] bg-surface p-2 shadow-2xl hidden sm:block">
              <img 
                className="w-full h-full object-cover" 
                src="/images/491A9156.JPG" 
                alt="Silver Motif Detail" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Quote Section */}
      <section className="py-32 md:py-48 bg-surface px-6 md:px-12 hairline-b">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-6xl text-on-surface italic leading-[1.15] tracking-tight">
            "We sought to capture the feeling of a breeze through a window—the way it lifts the fabric and cools the skin."
          </h2>
          <div className="mt-12 flex justify-center space-x-6 items-center">
            <div className="h-[1px] w-12 bg-outline-variant/30"></div>
            <span className="font-label text-xs uppercase tracking-[0.3em] font-bold text-outline">The Curator</span>
            <div className="h-[1px] w-12 bg-outline-variant/30"></div>
          </div>
        </div>
      </section>

      {/* Full Width Atmosphere Image */}
      <section className="h-[60vh] md:h-screen w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src="/images/491A9109.JPG" 
          alt="Atmosphere Landscape" 
        />
      </section>

      {/* Final Editorial CTA */}
      <section className="py-40 flex flex-col items-center text-center px-6 bg-surface-container-low hairline-t">
        <h2 className="font-headline text-5xl md:text-7xl mb-12 italic text-on-surface leading-[1.1] tracking-tight">
          A tactile memory.
        </h2>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/collection" className="bg-on-surface text-surface px-10 py-5 font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-primary hover:text-on-primary transition-colors text-center">
            Apparel
          </Link>
          <Link to="/collection?category=Jewellery" className="border border-outline-variant text-on-surface px-10 py-5 font-bold tracking-[0.2em] text-[10px] uppercase hover:border-primary hover:text-primary transition-colors text-center">
            Jewellery
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Campaign;
