export const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get)
        return localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key))
            : null;
    else localStorage.setItem(key, JSON.stringify(value));
};
export const getLastActive = (lastActive) => {
    if (!lastActive) {
      return 'Never active';
    }
  
    const now = Date.now();
    const lastActiveTime = new Date(lastActive).getTime();
  
    if (isNaN(lastActiveTime)) {
      return 'Invalid date';
    }
  
    const difference = now - lastActiveTime;
  
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(difference / 3600000);
    const days = Math.floor(difference / 86400000);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };
  
