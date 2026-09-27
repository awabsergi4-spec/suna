import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Policies from '@/components/sections/Policies';
import Program from '@/components/sections/Program';
import BusinessAreas from '@/components/sections/BusinessAreas';
import Projects from '@/components/sections/Projects';
import SpacecraftShowcase from '@/components/sections/SpacecraftShowcase';
import EarthObservation from '@/components/sections/EarthObservation';
import Partners from '@/components/sections/Partners';
import SolarSystem from '@/components/sections/SolarSystem';
import CTA from '@/components/sections/CTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative overflow-hidden flex flex-col">
      <Hero />
      <About />
      <Policies />
      <Program />
      <BusinessAreas />
      <Projects />
      <SpacecraftShowcase />
      <EarthObservation />
      <Partners />
      <SolarSystem />
      <CTA />
    </div>
  );
}
