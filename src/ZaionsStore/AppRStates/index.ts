import { ZIonColorType } from './../../types/zaionsAppSettings.type';
import { ToastOptions } from 'react-toastify';
import { atom } from 'recoil';

// Types
import { AlertOptions, LoadingOptions } from '@ionic/react';

// Recoil state for managing loader (showing loading, hide loader) etc.
export const appWiseIonicLoaderRStateAtom = atom<{
	showLoader: boolean;
	loaderProps: LoadingOptions;
}>({
	key: 'appWiseIonicLoaderRStateAtom_key',
	default: {
		showLoader: false,
		loaderProps: {
			message: 'Loading...',
			showBackdrop: true,
			keyboardClose: true,
		},
	},
});

// Recoil state for managing alert (showing alert, hide alert) etc.
export const appWiseIonicAlertRStateAtom = atom<{
	showAlert: boolean;
	alertProps: AlertOptions;
}>({
	key: 'appWiseIonicAlertRStateAtom_key',
	default: {
		showAlert: false,
		alertProps: {
			keyboardClose: true,
			animated: true,
			buttons: [
				{
					text: 'Okay',
					role: 'dismiss',
				},
			],
			backdropDismiss: true,
		},
	},
});

// Recoil state for managing alert (showing alert, hide alert) etc.
export const appWiseIonicToastRStateAtom = atom<{
	showToast: boolean;
	message: string;
	color: ZIonColorType;
	toastProps: ToastOptions;
}>({
	key: 'appWiseIonicToastRStateAtom_key',
	default: {
		showToast: false,
		message: '',
		color: 'primary',
		toastProps: {},
	},
});
