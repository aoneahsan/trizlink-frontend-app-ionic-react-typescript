import { toast, ToastContent, ToastOptions } from 'react-toastify';
import { NOTIFICATIONS } from 'utils/constants';

export const showNotification = (
  content: ToastContent,
  type: 'default' | 'error' | 'info' | 'success' | 'warning' = 'default',
  options?: ToastOptions
): void => {
  toast(content, {
    autoClose: NOTIFICATIONS.ReactToastify.autoclose,
    position: 'top-right',
    pauseOnHover: true,
    type,
    ...options,
  });
};

export const showSuccessNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'success', options);
};

export const showInfoNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'info', options);
};

export const showErrorNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'error', options);
};

export const showWarningNotification = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  showNotification(content, 'warning', options);
};
