import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

// основной компонент приложения
const App = () => {
  return (
    // оборачиваем приложение в провайдер redux для управления состоянием
    <Provider store={store}>

      <ThemeProvider>

        <Router>
          <div className="app">

            <Header />

            <ThemeToggle />
            <main className="content">

              <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

// экспортируем основной компонент приложения
export default App;
