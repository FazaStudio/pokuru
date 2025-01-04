import { useState, useEffect, useCallback } from 'react';

interface RefreshTimerProps {
  onRefresh: () => void;
  interval?: number;
}

export const RefreshTimer: React.FC<RefreshTimerProps> = ({ 
  onRefresh, 
  interval = 10 
}) => {
  const [countdown, setCountdown] = useState(interval);

  const refresh = useCallback(() => {
    onRefresh();
    setCountdown(interval);
  }, [onRefresh, interval]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          refresh();
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interval, refresh]);

  return (
    <div className="text-gray-400 text-xs flex items-center justify-end mt-2">
      <svg 
        className={`w-3 h-3 mr-1 ${countdown <= 3 ? 'animate-spin' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
        />
      </svg>
      Refresh price {countdown}s
    </div>
  );
};