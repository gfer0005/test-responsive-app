import { notifications } from '@mantine/notifications';
import type { NotificationProps } from '../types/types';


const commonStyles = {
  root: { padding: '2vh' },
  title: { fontSize: '2.2vh' },
  description: { fontSize: '1.5vh' },
};

export const showNotification = {
  success: ({ title, message }: NotificationProps) => {
    
    notifications.show({
          title,
          message,
          color: 'green',
          radius: 'lg',
          withBorder: true,
          withCloseButton: true,
          autoClose: 5000,
          styles: commonStyles,
        });
  },

  error: ({ title, message }: NotificationProps) => {
    notifications.show({
          title,
          message,
          color: '#c30045',
          radius: 'lg',
          withBorder: true,
          withCloseButton: true,
          autoClose: 5000,
          styles: commonStyles,
        });
  },

  warning: ({ title, message }: NotificationProps) => {
    notifications.show({
          title,
          message,
          color: 'yellow',
          radius: 'lg',
          withBorder: true,
          withCloseButton: true,
          autoClose: 5000,
          styles: commonStyles,
        });
  },
};
