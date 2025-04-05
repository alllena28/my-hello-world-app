// имп необходимые модули и зависимости
import React, { useContext } from 'react'; // имп React и хук useContext для работы с контекстом
import { ThemeContext } from '../../context/ThemeContext'; // имп контекст темы (ThemeContext)
import './ThemeToggle.css'; // имп CSS-файл для стилизации компонента

// созд функциональный компонент ThemeToggle
const ThemeToggle = () => {
  // исп хук useContext для получения данных из ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  // возвращ JSX-элемент который представляет кнопку переключения темы
  return (
    <button
      className={`theme-toggle ${theme}`} // классы для стилизации: базовый класс "theme-toggle" и текущая тема "light" или "dark"
      onClick={toggleTheme} // при нажатии на кнопку вызываем функцию toggleTheme для переключения темы
    >
      {/* отобр соответствующий текст и иконку в зависимости от текущей темы */}
      {theme === 'light' ? '🌙 Ночь' : '☀️ День'}
    </button>
  );
};

// эксп компонент ThemeToggle 
export default ThemeToggle;