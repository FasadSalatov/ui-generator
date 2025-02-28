import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatClassName(className: string): string {
  return className
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .join(" ");
}

export function getBreakpointValue(breakpoint: string): number {
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };
  
  return breakpoints[breakpoint as keyof typeof breakpoints] || 0;
}

export function generateResponsiveClasses(
  baseClass: string,
  breakpoints: Record<string, string>
): string {
  const classes = [baseClass];
  
  Object.entries(breakpoints).forEach(([breakpoint, value]) => {
    classes.push(`${breakpoint}:${value}`);
  });
  
  return classes.join(" ");
} 