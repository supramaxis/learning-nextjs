// useTimeAgoLabel.ts - Custom hook for displaying a time ago label

import { useEffect, useState } from "react";

const getTimeAgoLabel = (dateString: string, currentTime: Date) => {
  if (!dateString || !currentTime) {
    return "";
  }
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} months ago`;
  }
  return "";
};

export const useTimeAgoLabel = (dateString: string, currentTime: Date) => {
  const [timeAgoLabel, setTimeAgoLabel] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const currentTime = new Date();
      const timeAgo = getTimeAgoLabel(dateString, currentTime);
      setTimeAgoLabel(timeAgo);

      const interval = setInterval(updateTimeAgo, 1000);
      updateTimeAgo();

      return () => clearInterval(interval);
    };
  }, [dateString, currentTime]);

  return timeAgoLabel;
};
