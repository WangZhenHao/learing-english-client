import { useLocalStorageState } from "ahooks";
import { useEffect, useState } from "react";
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

export function setReportStatus() {
    const [isStorageLoop, setIsStorageLoop] = useLocalStorageState("isStorageLoop", {
        defaultValue: false,
    });
    const [loop, setLoop] = useState(false)

    useEffect(() => {
        setLoop(isStorageLoop)
    }, [isStorageLoop])

    return [loop, setIsStorageLoop]
}