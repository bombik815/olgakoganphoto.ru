import React from 'react';
import { InstagramIconBlack, InstagramIcon, VKIconBlack, WhatsAppIcon } from '../assets/icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f7f2f2] py-12">
      <div className="container mx-auto px-4">
        {/* Иконки социальных сетей */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://vk.com/okoganphoto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <VKIconBlack />
          </a>
          <a
            href="https://t.me/OlgaKogan_photo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <InstagramIconBlack />
          </a>
          <a
            href="https://wa.me/yourwhatsappnumber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <WhatsAppIcon />
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            <InstagramIcon />
          </a>
        </div>

        {/* Текст с копирайтом */}
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Все права защищены Olga Kogan
        </p>
      </div>
    </footer>
  );
};

export default Footer;