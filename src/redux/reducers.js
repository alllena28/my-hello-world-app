// начальное состояние с полем count, равным 0
const initialState = {
    count: 0
  };
  
  // редюсер для управления состоянием счетчика
  const counterReducer = (state = initialState, action) => {
    // проверяем тип действия
    switch (action.type) {
      case 'INCREMENT':
        // увеличиваем значение count на 1 и возвращаем новое состояние
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        // уменьшаем значение count на 1 и возвращаем новое состояние
        return { ...state, count: state.count - 1 };
      case 'RESET':
        // сбрасываем значение count на 0 и возвращаем новое состояние
        return { ...state, count: 0 };
      default:
        // если действие не распознано, возвращаем текущее состояние
        return state;
    }
  };
  
  // экспортируем редюсер по умолчанию
  export default counterReducer;
  