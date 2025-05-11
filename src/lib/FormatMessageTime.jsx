// utils/formatMessageTime.js
export function formatMessageTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
  
    const isToday =
      now.toDateString() === date.toDateString();
  
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      yesterday.toDateString() === date.toDateString();
  
    if (isToday) {
      return `${formatAMPM(date)}`;
    } else if (isYesterday) {
      return `Yesterday at ${formatAMPM(date)}`;
    } else {
      return `${date.toLocaleDateString()} at ${formatAMPM(date)}`;
    }
  }
  
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12; // convert 0 to 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${minutes} ${ampm}`;
  }
  