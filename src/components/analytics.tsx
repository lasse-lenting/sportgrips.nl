'use client';

import Script from 'next/script';
import { CLARITY_PROJECT_ID, GA_MEASUREMENT_ID } from '@/lib/analytics';

/**
 * Loads the Google tag (gtag.js) via next/script, only once consent has been
 * accepted. Rendered by <ConsentGate>; never rendered before consent, so no
 * network request happens without permission.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

/** Loaded by the shared consent gate, alongside GA4, after analytics opt-in. */
export function MicrosoftClarity() {
  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        window.clarity('consentv2', {
          ad_Storage: 'denied',
          analytics_Storage: 'granted'
        });
      `}
    </Script>
  );
}
