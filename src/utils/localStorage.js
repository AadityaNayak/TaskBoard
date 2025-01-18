// Save data to localStorage
export const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  // Get data from localStorage
  export const loadFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };
  