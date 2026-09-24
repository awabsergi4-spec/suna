import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import SpaceBackground from '@/components/space/SpaceBackground';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: isAr
      ? 'وكالة الفضاء — نستكشف ما وراء الحدود'
      : 'Space Agency — Exploring Beyond Boundaries',
    description: isAr
      ? 'نستكشف الفضاء من خلال العلم والهندسة والابتكار.'
      : 'Exploring space through science, engineering and innovation.',
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title: isAr
        ? 'وكالة الفضاء — نستكشف ما وراء الحدود'
        : 'Space Agency — Exploring Beyond Boundaries',
      description: isAr
        ? 'نستكشف الفضاء من خلال العلم والهندسة والابتكار.'
        : 'Exploring space through science, engineering and innovation.',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-space-black text-space-white relative min-h-screen selection:bg-space-blue selection:text-white">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LoadingScreen />
          <CustomCursor />
          <SpaceBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
