import { ReactNode } from "react";

export type VariantProps<T> = {
  [K in keyof T]?: keyof T[K];
};

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Color = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type Variant = "solid" | "outline" | "ghost" | "link";
export type Rounded = "none" | "sm" | "md" | "lg" | "full";

export type ResponsiveValue<T> = T | { [key: string]: T };

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ComponentConfig {
  name: string;
  description: string;
  props: PropConfig[];
  defaultProps?: Record<string, any>;
  variants?: Record<string, Record<string, string>>;
}

export interface PropConfig {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: any;
  options?: string[];
}

export interface GeneratedComponent {
  name: string;
  code: string;
  preview: ReactNode;
}

export interface Breakpoint {
  name: string;
  minWidth: number;
}

export interface ResponsiveConfig {
  breakpoints: Breakpoint[];
  defaultBreakpoint: string;
} 