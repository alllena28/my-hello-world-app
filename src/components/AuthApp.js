// импортируем необходимые хуки из React и библиотеки react-hook-form для работы с формами
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

// каст. хук для проверки статуса авторизации
const useLoginState = () => {
  // используем useState с lazy initial state для чтения из localStorage
  const [isLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'; // проверяем авторизацию
  });
  return isLoggedIn; // возвращаем статус авторизации
};

// Основна приложения
const AuthApp = () => {
  // сост. загрузки страницы
  const [pageLoaded, setPageLoaded] = useState(false);
  // сообщение о результате авторизации
  const [authMessage, setAuthMessage] = useState('');
  // список отзывов
  const [feedbackList, setFeedbackList] = useState([]);
  // список зареганных пользователей (с загрузкой из localStorage)
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : []; // парсим сохраненных пользователей или пустой массив
  });
  
  //  статус авторизации
  const isLoggedIn = useLoginState();

  // имитации загрузки страницы
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true); // через 1 сек устанавливаем флаг загрузки
    }, 1000);
    return () => clearTimeout(timer); // чистим таймер
  }, []);

  // сохранения пользователей в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }, [users]); 

  // инициализация форм с помощью react-hook-form
  // форма авторизации
  const { 
    register: registerAuth, 
    handleSubmit: handleAuthSubmit, 
    reset: resetAuth, 
    formState: { errors: authErrors } 
  } = useForm();
  
  // фарма для рега
  const { 
    register: registerReg, 
    handleSubmit: handleRegSubmit, 
    reset: resetReg, 
    formState: { errors: regErrors } 
  } = useForm();
  
  // форма для отзывов
  const { 
    register: registerFeedback, 
    handleSubmit: handleFeedbackSubmit, 
    reset: resetFeedback, 
    formState: { errors: feedbackErrors } 
  } = useForm();

  //  отправка формы авторизации
  const onAuthSubmit = useCallback((data) => {
    // проверяю существование пользователя
    const userExists = users.some(
      user => user.login === data.login && user.password === data.password
    );
    
    //  доступ для admin/admin и проверка зарегистрированных пользователей
    if ((data.login === 'admin' && data.password === 'admin') || userExists) {
      setAuthMessage('Успешная авторизация!');
      localStorage.setItem('isLoggedIn', 'true'); //  флаг авторизации
      localStorage.setItem('currentUser', data.login); // сохр текущего пользователя
      window.location.reload(); // перезагрузка страницы
    } else {
      setAuthMessage('Неверные учетные данные');
    }
  }, [users]); 

  //  отправка формы дял реги
  const onRegSubmit = useCallback((data) => {
    // проверяю уже сущ пользователей
    const userExists = users.some(user => user.login === data.login);
    
    if (userExists) {
      alert('Пользователь с таким логином уже существует!');
      return;
    }
    
    //  новый пользователь
    setUsers(prev => [...prev, {
      login: data.login,
      password: data.password
    }]);
    
    alert('Регистрация успешна! Теперь вы можете войти.');
    resetReg(); // сброс формы
  }, [users, resetReg]); // зависимости

  //   форма обратной связи
  const onFeedbackSubmit = useCallback((data) => {
    setFeedbackList(prev => [...prev, data]); // добавление отзыва в список
    resetFeedback(); // сброс 
    alert('Отзыв отправлен!');
  }, [resetFeedback]);

  //  выход из системы
  const handleLogout = useCallback(() => {
    localStorage.setItem('isLoggedIn', 'false'); // сброс флага авторизации
    localStorage.removeItem('currentUser'); // удаляем текущего пользователя
    window.location.reload(); // перезагрузка 
  }, []);

  // автозаполнение логина при загрузке
  useEffect(() => {
    const lastUser = localStorage.getItem('currentUser');
    if (lastUser) {
      resetAuth({ login: lastUser }); //  сохраненный логин
    }
  }, [resetAuth]);

  //  загрузка, если страница еще не готова
  if (!pageLoaded) return <div>Загрузка...</div>;

  // когда пользователь авторизован - показываем интерфейс с отзывами
  if (isLoggedIn) {
    const currentUser = localStorage.getItem('currentUser') || 'пользователь';
    
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Добро пожаловать, {currentUser}!</h1>
        <button onClick={handleLogout}>Выйти</button>
        
        <h2>Обратная связь</h2>
        <form onSubmit={handleFeedbackSubmit(onFeedbackSubmit)}>
          <input 
            {...registerFeedback('name', { required: true })} 
            placeholder="Имя" 
          />
          {feedbackErrors.name && <p style={{ color: 'red' }}>Обязательное поле</p>}
          
          <textarea 
            {...registerFeedback('message', { required: true })} 
            placeholder="Сообщение" 
          />
          {feedbackErrors.message && <p style={{ color: 'red' }}>Обязательное поле</p>}
          
          <button type="submit">Отправить</button>
        </form>

        <div>
          <h3>Отзывы:</h3>
          {feedbackList.map((item, index) => (
            <div key={index}>
              <p><strong>{item.name}</strong>: {item.message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // когда пользователь не авторизован - показываем формы входа/регистрации
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Авторизация</h1>
      {authMessage && (
        <p style={{ color: authMessage.includes('Успешная') ? 'green' : 'red' }}>
          {authMessage}
        </p>
      )}
      
      <form onSubmit={handleAuthSubmit(onAuthSubmit)}>
        <input 
          {...registerAuth('login', { required: true })} 
          placeholder="Логин" 
        />
        {authErrors.login && <p style={{ color: 'red' }}>Обязательное поле</p>}
        
        <input 
          type="password" 
          {...registerAuth('password', { required: true })} 
          placeholder="Пароль" 
        />
        {authErrors.password && <p style={{ color: 'red' }}>Обязательное поле</p>}
        
        <button type="submit">Войти</button>
      </form>

      <h1>Регистрация</h1>
      <form onSubmit={handleRegSubmit(onRegSubmit)}>
        <input 
          {...registerReg('login', { required: true, minLength: 3 })} 
          placeholder="Логин (мин. 3 символа)" 
        />
        {regErrors.login && (
          <p style={{ color: 'red' }}>
            {regErrors.login.type === 'required' 
              ? 'Обязательное поле' 
              : 'Логин должен содержать минимум 3 символа'}
          </p>
        )}
        
        <input 
          type="password" 
          {...registerReg('password', { required: true, minLength: 6 })} 
          placeholder="Пароль (мин. 6 символов)" 
        />
        {regErrors.password && (
          <p style={{ color: 'red' }}>
            {regErrors.password.type === 'required' 
              ? 'Обязательное поле' 
              : 'Пароль должен содержать минимум 6 символов'}
          </p>
        )}
        
        <button type="submit">Зарегистрироваться</button>
      </form>
      
      {/*  зарегистрированные пользователи (для демонстрации) */}
      <div style={{ marginTop: '20px' }}>
        <h3>Зарегистрированные пользователи:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              Логин: {user.login} | Пароль: {user.password.replace(/./g, '*')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthApp;