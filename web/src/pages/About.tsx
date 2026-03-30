import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page bg-surface text-on-surface font-body antialiased min-h-screen">
      
      {/* Hero Section: The Narrative Anchor */}
      <section className="relative min-h-[90vh] md:min-h-[921px] flex items-center overflow-hidden px-6 md:px-12 max-w-screen-2xl mx-auto pt-32 md:pt-0 hairline-b">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 z-10 space-y-8 md:space-y-12">
            <span className="text-secondary font-label uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-bold block">Est. 2024</span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-headline leading-[0.9] text-on-surface tracking-tighter">
              The Art of <br/><i className="font-normal italic text-secondary">Presence</i>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-sm leading-relaxed font-light">
              Evorae is a philosophy of living beautifully. We curate pieces that bridge ancient heritage with the modern silhouette.
            </p>
          </div>
          <div className="md:col-span-7 relative h-[60vh] md:h-[819px] mt-12 md:mt-0 p-4 md:p-8 bg-surface-container-low shadow-2xl">
            <img 
              className="absolute inset-0 w-full h-full object-cover" 
              src="/images/491A9179.JPG" 
              alt="Evorae Aesthetic" 
            />
          </div>
        </div>
      </section>

      {/* The Origin Story: Mother & Daughter */}
      <section className="py-32 md:py-48 px-6 md:px-12 max-w-screen-2xl mx-auto hairline-b">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1 relative p-2 md:p-6 border border-outline-variant/30">
            <img 
              className="w-full h-[500px] md:h-[700px] object-cover" 
              src="/images/491A9154.JPG" 
              alt="The Origin Story" 
            />
          </div>
          <div className="order-1 md:order-2 space-y-8 md:space-y-12 pl-0 md:pl-12">
            <h3 className="text-secondary font-label uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">The Dialogue</h3>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-headline text-on-surface leading-[1.05] tracking-tight">Across <br/>Generations.</h2>
            <div className="w-12 h-px bg-outline-variant/50"></div>
            <p className="text-on-surface-variant leading-[1.8] text-lg font-light">
              Evorae was born in a sun-drenched atelier in Jaipur, sparked by a conversation between a mother, a lifelong textile historian, and her daughter, a modern designer. 
            </p>
            <p className="text-on-surface-variant leading-[1.8] text-lg font-light">
              They sought to reconcile the timeless techniques of their ancestors with the fast-paced, global lifestyle of the contemporary woman. Every stitch in our collection is a tribute to this lineage.
            </p>
          </div>
        </div>
      </section>

      {/* Final Editorial CTA */}
      <section className="py-40 flex flex-col items-center justify-center bg-surface-container-low text-center px-6">
        <h2 className="font-headline text-5xl md:text-7xl mb-12 italic text-on-surface leading-[1.1] tracking-tight">
          A Curated Legacy.
        </h2>
        <Link to="/collection" className="bg-on-surface text-surface px-10 py-5 font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-primary hover:text-on-primary transition-colors shadow-xl">
          Enter The Archive
        </Link>
      </section>

    </div>
  );
};

export default About;
