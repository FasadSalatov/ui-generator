import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UI Component Generator",
  description: "Generate customizable UI components for your Next.js applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-md flex items-center justify-center text-white font-bold">
                  UI
                </div>
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  UI Generator
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-300 hover:text-blue-400 animated-border">
                  Главная
                </Link>
                <Link href="/components" className="text-gray-300 hover:text-blue-400 animated-border">
                  Компоненты
                </Link>
                <Link href="/responsive" className="text-gray-300 hover:text-blue-400 animated-border">
                  Адаптивный генератор
                </Link>
                <Link href="/preview" className="text-gray-300 hover:text-blue-400 animated-border">
                  Предпросмотр
                </Link>
              </nav>
              
              <div className="md:hidden">
                <button className="p-2 text-gray-300 hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main>{children}</main>
        
        <footer className="bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-md flex items-center justify-center text-white font-bold">
                  UI
                </div>
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  UI Generator
                </span>
              </div>
              
              <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
                <Link href="/" className="text-gray-300 hover:text-blue-400">
                  Главная
                </Link>
                <Link href="/components" className="text-gray-300 hover:text-blue-400">
                  Компоненты
                </Link>
                <Link href="/responsive" className="text-gray-300 hover:text-blue-400">
                  Адаптивный генератор
                </Link>
                <Link href="/preview" className="text-gray-300 hover:text-blue-400">
                  Предпросмотр
                </Link>
              </nav>
              
              <div className="text-sm text-gray-400">
                <p>С любовью к UI ❤️</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
