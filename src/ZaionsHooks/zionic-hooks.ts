import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import {
  useIonAlert,
  useIonLoading,
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

type GenericComponentType = JSX.Element | ReactComponentOrElement;

/**
 * Alerts
 * custom hook for Alert, success alert and error alert.
 */
/** Default Alert */
export const useZIonAlert = (): UseZIonAlertReturnType => {
  const [presentIonAlert] = useIonAlert();
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
      await presentIonAlert({
        header,
        subHeader,
        message,
        animated,
        keyboardClose,
        buttons,
      });
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
  const { presentZIonAlert } = useZIonAlert();
  try {
    const presentZIonSuccessAlert = async (): Promise<void> => {
      await presentZIonAlert({
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
      });
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
  const { presentZIonAlert } = useZIonAlert();
  try {
    const presentZIonErrorAlert = async (): Promise<void> => {
      await presentZIonAlert({
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
      });
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
  const [presentIonLoader, dismissZIonLoader] = useIonLoading();
  try {
    const presentZIonLoader = async (message?: string): Promise<void> => {
      await presentIonLoader({
        message: message || MESSAGES.GENERAL.LOADING,
        animated: true,
        spinner: 'circles',
        id: id,
      });
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
  const [presentIonToast, dismissZionToast] = useIonToast();
  try {
    const presentZIonToast = async (
      message?: string,
      color?: ZIonColorType
    ): Promise<void> => {
      await presentIonToast({
        message: message || MESSAGES.GENERAL.SUCCESS,
        animated: true,
        keyboardClose: true,
        position: 'bottom',
        duration: CONSTANTS.ION_TOAST.TOAST_DURATION,
        color: color || 'primary',
      });
    };
    return { presentZIonToast, dismissZionToast };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonToast: emptyVoidReturnFunction,
      dismissZionToast: emptyVoidReturnFunction,
    };
  }
};

/** Ionic danger Toast */
export const useZIonToastDanger = (): useZIonToastDangerReturnType => {
  const { presentZIonToast, dismissZionToast: dismissZIonToastDanger } =
    useZIonToast();
  try {
    const presentZIonToastDanger = async (message?: string): Promise<void> => {
      await presentZIonToast(message || MESSAGES.GENERAL.FAILED, 'danger');
    };
    return { presentZIonToastDanger, dismissZIonToastDanger };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonToastDanger: emptyVoidReturnFunction,
      dismissZIonToastDanger: emptyVoidReturnFunction,
    };
  }
};

/** Ionic success Toast */
export const useZIonToastSuccess = (): useZIonToastSuccessReturnType => {
  const { presentZIonToast, dismissZionToast: dismissZIonToastSuccess } =
    useZIonToast();
  try {
    const presentZIonToastSuccess = async (message?: string): Promise<void> => {
      await presentZIonToast(message || MESSAGES.GENERAL.FAILED, 'success');
    };
    return { presentZIonToastSuccess, dismissZIonToastSuccess };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonToastSuccess: emptyVoidReturnFunction,
      dismissZIonToastSuccess: emptyVoidReturnFunction,
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
  }: {
    _event: B;
    _cssClass?: string | string[] | undefined;
    _dismissOnSelect?: boolean;
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
    }: {
      _event: B;
      _cssClass?: string | string[];
      _dismissOnSelect?: boolean;
    }): void => {
      presentIonPopover({
        event: _event,
        keyboardClose: true,
        dismissOnSelect: _dismissOnSelect,
        showBackdrop: false,
        alignment: 'start',
        side: 'bottom',
        cssClass: _cssClass,
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
): {
  presentZIonModal: ({
    _cssClass,
    _onWillDismiss,
  }: {
    _cssClass?: string | string[];
    _onWillDismiss?: (event: CustomEvent<OverlayEventDetail<unknown>>) => void;
  }) => void | void;
  dismissZIonModal: (data?: unknown, role?: string | undefined) => void | void;
} => {
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
    }: {
      _cssClass?: string | string[];
      _onWillDismiss?: (
        event: CustomEvent<OverlayEventDetail<unknown>>
      ) => void;
    }): void => {
      presentIonModal({
        cssClass: _cssClass,
        onWillDismiss: _onWillDismiss,
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
