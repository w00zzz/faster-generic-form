import { useState } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const push = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Math.random().toString()
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const close = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return [notifications, { push, close }] as const;
};

export default useNotifications;