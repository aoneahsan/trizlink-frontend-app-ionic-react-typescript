import { useSetRecoilState } from 'recoil';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
	useIonToast,
	useIonPopover,
	ReactComponentOrElement,
	useIonModal,
	useIonActionSheet,
} from '@ionic/react';
import MESSAGES from '@/utils/messages';
import {
	emptyVoidReturnFunction,
	showZCapErrorDialogAlert,
	zConsoleError,
} from '@/utils/helpers';
import { NOTIFICATIONS } from '@/utils/constants';
import CONSTANTS from '@/utils/constants';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';
import {
	useZIonAlertPropsType,
	UseZIonAlertReturnType,
	UseZIonAlertSuccessReturnType,
	useZIonErrorAlertReturnType,
	useZIonLoadingReturnType,
	useZIonToastDangerReturnType,
	useZIonToastReturnType,
	useZIonToastSuccessReturnType,
} from '@/types/CustomHooks/zionic-hooks.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import {
	appWiseIonicAlertRStateAtom,
	appWiseIonicLoaderRStateAtom,
	appWiseIonicToastRStateAtom,
} from '@/ZaionsStore/AppRStates';

type GenericComponentType = JSX.Element | ReactComponentOrElement;

/**
 * Alerts
 * custom hook for Alert, success alert and error alert.
 */
/** Default Alert */
export const useZIonAlert = (): UseZIonAlertReturnType => {
	const setAppWiseIonAlertState = useSetRecoilState(
		appWiseIonicAlertRStateAtom
	);
	try {
		const presentZIonAlert = async ({
			header = MESSAGES.GENERAL.SUCCESS,
			subHeader = MESSAGES.GENERAL.SUCCESS,
			message = MESSAGES.GENERAL.SUCCESS,
			animated = true,
			keyboardClose = true,
			buttons = [
				{
					text: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
					role: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.ROLE,
				},
			],
		}: useZIonAlertPropsType): Promise<void> => {
			setAppWiseIonAlertState((oldValues) => ({
				...oldValues,
				showAlert: false,
			}));
			await new Promise((res, rej) => {
				res('ok');
			});
			setTimeout(() => {
				setAppWiseIonAlertState((oldValues) => ({
					...oldValues,
					showAlert: true,
					alertProps: {
						header: header,
						subHeader: subHeader,
						message: message,
						animated: animated,
						keyboardClose: keyboardClose,
						buttons: buttons,
					},
				}));
			}, 0);
		};
		return { presentZIonAlert };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
		return { presentZIonAlert: emptyVoidReturnFunction };
	}
};

/** Success Alert */
export const useZIonSuccessAlert = (): UseZIonAlertSuccessReturnType => {
	const setAppWiseIonAlertState = useSetRecoilState(
		appWiseIonicAlertRStateAtom
	);

	try {
		const presentZIonSuccessAlert = async (): Promise<void> => {
			setAppWiseIonAlertState((oldValues) => ({
				...oldValues,
				showAlert: false,
			}));
			await new Promise((res, rej) => {
				res('ok');
			});
			setTimeout(() => {
				setAppWiseIonAlertState((oldValues) => ({
					...oldValues,
					showAlert: true,
					alertProps: {
						header: MESSAGES.GENERAL.SUCCESS,
						subHeader: MESSAGES.GENERAL.SUCCESS_SUBHEADING,
						message: MESSAGES.GENERAL.SUCCESS_MESSAGE,
						animated: true,
						keyboardClose: true,
						buttons: [
							{
								text: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
								role: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.ROLE,
							},
						],
					},
				}));
			}, 0);
		};
		return { presentZIonSuccessAlert };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
		return { presentZIonSuccessAlert: emptyVoidReturnFunction };
	}
};

/** Error Alert */
export const useZIonErrorAlert = (): useZIonErrorAlertReturnType => {
	const setAppWiseIonAlertState = useSetRecoilState(
		appWiseIonicAlertRStateAtom
	);

	try {
		const presentZIonErrorAlert = async (): Promise<void> => {
			setAppWiseIonAlertState((oldValues) => ({
				...oldValues,
				showAlert: false,
			}));
			await new Promise((res, rej) => {
				res('ok');
			});
			setTimeout(() => {
				setAppWiseIonAlertState((oldValues) => ({
					...oldValues,
					showAlert: true,
					alertProps: {
						header: MESSAGES.GENERAL.FAILED,
						subHeader: MESSAGES.GENERAL.FAILED_SUBHEADING,
						message: MESSAGES.GENERAL.FAILED_MESSAGE,
						animated: true,
						keyboardClose: true,
						buttons: [
							{
								text: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
								role: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.ROLE,
							},
						],
					},
				}));
			}, 0);
		};
		return { presentZIonErrorAlert };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
		return { presentZIonErrorAlert: emptyVoidReturnFunction };
	}
};

/**
 * Loading
 * custom hook for Loading.
 */
/** Ionic Loader */
export const useZIonLoading = (id?: string): useZIonLoadingReturnType => {
	const setAppWiseIonLoaderState = useSetRecoilState(
		appWiseIonicLoaderRStateAtom
	);
	try {
		// Present Ion Loader
		const presentZIonLoader = async (message?: string): Promise<void> => {
			await new Promise((res, rej) => {
				res('ok');
			});
			setAppWiseIonLoaderState((oldValues) => ({
				...oldValues,
				showLoader: true,
				loaderProps: {
					message: message,
				},
			}));
		};

		// Dismiss ionLoader
		const dismissZIonLoader = () => {
			setAppWiseIonLoaderState((oldValues) => ({
				...oldValues,
				showLoader: false,
			}));
		};

		return { presentZIonLoader, dismissZIonLoader };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
		return {
			presentZIonLoader: emptyVoidReturnFunction,
			dismissZIonLoader: emptyVoidReturnFunction,
		};
	}
};

/**
 * Toast
 * custom hook for toast, success toast and error or danger toast.
 */
/** Ionic Toast */
export const useZIonToast = (): useZIonToastReturnType => {
	const setAppWiseIonToastState = useSetRecoilState(
		appWiseIonicToastRStateAtom
	);

	try {
		const presentZIonToast = async (
			message?: string,
			color?: ZIonColorType
		): Promise<void> => {
			await new Promise((res, rej) => {
				res('ok');
			});
			setAppWiseIonToastState((oldValues) => ({
				...oldValues,
				showToast: false,
			}));

			setTimeout(() => {
				setAppWiseIonToastState((oldValues) => ({
					...oldValues,
					showToast: true,
					message: message || '',
					color: color || 'primary',
				}));
			}, 0);
		};
		return { presentZIonToast };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
		return {
			presentZIonToast: emptyVoidReturnFunction,
		};
	}
};

/** Ionic danger Toast */
export const useZIonToastDanger = (): useZIonToastDangerReturnType => {
	const setAppWiseIonToastState = useSetRecoilState(
		appWiseIonicToastRStateAtom
	);

	try {
		const presentZIonToastDanger = async (message?: string): Promise<void> => {
			await new Promise((res, rej) => {
				res('ok');
			});
			setAppWiseIonToastState((oldValues) => ({
				...oldValues,
				showToast: false,
			}));

			setTimeout(() => {
				setAppWiseIonToastState((oldValues) => ({
					...oldValues,
					showToast: true,
					message: message || MESSAGES.GENERAL.FAILED,
					color: 'danger',
				}));
			}, 0);
		};
		return { presentZIonToastDanger };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
		return {
			presentZIonToastDanger: emptyVoidReturnFunction,
		};
	}
};

/** Ionic success Toast */
export const useZIonToastSuccess = (): useZIonToastSuccessReturnType => {
	const setAppWiseIonToastState = useSetRecoilState(
		appWiseIonicToastRStateAtom
	);
	try {
		const presentZIonToastSuccess = async (message?: string): Promise<void> => {
			await new Promise((res, rej) => {
				res('ok');
			});
			setAppWiseIonToastState((oldValues) => ({
				...oldValues,
				showToast: false,
			}));

			setTimeout(() => {
				setAppWiseIonToastState((oldValues) => ({
					...oldValues,
					showToast: true,
					message: message || MESSAGES.GENERAL.SUCCESS,
					color: 'success',
				}));
			}, 0);
		};
		return { presentZIonToastSuccess };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
		return {
			presentZIonToastSuccess: emptyVoidReturnFunction,
		};
	}
};

/**
 * Popover
 * custom hook for Popover.
 */
export const useZIonPopover = <A extends object>(
	component: GenericComponentType,
	componentProps?: A
): {
	presentZIonPopover: <B extends Event>({
		_event,
		_cssClass,
		_dismissOnSelect,
		_onDidDismiss,
		_onWillDismiss,
	}: {
		_event: B;
		_cssClass?: string | string[] | undefined;
		_dismissOnSelect?: boolean;
		_onDidDismiss?: (event: CustomEvent<OverlayEventDetail<unknown>>) => void;
		_onWillDismiss?: (event: CustomEvent<OverlayEventDetail<any>>) => void;
	}) => void;
	dismissZIonPopover: (data?: unknown, role?: string | undefined) => void;
} => {
	const { zNavigatePushRoute } = useZNavigate();
	const [presentIonPopover, dismissZIonPopover] = useIonPopover(component, {
		zNavigatePushRoute,
		dismissZIonPopover: (data: string, role: string) =>
			dismissZIonPopover(data, role),
		...componentProps,
	});
	try {
		const presentZIonPopover = <B extends Event>({
			_event,
			_cssClass,
			_dismissOnSelect = true,
			_onDidDismiss,
			_onWillDismiss,
		}: {
			_event: B;
			_cssClass?: string | string[];
			_dismissOnSelect?: boolean;
			_onDidDismiss?: (event: CustomEvent<OverlayEventDetail<unknown>>) => void;
			_onWillDismiss?: (event: CustomEvent<OverlayEventDetail<any>>) => void;
		}): void => {
			presentIonPopover({
				event: _event,
				keyboardClose: true,
				dismissOnSelect: _dismissOnSelect,
				showBackdrop: false,
				alignment: 'start',
				side: 'bottom',
				cssClass: _cssClass,
				animated: true,
				onDidDismiss: _onDidDismiss,
				onWillDismiss: _onWillDismiss,
			});
		};
		return { presentZIonPopover, dismissZIonPopover };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));
	}
	return {
		presentZIonPopover: emptyVoidReturnFunction,
		dismissZIonPopover: emptyVoidReturnFunction,
	};
};

/**
 * Modal
 * custom hook for Modal.
 */
export const useZIonModal = <A extends object>(
	component: GenericComponentType,
	componentProps?: A
) => {
	const { zNavigatePushRoute } = useZNavigate();
	const [presentIonModal, dismissZIonModal] = useIonModal(component, {
		dismissZIonModal: (data: string, role: string) =>
			dismissZIonModal(data, role),
		zNavigatePushRoute,
		...componentProps,
	});
	try {
		const presentZIonModal = ({
			_cssClass,
			_onWillDismiss,
			_onDidDismiss,
		}: {
			_cssClass?: string | string[];
			_onWillDismiss?: (
				event: CustomEvent<OverlayEventDetail<unknown>>
			) => void;
			_onDidDismiss?:
				| ((event: CustomEvent<OverlayEventDetail<any>>) => void)
				| undefined;
		}): void => {
			presentIonModal({
				cssClass: _cssClass,
				onWillDismiss: _onWillDismiss,
				onDidDismiss: _onDidDismiss,
			});
		};
		return { presentZIonModal, dismissZIonModal };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));

		return {
			presentZIonModal: emptyVoidReturnFunction,
			dismissZIonModal: emptyVoidReturnFunction,
		};
	}
};

/**
 * Modal
 * custom hook for Modal.
 */
export const useZIonActionSheet = () => {
	const [presentIonActionSheet] = useIonActionSheet();
	try {
		const presentZIonActionSheet = presentIonActionSheet;
		return { presentZIonActionSheet };
	} catch (error) {
		showZCapErrorDialogAlert()
			.then()
			.catch((err: Error) => zConsoleError({ err }));

		return {
			presentZIonActionSheet: emptyVoidReturnFunction,
		};
	}
};
