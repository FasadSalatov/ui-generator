import { COMPONENT_CONFIGS, RESPONSIVE_CONFIG } from "./config";
import { ComponentConfig, GeneratedComponent, PropConfig, ResponsiveValue } from "./types";
import { formatClassName, generateResponsiveClasses } from "./utils";

export function generateComponentCode(
  componentType: string,
  props: Record<string, any> = {}
): string {
  const config = COMPONENT_CONFIGS[componentType];
  
  if (!config) {
    throw new Error(`Component type "${componentType}" not found`);
  }
  
  const componentName = config.name;
  const propsWithDefaults = getPropsWithDefaults(config, props);
  
  let code = generateComponentTemplate(componentName, config, propsWithDefaults);
  
  return code;
}

function getPropsWithDefaults(
  config: ComponentConfig,
  userProps: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};
  
  // Apply default values from config
  config.props.forEach((prop) => {
    if (prop.defaultValue !== undefined) {
      result[prop.name] = prop.defaultValue;
    }
  });
  
  // Override with user-provided props
  Object.entries(userProps).forEach(([key, value]) => {
    result[key] = value;
  });
  
  return result;
}

function generateComponentTemplate(
  componentName: string,
  config: ComponentConfig,
  props: Record<string, any>
): string {
  switch (componentName) {
    case "Button":
      return generateButtonCode(config, props);
    case "Card":
      return generateCardCode(config, props);
    case "Modal":
      return generateModalCode(config, props);
    case "Accordion":
      return generateAccordionCode(config, props);
    case "Tabs":
      return generateTabsCode(config, props);
    case "Sidebar":
      return generateSidebarCode(config, props);
    default:
      return `// Component ${componentName} not implemented yet`;
  }
}

function generateButtonCode(
  config: ComponentConfig,
  props: Record<string, any>
): string {
  const { variant, size, color, rounded, disabled, fullWidth } = props;
  
  let className = "";
  
  // Apply variant classes
  if (config.variants?.variant && variant) {
    className += config.variants.variant[variant] + " ";
  }
  
  // Apply size classes
  if (config.variants?.size && size) {
    className += config.variants.size[size] + " ";
  }
  
  // Apply color classes
  if (config.variants?.color && color) {
    className += config.variants.color[color] + " ";
  }
  
  // Apply rounded classes
  if (config.variants?.rounded && rounded) {
    className += config.variants.rounded[rounded] + " ";
  }
  
  // Apply full width class
  if (fullWidth) {
    className += "w-full ";
  }
  
  // Apply disabled classes
  if (disabled) {
    className += "opacity-50 cursor-not-allowed ";
  }
  
  className = formatClassName(className);
  
  return `import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "${variant}";
  size?: "${size}";
  color?: "${color}";
  rounded?: "${rounded}";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "${variant}", size = "${size}", color = "${color}", rounded = "${rounded}", fullWidth = ${fullWidth}, ...props }, ref) => {
    return (
      <button
        className={cn(
          "${className}",
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };`;
}

function generateCardCode(
  config: ComponentConfig,
  props: Record<string, any>
): string {
  const { variant, padding, rounded, shadow } = props;
  
  let className = "";
  
  // Apply variant classes
  if (config.variants?.variant && variant) {
    className += config.variants.variant[variant] + " ";
  }
  
  // Apply padding classes
  if (config.variants?.padding && padding) {
    className += config.variants.padding[padding] + " ";
  }
  
  // Apply rounded classes
  if (config.variants?.rounded && rounded) {
    className += config.variants.rounded[rounded] + " ";
  }
  
  // Apply shadow classes
  if (config.variants?.shadow && shadow) {
    className += config.variants.shadow[shadow] + " ";
  }
  
  className = formatClassName(className);
  
  return `import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "${variant}";
  padding?: "${padding}";
  rounded?: "${rounded}";
  shadow?: "${shadow}";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "${variant}", padding = "${padding}", rounded = "${rounded}", shadow = "${shadow}", ...props }, ref) => {
    return (
      <div
        className={cn(
          "${className}",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("px-4 py-3 border-b border-gray-200", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("px-4 py-3", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardBody.displayName = "CardBody";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("px-4 py-3 border-t border-gray-200", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardBody, CardFooter };`;
}

function generateModalCode(
  config: ComponentConfig,
  props: Record<string, any>
): string {
  const { size, position, closeOnClickOutside, closeOnEsc } = props;
  
  let className = "";
  
  // Apply size classes
  if (config.variants?.size && size) {
    className += config.variants.size[size] + " ";
  }
  
  // Apply position classes
  if (config.variants?.position && position) {
    className += config.variants.position[position] + " ";
  }
  
  className = formatClassName(className);
  
  return `import { forwardRef, HTMLAttributes } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: "${size}";
  position?: "${position}";
}

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, size = "${size}", position = "${position}", children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 grid w-full gap-4 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        "${className}",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};`;
}

function generateAccordionCode(
  config: ComponentConfig,
  props: Record<string, any>
): string {
  const { variant, type, defaultValue } = props;
  
  let className = "";
  
  // Apply variant classes
  if (config.variants?.variant && variant) {
    className += config.variants.variant[variant] + " ";
  }
  
  className = formatClassName(className);
  
  return `import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  variant?: "${variant}";
}

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant = "${variant}", ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "${className}",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 px-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden px-4 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };`;
}

function generateTabsCode(
  config: ComponentConfig,
  props: Record<string, any>
): string {
  const { variant, size, orientation, defaultValue } = props;
  
  let className = "";
  
  // Apply variant classes
  if (config.variants?.variant && variant) {
    className += config.variants.variant[variant] + " ";
  }
  
  // Apply size classes
  if (config.variants?.size && size) {
    className += config.variants.size[size] + " ";
  }
  
  // Apply orientation classes
  if (config.variants?.orientation && orientation) {
    className += config.variants.orientation[orientation] + " ";
  }
  
  className = formatClassName(className);
  
  return `import { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: "${variant}";
  size?: "${size}";
  orientation?: "${orientation}";
}

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "${variant}", size = "${size}", orientation = "${orientation}", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center",
      orientation === "horizontal" ? "flex-row" : "flex-col",
      "${className}",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };`;
}

function generateSidebarCode(
  config: ComponentConfig,
  props: Record<string, any>
): string {
  const { position, width, collapsible, collapsed } = props;
  
  let className = "";
  
  // Apply position classes
  if (config.variants?.position && position) {
    className += config.variants.position[position] + " ";
  }
  
  // Apply width classes
  if (config.variants?.width && width) {
    className += config.variants.width[width] + " ";
  }
  
  className = formatClassName(className);
  
  return `import { forwardRef, HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  position?: "${position}";
  width?: "${width}";
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ 
    className, 
    position = "${position}", 
    width = "${width}", 
    collapsible = ${collapsible}, 
    collapsed = ${collapsed}, 
    onCollapseChange,
    children,
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    
    const handleToggleCollapse = () => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapseChange?.(newCollapsed);
    };
    
    return (
      <div
        className={cn(
          "fixed top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300",
          "${className}",
          isCollapsed ? "w-16" : undefined,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        
        {collapsible && (
          <button
            className="absolute top-4 -right-3 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-700"
            onClick={handleToggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

const SidebarHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("p-4 border-b border-gray-200", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("p-4 overflow-y-auto", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

SidebarContent.displayName = "SidebarContent";

const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("p-4 border-t border-gray-200 mt-auto", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };`;
}

export function generateResponsiveComponent(
  componentType: string,
  responsiveProps: Record<string, ResponsiveValue<any>> = {}
): string {
  const config = COMPONENT_CONFIGS[componentType];
  
  if (!config) {
    throw new Error(`Component type "${componentType}" not found`);
  }
  
  const baseProps: Record<string, any> = {};
  const breakpointProps: Record<string, Record<string, any>> = {};
  
  // Separate base props and responsive props
  Object.entries(responsiveProps).forEach(([propName, propValue]) => {
    if (typeof propValue === "object" && propValue !== null) {
      // This is a responsive prop
      Object.entries(propValue as Record<string, any>).forEach(([breakpoint, value]) => {
        if (!breakpointProps[breakpoint]) {
          breakpointProps[breakpoint] = {};
        }
        breakpointProps[breakpoint][propName] = value;
      });
    } else {
      // This is a base prop
      baseProps[propName] = propValue;
    }
  });
  
  // Generate base component
  const baseComponent = generateComponentCode(componentType, baseProps);
  
  // Add responsive variants
  const responsiveCode = generateResponsiveVariants(componentType, breakpointProps);
  
  return baseComponent + "\n\n" + responsiveCode;
}

function generateResponsiveVariants(
  componentType: string,
  breakpointProps: Record<string, Record<string, any>>
): string {
  // This is a simplified example - in a real implementation, you would generate
  // responsive variants based on the component type and breakpoint props
  
  return `// Responsive variants for ${componentType}
// Example usage:
// <${componentType} 
//   {...baseProps}
//   className={cn(
//     baseClassName,
//     "sm:hidden md:block lg:flex"
//   )}
// />`;
}
