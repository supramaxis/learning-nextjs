// useTimeAgoLabel.ts - Custom hook for displaying a time ago label

import { useEffect, useState } from "react";

const getTimeAgoLabel = (dateString: string, currentTime: Date) => {
  if (!dateString || !currentTime) return "";
  
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let diffInMilliSeconds = now.getTime() - date.getTime();

  const intervals = [
    { unit: 'second', amount: 60 },
    { unit: 'minute', amount: 60 },
    { unit: 'hour', amount: 24 },
    { unit: 'day', amount: 30 }, // Assuming 30 days for a month average
    { unit: 'month', amount: 12 }
  ]

  for (const interval of intervals) {
    const value = Math.floor(diffInMilliSeconds / interval.amount);
    if (value > 0) {
      return `${value} ${interval.unit}${value > 1 ? 's' : ''} ago`
    }
    diffInMilliSeconds %= interval.amount
  }


};

export const useTimeAgoLabel = (dateString: string, currentTime: Date) => {
  interface timeAgoProps {
    timeAgoLabel: string
    
  }
  const [timeAgoLabel, setTimeAgoLabel] = useState<timeAgoProps>({
    timeAgoLabel: "",
  });

  useEffect(() => {
    const updateTimeAgo = () => {
      const currentTime = new Date();
      const timeAgo = getTimeAgoLabel(dateString, currentTime);
      setTimeAgoLabel((prevState) => ({...prevState, timeAgoLabel: timeAgo || ""}));

      const interval = setInterval(updateTimeAgo, 1000);
      updateTimeAgo();

      return () => clearInterval(interval);
    };
  }, [dateString, currentTime]);

  return timeAgoLabel;
};
