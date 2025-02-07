import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Используем Link для навигации


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import brand from '../assets/photos/brend.webp';
import portret from '../assets/photos/portret_2.webp';
import fashion_art from '../assets/photos/fashion_art.webp';



// Данные для карточек "Портфолио"
const portfolioCards = [
  {
    id: 1,
    src: fashion_art,
    alt: 'Fashion&Art',
    category: 'Fashion&Art',
    link: '/portfolio/fashion-art',
  },
  {
    id: 2,
    src: portret,
    alt: 'ПОРТРЕТ',
    category: 'ПОРТРЕТ',
    link: '/portfolio/portrait',
  },

  {
    id: 3,
    src: brand,
    alt: 'БРЕНДЫ',
    category: 'БРЕНДЫ',
    link: '/portfolio/brands',
  },
];

const PortfolioPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f2f2]">
      <div className="fixed top-0 w-full z-50"><Navbar isAboutSection={true} /></div>


      <main className="flex-grow pt-16 md:pt-20">
        <div className="container mx-auto max-w-[1750px] px-0 md:px-[75px] lg:px-[100px]">
          <div className="portfolio-section mt-12 md:mt-20 mx-0 md:mx-[5vw] lg:mx-[75px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-4 md:gap-[2vw] mt-8 md:mt-[57px] items-start">
              {portfolioCards.map((card) => (
                <div key={card.id} className="w-full">
                  <Link
                    to={card.link}
                    className="block active:scale-100 lg:active:scale-105"
                  >
                    <div className="aspect-square overflow-hidden group">
                      <img
                        src={card.src}
                        alt={card.alt}
                        className="w-full h-full object-cover transform transition-all duration-300 lg:group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="mt-3 md:mt-4 text-center">
                    <Link
                      to={card.link}
                      className="text-base md:text-lg lg:text-[19px] py-2 md:py-3 block hover:text-gray-600 transition-colors lg:inline-block"
                      style={{ color: 'var(--color-header, #2d2d2d)' }}
                    >
                      {card.category}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;