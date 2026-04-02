import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const postcardTextRef = useRef<HTMLDivElement>(null);
  const [isPostcardVisible, setIsPostcardVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPostcardVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (postcardTextRef.current) {
      observer.observe(postcardTextRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page bg-surface pt-[100px] md:pt-[120px] overflow-hidden">
      
      {/* 1. HERO SECTION - STATIC CSS GRID (SandByShirin Inspired) */}
      <section 
        className="relative w-full max-w-[1600px] mx-auto px-4 md:px-8 mb-16 lg:mb-24"
        style={{ height: 'max(600px, calc(100vh - 140px))', maxHeight: '850px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[6px] md:gap-[12px] w-full h-full">
          
          {/* Left Anchor Large Image */}
          <div className="lg:col-span-5 relative w-full h-full bg-surface-container overflow-hidden rounded-sm">
            <img 
              src="/home-assets/10.jpg" 
              alt="Summer Breath Campaign Lifestyle" 
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Right Supporting Tile Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-[6px] md:gap-[12px] relative w-full h-full">
            <div className="relative w-full h-full bg-surface-container overflow-hidden rounded-sm">
              <img src="/home-assets/8.jpg" alt="Editorial Detail" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
            </div>
            <div className="relative w-full h-full bg-surface-container overflow-hidden rounded-sm">
              <img src="/home-assets/35.jpg" alt="Editorial Detail" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
            </div>
            <div className="relative w-full h-full bg-surface-container overflow-hidden rounded-sm">
              <img src="/home-assets/21.jpg" alt="Editorial Detail" className="absolute inset-0 w-full h-full object-cover object-top" loading="eager" />
            </div>
            <div className="relative w-full h-full bg-surface-container overflow-hidden rounded-sm">
              <img src="/home-assets/26.jpg" alt="Editorial Detail" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
            </div>
            <div className="relative w-full h-full bg-surface-container overflow-hidden rounded-sm">
              <img src="/home-assets/491A9001.JPG" alt="Editorial Detail" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
            </div>
            <div className="relative w-full h-full bg-surface-container overflow-hidden rounded-sm">
              <img src="/home-assets/37.jpg" alt="Editorial Detail" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" />
            </div>

            {/* Central Title Card (Strictly Bound / Overrides Grid) */}
            <div className="absolute top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:-translate-x-12 -translate-y-1/2 z-10 w-[85%] sm:w-[320px] bg-[#fbf9f6] p-8 md:p-10 text-center shadow-lg border border-outline-variant/20 flex flex-col items-center justify-center pointer-events-auto">
              <h1 className="font-headline text-5xl md:text-6xl text-on-surface leading-none tracking-tight mb-2">
                Summer Breath
              </h1>
              <p className="font-label text-[10px] md:text-xs uppercase tracking-[0.2em] text-on-surface-variant font-medium mb-6 md:mb-8">
                The New Collection
              </p>
              <Link to="/summer-breath" className="inline-block relative group text-on-surface hover:text-primary transition-colors duration-300">
                  <span className="font-label text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold border-b border-current pb-1">Enter New In</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. POSTCARD SECTION - EDITORIAL STORYTELLING */}
      <section className="w-full max-w-[1100px] mx-auto px-4 md:px-8 mt-16 md:mt-24 mb-16 md:mb-24 clear-both relative">
        <div className="relative w-full shadow-xl overflow-hidden py-12 px-6 md:py-16 md:px-12 lg:py-16 lg:px-20 flex flex-col items-center">
          
          {/* Postcard Background */}
          <div className="absolute inset-0 z-0 bg-[#f9f8f6]"> 
            <img src="/images/postcard-bg.jpg" alt="" className="w-full h-full object-cover opacity-90" aria-hidden="true" loading="lazy" />
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Photo (Torn Paper Cutout) */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[80%] max-w-[280px] lg:max-w-[320px] aspect-[4/5] filter drop-shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="/images/postcard-photo.jpg" 
                  alt="Postcard Editorial" 
                  className="w-full h-full object-cover" 
                  style={{
                    clipPath: 'polygon(1% 1%, 25% 0%, 48% 2%, 75% 0%, 99% 1%, 100% 25%, 98% 48%, 99% 75%, 98% 99%, 76% 100%, 51% 98%, 24% 100%, 1% 98%, 0% 74%, 2% 51%, 0% 26%)'
                  }}
                  loading="lazy" 
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div 
              ref={postcardTextRef}
              className={`flex flex-col items-start text-left lg:pl-2 transition-opacity duration-1000 ease-in-out ${isPostcardVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <h2 className="font-headline text-3xl md:text-4xl lg:text-[40px] text-[#2c2b29] tracking-[0.15em] mb-6 md:mb-8 uppercase drop-shadow-sm font-semibold border-b border-[#2c2b29]/20 pb-3 inline-block">
                Postcard
              </h2>
              
              <h3 className="font-headline text-xl md:text-2xl lg:text-3xl text-[#2c2b29] leading-[1.3] mb-4 font-normal italic drop-shadow-sm max-w-[90%]">
                An ode to ease, lightness, and everyday elegance.
              </h3>
              
              <p className="font-label text-[13px] lg:text-[14px] text-[#2c2b29]/80 font-light leading-[1.8] mb-8 max-w-[420px] drop-shadow-sm">
                Summer Breath is crafted in breathable cotton and brought to life through intricate handblock printing. Designed for effortless movement, from workdays to slow outings, the collection is perfectly complemented by handcrafted jewellery made with the finest materials.
              </p>
              
              <div className="flex items-center gap-5">
                <Link to="/summer-breath" className="group flex items-center gap-3 text-[#2c2b29] font-label text-[10px] lg:text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 font-semibold border-b border-[#2c2b29] pb-1 hover:opacity-70">
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-[14px] font-light transition-transform duration-300 group-hover:translate-x-1">arrow_right_alt</span>
                </Link>
                
                <div className="border-l border-[#2c2b29]/30 pl-5 py-1 ml-1">
                  <p className="font-headline text-[12px] lg:text-[14px] tracking-[0.05em] text-[#2c2b29]/70 italic">
                    — About Summer Breath
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE EDITS - DUAL CATEGORY CARDS */}
      <section className="w-full max-w-[1050px] mx-auto px-4 md:px-12 mb-16 md:mb-24 clear-both">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <Link to="/collection" className="group block relative overflow-hidden bg-surface-container aspect-[3/4] rounded-sm shadow-md">
             <img 
               src="/images/apparel-edit.jpg" 
               alt="The Apparel Edit" 
               className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90" 
               loading="lazy" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6 md:p-10">
               <h3 className="font-headline text-2xl md:text-3xl lg:text-[34px] text-white tracking-wide mb-2 drop-shadow-md">The Apparel Edit</h3>
               <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors flex items-center gap-2 drop-shadow-md">
                 Discover <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
               </span>
             </div>
          </Link>

          <Link to="/collection?category=Jewellery" className="group block relative overflow-hidden bg-surface-container aspect-[3/4] md:mt-24 rounded-sm shadow-md">
             <img 
               src="/images/jewel-store.jpg" 
               alt="The Jewel Store" 
               className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90" 
               loading="lazy" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6 md:p-10">
               <h3 className="font-headline text-2xl md:text-3xl lg:text-[34px] text-white tracking-wide mb-2 drop-shadow-md">The Jewel Store</h3>
               <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors flex items-center gap-2 drop-shadow-md">
                 Discover <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
               </span>
             </div>
          </Link>

        </div>
      </section>

      {/* 4. ABOUT EVORAE / BRAND INTRO BLOCK */}
      <section className="relative w-full py-12 md:py-16 mb-20 border-y border-outline-variant/20 clear-both overflow-hidden">
        
        {/* Full-Section Background with Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img src="/images/heritage-bg.jpg" alt="Heritage Background" className="w-full h-full object-cover opacity-90" loading="lazy" aria-hidden="true" />
          <div className="absolute inset-0 bg-[#f9f8f6]/65 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
           
           {/* Left Scaled-Down Image */}
           <div className="flex justify-center md:justify-end order-2 lg:order-1 pr-0 lg:pr-6">
              <div className="w-[85%] sm:w-[70%] lg:w-[100%] max-w-[340px] md:max-w-[360px] lg:max-w-[400px] aspect-[4/5] bg-surface-container overflow-hidden rounded-sm shadow-md">
                <img 
                  src="/images/heritage4.jpg" 
                  alt="Evorae Brand Story Flatlay" 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                />
              </div>
           </div>

           {/* Right Text Node */}
           <div className="flex flex-col justify-center order-1 lg:order-2 px-4 md:px-0 lg:pl-6">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] font-semibold text-outline mb-5">Heritage & Conscious</span>
              <p className="font-headline text-2xl md:text-3xl text-on-surface leading-[1.4] lg:leading-[1.6] mb-6 max-w-xl">
                Evorae is a sustainable lifestyle brand celebrating the heritage and culture of India through rich handlooms and age-old craftsmanship. 
              </p>
              <p className="font-label text-sm lg:text-[15px] font-light text-on-surface-variant leading-[1.8] mb-10 max-w-[480px]">
                Each conscious creation blends traditional artistry with a modern aesthetic that feels effortless, elegant, and gracefully rooted in purpose.
              </p>
              <Link to="/about" className="self-start text-on-surface hover:text-primary border border-on-surface hover:border-primary px-8 lg:px-10 py-3 lg:py-4 font-label text-[10px] lg:text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 font-semibold bg-surface/40 backdrop-blur-sm">
                 Our Story
              </Link>
           </div>

        </div>
      </section>

      {/* 5. MAIN BRAND TEXT AREA / MANIFESTO */}
      <section className="w-full max-w-3xl mx-auto px-6 pb-20 md:pb-24 text-center flex flex-col items-center clear-both">
        <div className="w-8 h-8 mb-8 text-outline">
          <div className="w-full h-full rotate-45 border border-current opacity-30"></div>
        </div>
        <p className="font-headline text-lg md:text-[22px] text-on-surface leading-[1.8] font-normal mb-8">
          The name Evorae, meaning <span className="italic">‘Evolving Radiance,’</span> captures the soul of our brand. It represents the journey of every woman — constantly becoming, growing, and glowing in her own light. Every piece we create is an ode to that transformation.
        </p>
        <p className="font-label text-[14px] lg:text-[15px] text-on-surface-variant leading-[1.8] font-light mb-8 max-w-2xl">
          More than just a fashion label, Evorae curates a complete experience. From handcrafted apparel to artisanal jewellery, each product carries the touch of skilled Indian artisans. Regional weaves, natural dyes, and contemporary design come together in a harmony that honours the past while embracing the present.
        </p>
        <p className="font-label text-[14px] lg:text-[15px] text-on-surface-variant leading-[1.8] font-light max-w-2xl">
          At its core, Evorae stands apart for its balance between sustainability and style — where fashion becomes mindful expression rather than mere consumption. Here, every thread tells a story.
        </p>
      </section>

    </div>
  );
};

export default Home;
