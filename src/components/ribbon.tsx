'use client';
import { useEffect, useId, useRef, useState } from 'react';
/** A responsive sine path with constant letter size and a continuous 20s text cycle. */
export function Ribbon({
  text,
  kind = 'single',
  className = '',
  reverse = false,
}: {
  text: string;
  kind?: 'single' | 'double' | 'slalom';
  className?: string;
  reverse?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  const root = useRef<HTMLDivElement>(null);
  const sample = useRef<SVGTextElement>(null);
  const [size, setSize] = useState({
    width: 1940,
    height: 300,
    font: 30,
    headingLeft: 300,
    cardsTop: 200,
  });
  const [length, setLength] = useState(600);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const bounds = el.getBoundingClientRect();
      const section = el.closest('.impacts');
      const heading = section?.querySelector('.section-heading')?.getBoundingClientRect();
      const cards = section?.querySelector('.impact-scene')?.getBoundingClientRect();
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        font: window.innerWidth < 1200 ? 20 : 30,
        headingLeft: heading ? heading.left - bounds.left : 300,
        cardsTop: cards ? cards.top - bounds.top : 200,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (sample.current) setLength(sample.current.getComputedTextLength());
    });
  }, [text, size.font]);
  const pad = size.font === 30 ? 22 : 16;
  const stroke = size.font * 0.96 + pad * 2;
  const inset = size.font * 0.9 + stroke / 2;
  const x = inset + (size.width - inset * 2) * 0.02;
  const width = (size.width - inset * 2) * 0.96;
  const slalom = kind === 'slalom';
  const height = slalom ? size.height : 300;
  const middle = height / 2;
  const amp = (height - inset * 2) * (kind === 'single' ? 0.36 : 0.28);
  const bendX = Math.max(25, Math.min(size.width * 0.18, size.headingLeft - 100));
  const elbowY = size.cardsTop - 10;
  const troughY = height - stroke / 2 - 14;
  const crestY = size.cardsTop - (size.width > 1000 ? 110 : 10);
  const d = slalom
    ? [
        'M -80 30',
        `C ${bendX * 0.85} 30 ${bendX - 60} ${elbowY - 180} ${bendX - 30} ${elbowY - 100}`,
        `C ${bendX} ${elbowY - 20} ${bendX + 100} ${elbowY} ${size.width * 0.28} ${elbowY}`,
        `C ${size.width * 0.4} ${elbowY} ${size.width * 0.4} ${troughY} ${size.width * 0.52} ${troughY}`,
        `C ${size.width * 0.64} ${troughY} ${size.width * 0.64} ${crestY} ${size.width * 0.76} ${crestY}`,
        `C ${size.width * 0.88} ${crestY} ${size.width * 0.88} ${troughY} ${size.width + 80} ${troughY}`,
      ].join(' ')
    : Array.from(
        { length: 201 },
        (_, i) =>
          `${i ? 'L' : 'M'} ${(x + (i / 200) * width).toFixed(1)},${(middle + Math.sin((i / 200) * Math.PI * 2 * (kind === 'single' ? 1 : 2)) * amp).toFixed(1)}`,
      ).join(' ');
  const repeated = `${text}    ·   `;
  return (
    <div ref={root} className={`ribbon ${className}`} aria-hidden="true">
      <svg width="100%" height={height} viewBox={`0 0 ${size.width} ${height}`}>
        <defs>
          <path
            id={id}
            d={
              slalom
                ? d
                : `M ${x - length} ${middle} L ${x} ${middle} ${d.replace(/^M [\d.-]+,[\d.-]+ /, '')} L ${x + width + length} ${middle}`
            }
          />
        </defs>
        <path d={d} stroke="var(--ribbon-bg,#fff)" strokeWidth={stroke} fill="none" />
        <text ref={sample} y="-9999" fontSize={size.font} fontWeight="600">
          {repeated}
        </text>
        <text fontSize={size.font} fontWeight="600" fill="#255b73" dy={size.font * 0.23}>
          <textPath href={`#${id}`} startOffset={-length}>
            {repeated.repeat(20)}
            <animate
              attributeName="startOffset"
              from={reverse ? -length : 0}
              to={reverse ? 0 : -length}
              dur="20s"
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
}
