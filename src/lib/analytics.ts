/** Only configure identifiers owned by Sportgrips. All services are disabled by default. */
export const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
)
  ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!
  : '';
export const CLARITY_PROJECT_ID = /^[a-zA-Z0-9]+$/.test(
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '',
)
  ? process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID!
  : '';
export const VERCEL_ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true';
export const analyticsEnabled = Boolean(
  GA_MEASUREMENT_ID || CLARITY_PROJECT_ID || VERCEL_ANALYTICS_ENABLED,
);
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}
