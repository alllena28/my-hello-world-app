//  основные библиотеки React
import React from 'react'; //  библиотека React
import ReactDOM from 'react-dom/client'; // клиентская часть ReactDOM для рендеринга в браузере
import App from './App'; // глав компонент приложения

//  корневой элемент для рендеринга React-приложения
// document.getElementById('root') находит DOM-элемент с id="root" в public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// рендеринг приложения в корневой DOM-элемент
root.render(
  // React.StrictMode инструмент для обнаружения потенциальных проблем в приложении
  // в режиме разработки вызывает двойной рендеринг компон. для выявления проблем
  <React.StrictMode>
    {/* глав. компонент приложения */}
    <App />
  </React.StrictMode>
);