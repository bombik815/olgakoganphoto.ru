import React from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  title: string;
  description: string[];
  imageUrl: string;
  imageAlt: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  imageUrl,
  imageAlt
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative bg-[#f7f2f2] py-24"
    >
      {/* Мобильная версия */}
      <div className="md:hidden ">
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="container mx-auto px-4 mt-12">
          <motion.h2
            className="text-stone-900 text-[18px] head-main mb-8 tracking-wider text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h2>

          <div className="space-y-4 about-text">
            {description.map((paragraph, index) => (
              <motion.p
                key={index}
                className="font-montserrat font-normal text-[#373737] text-sm leading-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}

              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-row items-center max-w-6xl mx-auto gap-12">
            <div className="w-1/2 flex justify-center">
              <motion.div
                className="w-80 h-80 rounded-full overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>

            <div className="w-1/2">
              <motion.h2
                className="text-stone-900 text-[22px] head-main mb-8 tracking-wider"
                initial={{ x: -50 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {title}
              </motion.h2>

              <div className="space-y-4 about-text">
                {description.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="font-montserrat font-normal text-[#373737] text-sm leading-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default React.memo(AboutSection);