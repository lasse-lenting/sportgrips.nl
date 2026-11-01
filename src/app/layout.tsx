import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { ConsentGate } from '@/components/consent';
import { Navigation } from '@/components/navigation';
import { navigation } from '@/content/navigation';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl, siteIndexable, siteName, siteUrl } from '@/lib/seo';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import '@/styles/site.css';
import '@/styles/consent.css';
import '@/styles/mowers.css';

const golos = localFont({
  src: '../../public/assets/paspoot/GolosText-Variable.ttf',
  weight: '400 900',
  display: 'swap',
  variable: '--font-golos',
  fallback: ['Arial', 'sans-serif'],
});
const stackSansNotch = localFont({
  src: '../../public/assets/paspoot/StackSansNotch-Variable.ttf',
  weight: '200 800',
  display: 'swap',
  variable: '--font-stack-sans-notch',
  fallback: ['Arial', 'sans-serif'],
});

const description =
  'SPORTGRIPS helpt je sportgrips kiezen op sport, griplaag, dikte en gevoel. Ontdek categorieën, praktische uitleg en de keuzehulp.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'SPORTGRIPS — kies de grip voor jouw sport', template: '%s | SPORTGRIPS' },
  description,
  applicationName: siteName,
  robots: { index: siteIndexable, follow: siteIndexable },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName,
    title: 'SPORTGRIPS — kies de grip voor jouw sport',
    description,
  },
  twitter: {
    card: 'summary',
    title: 'SPORTGRIPS — kies de grip voor jouw sport',
    description,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = { themeColor: '#052e2a' };

const organization = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: siteName,
      url: absoluteUrl('/'),
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: siteName,
      url: absoluteUrl('/'),
      inLanguage: 'nl-NL',
      publisher: { '@id': absoluteUrl('/#organization') },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      data-scroll-behavior="smooth"
      className={`${golos.variable} ${stackSansNotch.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Ga naar de inhoud
        </a>
        <Navigation items={navigation} />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organization} />
        <ConsentGate />
      </body>
    </html>
  );
}
