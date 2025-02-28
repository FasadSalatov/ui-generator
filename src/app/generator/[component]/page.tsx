"use client";

import { useState, useEffect } from "react";
import { COMPONENT_CONFIGS } from "@/lib/config";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PropConfig } from "@/lib/types";

export default function ComponentGenerator() {
  const params = useParams();
  const componentType = params.component as string;
  
  const componentConfig = COMPONENT_CONFIGS[componentType.charAt(0).toUpperCase() + componentType.slice(1)];
  
  const [props, setProps] = useState<Record<string, any>>({});
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  
  useEffect(() => {
    if (componentConfig) {
      // Initialize props with default values
      const initialProps: Record<string, any> = {};
      
      componentConfig.props.forEach((prop) => {
        initialProps[prop.name] = prop.defaultValue;
      });
      
      setProps(initialProps);
    }
  }, [componentConfig]);
  
  useEffect(() => {
    if (componentConfig && Object.keys(props).length > 0) {
      generateComponentCode();
    }
  }, [props, componentConfig]);
  
  const handlePropChange = (propName: string, value: any) => {
    setProps((prevProps) => ({
      ...prevProps,
      [propName]: value,
    }));
  };
  
  const generateComponentCode = () => {
    if (!componentConfig) return;
    
    let code = `<${componentConfig.name}`;
    
    // Add props
    Object.entries(props).forEach(([propName, propValue]) => {
      if (propValue !== undefined && propValue !== "") {
        if (typeof propValue === "string") {
          code += `\n  ${propName}="${propValue}"`;
        } else if (typeof propValue === "boolean") {
          if (propValue) {
            code += `\n  ${propName}`;
          }
        } else {
          code += `\n  ${propName}={${JSON.stringify(propValue)}}`;
        }
      }
    });
    
    // Close component tag
    // Предполагаем, что компоненты с детьми - это Card, Modal, Accordion, Tabs, Sidebar
    const componentsWithChildren = ["Card", "Modal", "Accordion", "Tabs", "Sidebar"];
    const hasChildren = componentsWithChildren.includes(componentConfig.name);
    
    if (hasChildren) {
      code += `\n>`;
      code += `\n  {/* Component content */}`;
      code += `\n</${componentConfig.name}>`;
    } else {
      code += `\n/>`;
    }
    
    setGeneratedCode(code);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  if (!componentConfig) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-100">
        <h1 className="text-3xl font-bold mb-4">Компонент не найден</h1>
        <p className="text-gray-300 mb-8">
          Компонент &quot;{componentType}&quot; не найден в конфигурации.
        </p>
        <Link
          href="/"
          className="btn btn-primary"
        >
          Вернуться на главную
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">
        Генератор компонента {componentConfig.name}
      </h1>
      <p className="text-gray-300 mb-8">
        Настройте свойства компонента {componentConfig.name} и получите готовый код.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Настройка свойств</h2>
          
          <div className="space-y-4">
            {componentConfig.props.map((prop: PropConfig) => (
              <div key={prop.name}>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  {prop.name}
                </label>
                
                {prop.type === "string" && prop.options && (
                  <select
                    value={props[prop.name] || ""}
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
                      checked={props[prop.name] || false}
                      onChange={(e) => handlePropChange(prop.name, e.target.checked)}
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-gray-300">Включено</span>
                  </div>
                )}
                
                {prop.type === "string" && !prop.options && (
                  <input
                    type="text"
                    value={props[prop.name] || ""}
                    onChange={(e) => handlePropChange(prop.name, e.target.value)}
                    className="form-input"
                    placeholder={prop.name}
                  />
                )}
                
                {prop.type === "number" && (
                  <input
                    type="number"
                    value={props[prop.name] || 0}
                    onChange={(e) => handlePropChange(prop.name, parseInt(e.target.value))}
                    className="form-input"
                  />
                )}
                
                {prop.description && (
                  <p className="mt-1 text-sm text-gray-400">
                    {prop.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-700">
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
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Предпросмотр</h2>
            <div className="bg-gray-700 p-4 rounded-md">
              <div className="text-center text-gray-300">
                {componentType === "button" && (
                  <button 
                    className={`px-4 py-2 rounded-md ${
                      props.variant === "solid" 
                        ? `bg-${props.color || "blue"}-600 text-white hover:bg-${props.color || "blue"}-700` 
                        : `border border-${props.color || "blue"}-600 text-${props.color || "blue"}-600 hover:bg-${props.color || "blue"}-50`
                    } ${
                      props.size === "sm" ? "text-sm" : props.size === "lg" ? "text-lg" : ""
                    }`}
                  >
                    Пример кнопки
                  </button>
                )}
                
                {componentType === "card" && (
                  <div className={`border ${props.variant === "outline" ? `border-gray-600` : "border-transparent"} rounded-md overflow-hidden ${props.shadow === "lg" ? "shadow-lg" : props.shadow === "md" ? "shadow-md" : props.shadow === "sm" ? "shadow-sm" : ""}`}>
                    <div className="p-3 border-b border-gray-600 font-medium">Заголовок карточки</div>
                    <div className={`p-${props.padding || "4"}`}>Содержимое карточки</div>
                    <div className="p-3 border-t border-gray-600 text-sm text-gray-400">Футер карточки</div>
                  </div>
                )}
                
                {!["button", "card"].includes(componentType) && (
                  <p>Предпросмотр для этого компонента в разработке</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Link
          href="/components"
          className="btn btn-secondary mr-4"
        >
          Назад к компонентам
        </Link>
        <Link
          href={`/preview?component=${componentConfig.name}`}
          className="btn btn-primary"
        >
          Предпросмотр компонента
        </Link>
      </div>
    </div>
  );
} 