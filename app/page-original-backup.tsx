import { tiendanubeFetch } from '../utils/tiendanube';
import { TiendanubeProduct } from '../types/tiendanube';
import { TextCard, ImageCard, TypographyCard, CardTitleSubtitle } from './components/cards';

export default async function HomePage() {
  let products: TiendanubeProduct[] = [];
  let error: string | null = null;

  try {
    const response = await tiendanubeFetch<TiendanubeProduct[]>('products');
    products = response || [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Error desconocido';
    console.error('Error fetching products:', err);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Width */}
      <section>
        {/* Full Width Wrapper */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          {/* 3 Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-none">
            
            {/* COLUMN 1 (Left) */}
            <div className="space-y-4 md:space-y-6">
              
              {/* 1. PROWL Statement */}
              <TextCard
                cardNumber={1}
                label="Studio"
                title="PROWL is an industrial design studio on a mission to help companies build a regenerative future."
                backgroundColor="bg-gray-50"
                textColor="text-black"
                minHeight="min-h-[240px]"
                showArrow={true}
              />

              {/* 2. Work Image - 3work.avif */}
              <ImageCard
                cardNumber={2}
                src="/images/3work.avif"
                alt="Work - Design Project"
                label="Work"
                href="/work"
                minHeight="min-h-[280px]"
                showArrow={true}
              />

              {/* 3. Summer 2023 Project */}
              <CardTitleSubtitle
                cardNumber={3}
                title="Summer 2023"
                subtitle="Barriers to Entry"
                description="Produced in collaboration with Barriers to Action"
                label="Projections"
                href="/projections"
                backgroundColor="#FFFF00"
                textColor="text-black"
                minHeight="min-h-[280px]"
              />

              {/* 4. Air Company */}
              <TypographyCard
                cardNumber={4}
                items={[
                  { text: "Air Company", className: "text-headline" }
                ]}
                label="Work"
                href="/work"
                backgroundColor="bg-black"
                showArrow={true}
              />

              {/* 5. Industrial Image */}
              <ImageCard
                cardNumber={5}
                src="/images/5work.avif"
                alt="Industrial Design Project"
                label="Work"
                href="/work"
                minHeight="min-h-[240px]"
                showArrow={true}
              />

              {/* 6. Quote Block */}
              <TextCard
                cardNumber={6}
                content="We begin with the end.™"
                backgroundColor="bg-white border border-gray-200"
                textColor="text-black"
                minHeight="min-h-[160px]"
                className="italic text-center"
                showArrow={false}
              />

              {/* 7. Landscape Image */}
              <ImageCard
                cardNumber={7}
                src="/images/7work.avif"
                alt="Landscape Design Project"
                label="Work"
                href="/work"
                minHeight="min-h-[200px]"
                showArrow={true}
              />

              {/* 8. PEEL Chair */}
              <TypographyCard
                cardNumber={8}
                items={[
                  { text: "PEEL Chair" }
                ]}
                label="Work"
                href="/work"
                backgroundColor="bg-black"
                showArrow={true}
              />

              {/* 9. Winter 2022 */}
              <TextCard
                cardNumber={9}
                title="Winter 2022"
                subtitle="Waste Source"
                backgroundColor="bg-yellow-400"
                textColor="text-black"
                minHeight="min-h-[200px]"
              />

              {/* 10. Collaboration Image */}
              <ImageCard
                cardNumber={10}
                src="/images/10work.avif"
                alt="Collaboration Project"
                label="Work"
                href="/work"
                minHeight="min-h-[200px]"
                showArrow={true}
              />

              {/* 11. Winter 2022 - Waste Source */}
              <CardTitleSubtitle
                cardNumber={11}
                title="Winter 2022"
                subtitle="Waste Source"
                description="Shifting the way we think about 'waste'"
                backgroundColor="#FFFF00"
                textColor="text-black"
              />

              {/* 12. Collaboration Text */}
              <TextCard
                cardNumber={12}
                title="Collaborate to be stronger, together ⎯ Strategic partnerships increase the capacity to create the regenerative future."
                label="Studio"
                backgroundColor="bg-gray-50"
                textColor="text-black"
                showArrow={true}
              />

            </div>

            {/* COLUMN 2 (Center) */}
            <div className="space-y-4 md:space-y-6">
              
              {/* 13. Work Image */}
              <ImageCard
                cardNumber={13}
                src="/images/11work.avif"
                alt="Work Project"
              />

              {/* 14. Marquesina */}
              <div className="bg-gray-100 h-24 rounded-xl flex items-center justify-center">
                <p className="text-caption text-gray-500">Marquesina</p>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold z-20">
                  14
                </div>
              </div>

              {/* 15. HTC Vive Flow */}
              <TypographyCard
                cardNumber={15}
                items={[
                  { text: "HTC Vive Flow" }
                ]}
                backgroundColor="bg-black"
              />

              {/* 16. Video Card */}
              <div className="bg-gray-100 h-48 rounded-xl flex items-center justify-center relative">
                <p className="text-caption text-gray-500">Video Card</p>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold z-20">
                  16
                </div>
              </div>

              {/* 17. Partnership Text */}
              <TextCard
                cardNumber={17}
                title="The partnership between PROWL Studio and Parallel allows both of our businesses to bring our clients further, faster."
              />

              {/* 18. Work Image */}
              <ImageCard
                cardNumber={18}
                src="/images/16work.avif"
                alt="Creative Work Project"
              />

              {/* 19. Marquesina */}
              <div className="bg-gray-100 h-24 rounded-xl flex items-center justify-center relative">
                <p className="text-caption text-gray-500">Marquesina</p>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold z-20">
                  19
                </div>
              </div>

              {/* 20. Fall 2022 - Biome Futures */}
              <CardTitleSubtitle
                cardNumber={20}
                title="Fall 2022"
                subtitle="Biome Futures"
                description="In Collaboration with Biome"
              />

              {/* 21. Work Image */}
              <ImageCard
                cardNumber={21}
                src="/images/19work.avif"
                alt="Studio Design Project"
              />

              {/* 22. News */}
              <TextCard
                cardNumber={22}
                title="News"
              />

              {/* 23. Work Image */}
              <ImageCard
                cardNumber={23}
                src="/images/21work.avif"
                alt="Product Design Project"
              />

            </div>

            {/* COLUMN 3 (Right) */}
            <div className="space-y-4 md:space-y-6">

              {/* 24. Haworth */}
              <TypographyCard
                cardNumber={24}
                items={[
                  { text: "Haworth" }
                ]}
                href="/work"
                backgroundColor="bg-black"
              />

              {/* 25. Work Image */}
              <ImageCard
                cardNumber={25}
                src="/images/23work.avif"
                alt="Minimal Design Project"
              />
              
              {/* 26. News */}
              <TextCard
                cardNumber={26}
                title="News"
              />

              {/* 27. Work Image */}
              <ImageCard
                cardNumber={27}
                src="/images/27work.avif"
                alt="Design Project"
              />

              {/* 28. Winter 2022 - The New Comfort */}
              <CardTitleSubtitle
                cardNumber={28}
                title="Winter 2022"
                subtitle="The New Comfort"
                description="A future of resilience amidst rapid change."
              />

              {/* 29. ByBorre */}
              <TypographyCard
                cardNumber={29}
                items={[
                  { text: "ByBorre" }
                ]}
                backgroundColor="bg-black"
              />

              {/* 30. Work Image */}
              <ImageCard
                cardNumber={30}
                src="/images/30work.avif"
                alt="Fabric Design Project"
              />

              {/* 31. Building 12 Announcement */}
              <TextCard
                cardNumber={31}
                title="We are extraordinarily excited to announce that we have moved into Building 12, which is part of the larger Pier 70 project in San Francisco's Dogpatch neighborhood. This space will include an entire prototyping lab, micro material library, and other features that will enable us to do our best work and grow as a team."
              />

              {/* 32. Work Image */}
              <ImageCard
                cardNumber={32}
                src="/images/32work.avif"
                alt="Textile Design Project"
              />

              {/* 33. Gantri Focal */}
              <TypographyCard
                cardNumber={33}
                items={[
                  { text: "Gantri Focal" }
                ]}
                backgroundColor="bg-black"
              />

              {/* 34. Work Image */}
              <ImageCard
                cardNumber={34}
                src="/images/34work.avif"
                alt="Architecture Design Project"
              />

            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Client Logos Placeholder */}
          <div className="bg-gray-100 h-24 rounded-xl mb-8 flex items-center justify-center">
            <p className="text-caption text-gray-500">Client Logos</p>
          </div>
          
          {/* Footer Links */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="https://instagram.com" 
                className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                IG
              </a>
              <a 
                href="https://linkedin.com" 
                className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                LI
              </a>
        </div>

            {/* CTA */}
            <a 
              href="/contacto" 
              className="bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </footer>

      {/* Error State */}
      {error && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Error al cargar productos
            </h2>
            <p className="text-red-600">{error}</p>
          </div>
          </div>
        </section>
        )}
    </div>
  );
}