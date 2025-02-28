"use client";

import { useState, useEffect } from "react";
import { COMPONENT_CONFIGS, RESPONSIVE_CONFIG } from "@/lib/config";
import Link from "next/link";

export default function PreviewPage() {
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<string>("md");
  const [previewWidth, setPreviewWidth] = useState<number>(768);
  const [previewCode, setPreviewCode] = useState<string>("");
  const [previewProps, setPreviewProps] = useState<Record<string, any>>({});
  
  const componentConfig = selectedComponent ? COMPONENT_CONFIGS[selectedComponent] : null;
  
  useEffect(() => {
    if (selectedBreakpoint) {
      const breakpoint = RESPONSIVE_CONFIG.breakpoints.find(
        (b) => b.name === selectedBreakpoint
      );
      if (breakpoint) {
        setPreviewWidth(breakpoint.minWidth);
      }
    }
  }, [selectedBreakpoint]);
  
  useEffect(() => {
    if (componentConfig) {
      // Инициализация свойств компонента значениями по умолчанию
      const initialProps: Record<string, any> = {};
      componentConfig.props.forEach((prop) => {
        initialProps[prop.name] = prop.defaultValue;
      });
      setPreviewProps(initialProps);
      
      // Генерация кода примера
      generatePreviewCode(initialProps);
    }
  }, [componentConfig]);
  
  const generatePreviewCode = (props: Record<string, any>) => {
    if (!componentConfig) return;
    
    let code = `<${componentConfig.name}`;
    
    // Добавление свойств
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
    
    // Закрытие тега компонента
    const componentsWithChildren = ["Card", "Modal", "Accordion", "Tabs", "Sidebar"];
    const hasChildren = componentsWithChildren.includes(componentConfig.name);
    
    if (hasChildren) {
      code += `\n>`;
      
      // Добавление содержимого в зависимости от типа компонента
      switch (selectedComponent) {
        case "Card":
          code += `\n  <CardHeader>
    <h3 className="text-lg font-semibold">Заголовок карточки</h3>
  </CardHeader>
  <CardBody>
    <p>Содержимое карточки</p>
  </CardBody>
  <CardFooter>
    <p className="text-sm text-gray-400">Футер карточки</p>
  </CardFooter>`;
          break;
        case "Modal":
          code += `\n  <DialogHeader>
    <DialogTitle>Заголовок модального окна</DialogTitle>
    <DialogDescription>
      Описание модального окна
    </DialogDescription>
  </DialogHeader>
  <div className="py-4">
    <p>Содержимое модального окна</p>
  </div>
  <DialogFooter>
    <Button variant="outline" color="secondary">Отмена</Button>
    <Button variant="solid" color="primary">Сохранить</Button>
  </DialogFooter>`;
          break;
        case "Accordion":
          code += `\n  <AccordionItem value="item-1">
    <AccordionTrigger>Раздел 1</AccordionTrigger>
    <AccordionContent>
      Содержимое раздела 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Раздел 2</AccordionTrigger>
    <AccordionContent>
      Содержимое раздела 2
    </AccordionContent>
  </AccordionItem>`;
          break;
        case "Tabs":
          code += `\n  <TabsList>
    <TabsTrigger value="tab1">Вкладка 1</TabsTrigger>
    <TabsTrigger value="tab2">Вкладка 2</TabsTrigger>
    <TabsTrigger value="tab3">Вкладка 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Содержимое вкладки 1</TabsContent>
  <TabsContent value="tab2">Содержимое вкладки 2</TabsContent>
  <TabsContent value="tab3">Содержимое вкладки 3</TabsContent>`;
          break;
        case "Sidebar":
          code += `\n  <SidebarHeader>
    <h3 className="font-semibold">Заголовок боковой панели</h3>
  </SidebarHeader>
  <SidebarContent>
    <nav className="space-y-2">
      <a href="#" className="block p-2 hover:bg-gray-700 rounded">Главная</a>
      <a href="#" className="block p-2 hover:bg-gray-700 rounded">Панель управления</a>
      <a href="#" className="block p-2 hover:bg-gray-700 rounded">Настройки</a>
    </nav>
  </SidebarContent>
  <SidebarFooter>
    <p className="text-sm text-gray-400">Футер</p>
  </SidebarFooter>`;
          break;
        default:
          code += `\n  {/* Содержимое компонента */}`;
      }
      
      code += `\n</${componentConfig.name}>`;
    } else {
      if (selectedComponent === "Button") {
        code += `\n>Нажми меня</Button>`;
      } else {
        code += `\n/>`;
      }
    }
    
    setPreviewCode(code);
  };
  
  const handleComponentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(e.target.value);
  };
  
  const handleBreakpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreakpoint(e.target.value);
  };
  
  const handlePropChange = (propName: string, value: any) => {
    setPreviewProps((prevProps) => {
      const newProps = {
        ...prevProps,
        [propName]: value,
      };
      
      // Обновляем код при изменении свойств
      generatePreviewCode(newProps);
      
      return newProps;
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(previewCode);
    
    // Показываем уведомление о копировании
    const notification = document.getElementById('copy-notification');
    if (notification) {
      notification.classList.remove('opacity-0');
      notification.classList.add('opacity-100');
      
      setTimeout(() => {
        notification.classList.remove('opacity-100');
        notification.classList.add('opacity-0');
      }, 2000);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Предпросмотр компонентов</h1>
      <p className="text-gray-300 mb-8">
        Просмотрите, как ваши компоненты будут выглядеть на разных размерах экрана.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
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
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Выберите контрольную точку
          </label>
          <select
            value={selectedBreakpoint}
            onChange={handleBreakpointChange}
            className="form-select"
          >
            {RESPONSIVE_CONFIG.breakpoints.map((breakpoint) => (
              <option key={breakpoint.name} value={breakpoint.name}>
                {breakpoint.name} (≥{breakpoint.minWidth}px)
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Пользовательская ширина (px)
          </label>
          <input
            type="number"
            value={previewWidth}
            onChange={(e) => setPreviewWidth(parseInt(e.target.value) || 0)}
            className="form-input"
            min="320"
            max="1920"
          />
        </div>
      </div>
      
      {componentConfig && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Настройка свойств</h2>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <div className="space-y-4">
                  {componentConfig.props.map((prop) => (
                    <div key={prop.name}>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        {prop.name}
                      </label>
                      
                      {prop.type === "string" && prop.options && (
                        <select
                          value={previewProps[prop.name] || ""}
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
                            checked={previewProps[prop.name] || false}
                            onChange={(e) => handlePropChange(prop.name, e.target.checked)}
                            className="form-checkbox"
                          />
                          <span className="ml-2 text-gray-300">Включено</span>
                        </div>
                      )}
                      
                      {prop.type === "string" && !prop.options && (
                        <input
                          type="text"
                          value={previewProps[prop.name] || ""}
                          onChange={(e) => handlePropChange(prop.name, e.target.value)}
                          className="form-input"
                          placeholder={prop.name}
                        />
                      )}
                      
                      {prop.type === "number" && (
                        <input
                          type="number"
                          value={previewProps[prop.name] || 0}
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
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Предпросмотр</h2>
              <div className="border border-gray-700 rounded-md p-4 overflow-x-auto bg-gray-800">
                <div
                  style={{
                    width: `${previewWidth}px`,
                    maxWidth: "100%",
                    margin: "0 auto",
                    padding: "16px",
                    border: "1px dashed #4b5563",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="text-sm text-gray-400 mb-2">
                    Предпросмотр при ширине {previewWidth}px
                  </div>
                  <div className="component-preview">
                    <div className="text-center text-gray-300">
                      {selectedComponent === "Button" && (
                        <button 
                          className={`px-4 py-2 rounded-md ${
                            previewProps.variant === "solid" 
                              ? `bg-${previewProps.color || "blue"}-600 text-white hover:bg-${previewProps.color || "blue"}-700` 
                              : previewProps.variant === "outline"
                                ? `border border-${previewProps.color || "blue"}-600 text-${previewProps.color || "blue"}-400 hover:bg-${previewProps.color || "blue"}-900/10`
                                : previewProps.variant === "ghost"
                                  ? `text-${previewProps.color || "blue"}-400 hover:bg-${previewProps.color || "blue"}-900/10`
                                  : `text-${previewProps.color || "blue"}-400 underline hover:text-${previewProps.color || "blue"}-300`
                          } ${
                            previewProps.size === "xs" ? "text-xs" : 
                            previewProps.size === "sm" ? "text-sm" : 
                            previewProps.size === "lg" ? "text-lg" : 
                            previewProps.size === "xl" ? "text-xl" : ""
                          } ${
                            previewProps.rounded === "none" ? "rounded-none" :
                            previewProps.rounded === "sm" ? "rounded-sm" :
                            previewProps.rounded === "lg" ? "rounded-lg" :
                            previewProps.rounded === "full" ? "rounded-full" : ""
                          } ${
                            previewProps.disabled ? "opacity-50 cursor-not-allowed" : ""
                          } ${
                            previewProps.fullWidth ? "w-full" : ""
                          }`}
                          disabled={previewProps.disabled}
                        >
                          Нажми меня
                        </button>
                      )}
                      
                      {selectedComponent === "Card" && (
                        <div className={`border ${previewProps.variant === "outline" ? `border-gray-600` : "border-transparent"} rounded-md overflow-hidden ${previewProps.shadow === "lg" ? "shadow-lg" : previewProps.shadow === "md" ? "shadow-md" : previewProps.shadow === "sm" ? "shadow-sm" : ""}`}>
                          <div className="p-3 border-b border-gray-600 font-medium">Заголовок карточки</div>
                          <div className={`p-${previewProps.padding || "4"}`}>Содержимое карточки</div>
                          <div className="p-3 border-t border-gray-600 text-sm text-gray-400">Футер карточки</div>
                        </div>
                      )}
                      
                      {selectedComponent === "Modal" && (
                        <div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Открыть модальное окно
                          </button>
                          <div className={`mt-4 p-4 border border-gray-600 rounded-md ${previewProps.size === "sm" ? "max-w-sm" : previewProps.size === "lg" ? "max-w-lg" : previewProps.size === "xl" ? "max-w-xl" : previewProps.size === "full" ? "w-full" : "max-w-md"}`}>
                            <div className="font-medium mb-2">Модальное окно</div>
                            <div className="text-sm mb-4">Содержимое модального окна</div>
                            <div className="flex justify-end gap-2">
                              <button className="px-3 py-1 bg-gray-600 text-white rounded">Отмена</button>
                              <button className="px-3 py-1 bg-blue-600 text-white rounded">Сохранить</button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedComponent === "Accordion" && (
                        <div className="border border-gray-600 rounded-md overflow-hidden divide-y divide-gray-600">
                          <div>
                            <div className="p-3 flex justify-between items-center">
                              <span>Раздел 1</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <div className="p-3 bg-gray-800">Содержимое раздела 1</div>
                          </div>
                          <div>
                            <div className="p-3">Раздел 2</div>
                          </div>
                        </div>
                      )}
                      
                      {selectedComponent === "Tabs" && (
                        <div>
                          <div className="flex border-b border-gray-600">
                            <div className="px-4 py-2 border-b-2 border-blue-500">Вкладка 1</div>
                            <div className="px-4 py-2">Вкладка 2</div>
                            <div className="px-4 py-2">Вкладка 3</div>
                          </div>
                          <div className="p-4">Содержимое вкладки 1</div>
                        </div>
                      )}
                      
                      {selectedComponent === "Sidebar" && (
                        <div className="flex">
                          <div className="w-48 border-r border-gray-600 p-3">
                            <div className="font-medium mb-3">Боковая панель</div>
                            <nav className="space-y-1">
                              <div className="p-2 bg-gray-600 rounded">Главная</div>
                              <div className="p-2">Панель управления</div>
                              <div className="p-2">Настройки</div>
                            </nav>
                          </div>
                          <div className="p-4 flex-1">Основное содержимое</div>
                        </div>
                      )}
                      
                      {!["Button", "Card", "Modal", "Accordion", "Tabs", "Sidebar"].includes(selectedComponent) && (
                        "Предпросмотр компонента"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Код компонента</h2>
                <button
                  onClick={copyToClipboard}
                  className="btn btn-primary text-sm"
                >
                  Копировать код
                </button>
              </div>
              <div className="code-block">
                <pre className="text-sm text-gray-300 overflow-auto">
                  <code>{previewCode}</code>
                </pre>
              </div>
              
              <div id="copy-notification" className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-md opacity-0 transition-opacity duration-300">
                Скопировано!
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Как использовать</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  1. Выберите компонент из выпадающего списка.
                </p>
                <p>
                  2. Настройте свойства компонента по вашему вкусу.
                </p>
                <p>
                  3. Просмотрите, как компонент будет выглядеть на разных размерах экрана.
                </p>
                <p>
                  4. Скопируйте сгенерированный код и используйте его в своем проекте.
                </p>
                <div className="mt-4">
                  <Link
                    href={`/generator/${selectedComponent?.toLowerCase()}`}
                    className={`btn btn-primary ${!selectedComponent ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-disabled={!selectedComponent}
                  >
                    {selectedComponent 
                      ? `Настроить ${componentConfig?.name} в генераторе` 
                      : 'Выберите компонент для настройки'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!componentConfig && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Выберите компонент для предпросмотра</h2>
          <p className="text-gray-300 mb-6">
            Выберите компонент из выпадающего списка выше, чтобы увидеть его предпросмотр и настроить его свойства.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {Object.entries(COMPONENT_CONFIGS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedComponent(key)}
                className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
              >
                <div className="font-medium mb-1">{config.name}</div>
                <div className="text-sm text-gray-400">{config.description.split('.')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="btn btn-secondary mr-4"
        >
          На главную
        </Link>
        <Link
          href="/components"
          className="btn btn-primary"
        >
          Все компоненты
        </Link>
      </div>
    </div>
  );
} 