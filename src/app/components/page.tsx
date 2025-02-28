import { COMPONENT_CONFIGS } from "@/lib/config";
import Link from "next/link";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-violet-900 text-white px-4">
        <div className="container mx-auto text-center max-w-4xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            UI Компоненты
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Просмотрите нашу коллекцию настраиваемых UI компонентов для ваших Next.js приложений.
          </p>
        </div>
      </section>
      
      {/* Components Grid */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(COMPONENT_CONFIGS).map(([key, config], index) => (
              <div
                key={key}
                className="card hover:shadow-xl transition-all duration-300 animate-slide-up overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-violet-500"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold">{config.name}</h2>
                    <div className="feature-icon">
                      {getComponentIcon(key)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">{config.description}</p>
                  
                  <h3 className="text-sm font-medium text-gray-200 mb-3">Свойства:</h3>
                  <ul className="text-sm text-gray-300 mb-6 space-y-2">
                    {config.props.slice(0, 3).map((prop) => (
                      <li key={prop.name} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                        <div>
                          <span className="font-medium text-blue-400">{prop.name}</span>
                          <span className="text-gray-400 block text-xs mt-0.5">{prop.description}</span>
                        </div>
                      </li>
                    ))}
                    {config.props.length > 3 && (
                      <li className="text-blue-400 text-sm">+ еще {config.props.length - 3} свойств</li>
                    )}
                  </ul>
                  
                  <div className="flex justify-end">
                    <Link
                      href={`/generator/${key.toLowerCase()}`}
                      className="btn btn-primary group"
                    >
                      Настроить
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Responsive Section */}
      <section className="py-16 bg-gray-800 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center gradient-heading text-3xl font-bold mb-12">Адаптивные компоненты</h2>
          
          <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden border border-gray-600">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-semibold mb-4">Генератор адаптивных компонентов</h3>
                <p className="text-gray-300 mb-6">
                  Используйте наш генератор адаптивных компонентов для создания элементов интерфейса, 
                  которые автоматически адаптируются к различным размерам экрана. Вы можете настроить 
                  свойства для каждой контрольной точки (sm, md, lg, xl, 2xl).
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="feature-icon mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-200">Оптимизировано для мобильных устройств</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="feature-icon mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-200">Адаптируется к планшетам</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="feature-icon mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-200">Идеально для десктопов</p>
                  </div>
                </div>
                
                <Link
                  href="/responsive"
                  className="btn btn-primary inline-flex items-center"
                >
                  Перейти к генератору адаптивных компонентов
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="md:w-1/2 bg-gray-800 p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-32 h-48 bg-blue-900/30 rounded-lg shadow-md flex items-center justify-center">
                    <span className="text-xs text-gray-400">sm</span>
                  </div>
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-40 h-64 bg-blue-800/30 rounded-lg shadow-md flex items-center justify-center">
                    <span className="text-xs text-gray-400">md</span>
                  </div>
                  <div className="w-48 h-80 bg-blue-700/30 rounded-lg shadow-md flex items-center justify-center">
                    <span className="text-xs text-gray-400">lg</span>
                  </div>
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-40 h-64 bg-blue-800/30 rounded-lg shadow-md flex items-center justify-center">
                    <span className="text-xs text-gray-400">xl</span>
                  </div>
                  <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-32 h-48 bg-blue-900/30 rounded-lg shadow-md flex items-center justify-center">
                    <span className="text-xs text-gray-400">2xl</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Preview Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center gradient-heading text-3xl font-bold mb-12">Предпросмотр компонентов</h2>
          
          <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden border border-gray-600">
            <div className="md:flex flex-row-reverse">
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-semibold mb-4">Инструмент предпросмотра</h3>
                <p className="text-gray-300 mb-6">
                  Используйте наш инструмент предпросмотра, чтобы увидеть, как ваши компоненты будут выглядеть 
                  на различных устройствах. Вы можете настроить ширину для имитации различных экранов.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="feature-icon mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-200">Предпросмотр в реальном времени</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="feature-icon mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-200">Настраиваемые размеры экрана</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="feature-icon mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <p className="text-gray-200">Примеры кода использования</p>
                  </div>
                </div>
                
                <Link
                  href="/preview"
                  className="btn btn-primary inline-flex items-center"
                >
                  Перейти к предпросмотру
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="md:w-1/2 bg-gray-800 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="border-2 border-blue-500 rounded-lg p-4 bg-gray-700 shadow-lg">
                    <div className="h-6 w-3/4 bg-blue-900/30 rounded mb-3"></div>
                    <div className="h-4 w-full bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 w-4/6 bg-gray-600 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-8 w-20 bg-blue-500 rounded"></div>
                      <div className="h-8 w-20 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-900/10 rounded-lg z-[-1]"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-violet-900/10 rounded-lg z-[-1]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-900 to-violet-900 text-white px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Готовы создать свои компоненты?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generator/button"
              className="btn px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-medium"
            >
              Начать с кнопок
            </Link>
            <Link
              href="/responsive"
              className="btn px-6 py-2 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium"
            >
              Создать адаптивный компонент
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Вспомогательная функция для получения иконки компонента
function getComponentIcon(componentKey: string) {
  switch (componentKey) {
    case "Button":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      );
    case "Card":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    case "Modal":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case "Accordion":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    case "Tabs":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      );
    case "Sidebar":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
  }
} 