import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { InstagramIconBlack, VKIconBlack, WhatsAppIcon, InstagramIcon } from '../assets/icons';

interface NavbarProps {
  isAboutSection?: boolean;
}

interface MenuItem {
  title: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { title: 'ГЛАВНАЯ', path: '/' },
  { title: 'ПОРТФОЛИО', path: '/portfolio'},
  { title: 'ОБО МНЕ', path: '/about' },
  { title: 'КОНТАКТЫ', path: '/contacts' }, // Убедитесь что путь совпадает с роутером
];

const Navbar: React.FC<NavbarProps> = React.memo(({ isAboutSection }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Управление прокруткой страницы
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку
      document.documentElement.style.overflow = 'hidden'; // Блокируем прокрутку для корневого элемента
    } else {
      document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
      document.documentElement.style.overflow = 'auto'; // Восстанавливаем прокрутку для корневого элемента
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Закрываем мобильное меню при изменении маршрута
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string, item: string) => {
    if (item === 'ПОРТФОЛИО') {
      const isPortfolioActive = location.pathname.startsWith('/portfolio');
      return isPortfolioActive;
    }
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [isMobileMenuOpen]);
  

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 p-8 ${isAboutSection ? 'bg-white' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto">
        {/* Основное меню (скрывается на мобильных устройствах) */}
        <div className="hidden md:flex justify-center space-x-12">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive: isNavLinkActive }) => {
                const active = isActive(item.path, item.title) || isNavLinkActive;
                return `text-sm tracking-wider transition-colors nav-link ${isAboutSection ? 'text-black' : 'text-white'
                  } ${active ? 'font-bold active' : ''}`;
              }}
              end // Отключаем стандартное поведение NavLink для вложенных маршрутов
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        {/* Гамбургер-иконка (показывается на мобильных устройствах) */}
        <div className="md:hidden flex justify-end">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 p-2 focus:outline-none">
            {/* Иконка гамбургера/крестика */}
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke={isAboutSection ? 'black' : 'white'} // Цвет иконки зависит от фона
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke={isAboutSection ? 'black' : 'white'} // Цвет иконки зависит от фона
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Мобильное меню (показывается при клике на гамбургер) */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-white flex flex-col justify-center items-center"
            style={{ zIndex: 1000, height: '100vh', overflow: 'hidden' }} // Убедимся, что меню занимает 100% высоты экрана
          >
            {/* Кнопка закрытия меню (крестик) */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 p-2 focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-black" // Крестик черный
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Пункты меню */}
            <div className="flex flex-col items-center">
              {menuItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive: isNavLinkActive }) => {
                    const active = isActive(item.path, item.title) || isNavLinkActive;
                    return `block p-4 text-xl tracking-wider transition-colors nav-link text-black ${active ? 'font-bold active' : ''}`;
                  }}
                  end // Отключаем стандартное поведение NavLink для вложенных маршрутов
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

            {/* Секция с иконками социальных сетей */}
            <div className="mt-8 flex space-x-6">
              <a
                href="https://vk.com/okoganphoto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <div className="text-black">
                  <VKIconBlack />
                </div>
              </a>
              <a
                href="https://t.me/OlgaKogan_photo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <div className="text-black">
                  <InstagramIconBlack />
                </div>
              </a>
              <a
                href="https://wa.me/yourwhatsappnumber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <div className="text-black">
                  <WhatsAppIcon />
                </div>
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <div className="text-black">
                  <InstagramIcon />
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

export default Navbar;