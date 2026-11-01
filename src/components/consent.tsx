'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Analytics } from '@vercel/analytics/next';
import * as CookieConsent from 'vanilla-cookieconsent';
import {
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  VERCEL_ANALYTICS_ENABLED,
  analyticsEnabled,
} from '@/lib/analytics';
import { GoogleAnalytics, MicrosoftClarity } from './analytics';

let initialization: Promise<void> | undefined;

function initializeConsent() {
  initialization ??= CookieConsent.run({
    mode: 'opt-in',
    revision: 1,
    manageScriptTags: false,
    disablePageInteraction: false,
    cookie: {
      name: 'sportgrips_consent',
      expiresAfterDays: 182,
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:',
    },
    guiOptions: {
      consentModal: { layout: 'box wide', position: 'bottom right', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: { enabled: false },
    },
    onChange: ({ changedCategories }) => {
      if (changedCategories.includes('analytics') && !CookieConsent.acceptedCategory('analytics')) {
        // A loaded analytics runtime cannot be unloaded by removing its script.
        // Reload after saving the withdrawal so it starts without analytics.
        window.location.reload();
      }
    },
    language: {
      default: 'nl',
      translations: {
        nl: {
          consentModal: {
            title:
              '<img src="/assets/maaistro/icons/cookie.svg" alt="" width="24" height="24" aria-hidden="true">Jouw sport. Jouw keuze.',
            description: analyticsEnabled
              ? 'We onthouden je cookievoorkeuren. Optionele meetdiensten laden alleen na jouw toestemming. Lees in de privacy-uitleg welke diensten zijn ingericht.'
              : 'Sportgrips onthoudt je cookievoorkeuren. Er zijn geen optionele meetdiensten ingeschakeld. De keuzehulp werkt zonder account.',
            acceptAllBtn: 'Accepteren',
            acceptNecessaryBtn: 'Alleen noodzakelijk',
            showPreferencesBtn: 'Voorkeuren',
            footer: '<a href="/privacy/">Privacy bij Sportgrips</a>',
          },
          preferencesModal: {
            title: 'Jouw cookievoorkeuren',
            acceptAllBtn: 'Alles accepteren',
            acceptNecessaryBtn: 'Alleen noodzakelijk',
            savePreferencesBtn: 'Voorkeuren opslaan',
            closeIconLabel: 'Sluiten',
            sections: [
              {
                title: 'Jij bepaalt wat je deelt',
                description:
                  'De keuzehulp werkt ook als je statistieken weigert. Je kunt je keuze altijd aanpassen via Cookie-instellingen in de footer.',
              },
              {
                title: 'Noodzakelijk',
                description:
                  'Het cookie sportgrips_consent bewaart je keuze maximaal 182 dagen. Dit voorkomt dat we je bij ieder bezoek opnieuw vragen. Deze voorkeur is noodzakelijk en blijft ingeschakeld.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Statistieken',
                description: analyticsEnabled
                  ? 'Alleen de voor Sportgrips ingerichte meetdiensten laden na toestemming. De privacypagina beschrijft de actieve diensten. De keuzehulp verstuurt zelf geen antwoorden als meetgebeurtenis.'
                  : 'Er zijn momenteel geen optionele meetdiensten ingeschakeld. Deze voorkeur activeert op zichzelf geen tracking.',
                linkedCategory: 'analytics',
              },
              {
                title: 'Meer weten?',
                description:
                  'Lees <a href="/privacy/">onze privacy-uitleg</a> of mail naar <a href="mailto:lasse@puntwerk.nl">lasse@puntwerk.nl</a>.',
              },
            ],
          },
        },
      },
    },
  });
  return initialization;
}

function subscribe(onChange: () => void) {
  window.addEventListener('cc:onConsent', onChange);
  window.addEventListener('cc:onChange', onChange);
  return () => {
    window.removeEventListener('cc:onConsent', onChange);
    window.removeEventListener('cc:onChange', onChange);
  };
}

function hasAnalyticsConsent() {
  return CookieConsent.acceptedCategory('analytics');
}

export function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        await initializeConsent();
        CookieConsent.showPreferences();
      }}
    >
      Cookie-instellingen
    </button>
  );
}

export function ConsentGate() {
  const accepted = useSyncExternalStore(subscribe, hasAnalyticsConsent, () => false);

  useEffect(() => {
    void initializeConsent();
  }, []);

  if (!accepted || !analyticsEnabled) return null;

  return (
    <>
      {GA_MEASUREMENT_ID && <GoogleAnalytics />}
      {CLARITY_PROJECT_ID && <MicrosoftClarity />}
      {VERCEL_ANALYTICS_ENABLED && (
        <Analytics
          beforeSend={(event) => {
            if (!CookieConsent.acceptedCategory('analytics')) return null;
            const url = new URL(event.url);
            url.search = '';
            url.hash = '';
            return { ...event, url: url.toString() };
          }}
        />
      )}
    </>
  );
}
