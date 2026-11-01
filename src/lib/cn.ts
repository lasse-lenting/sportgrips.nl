/** Joins class names, skipping falsy values. Keep class strings literal so Tailwind can detect them. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
