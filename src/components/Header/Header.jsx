import React from 'react'; // имп библиотеку React для создания компонентов
import { Link } from 'react-router-dom'; // имп компонент Link для навигации между страницами
import './Header.css'; // имп стили для компонента Header

const Header = () => { // создаем функциональный компонент Header
  return (
    <header className="header"> {/* создаем элемент header с классом "header" */}
      <nav> {/* создаем элемент nav для навигации */}
        <ul className="nav-list"> {/* создаем ненумерованный список с классом "nav-list" */}
          <li><Link to="/">Главная</Link></li> {/* ссылка на главную страницу */}
          <li><Link to="/about">О нас</Link></li> {/* ссылка на страницу "О нас" */}
          <li><Link to="/contact">Контакты</Link></li> {/* ссылка на страницу "Контакты" */}
        </ul>
      </nav>
    </header>
  );
};

export default Header; // эксп компонент Header для использования в других частях приложения
