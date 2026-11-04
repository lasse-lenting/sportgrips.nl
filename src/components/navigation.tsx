'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationItem } from '@/content/navigation';
import { cn } from '@/lib/cn';
import { buttonStyles } from './ui';

const desktopHover = () => window.matchMedia('(min-width: 1200px) and (hover: hover)').matches;

export function Navigation({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const path = usePathname();
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdownTriggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function scheduleClose(href: string) {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setExpanded((value) => (value === href ? null : value));
      closeTimer.current = null;
    }, 350);
  }

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !header.current?.contains(document.activeElement)) return;
      if (expanded) {
        cancelClose();
        setExpanded(null);
        dropdownTriggers.current[expanded]?.focus();
      } else if (open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        cancelClose();
        setExpanded(null);
        setOpen(false);
      }
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
    };
  }, [expanded, open]);

  function closeMenus() {
    cancelClose();
    setOpen(false);
    setExpanded(null);
  }

  const isCurrent = (href: string) =>
    path === href || path.startsWith(`${href.replace(/\/$/, '')}/`);
  const navLink =
    'text-[14px] whitespace-nowrap font-semibold text-white/80 transition-colors duration-300 hover:text-brand aria-[current=page]:text-brand max-lg:py-[15px] max-lg:leading-[1.1]';
  const bar = 'block h-[1.5px] w-5 bg-current [transition:transform_0.4s,opacity_0.3s]';

  return (
    <header
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setExpanded(null);
      }}
      className={cn(
        'fixed top-[25px] left-1/2 z-100 w-[calc(100%_-_120px)] max-w-site -translate-x-1/2 rounded-[16px] border border-white/10 bg-brand-dark p-[9px] shadow-[inset_0_0_5px_1px_#ffffff08] backdrop-blur-[10px] max-lg:w-[calc(100%_-_80px)] max-lg:rounded-[14px] max-lg:p-[19px] max-sm:top-2.5 max-sm:w-[calc(100%_-_40px)]',
        open &&
          'max-lg:max-h-[calc(100dvh_-_50px)] max-lg:overflow-y-auto max-sm:max-h-[calc(100dvh_-_20px)]',
      )}
    >
      <nav
        aria-label="Hoofdnavigatie"
        className="flex items-center justify-between gap-2.5 max-lg:block"
      >
        <div className="pl-[5px] max-lg:flex max-lg:items-center max-lg:justify-between max-lg:p-0">
          <Link
            href="/"
            aria-label="Sportgrips homepage"
            onClick={closeMenus}
            className="flex h-[38px] items-center"
          >
            <img
              src="/assets/sportgrips/logo.svg"
              alt=""
              width={140}
              height={34}
              className="h-[34px] w-[140px] object-contain"
            />
          </Link>
          <button
            ref={trigger}
            type="button"
            className="hidden max-lg:flex max-lg:size-7 max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:gap-1.5 max-lg:p-[3px] max-lg:text-brand"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => {
              setOpen(!open);
              setExpanded(null);
            }}
          >
            <span className={cn(bar, open && 'translate-y-[7.5px] rotate-45')} />
            <span className={cn(bar, open && 'opacity-0')} />
            <span className={cn(bar, open && '-translate-y-[7.5px] -rotate-45')} />
          </button>
        </div>
        <div
          id="primary-menu"
          className={cn(
            'flex items-center gap-3',
            open
              ? 'max-lg:flex-col max-lg:items-stretch max-lg:gap-0 max-lg:pt-3'
              : 'max-lg:hidden',
          )}
        >
          {items.map((item, index) => {
            if (!item.groups?.length)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={path === item.href ? 'page' : undefined}
                  className={navLink}
                  onClick={closeMenus}
                >
                  {item.title}
                </Link>
              );
            const active = expanded === item.href;
            const id = `navigation-dropdown-${index}`;
            const current =
              isCurrent(item.href) ||
              item.groups.some(
                (group) =>
                  (group.href && isCurrent(group.href)) ||
                  group.links.some((link) => isCurrent(link.href)),
              );
            return (
              <div
                key={item.href}
                className="max-lg:relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                    setExpanded((value) => (value === item.href ? null : value));
                }}
                onPointerEnter={() => {
                  if (desktopHover()) {
                    cancelClose();
                    setExpanded(item.href);
                  }
                }}
                onPointerLeave={(event) => {
                  if (desktopHover() && !event.currentTarget.contains(document.activeElement))
                    scheduleClose(item.href);
                }}
              >
                <div className="flex items-center gap-1 max-lg:justify-between">
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={path === item.href ? 'page' : undefined}
                    className={cn(navLink, current && 'text-brand')}
                  >
                    {item.title}
                  </Link>
                  <button
                    ref={(element) => {
                      dropdownTriggers.current[item.href] = element;
                    }}
                    type="button"
                    aria-expanded={active}
                    aria-controls={id}
                    aria-label={`${item.title} submenu`}
                    className={cn(
                      navLink,
                      'flex min-h-9 min-w-6 items-center justify-center max-lg:min-h-11 max-lg:min-w-11',
                      current && 'text-brand',
                    )}
                    onClick={(event) => {
                      cancelClose();
                      setExpanded(
                        active && (!desktopHover() || event.detail === 0) ? null : item.href,
                      );
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        event.preventDefault();
                        cancelClose();
                        setExpanded(item.href);
                        const last = event.key === 'ArrowUp';
                        requestAnimationFrame(() => {
                          const links = document
                            .getElementById(id)
                            ?.querySelectorAll<HTMLAnchorElement>('a');
                          if (links?.length) links[last ? links.length - 1 : 0].focus();
                        });
                      }
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={cn('shrink-0 transition-transform', active && 'rotate-180')}
                    >
                      <path
                        d="m4 6 4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  id={id}
                  hidden={!active}
                  className="absolute top-full right-0 left-0 pt-3 max-lg:static max-lg:pt-0 max-lg:pb-3"
                >
                  <div className="max-h-[calc(100dvh_-_130px)] overflow-y-auto rounded-[16px] border border-white/10 bg-brand-dark p-6 shadow-[0_16px_40px_#0003] max-lg:max-h-none max-lg:rounded-xl max-lg:p-4">
                    <Link
                      href={item.href}
                      onClick={closeMenus}
                      className="mb-5 inline-flex text-[14px] font-semibold text-brand hover:underline"
                    >
                      {item.title === 'Gripkennis'
                        ? 'Alle gripkennis'
                        : `Alle ${item.title.toLowerCase()}`}{' '}
                      <span aria-hidden="true" className="ml-2">
                        →
                      </span>
                    </Link>
                    <div
                      className={cn(
                        'grid gap-x-8 gap-y-6 max-lg:grid-cols-2 max-sm:grid-cols-1',
                        item.groups.length > 2 ? 'grid-cols-3' : 'grid-cols-2',
                      )}
                    >
                      {item.groups.map((group) => (
                        <div
                          key={group.title}
                          className="flex min-w-0 flex-col items-start gap-2.5"
                        >
                          {group.href ? (
                            <Link
                              href={group.href}
                              onClick={closeMenus}
                              aria-current={path === group.href ? 'page' : undefined}
                              className="font-semibold text-white transition-colors hover:text-brand aria-[current=page]:text-brand"
                            >
                              {group.title}
                            </Link>
                          ) : (
                            <span className="font-semibold text-white">{group.title}</span>
                          )}
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={closeMenus}
                              aria-current={path === link.href ? 'page' : undefined}
                              className="text-[14px] leading-[1.4] text-white/65 transition-colors hover:text-brand aria-[current=page]:text-brand"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          href="/keuzehulp/"
          className={cn(
            buttonStyles.base,
            'bg-brand text-brand-dark px-[15px] py-[11px] hover:bg-brand-hover max-sm:px-5 max-sm:py-3.5',
            open ? 'max-lg:mt-4 max-lg:flex max-lg:w-full' : 'max-lg:hidden',
          )}
          onClick={closeMenus}
        >
          Vind jouw grip
        </Link>
      </nav>
    </header>
  );
}
