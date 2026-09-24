import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import MissionControl from '@/components/sections/MissionControl';
import Missions from '@/components/sections/Missions';
import SolarSystem from '@/components/sections/SolarSystem';
import Technology from '@/components/sections/Technology';
import Research from '@/components/sections/Research';
import SpacecraftShowcase from '@/components/sections/SpacecraftShowcase';
import EarthObservation from '@/components/sections/EarthObservation';
import News from '@/components/sections/News';
import Impact from '@/components/sections/Impact';
import Timeline from '@/components/sections/Timeline';
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
      <MissionControl />
      <Missions />
      <SolarSystem />
      <Technology />
      <Research />
      <SpacecraftShowcase />
      <EarthObservation />
      <News />
      <Impact />
      <Timeline />
      <CTA />
    </div>
  );
}
