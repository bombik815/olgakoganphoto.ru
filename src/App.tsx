import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import GallerySection from './components/GallerySection';
import Modal from './components/Modal';
import Footer from './components/Footer';
import BrandsPage from './pages/BrandsPage';
import PortraitsPage from './pages/PortraitsPage';
import FashionArtPage from './pages/FashionArtPage';
import PortfolioPage from './pages/PortfolioPage';
import ScrollToTop from './components/ScrollToTop';
import ContactPage from './components/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicyPage';

import horse_1 from './assets/photos/horse_1.webp'
import horse_2 from './assets/photos/horse_2.webp'
import horse_3 from './assets/photos/horse_3_cadr.webp'

import me from "./assets/photos/me_cadr.webp"
import portret from './assets/photos/portret.webp'
import portret_2 from './assets/photos/portret_2.webp'
import brend from './assets/photos/brend.webp'
import fashion_art from './assets/photos/fashion_art.webp'
import NotFoundPage from './pages/NotFoundPage';



const photos = [horse_1, horse_2, horse_3];
const galleryPhotos = [horse_1, horse_2, horse_3, fashion_art, portret_2, brend];
const portfolioCards = [
  {
    title: 'ПОРТРЕТ',
    image: portret,
    link: '/portfolio/portrait'
  },
  {
    title: 'БРЕНДЫ',
    image: brend,
    link: '/portfolio/brands'
  },
  {
    title: 'Fashion& ART',
    image: fashion_art,
    link: '/portfolio/fashion-art'
  }
];
const aboutData = {
  title: 'ОБО МНЕ',
  description: [
    'Привет! Я Ольга Коган, профессиональный фотограф с более чем 10-летним опытом работы в индустрии. Моя страсть к фотографии началась еще в юности, и с тех пор я посвятила свою жизнь искусству запечатления особенных моментов.',
    'Я специализируюсь на портретной и свадебной фотографии, стремясь создавать не просто снимки, а настоящие произведения искусства, которые будут радовать вас долгие годы. Мой подход к работе основан на внимании к деталям и индивидуальном подходе к каждому клиенту.',
    'В моем портфолио вы найдете широкий спектр работ: от интимных семейных портретов до масштабных свадебных репортажей. Я верю, что каждый момент уникален, и моя задача - сохранить его красоту и эмоциональность.',
  ],
  imageUrl: me,
  imageAlt: 'Olga Kogan',
};


function App() {

  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Состояние видимости меню
  const [isAboutSection, setIsAboutSection] = useState(false);
  // const [activeItem, setActiveItem] = useState('ГЛАВНАЯ');
  const [modalState, setModalState] = useState({
    selectedImage: null as string | null,
    currentIndex: 0,
    scale: 1,
  });

  // const heroSectionRef = useRef<HTMLDivElement>(null); // Ссылка на HeroSection
  const aboutSectionRef = useRef<HTMLDivElement>(null); // Ссылка на AboutSection


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (aboutSectionRef.current) {
        const aboutSectionOffset = aboutSectionRef.current.offsetTop;
        const aboutSectionHeight = aboutSectionRef.current.offsetHeight;

        // Проверяем, находится ли пользователь в секции "Обо мне"
        if (scrollPosition >= aboutSectionOffset && scrollPosition < aboutSectionOffset + aboutSectionHeight) {
          setIsAboutSection(true); // Пользователь в секции "Обо мне"
          setIsNavbarVisible(true); // Меню всегда видимо в секции "Обо мне"
        } else if (scrollPosition < aboutSectionOffset) {

          setIsAboutSection(false); // Пользователь не в секции "Обо мне"
          // Меню скрывается, если прокрутили ниже 800 пикселей, но еще не дошли до AboutSection
          if (scrollPosition > 800) {
            setIsNavbarVisible(false);
          } else {
            setIsNavbarVisible(true);
          }
        } else {
          // Пользователь прокрутил ниже секции "Обо мне"
          setIsAboutSection(true); // Сохраняем стили меню
          setIsNavbarVisible(true); // Меню всегда видимо после секции "Обо мне"
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (image: string, index: number) => {
    setModalState({
      selectedImage: image,
      currentIndex: index,
      scale: 1,
    });
  };

  const closeModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      selectedImage: null,
    }));
  };

  const showPreviousImage = () => {
    setModalState((prevState) => {
      const newIndex = (prevState.currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
      return {
        ...prevState,
        selectedImage: galleryPhotos[newIndex],
        currentIndex: newIndex,
        scale: 1,
      };
    });
  };

  const showNextImage = () => {
    setModalState((prevState) => {
      const newIndex = (prevState.currentIndex + 1) % galleryPhotos.length;
      return {
        ...prevState,
        selectedImage: galleryPhotos[newIndex],
        currentIndex: newIndex,
        scale: 1,
      };
    });
  };

  const zoomIn = () => {
    setModalState((prevState) => ({
      ...prevState,
      scale: Math.min(prevState.scale + 0.25, 3),
    }));
  };

  const zoomOut = () => {
    setModalState((prevState) => ({
      ...prevState,
      scale: Math.max(prevState.scale - 0.25, 0.5),
    }));
  };

  {/* Обработка клавиш - Escape, ArrowLeft и ArrowRight для закрытия модального окна и переключения фотографий */ }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal(); // Закрыть модальное окно при нажатии Escape
      }
      if (e.key === 'ArrowLeft') {
        showPreviousImage(); // Переключить на предыдущее фото при нажатии ArrowLeft
      }
      if (e.key === 'ArrowRight') {
        showNextImage(); // Переключить на следующее фото при нажатии ArrowRight
      }
    };

    window.addEventListener('keydown', handleKeyDown); // Добавляем обработчик событий
    return () => window.removeEventListener('keydown', handleKeyDown); // Убираем обработчик при размонтировании
  }, [closeModal, showPreviousImage, showNextImage]);



  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative">
              <AnimatePresence>
                {isNavbarVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full z-50"
                    style={{
                      backgroundColor: isAboutSection ? 'white' : 'transparent',
                      color: isAboutSection ? 'black' : 'white',
                    }}
                  >
                    <Navbar isAboutSection={isAboutSection} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div id="hero-section">
                <HeroSection photos={photos} />
              </div>
              <div id="about-section" ref={aboutSectionRef}>
                <AboutSection {...aboutData} />
              </div>
              <div id="portfolio-section">
                <PortfolioSection cards={portfolioCards} />
              </div>
              <div id="gallery-section">
                <GallerySection photos={galleryPhotos} onPhotoClick={openModal} />
              </div>
              {modalState.selectedImage && (
                <Modal
                  modalState={modalState}
                  closeModal={closeModal}
                  showPreviousImage={showPreviousImage}
                  showNextImage={showNextImage}
                  zoomIn={zoomIn}
                  zoomOut={zoomOut}
                  totalImages={photos.length}
                />
              )}
              <Footer />
            </div>
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Все остальные маршруты */}
        <Route path="/portfolio" element={<PortfolioPage />} /> {/* Отдельная страница PortfolioPage */}
        <Route path="/portfolio/fashion-art" element={<FashionArtPage />} /> {/* Отдельная страница FashionArtPage */}
        <Route path="/portfolio/portrait" element={<PortraitsPage />} /> {/* Отдельная страница PortraitsPage */}
        <Route path="/portfolio/brands" element={<BrandsPage />} /> {/* Отдельная страница BrandsPage */}
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;
