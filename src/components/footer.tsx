import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from './ui';
import { ConsentSettingsButton } from './consent';

function FooterColumn({
  title,
  className = 'max-w-[180px] min-w-0',
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col items-start gap-4 text-[16px] leading-[1.3] font-semibold text-white/65 max-sm:text-[14px] ${className}`}
    >
      <h2 className="text-[18px] leading-[1.1] font-bold tracking-[-0.02em] text-white max-sm:text-[16px]">
        {title}
      </h2>
      {children}
    </div>
  );
}

const footerLink = 'hover:text-white';

export function Footer() {
  return (
    <footer className="bg-brand-dark px-15 pt-20 pb-15 text-white max-lg:px-10 max-lg:pt-15 max-lg:pb-10 max-sm:px-5">
      <Container>
        <div className="flex flex-col justify-between gap-[70px] max-sm:gap-[50px]">
          <Link
            href="/"
            aria-label="SPORTGRIPS homepage"
            className="inline-block w-[min(100%,620px)] max-sm:w-[min(100%,340px)]"
          >
            <img
              src="/assets/sportgrips/logo.svg"
              alt=""
              width={658}
              height={150}
              className="h-auto w-full aspect-[658/150] object-contain"
            />
          </Link>
          <div className="grid w-full grid-cols-3 gap-[clamp(30px,5vw,90px)] max-sm:grid-cols-1">
            <FooterColumn title="Vind jouw grip">
              <Link className={footerLink} href="/">
                Homepage
              </Link>
              <Link className={footerLink} href="/keuzehulp/">
                De keuzehulp
              </Link>
              <Link className={footerLink} href="/grips/">
                Grips per sport
              </Link>
              <Link className={footerLink} href="/kennis/">
                Gripkennis
              </Link>
              <Link className={footerLink} href="/over-sportgrips/">
                Over SPORTGRIPS
              </Link>
            </FooterColumn>
            <FooterColumn title="Op de homepage">
              <Link className={footerLink} href="/#our-purpose">
                Wat vul je in?
              </Link>
              <Link className={footerLink} href="/#goals">
                Zo werkt het
              </Link>
              <Link className={footerLink} href="/#faq">
                Veelgestelde vragen
              </Link>
            </FooterColumn>
            <FooterColumn
              title="Goed om te weten"
              className="max-w-[360px] min-w-0 max-sm:col-span-full max-sm:max-w-full"
            >
              <p>
                SPORTGRIPS helpt je grips kiezen op sport, dikte en gevoel. Lees de uitleg en
                vergelijk de eigenschappen die voor jou tellen.
              </p>
              <Link className={footerLink} href="/over-sportgrips/">
                Onze werkwijze en bronnen
              </Link>
              <p>
                De website bevat op dit moment geen winkel- of affiliatelinks. We geven keuzeuitleg
                en claimen geen eigen praktijktests.
              </p>
              <Link className={footerLink} href="/privacy/">
                Privacy
              </Link>
              <ConsentSettingsButton className={footerLink} />
            </FooterColumn>
          </div>
        </div>
        <div className="mt-20 flex justify-between border-t border-white/14 pt-10 text-[14px] leading-[1.3] font-medium max-lg:mt-15 max-sm:mt-10 max-sm:flex-col max-sm:gap-5 max-sm:pt-7.5 max-sm:text-[12px]">
          <p>© {new Date().getFullYear()} SPORTGRIPS. Alle rechten voorbehouden.</p>
          <Link className="text-white/65 hover:text-white" href="/over-sportgrips/">
            Eerlijk over ons advies
          </Link>
        </div>
      </Container>
    </footer>
  );
}
