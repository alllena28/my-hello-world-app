//  для увеличения значения
export const increment = () => ({
    type: 'INCREMENT' // возвращаем объект с типом 'INCREMENT'
  });
  
  // для уменьшения значения
  export const decrement = () => ({
    type: 'DECREMENT' // возвращаем объект с типом 'DECREMENT'
  });
  
  // для сброса значения
  export const reset = () => ({
    type: 'RESET' // возвращаем объект с типом 'RESET'
  });
  