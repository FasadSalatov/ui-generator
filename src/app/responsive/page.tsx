"use client";

import { useState, useEffect } from "react";
import { COMPONENT_CONFIGS, RESPONSIVE_CONFIG } from "@/lib/config";
import { generateResponsiveComponent } from "@/lib/generator";
import { ResponsiveValue } from "@/lib/types";
import Link from "next/link";

export default function ResponsiveGenerator() {
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [responsiveProps, setResponsiveProps] = useState<Record<string, ResponsiveValue<any>>>({});
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [activeBreakpoint, setActiveBreakpoint] = useState<string>("base");
  
  const componentConfig = selectedComponent ? COMPONENT_CONFIGS[selectedComponent] : null;
  
  useEffect(() => {
    if (componentConfig) {
      // Initialize props with default values
      const initialProps: Record<string, ResponsiveValue<any>> = {};
      componentConfig.props.forEach((prop) => {
        if (prop.defaultValue !== undefined) {
          initialProps[prop.name] = prop.defaultValue;
        }
      });
      setResponsiveProps(initialProps);
    }
  }, [componentConfig]);
  
  useEffect(() => {
    if (componentConfig && Object.keys(responsiveProps).length > 0) {
      try {
        const code = generateResponsiveComponent(selectedComponent, responsiveProps);
        setGeneratedCode(code);
      } catch (error) {
        console.error("Error generating responsive component code:", error);
      }
    }
  }, [componentConfig, responsiveProps, selectedComponent]);
  
  const handleComponentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(e.target.value);
    setActiveBreakpoint("base");
  };
  
  const handlePropChange = (propName: string, value: any) => {
    setResponsiveProps((prevProps) => {
      const updatedProps = { ...prevProps };
      
      if (activeBreakpoint === "base") {
        // For base breakpoint, set the value directly
        updatedProps[propName] = value;
      } else {
        // For other breakpoints, update the responsive object
        const currentValue = updatedProps[propName];
        
        if (typeof currentValue === "object" && currentValue !== null) {
          // If it's already a responsive object, update the breakpoint
          updatedProps[propName] = {
            ...currentValue,
            [activeBreakpoint]: value,
          };
        } else {
          // If it's a base value, convert to responsive object
          updatedProps[propName] = {
            [activeBreakpoint]: value,
          };
        }
      }
      
      return updatedProps;
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getCurrentPropValue = (propName: string) => {
    const propValue = responsiveProps[propName];
    
    if (activeBreakpoint === "base") {
      return typeof propValue === "object" ? undefined : propValue;
    } else {
      return typeof propValue === "object" ? propValue[activeBreakpoint] : undefined;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Генератор адаптивных компонентов</h1>
      <p className="text-gray-300 mb-8">
        Создавайте компоненты, которые адаптируются к разным размерам экрана.
      </p>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Выберите компонент
        </label>
        <select
          value={selectedComponent}
          onChange={handleComponentChange}
          className="form-select"
        >
          <option value="">Выберите компонент</option>
          {Object.entries(COMPONENT_CONFIGS).map(([key, config]) => (
            <option key={key} value={key}>
              {config.name}
            </option>
          ))}
        </select>
      </div>
      
      {componentConfig && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-gray-100">Настройка свойств по контрольным точкам</h2>
              
              <div className="space-y-8">
                {RESPONSIVE_CONFIG.breakpoints.map((breakpoint) => (
                  <div key={breakpoint.name} className="border-t border-gray-700 pt-4 first:border-t-0 first:pt-0">
                    <h3 className="text-lg font-medium mb-4 text-gray-200">
                      {breakpoint.name} (≥{breakpoint.minWidth}px)
                    </h3>
                    
                    <div className="space-y-4">
                      {componentConfig.props.map((prop) => (
                        <div key={`${breakpoint.name}-${prop.name}`}>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            {prop.name}
                          </label>
                          
                          {prop.type === "string" && prop.options && (
                            <select
                              value={responsiveProps[breakpoint.name]?.[prop.name] || ""}
                              onChange={(e) => handlePropChange(prop.name, e.target.value)}
                              className="form-select"
                            >
                              {prop.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )}
                          
                          {prop.type === "boolean" && (
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={responsiveProps[breakpoint.name]?.[prop.name] || false}
                                onChange={(e) => handlePropChange(prop.name, e.target.checked)}
                                className="form-checkbox"
                              />
                              <span className="ml-2 text-gray-300">Включено</span>
                            </div>
                          )}
                          
                          {prop.type === "string" && !prop.options && (
                            <input
                              type="text"
                              value={responsiveProps[breakpoint.name]?.[prop.name] || ""}
                              onChange={(e) => handlePropChange(prop.name, e.target.value)}
                              className="form-input"
                            />
                          )}
                          
                          {prop.type === "number" && (
                            <input
                              type="number"
                              value={responsiveProps[breakpoint.name]?.[prop.name] || 0}
                              onChange={(e) => handlePropChange(prop.name, parseInt(e.target.value))}
                              className="form-input"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Сгенерированный код</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  {copied ? "Скопировано!" : "Копировать"}
                </button>
              </div>
              <div className="bg-gray-900 p-4 rounded-md">
                <pre className="text-sm text-gray-300 overflow-auto">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Как это работает</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Адаптивные компоненты используют объекты для определения различных значений свойств на разных размерах экрана.
                </p>
                <p>
                  Например, кнопка может быть большой на десктопе и маленькой на мобильных устройствах:
                </p>
                <pre className="bg-gray-900 p-3 rounded-md text-sm text-gray-300 overflow-auto">
                  <code>{`<Button
  size={{
    sm: "sm",
    md: "md",
    lg: "lg"
  }}
  variant="solid"
  color="primary"
>
  Адаптивная кнопка
</Button>`}</code>
                </pre>
                <p>
                  Компонент автоматически выберет правильное значение в зависимости от текущего размера экрана.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 flex justify-center">
        <Link
          href="/components"
          className="btn btn-secondary mr-4"
        >
          Назад к компонентам
        </Link>
        {selectedComponent && (
          <Link
            href={`/preview?component=${selectedComponent}`}
            className="btn btn-primary"
          >
            Предпросмотр компонента
          </Link>
        )}
      </div>
    </div>
  );
} 