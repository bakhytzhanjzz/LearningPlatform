import React, { useState } from 'react';

const translations = {
  ru: {
    title: 'Свяжитесь с нами',
    subtitle: 'У вас есть вопросы? Мы всегда готовы помочь!',
    contactInfo: 'Контактная информация',
    email: 'Email',
    phone: 'Телефон',
    address: 'Адрес',
    addressText: 'г. Астана, Мангилик Ел 52',
    writeMessage: 'Написать сообщение',
    name: 'Имя',
    message: 'Сообщение',
    send: 'Отправить',
    langRu: 'РУС',
    langEn: 'ENG'
  },
  en: {
    title: 'Contact Us',
    subtitle: 'Have questions? We\'re here to help!',
    contactInfo: 'Contact Information',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    addressText: 'Astana, Manhilik Yel 52',
    writeMessage: 'Write a Message',
    name: 'Name',
    message: 'Message',
    send: 'Send',
    langRu: 'РУС',
    langEn: 'ENG'
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [lang, setLang] = useState('ru');
  const t = translations[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end space-x-2 mb-6">
          <button
            onClick={() => setLang('ru')}
            className={`px-3 py-1 rounded ${lang === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {t.langRu}
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {t.langEn}
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.contactInfo}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-xl mr-4">✉️</span>
                <div>
                  <p className="text-gray-900 font-medium">{t.email}</p>
                  <p className="text-gray-600">ahat0405@mail.ru</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-4">📞</span>
                <div>
                  <p className="text-gray-900 font-medium">{t.phone}</p>
                  <p className="text-gray-600">+7 (777) 777-77-77</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-4">📍</span>
                <div>
                  <p className="text-gray-900 font-medium">{t.address}</p>
                  <p className="text-gray-600">{t.addressText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.writeMessage}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;