import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-[#f7f2f2] flex flex-col items-center justify-center px-4 py-24 md:px-10 md:py-32">
            <div className="text-center max-w-2xl ">
                <h1 className="text-6xl md:text-9xl font-light mb-8 animate-fade-in-up">
                    404
                </h1>
                <p className="font-thin text-lg md:text-xl leading-relaxed mb-8 animate-fade-in-up animation-delay-100">
                    Ой! Похоже, мы не можем найти страницу, которую вы ищете.
                </p>

                <div className="md:text-left text-center ">
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col md:flex-row justify-center gap-8 
                                              md:gap-10 mt-12 mb-24 md:mb-8 px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Обертка для кнопки */}
                        <div className="w-full md:w-auto flex justify-center">
                            <Button
                                href="/"
                            >
                                Вернуться на главную
                            </Button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}