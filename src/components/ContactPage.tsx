// components/ContactPage.tsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';



const privacyPolicy_ = [{
    id: 1,
    link: '/privacy-policy',
}];

const ContactPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Логика обработки формы
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isAboutSection={true} />

            {/* Основная секция */}
            <main className="flex-grow pt-20">
                <section className="bg-[#f7f2f2]">
                    <div className="container mx-auto px-4">
                        <h2 className="text-stone-950 text-3xl md:text-4xl font-bold head-main 
            tracking-wider text-center px-4 py-8 md:py-8">
                            Fashion фотограф <br /> Olga Kogan
                        </h2>
                    </div>
                </section>

                {/* Секция с формой */}
                <section className="container mx-auto px-4">
                    <h4 className="text-stone-950 text-3xl md:text-4xl font-bold 
                                    head-main tracking-wider text-center px-4 pt-8 md:pt-8 pb-12 md:pb-12">
                        Форма для связи
                    </h4>

                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Поле "Ваше Имя" */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
        focus:ring-2 focus:ring-black focus:border-transparent 
        peer placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-4 top-3 text-gray-500 font-montserrat 
        text-sm transition-all duration-200 ease-in-out 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 
        peer-placeholder-shown:top-3 
        peer-focus:top-3 
        peer-focus:text-sm 
        peer-focus:text-gray-500"
                                >
                                    Ваше Имя
                                </label>
                            </div>

                            {/* Поле "Контактный телефон или e-mail" */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="contact"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                                focus:ring-2 focus:ring-black focus:border-transparent 
                                                peer placeholder-transparent"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="contact"
                                    className="absolute left-4 top-3 text-gray-500 font-montserrat 
                                                text-sm transition-all duration-200 ease-in-out 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400 
                                                peer-placeholder-shown:top-3 
                                                peer-focus:top-3 
                                                peer-focus:text-sm 
                                                peer-focus:text-gray-500"
                                >
                                    Контактный телефон или e-mail
                                </label>
                            </div>

                            {/* Поле "Ваше сообщение" */}
                            <div className="relative">
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                                focus:ring-2 focus:ring-black focus:border-transparent 
                                                peer placeholder-transparent"
                                    placeholder=" "
                                ></textarea>
                                <label
                                    htmlFor="message"
                                    className="absolute left-4 top-3 text-gray-500 font-montserrat 
                                                text-sm transition-all duration-200 ease-in-out 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400 
                                                peer-placeholder-shown:top-3 
                                                peer-focus:top-3 
                                                peer-focus:text-sm 
                                                peer-focus:text-gray-500"
                                >
                                    Ваше сообщение
                                </label>
                            </div>

                            {/* Блок с согласием */}
                            <div className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    defaultChecked // Чекбокс включен по умолчанию
                                    disabled
                                    required
                                    className="mt-1 h-5 w-5 text-[#A65D57] border-gray-300 
                                    rounded focus:ring-[#A65D57]"
                                />
                                <label
                                    htmlFor="agreement"
                                    className="text-sm text-gray-600 font-montserrat"
                                >
                                    Нажимая на кнопку, вы даете согласие на обработку
                                    <Link
                                        to={privacyPolicy_[0].link}
                                        className="text-[#A65D57] underline hover:text-[#8B4E49] ml-1"
                                    >
                                        ваших персональных данных
                                    </Link>
                                </label>
                            </div>

                            <div className="md:text-left text-center ">

                                {/* Обертка для кнопки */}
                                <div className="w-full md:w-auto flex justify-center">
                                    <Button  type="submit" >
                                        Отправить сообщение
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </section>
            </main>

            {/* Подвал */}
            <Footer />
        </div>
    );
};

export default ContactPage;