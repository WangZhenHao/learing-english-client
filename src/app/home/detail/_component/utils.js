export function mstoMinute(ms) {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(ms / 1000);
  
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  // Pad with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
}