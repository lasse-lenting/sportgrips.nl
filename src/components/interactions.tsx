'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { faqs, purposes } from '@/content/site';
import { photoAlt } from '@/content/media';
import { Icon } from './ui';
import { Reveal } from './motion';
import { Ribbon } from './ribbon';
export function PurposeTabs() {
  const [active, setActive] = useState(0);
  const current = purposes[active];
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(
      () => setActive((currentIndex) => (currentIndex + 1) % purposes.length),
      7000,
    );
    return () => window.clearTimeout(timer);
  }, [active, reduced]);
  return (
    <div className="purpose-scene">
      <img className="purpose-background" src={current.image} alt="" />
      <Reveal className="purpose-card" distance={0}>
        <div className="purpose-options">
          <h3>Wat vul je in?</h3>
          <div
            role="tablist"
            aria-label="Onderdelen van de Sportgrips-keuzehulp"
            aria-orientation="vertical"
          >
            {purposes.map((p, i) => (
              <button
                key={p.title}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                role="tab"
                id={`purpose-tab-${i}`}
                aria-selected={active === i}
                aria-controls="purpose-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
                    e.preventDefault();
                    const next =
                      e.key === 'Home'
                        ? 0
                        : e.key === 'End'
                          ? 3
                          : (i + (e.key === 'ArrowDown' ? 1 : 3)) % 4;
                    setActive(next);
                    buttons.current[next]?.focus();
                  }
                }}
              >
                <span className="purpose-icon">
                  <Icon name={p.icon} />
                </span>
                <span className="purpose-label">
                  {p.title}
                  {active === i && <span className="purpose-progress" />}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div
          id="purpose-panel"
          role="tabpanel"
          aria-labelledby={`purpose-tab-${active}`}
          className="purpose-image"
        >
          <img src={current.image} alt={photoAlt(current.image)} />
          <h3>{current.text}</h3>
        </div>
      </Reveal>
      <Ribbon
        text="Jouw sport • De onderlaag • Het gevoel • Jouw keuze"
        className="purpose-ribbon"
      />
    </div>
  );
}
export function FAQ() {
  const [opened, setOpened] = useState<number[]>([]);
  const reduced = useReducedMotion();
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => {
        const open = opened.includes(i);
        return (
          <div className={`faq-item ${open ? 'expanded' : ''}`} key={q}>
            <h3>
              <button
                aria-expanded={open}
                aria-controls={`answer-${i}`}
                onClick={() => setOpened(open ? opened.filter((n) => n !== i) : [...opened, i])}
              >
                {q}
                <span className="plus" />
              </button>
            </h3>
            <motion.div
              id={`answer-${i}`}
              initial={false}
              animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
              transition={{ type: 'spring', bounce: 0.2, duration: reduced ? 0 : 0.4 }}
              inert={!open}
            >
              <p>{a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
