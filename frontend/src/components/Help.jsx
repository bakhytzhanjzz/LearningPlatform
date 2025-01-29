import React, { useState } from 'react';

const translations = {
  ru: {
    title: 'Часто задаваемые вопросы',
    subtitle: 'Найдите ответы на самые популярные вопросы о нашей платформе',
    categories: {
      general: 'Общие вопросы',
      courses: 'Курсы и обучение',
      technical: 'Техническая поддержка',
      payment: 'Оплата и доступ'
    },
    faq: [
      {
        category: 'Общие вопросы',
        questions: [
          {
            q: 'Что такое ALASH Learning Platform?',
            a: 'ALASH Learning Platform - это современная образовательная платформа, предоставляющая доступ к качественному онлайн-образованию. Мы предлагаем широкий спектр курсов, интерактивные материалы и персонализированный подход к обучению.'
          },
          {
            q: 'Как начать обучение?',
            a: 'Чтобы начать обучение, необходимо зарегистрироваться на платформе, выбрать интересующий курс и оплатить доступ. После этого вы получите немедленный доступ к материалам курса.'
          }
        ]
      },
      {
        category: 'Курсы и обучение',
        questions: [
          {
            q: 'Какие форматы обучения доступны?',
            a: 'На нашей платформе доступны различные форматы обучения: видеолекции, интерактивные задания, практические проекты, групповые занятия и индивидуальные консультации с преподавателями.'
          },
          {
            q: 'Как получить сертификат?',
            a: 'Сертификат выдается после успешного завершения курса. Для этого необходимо выполнить все обязательные задания и набрать проходной балл по итоговым тестам.'
          }
        ]
      },
      {
        category: 'Техническая поддержка',
        questions: [
          {
            q: 'Что делать, если возникли проблемы с доступом?',
            a: 'В случае проблем с доступом, пожалуйста, попробуйте очистить кэш браузера и перезайти на платформу. Если проблема не устранена, обратитесь в нашу службу поддержки через форму обратной связи.'
          },
          {
            q: 'Какие браузеры поддерживаются?',
            a: 'Наша платформа поддерживает все современные браузеры: Chrome, Firefox, Safari, Edge. Для оптимальной работы рекомендуем использовать последние версии браузеров.'
          }
        ]
      },
      {
        category: 'Оплата и доступ',
        questions: [
          {
            q: 'Какие способы оплаты доступны?',
            a: 'Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), электронными кошельками и банковским переводом. Все платежи безопасны и проходят через защищенное соединение.'
          },
          {
            q: 'Есть ли возможность вернуть деньги?',
            a: 'Да, мы предоставляем гарантию возврата средств в течение 14 дней с момента покупки курса, если вы не приступили к обучению или недовольны качеством материалов.'
          }
        ]
      }
    ],
    langRu: 'РУС',
    langEn: 'ENG'
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to the most common questions about our platform',
    categories: {
      general: 'General Questions',
      courses: 'Courses and Learning',
      technical: 'Technical Support',
      payment: 'Payment and Access'
    },
    faq: [
      {
        category: 'General Questions',
        questions: [
          {
            q: 'What is ALASH Learning Platform?',
            a: 'ALASH Learning Platform is a modern educational platform providing access to quality online education. We offer a wide range of courses, interactive materials, and a personalized approach to learning.'
          },
          {
            q: 'How do I start learning?',
            a: 'To start learning, you need to register on the platform, choose a course you\'re interested in, and purchase access. After that, you\'ll get immediate access to the course materials.'
          }
        ]
      },
      {
        category: 'Courses and Learning',
        questions: [
          {
            q: 'What learning formats are available?',
            a: 'Our platform offers various learning formats: video lectures, interactive assignments, practical projects, group classes, and individual consultations with teachers.'
          },
          {
            q: 'How do I get a certificate?',
            a: 'A certificate is issued upon successful completion of the course. You need to complete all required assignments and achieve a passing score on the final tests.'
          }
        ]
      },
      {
        category: 'Technical Support',
        questions: [
          {
            q: 'What should I do if I have access problems?',
            a: 'If you experience access problems, please try clearing your browser cache and logging back into the platform. If the problem persists, contact our support team through the feedback form.'
          },
          {
            q: 'Which browsers are supported?',
            a: 'Our platform supports all modern browsers: Chrome, Firefox, Safari, Edge. We recommend using the latest versions of browsers for optimal performance.'
          }
        ]
      },
      {
        category: 'Payment and Access',
        questions: [
          {
            q: 'What payment methods are available?',
            a: 'We accept payment by bank cards (Visa, MasterCard, MIR), e-wallets, and bank transfer. All payments are secure and processed through a protected connection.'
          },
          {
            q: 'Is there a refund option?',
            a: 'Yes, we provide a money-back guarantee within 14 days of course purchase if you haven\'t started learning or are unsatisfied with the material quality.'
          }
        ]
      }
    ],
    langRu: 'РУС',
    langEn: 'ENG'
  }
};

const Help = () => {
  const [openSection, setOpenSection] = useState(null);
  const [lang, setLang] = useState('ru');
  const t = translations[lang];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end space-x-2 mb-6">
          <button
            onClick={() => setLang('ru')}
            className={`px-3 py-1 rounded transition-colors ${
              lang === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {t.langRu}
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded transition-colors ${
              lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {t.langEn}
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {t.faq.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleSection(sectionIndex)}
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.category}
                </h2>
                <span className="text-xl text-gray-500">
                  {openSection === sectionIndex ? '▼' : '▶'}
                </span>
              </button>

              {openSection === sectionIndex && (
                <div className="px-6 py-4 space-y-6">
                  {section.questions.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.q}
                      </h3>
                      <p className="text-gray-600">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;