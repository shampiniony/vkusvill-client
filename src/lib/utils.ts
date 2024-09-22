import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHue(coefficient: number) {
  return `hsla(${150 * (1 - coefficient)}, 100%, 85%, 1)`;
}
