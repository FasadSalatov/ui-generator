import { COMPONENT_CONFIGS } from "@/lib/config";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-900">
        <div className="container mx-auto text-center max-w-4xl animate-fade-in">
          <h1 className="gradient-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            UI Component Generator
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Создавайте красивые, адаптивные UI компоненты для ваших Next.js проектов
            с помощью нашего интуитивного генератора.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/components"
              className="btn btn-primary text-lg px-8 py-3 rounded-lg animate-pulse-slow"
            >
              Начать работу
            </Link>
            <Link
              href="/preview"
              className="btn btn-secondary text-lg px-8 py-3 rounded-lg"
            >
              Предпросмотр компонентов
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center gradient-heading mb-16">Возможности</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.1s"}}>
              <div className="feature-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Настраиваемые компоненты</h3>
              <p className="text-gray-300">
                Выбирайте из множества компонентов и настраивайте их под ваши потребности
                с помощью интуитивного интерфейса.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.2s"}}>
              <div className="feature-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Адаптивный дизайн</h3>
              <p className="text-gray-300">
                Создавайте компоненты, которые отлично выглядят на любых устройствах,
                от мобильных телефонов до больших экранов.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.3s"}}>
              <div className="feature-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Готовый код</h3>
              <p className="text-gray-300">
                Получайте готовый к использованию код компонентов, который можно
                легко интегрировать в ваш проект.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.4s"}}>
              <div className="feature-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Предпросмотр в реальном времени</h3>
              <p className="text-gray-300">
                Мгновенно просматривайте, как будут выглядеть ваши компоненты
                при различных настройках и размерах экрана.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.5s"}}>
              <div className="feature-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Настраиваемые темы</h3>
              <p className="text-gray-300">
                Выбирайте цвета, размеры и стили, чтобы компоненты соответствовали
                дизайну вашего проекта.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.6s"}}>
              <div className="feature-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Быстрая интеграция</h3>
              <p className="text-gray-300">
                Копируйте сгенерированный код и вставляйте его прямо в ваш проект
                без дополнительных настроек.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Components Preview Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center gradient-heading mb-16">Доступные компоненты</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Component 1 */}
            <Link href="/generator/button" className="card group">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors animated-border">Кнопки</h3>
                <p className="text-gray-300 mb-4">
                  Настраиваемые кнопки различных стилей, размеров и цветов.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md">Основная</span>
                  <span className="px-4 py-2 bg-gray-700 text-gray-100 text-sm rounded-md">Вторичная</span>
                </div>
              </div>
            </Link>
            
            {/* Component 2 */}
            <Link href="/generator/card" className="card group">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors animated-border">Карточки</h3>
                <p className="text-gray-300 mb-4">
                  Карточки для отображения контента с различными стилями и опциями.
                </p>
                <div className="mt-4 p-3 border border-gray-700 rounded-md bg-gray-700">
                  <div className="text-sm font-medium">Пример карточки</div>
                  <div className="text-xs text-gray-400 mt-1">Содержимое карточки</div>
                </div>
              </div>
            </Link>
            
            {/* Component 3 */}
            <Link href="/generator/modal" className="card group">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors animated-border">Модальные окна</h3>
                <p className="text-gray-300 mb-4">
                  Диалоговые окна для отображения важной информации или форм.
                </p>
                <div className="mt-4 p-3 border border-gray-700 rounded-md text-center bg-gray-700">
                  <div className="text-sm font-medium">Заголовок модального окна</div>
                  <div className="text-xs text-gray-400 mt-1">Содержимое модального окна</div>
                </div>
              </div>
            </Link>
            
            {/* More Components Button */}
            <Link href="/components" className="col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-8">
              <button className="btn btn-primary">
                Посмотреть все компоненты
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-violet-900 text-white px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы создать свои компоненты?
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Начните использовать наш генератор UI компонентов прямо сейчас и создавайте
            красивые, адаптивные интерфейсы для ваших проектов.
          </p>
          <Link
            href="/components"
            className="btn px-8 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-lg font-medium"
          >
            Начать бесплатно
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center px-4">
        <div className="container mx-auto">
          <p className="text-gray-300">
            © 2025 By Fasad with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
