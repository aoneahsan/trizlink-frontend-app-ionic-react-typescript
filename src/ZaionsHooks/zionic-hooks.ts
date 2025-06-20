import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
  useIonPopover,
  type ReactComponentOrElement,
  useIonModal,
  useIonActionSheet,
  createAnimation,
  type Animation
} from '@ionic/react';
import MESSAGES from '@/utils/messages';
import {
  emptyVoidReturnFunction,
  showZCapErrorDialogAlert,
  zConsoleError
} from '@/utils/helpers';
import { NOTIFICATIONS } from '@/utils/constants';
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';
import {
  type useZIonAlertPropsType,
  type UseZIonAlertReturnType,
  type UseZIonAlertSuccessReturnType,
  type useZIonErrorAlertReturnType,
  type useZIonLoadingReturnType,
  type useZIonToastDangerReturnType,
  type useZIonToastReturnType,
  type useZIonToastSuccessReturnType
} from '@/types/CustomHooks/zionic-hooks.type';
import { type OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import {
  appWiseIonicAlertRStateAtom,
  appWiseIonicLoaderRStateAtom,
  appWiseIonicToastRStateAtom
} from '@/ZaionsStore/AppRStates';
import { type ToastOptions } from 'react-toastify';
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';

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
          role: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.ROLE
        }
      ]
    }: useZIonAlertPropsType): Promise<void> => {
      setAppWiseIonAlertState(oldValues => ({
        ...oldValues,
        showAlert: false
      }));
      // eslint-disable-next-line promise/param-names
      await new Promise((res, rej) => {
        res('ok');
      });
      setTimeout(() => {
        setAppWiseIonAlertState(oldValues => ({
          ...oldValues,
          showAlert: true,
          alertProps: {
            ...oldValues.alertProps,
            header,
            subHeader,
            message,
            animated,
            keyboardClose,
            buttons
          }
        }));
      }, 0);
    };
    return { presentZIonAlert };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
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
      setAppWiseIonAlertState(oldValues => ({
        ...oldValues,
        showAlert: false
      }));
      // eslint-disable-next-line promise/param-names
      await new Promise(res => {
        res('ok');
      });
      setTimeout(() => {
        setAppWiseIonAlertState(oldValues => ({
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
                role: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.ROLE
              }
            ]
          }
        }));
      }, 0);
    };
    return { presentZIonSuccessAlert };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
    return { presentZIonSuccessAlert: emptyVoidReturnFunction };
  }
};

/** Error Alert */
export const useZIonErrorAlert = (): useZIonErrorAlertReturnType => {
  const setAppWiseIonAlertState = useSetRecoilState(
    appWiseIonicAlertRStateAtom
  );

  try {
    const presentZIonErrorAlert = async (props?: {
      message?: string;
      header?: string;
      subHeader?: string;
    }): Promise<void> => {
      setAppWiseIonAlertState(oldValues => ({
        ...oldValues,
        showAlert: false
      }));
      // eslint-disable-next-line promise/param-names
      await new Promise(res => {
        res('ok');
      });
      setTimeout(() => {
        setAppWiseIonAlertState(oldValues => ({
          ...oldValues,
          showAlert: true,
          alertProps: {
            header: props?.header ?? MESSAGES.GENERAL.FAILED,
            subHeader: props?.subHeader ?? MESSAGES.GENERAL.FAILED_SUBHEADING,
            message: props?.message ?? MESSAGES.GENERAL.FAILED_MESSAGE,
            animated: true,
            keyboardClose: true,
            buttons: [
              {
                text: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
                role: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.ROLE
              }
            ]
          }
        }));
      }, 0);
    };
    return { presentZIonErrorAlert };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
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
      // eslint-disable-next-line promise/param-names
      await new Promise(res => {
        res('ok');
      });
      setAppWiseIonLoaderState(oldValues => ({
        ...oldValues,
        showLoader: true,
        loaderProps: {
          message
        }
      }));
    };

    // Dismiss ionLoader
    const dismissZIonLoader = (): void => {
      setAppWiseIonLoaderState(oldValues => ({
        ...oldValues,
        showLoader: false
      }));
    };

    return { presentZIonLoader, dismissZIonLoader };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
    return {
      presentZIonLoader: emptyVoidReturnFunction,
      dismissZIonLoader: emptyVoidReturnFunction
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
      color?: ZIonColorType,
      toastProps?: ToastOptions
    ): Promise<void> => {
      // eslint-disable-next-line promise/param-names
      await new Promise(res => {
        res('ok');
      });
      setAppWiseIonToastState(oldValues => ({
        ...oldValues,
        showToast: false
      }));

      setTimeout(() => {
        setAppWiseIonToastState(oldValues => ({
          ...oldValues,
          showToast: true,
          message: message ?? '',
          color: color ?? 'primary',
          toastProps: toastProps ?? {}
        }));
      }, 0);
    };
    return { presentZIonToast };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
    return {
      presentZIonToast: emptyVoidReturnFunction
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
      // eslint-disable-next-line promise/param-names
      await new Promise(res => {
        res('ok');
      });
      setAppWiseIonToastState(oldValues => ({
        ...oldValues,
        showToast: false
      }));

      setTimeout(() => {
        setAppWiseIonToastState(oldValues => ({
          ...oldValues,
          showToast: true,
          message: message ?? MESSAGES.GENERAL.FAILED,
          color: 'danger'
        }));
      }, 0);
    };
    return { presentZIonToastDanger };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
    return {
      presentZIonToastDanger: emptyVoidReturnFunction
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
      // eslint-disable-next-line promise/param-names
      await new Promise(res => {
        res('ok');
      });
      setAppWiseIonToastState(oldValues => ({
        ...oldValues,
        showToast: false
      }));

      setTimeout(() => {
        setAppWiseIonToastState(oldValues => ({
          ...oldValues,
          showToast: true,
          message: message ?? MESSAGES.GENERAL.SUCCESS,
          color: 'success',
          toastProps: {}
        }));
      }, 0);
    };
    return { presentZIonToastSuccess };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
    return {
      presentZIonToastSuccess: emptyVoidReturnFunction
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
    _onWillDismiss
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
    dismissZIonPopover: (data: string, role: string) => {
      dismissZIonPopover(data, role);
    },
    ...componentProps
  });
  try {
    const presentZIonPopover = <B extends Event>({
      _event,
      _cssClass,
      _dismissOnSelect = true,
      _onDidDismiss,
      _onWillDismiss
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
        onWillDismiss: _onWillDismiss
      });
    };
    return { presentZIonPopover, dismissZIonPopover };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });
  }
  return {
    presentZIonPopover: emptyVoidReturnFunction,
    dismissZIonPopover: emptyVoidReturnFunction
  };
};

/**
 * Modal
 * custom hook for Modal.
 */
export const useZIonModal = <A extends object>(
  component: GenericComponentType,
  componentProps?: A
): {
  presentZIonModal: ({
    _cssClass,
    _onWillDismiss,
    _onDidDismiss
  }: {
    _cssClass?: string | string[] | undefined;
    _onWillDismiss?:
      | ((event: CustomEvent<OverlayEventDetail<unknown>>) => void)
      | undefined;
    _onDidDismiss?:
      | ((event: CustomEvent<OverlayEventDetail<any>>) => void)
      | undefined;
  }) => void;
  dismissZIonModal: (data?: any, role?: string | undefined) => void;
} => {
  const { zNavigatePushRoute } = useZNavigate();
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);
  const [presentIonModal, dismissZIonModal] = useIonModal(component, {
    dismissZIonModal: (data: string, role: string) => {
      dismissZIonModal(data, role);
    },
    zNavigatePushRoute,
    ...componentProps
  });
  try {
    const _enterAnimation = (baseEl: HTMLElement): Animation => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
        .addElement(root?.querySelector('ion-backdrop') as Element)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
        .addElement(root?.querySelector('.modal-wrapper') as Element)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

      return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const _leaveAnimation = (baseEl: HTMLElement): Animation => {
      return _enterAnimation(baseEl).direction('reverse');
    };

    const presentZIonModal = ({
      _cssClass,
      _onWillDismiss,
      _onDidDismiss
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
        cssClass: `${
          appSettings?.appModalsSetting?.applyBorderRadius
            ? 'border-radius_point_6'
            : ''
        } ${(_cssClass as string) ?? ''}`,
        onWillDismiss: _onWillDismiss,
        onDidDismiss: _onDidDismiss,
        leaveAnimation: _leaveAnimation,
        enterAnimation: _enterAnimation
        // initialBreakpoint: 1,
        // breakpoints: [0, 1]
      });
    };
    return { presentZIonModal, dismissZIonModal };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });

    return {
      presentZIonModal: emptyVoidReturnFunction,
      dismissZIonModal: emptyVoidReturnFunction
    };
  }
};

/**
 * Modal
 * custom hook for Modal.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useZIonActionSheet = () => {
  const [presentIonActionSheet] = useIonActionSheet();
  try {
    const presentZIonActionSheet = presentIonActionSheet;
    return { presentZIonActionSheet };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => {
        zConsoleError({ err });
      });

    return {
      presentZIonActionSheet: emptyVoidReturnFunction
    };
  }
};
