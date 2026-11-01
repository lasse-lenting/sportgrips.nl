'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
export function Reveal({
  children,
  className = '',
  delay = 0,
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: reduced ? 0 : 1,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
