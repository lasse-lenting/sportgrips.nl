import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('container mx-auto w-full max-w-site', className)}>{children}</div>;
}

/** Vertical rhythm for a section's container. */
export const stack = 'flex flex-col gap-15 max-lg:gap-10';

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'section px-15 py-20 max-lg:px-10 max-lg:py-15 max-sm:px-5 max-sm:py-10',
        className,
      )}
    >
      {children}
    </section>
  );
}

const buttonBase =
  'inline-flex items-center justify-center rounded-lg text-[16px] leading-5 font-semibold whitespace-nowrap shadow-[inset_0_0_0_0_#fff0] [transition:background_0.3s_cubic-bezier(0.44,0,0.56,1),box-shadow_0.4s,transform_0.4s] hover:shadow-[inset_0_0_0_4px_#ffffff20] max-sm:text-[14px]';

export const buttonStyles = {
  base: buttonBase,
  regular: `${buttonBase} bg-brand text-brand-dark px-5 py-[15px] hover:bg-brand-hover max-sm:py-3.5`,
  form: `${buttonBase} w-full bg-brand text-brand-dark px-[15px] py-[13px] hover:bg-brand-hover`,
};

export function Button({
  children,
  href,
  className = buttonStyles.regular,
  ...props
}: { children: ReactNode; href: string; className?: string } & Omit<
  ComponentProps<typeof Link>,
  'href'
>) {
  return (
    <Link href={href} className={cn('button', className)} {...props}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'eyebrow inline-flex items-center justify-center rounded-lg bg-accent px-3.5 py-2.5 text-[18px] leading-[1.1] font-bold tracking-[-0.02em] text-white max-sm:text-[16px]',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
  as: Heading = 'h2',
  className = 'max-w-[760px] max-lg:max-w-full',
  descriptionClassName = 'max-w-[600px]',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
  as?: 'h1' | 'h2';
  /** Width classes for the header block. */
  className?: string;
  /** Width and colour overrides for the description. */
  descriptionClassName?: string;
}) {
  return (
    <div
      className={cn(
        'section-heading flex flex-col gap-5',
        center ? 'center mx-auto items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading className={light ? 'text-white' : undefined}>{title}</Heading>
      {description && (
        <p
          className={cn(
            'mb-1.5 text-[20px] leading-[1.4] font-medium tracking-[-0.03em] max-sm:text-[18px]',
            light ? 'text-white' : 'text-muted',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Icon({ name, className = 'size-6' }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    education: <path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v5l6 3 6-3v-5M22 9v7" />,
    water: <path d="M12 2S4 11 4 16a8 8 0 0 0 16 0C20 11 12 2 12 2Zm-4 14c0 2 1 4 4 4" />,
    home: <path d="m2 12 10-9 10 9M5 10v11h14V10M9 21v-8h6v8M1 21h22" />,
    medical: <path d="M8 3h8v5h5v8h-5v5H8v-5H3V8h5Z" />,
    location: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="17" rx="3" />
        <path d="M7 2v6m10-6v6M3 11h18m-14 4h4m2 0h4m-10 3h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="m9 5 7 7-7 7" />,
  };
  return (
    <svg
      className={cn('flex-none', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.check}
    </svg>
  );
}
