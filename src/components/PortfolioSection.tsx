import React from 'react';
import PortfolioCard from './PortfolioCard';
import { VKIcon } from '../assets/icons';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button'; 

interface PortfolioSectionProps {
  cards: {
    title: string;
    image: string;
    link: string;
  }[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ cards }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="bg-[#f7f2f2] py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-0 sm:px-4">
        {/* Заголовок с анимацией */}
        <motion.h2
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-stone-950 text-3xl md:text-4xl font-bold head-main mb-12 md:mb-16 tracking-wider text-center px-4"
        >
          МОИ РАБОТЫ
        </motion.h2>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
          gap-4 md:gap-6 lg:gap-8 
          px-4 sm:px-0"> {/* Добавлены горизонтальные отступы */}
          {cards.map((card, index) => (
            <motion.div
              whileTap={{ scale: 0.95 }}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <PortfolioCard
                title={card.title}
                imageUrl={card.image}
                link={card.link}
                className="m-2 sm:m-0"
              />
            </motion.div>
          ))}
        </div>

        {/* Кнопки для связи */}
        <motion.div whileTap={{ scale: 0.95 }}
          className="flex flex-col md:flex-row justify-center gap-8 md:gap-10 mt-24 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            href="https://t.me/OlgaKogan_photo"
            icon={<Send size={20} className="transform -rotate-45" />}
            ariaLabel="Написать в Telegram"
            fullWidth
          >
            Написать в TG
          </Button>


          <Button
            href="https://vk.com/okoganphoto"
            icon={<VKIcon className="w-5 h-5" />}
            ariaLabel="Написать в VK"
            fullWidth
          >
            Написать в VK
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(PortfolioSection);