
const About = () => {
  return (
    <div className="about-page bg-surface pt-[100px] md:pt-[120px] overflow-hidden">
      
      {/* 1. HERO SECTION (Full Bleed Background) */}
      <section className="relative w-full h-[60vh] min-h-[450px] max-h-[650px] flex flex-col items-center justify-end pb-16 md:pb-24 overflow-hidden border-b border-outline-variant/20">
        
        {/* Full Bleed Hero Image */}
        <div className="absolute inset-0 z-0 bg-[#2c2b29] pointer-events-none select-none">
          <img 
            src="/images/story-hero.jpg" 
            alt="Evorae Craft Heritage" 
            className="w-full h-full object-cover object-[center_40%]"
            loading="eager"
          />
          {/* Refined gradient: bottom-focused warm earth overlay protecting text while keeping core photo untouched */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#201814]/80 via-[#201814]/30 to-transparent"></div>
        </div>

        {/* Editorial Text Overlay */}
        <div className="relative z-10 w-full max-w-[1240px] px-6 md:px-12 flex justify-center text-center">
          <h1 className="font-headline text-[28px] md:text-4xl lg:text-[44px] text-[#f7f4ed] tracking-[0.06em] leading-[1.3] font-normal italic max-w-3xl drop-shadow-2xl mx-auto">
            Styles that evolve & radiate your inner beauty
          </h1>
        </div>
      </section>

      {/* 1.5 Heritage / modern elegance block */}
      <section className="relative w-full bg-[#f3eae0] py-12 lg:py-16 mb-10 lg:mb-12 mt-6 lg:mt-8 overflow-hidden">
        
        {/* Absolute Centered Motif & Divider bounded by section */}
        <div className="hidden lg:flex absolute left-1/2 top-[5%] bottom-[5%] w-[3px] border-l-[3px] border-dotted border-[#7a4231]/40 z-0 -translate-x-1/2 flex-col items-center justify-center">
            <div className="bg-[#f3eae0] py-6 z-10 flex items-center justify-center w-[120px] -ml-[1.5px]">
                <img src="/images/hnbg.png" alt="Evorae Motif" className="w-[70px] h-auto object-contain opacity-90" />
            </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-20 lg:px-[120px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10">
          
          {/* Left Column (50%) */}
          <div className="flex flex-col justify-center text-left min-h-[100%] lg:pr-6">
            <h2 className="font-headline text-3xl md:text-5xl lg:text-[54px] text-[#7a4231] leading-[1.15] tracking-tight max-w-[420px] mr-auto">
              How does heritage evolve into modern elegance?
            </h2>
          </div>

          {/* Right Column (50%) */}
          <div className="flex flex-col justify-center text-left min-h-[100%] lg:pl-6">
            <div className="space-y-6 lg:space-y-8 font-label text-[15px] md:text-base lg:text-[17px] text-[#7a4231] leading-[1.85] font-light max-w-[540px] mt-4 lg:mt-2">
              <p>
                Heritage evolves when tradition is reimagined with intention.
              </p>
              <p>
                At Evorae, we draw from India’s rich craft traditions, natural motifs, and artisanal techniques, and interpret them through refined silhouettes and versatile designs suited for modern life. The result is a balance between past and present — garments and jewellery that carry the depth of craftsmanship while feeling effortless, relevant, and quietly elegant.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 1.75 Brand Collage Section (Editorial Mosaic) */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 mb-10 lg:mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[4px] md:gap-[6px] auto-rows-[100px] md:auto-rows-[140px] lg:auto-rows-[160px] w-full">
          
          {/* T1: Anchor - Massive Hero (Desktop: Col 1-2 Row 1-3. Mobile: Col 1-2 Row 1-3) */}
          <div className="col-span-2 row-span-3 overflow-hidden bg-surface-container relative">
            <img src="/images/anchor.JPG" alt="Evorae Signature Aesthetic" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
          </div>

          {/* T2: Wide Landscape (Desktop: Col 3-4 Row 1. Mobile: Col 1-2 Row 4) */}
          <div className="col-span-2 md:col-span-2 row-span-1 md:row-span-1 overflow-hidden bg-surface-container relative">
            <img src="/images/491A9013.JPG" alt="Editorial Detail" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>

          {/* T3: Tall Portrait (Desktop: Col 3 Row 2-3. Mobile: Col 1 Row 5) */}
          <div className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 overflow-hidden bg-surface-container relative">
            <img src="/images/491A9072.JPG" alt="Movement" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>

          {/* T4: Square (Desktop: Col 4 Row 2. Mobile: Col 2 Row 5) */}
          <div className="col-span-1 md:col-span-1 row-span-1 overflow-hidden bg-surface-container relative">
            <img src="/images/17.jpg" alt="Texture Focus" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>

          {/* T5: Square (Desktop: Col 4 Row 3. Mobile: Col 1 Row 6) */}
          <div className="col-span-1 md:col-span-1 row-span-1 overflow-hidden bg-surface-container relative">
            <img src="/images/4.jpg" alt="Craft Detail" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>

          {/* T6: Square (Desktop: Col 1 Row 4. Mobile: Col 2 Row 6) */}
          <div className="col-span-1 md:col-span-1 row-span-1 overflow-hidden bg-surface-container relative">
            <img src="/images/491A9155.JPG" alt="Candid Lifestyle" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>

          {/* T7: Wide Rect (Desktop: Col 2-3 Row 4. Mobile: Col 1 Row 7) */}
          <div className="col-span-1 md:col-span-2 row-span-1 overflow-hidden bg-surface-container relative">
            <img src="/images/491A9041.JPG" alt="Silhouette" className="absolute inset-0 w-full h-full object-cover object-[center_70%]" loading="lazy" />
          </div>

          {/* T8: Least Emphasis (Desktop: Col 4 Row 4. Mobile: Col 2 Row 7) */}
          <div className="col-span-1 md:col-span-1 row-span-1 overflow-hidden bg-surface-container relative">
             <img src="/images/less.JPG" alt="Subtle Fragment" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" loading="lazy" />
          </div>

        </div>
      </section>

      {/* 2. Our Story */}
      <section className="w-full bg-[#fbf9f6] py-14 lg:py-20 mb-16 lg:mb-24 border-y border-outline-variant/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Founder Image */}
          <div className="order-2 lg:order-1 relative w-full aspect-[4/5] lg:aspect-[3/4] bg-surface-container overflow-hidden rounded-sm shadow-sm scale-95 lg:scale-100">
             <img src="/images/Evorae%20founder.png" alt="Evorae Founder" className="absolute inset-0 w-full h-full object-cover object-top lg:object-center" loading="lazy" />
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-12">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-[42px] text-on-surface tracking-wide uppercase mb-8 lg:mb-10">
              OUR STORY
            </h2>
            <div className="w-8 h-8 mb-8 text-outline mx-auto lg:mx-0">
              <div className="w-full h-full rotate-45 border border-current opacity-30"></div>
            </div>
            <div className="space-y-6 md:space-y-8 font-label text-[15px] md:text-base lg:text-[16px] text-on-surface-variant leading-[1.8] font-light text-justify md:text-left w-full">
              <p>
                Evorae began as a shared vision between us shaped by a love for craft, conscious design, and the quiet confidence clothing can bring.
              </p>
              <p>
                The name Evorae was born from the initials of Eesha Rawat, reimagined to reflect the woman of today — evolving with grace, intention, and radiance.
              </p>
              <p>
                Rooted in India’s rich craft heritage, we work with traditional techniques like handblock printing, reinterpreting them for a modern, everyday wardrobe. Each piece is a balance of heritage and contemporary design, created to move effortlessly from workdays to slow outings.
              </p>
              <p>
                We believe today’s woman is conscious and self-aware — her choices intentional, her style an extension of who she is. Evorae exists to support that expression through pieces that are timeless, versatile, and thoughtfully made.
              </p>
              <p className="font-medium italic text-on-surface">
                More than a brand, Evorae is a journey — one that celebrates craft and honours the evolving radiance of every woman.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Our Design Philosophy */}
      <section className="relative w-full py-16 lg:py-24 mb-20 lg:mb-24 overflow-hidden border-y border-outline-variant/20">
        
        {/* Full Section Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img src="/images/heritage-bg.jpg" alt="Heritage Background" className="w-full h-full object-cover opacity-85" loading="lazy" aria-hidden="true" />
          <div className="absolute inset-0 bg-[#fbf9f6]/75 backdrop-blur-[1px]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 flex flex-col lg:pl-8">
              <div className="w-12 h-[1px] bg-primary mb-8"></div>
              <h2 className="font-headline text-3xl md:text-4xl lg:text-[42px] text-on-surface leading-[1.1] mb-8">
                Our Design Philosophy
              </h2>
              <div className="space-y-6 font-label text-[14px] md:text-[15px] text-on-surface-variant leading-[1.85] font-light max-w-lg">
                <p>
                  At Evorae, we believe style should feel effortless and timeless. Our pieces are designed to blend naturally into a woman’s life — clothing and jewellery that can be worn across seasons, occasions, and evolving personal styles.
                </p>
                <p>
                  Fabric, form, and comfort guide every creation. We focus on versatile silhouettes, natural materials, and thoughtful craftsmanship that allow each piece to be layered, styled, and cherished for years.
                </p>
                <p>
                  Nature remains our greatest inspiration. Organic motifs, earthy tones, and delicate details shape our designs, bringing a sense of quiet beauty to everyday wear.
                </p>
                <p className="font-medium text-on-surface italic drop-shadow-sm">
                  At its heart, Evorae creates easy-wear clothing and effortless jewellery for women — pieces that move with her life, celebrate simplicity, and embody timeless grace.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 flex flex-col md:flex-row items-stretch gap-3 lg:gap-4 mt-8 lg:mt-0 drop-shadow-none">
               
               {/* 1. Dominant Tall Tile (Left side, Mobile: Stacked Top) */}
               <div className="relative w-full md:w-[42%] aspect-[4/5] md:aspect-auto bg-surface-container overflow-hidden rounded-sm shadow-md">
                 <img src="/images/heritage1.jpg" alt="Heritage Silhouette" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
               </div>

               {/* 2. Supporting Editorial Grid (Right side) */}
               <div className="flex flex-col flex-1 gap-3 lg:gap-4">
                 
                 {/* Top Wide Landscape */}
                 <div className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-surface-container overflow-hidden rounded-sm shadow-md">
                   <img src="/images/heritage2.jpg" alt="Philosophy Mood" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
                 </div>

                 {/* Bottom Split Sequence */}
                 <div className="flex gap-3 lg:gap-4 w-full">
                   <div className="relative flex-[1.2] aspect-square md:aspect-[5/4] bg-surface-container overflow-hidden rounded-sm shadow-md">
                     <img src="/images/heritage3.jpg" alt="Craft Fragment" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" loading="lazy" />
                   </div>
                   <div className="relative flex-1 aspect-[4/5] md:aspect-square bg-surface-container overflow-hidden rounded-sm shadow-md">
                     <img src="/images/heritage4.jpg" alt="Editorial Grace" className="absolute inset-0 w-full h-full object-cover object-center" loading="lazy" />
                   </div>
                 </div>

               </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Conscious Choices at Evorae */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 md:px-12 mb-16 lg:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6">
            <div className="w-full aspect-square md:aspect-[4/5] bg-surface-container overflow-hidden rounded-sm shadow-sm relative lg:scale-95">
              <img src="/images/491A8972.JPG" alt="Conscious Choices" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col lg:pl-4">
            <div className="w-12 h-[1px] bg-primary mb-8"></div>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-[42px] text-on-surface leading-[1.15] mb-8">
              Conscious Choices at Evorae
            </h2>
            <div className="space-y-6 font-label text-[14px] md:text-[15px] text-on-surface-variant leading-[1.85] font-light max-w-xl">
              <p>
                Being mindful, for us, begins with intention. At Evorae, every design decision considers not just how a piece looks, but how it is made, packed, and eventually used in everyday life. Our goal is to create thoughtfully, with care for both people and the environment.
              </p>
              <p>
                Our apparel is packed in reusable fabric pouches, while jewellery is presented in paper boxes designed to minimise waste.
              </p>
              <p>
                The jewellery we create is meant to be cherished, not replaced. Each piece is crafted using pearls and carefully selected high-quality stones, and comes in reusable paper boxes that can be reused long after the purchase.
              </p>
              <p>
                We are equally mindful in the making of our garments. The dyes used in our textiles are azo-free and environmentally considerate, helping reduce the impact of production while ensuring safer processes.
              </p>
              <p>
                These are deliberate steps in an ongoing journey. With every collection, Evorae continues to explore ways to create more responsibly, honour craftsmanship, and make choices that respect the world our designs come from.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What makes our pieces unique */}
      <section className="w-full bg-[#fcfaf7] py-16 lg:py-20 border-t border-outline-variant/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="font-headline text-sm md:text-base tracking-[0.2em] font-semibold text-on-surface uppercase inline-block border-b border-primary pb-3">
              WHAT MAKES OUR PIECES UNIQUE?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            
            {/* Pillar 1 */}
            <div className="flex flex-col text-center lg:text-left">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mb-6 mx-auto lg:mx-0 font-light">
                check_circle
              </span>
              <h3 className="font-headline text-xl lg:text-2xl text-on-surface mb-4">100% pure quality</h3>
              <p className="font-label text-sm lg:text-[15px] text-on-surface-variant leading-[1.8] font-light">
                Crafted from the finest cotton, every Evorae piece is carefully tested and gently finished to enhance its natural softness so it feels as good as it looks, every single day.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col text-center lg:text-left">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mb-6 mx-auto lg:mx-0 font-light">
                print
              </span>
              <h3 className="font-headline text-xl lg:text-2xl text-on-surface mb-4">Handcrafted block print</h3>
              <p className="font-label text-sm lg:text-[15px] text-on-surface-variant leading-[1.8] font-light">
                Our handcrafted block prints celebrate age-old techniques, where skilled artisans imprint each design by hand creating subtle variations that make every piece uniquely yours.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col text-center lg:text-left">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mb-6 mx-auto lg:mx-0 font-light">
                eco
              </span>
              <h3 className="font-headline text-xl lg:text-2xl text-on-surface mb-4">Conscious & mindful</h3>
              <p className="font-label text-sm lg:text-[15px] text-on-surface-variant leading-[1.8] font-light">
                We use responsible printing techniques, including reactive and pigment printing, with a focus on mindful water usage. Our handcrafted block prints use only azo-free dyes, ensuring they are safe for you and kinder to the environment.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="flex flex-col text-center lg:text-left">
              <span className="material-symbols-outlined text-[32px] text-primary/80 mb-6 mx-auto lg:mx-0 font-light">
                star
              </span>
              <h3 className="font-headline text-xl lg:text-2xl text-on-surface mb-4">Limited editions</h3>
              <p className="font-label text-sm lg:text-[15px] text-on-surface-variant leading-[1.8] font-light">
                Each design is created in limited batches of no more than 30 pieces — ensuring exclusivity, mindful production, and minimal waste.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
