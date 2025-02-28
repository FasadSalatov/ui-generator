import { ComponentConfig, ResponsiveConfig } from "./types";

export const RESPONSIVE_CONFIG: ResponsiveConfig = {
  breakpoints: [
    { name: "sm", minWidth: 640 },
    { name: "md", minWidth: 768 },
    { name: "lg", minWidth: 1024 },
    { name: "xl", minWidth: 1280 },
    { name: "2xl", minWidth: 1536 },
  ],
  defaultBreakpoint: "md",
};

export const COMPONENT_CONFIGS: Record<string, ComponentConfig> = {
  Button: {
    name: "Button",
    description: "A button component with various styles and sizes",
    props: [
      {
        name: "variant",
        type: "string",
        description: "The visual style of the button",
        options: ["solid", "outline", "ghost", "link"],
        defaultValue: "solid",
      },
      {
        name: "size",
        type: "string",
        description: "The size of the button",
        options: ["xs", "sm", "md", "lg", "xl"],
        defaultValue: "md",
      },
      {
        name: "color",
        type: "string",
        description: "The color of the button",
        options: ["primary", "secondary", "success", "danger", "warning", "info"],
        defaultValue: "primary",
      },
      {
        name: "rounded",
        type: "string",
        description: "The border radius of the button",
        options: ["none", "sm", "md", "lg", "full"],
        defaultValue: "md",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Whether the button is disabled",
        defaultValue: false,
      },
      {
        name: "fullWidth",
        type: "boolean",
        description: "Whether the button should take up the full width of its container",
        defaultValue: false,
      },
    ],
    variants: {
      variant: {
        solid: "bg-primary-500 text-white hover:bg-primary-600",
        outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
        ghost: "text-primary-500 hover:bg-primary-50",
        link: "text-primary-500 underline hover:text-primary-600",
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-2.5 text-lg",
        xl: "px-6 py-3 text-xl",
      },
      color: {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        success: "bg-green-500 hover:bg-green-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
        info: "bg-cyan-500 hover:bg-cyan-600 text-white",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
  },
  Card: {
    name: "Card",
    description: "A card component with header, body, and footer sections",
    props: [
      {
        name: "variant",
        type: "string",
        description: "The visual style of the card",
        options: ["solid", "outline", "elevated"],
        defaultValue: "solid",
      },
      {
        name: "padding",
        type: "string",
        description: "The padding of the card",
        options: ["none", "sm", "md", "lg"],
        defaultValue: "md",
      },
      {
        name: "rounded",
        type: "string",
        description: "The border radius of the card",
        options: ["none", "sm", "md", "lg"],
        defaultValue: "md",
      },
      {
        name: "shadow",
        type: "string",
        description: "The shadow of the card",
        options: ["none", "sm", "md", "lg"],
        defaultValue: "md",
      },
    ],
    variants: {
      variant: {
        solid: "bg-white",
        outline: "border border-gray-200 bg-white",
        elevated: "bg-white shadow-md",
      },
      padding: {
        none: "p-0",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
    },
  },
  Modal: {
    name: "Modal",
    description: "A modal dialog component",
    props: [
      {
        name: "size",
        type: "string",
        description: "The size of the modal",
        options: ["sm", "md", "lg", "xl", "full"],
        defaultValue: "md",
      },
      {
        name: "position",
        type: "string",
        description: "The position of the modal",
        options: ["center", "top", "right", "bottom", "left"],
        defaultValue: "center",
      },
      {
        name: "closeOnClickOutside",
        type: "boolean",
        description: "Whether to close the modal when clicking outside",
        defaultValue: true,
      },
      {
        name: "closeOnEsc",
        type: "boolean",
        description: "Whether to close the modal when pressing Escape",
        defaultValue: true,
      },
    ],
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full",
      },
      position: {
        center: "items-center justify-center",
        top: "items-start justify-center pt-10",
        right: "items-center justify-end",
        bottom: "items-end justify-center pb-10",
        left: "items-center justify-start",
      },
    },
  },
  Accordion: {
    name: "Accordion",
    description: "An accordion component for toggling content visibility",
    props: [
      {
        name: "variant",
        type: "string",
        description: "The visual style of the accordion",
        options: ["solid", "outline", "ghost"],
        defaultValue: "solid",
      },
      {
        name: "type",
        type: "string",
        description: "The behavior of the accordion",
        options: ["single", "multiple"],
        defaultValue: "single",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "The default open item(s)",
        defaultValue: "",
      },
    ],
    variants: {
      variant: {
        solid: "bg-white",
        outline: "border border-gray-200",
        ghost: "bg-transparent",
      },
    },
  },
  Tabs: {
    name: "Tabs",
    description: "A tabs component for switching between different views",
    props: [
      {
        name: "variant",
        type: "string",
        description: "The visual style of the tabs",
        options: ["solid", "outline", "underline"],
        defaultValue: "solid",
      },
      {
        name: "size",
        type: "string",
        description: "The size of the tabs",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      {
        name: "orientation",
        type: "string",
        description: "The orientation of the tabs",
        options: ["horizontal", "vertical"],
        defaultValue: "horizontal",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "The default selected tab",
        defaultValue: "",
      },
    ],
    variants: {
      variant: {
        solid: "bg-white",
        outline: "border border-gray-200",
        underline: "border-b border-gray-200",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
  },
  Sidebar: {
    name: "Sidebar",
    description: "A sidebar component for navigation",
    props: [
      {
        name: "position",
        type: "string",
        description: "The position of the sidebar",
        options: ["left", "right"],
        defaultValue: "left",
      },
      {
        name: "width",
        type: "string",
        description: "The width of the sidebar",
        options: ["sm", "md", "lg", "xl"],
        defaultValue: "md",
      },
      {
        name: "collapsible",
        type: "boolean",
        description: "Whether the sidebar can be collapsed",
        defaultValue: false,
      },
      {
        name: "collapsed",
        type: "boolean",
        description: "Whether the sidebar is collapsed",
        defaultValue: false,
      },
    ],
    variants: {
      position: {
        left: "left-0",
        right: "right-0",
      },
      width: {
        sm: "w-64",
        md: "w-72",
        lg: "w-80",
        xl: "w-96",
      },
    },
  },
}; 