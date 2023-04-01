import { AlertButton } from '@ionic/react';
import { ZIonColorType } from 'types/zaionsAppSettings.type';

/**
 * types for ionic custom Alert hooks
 */
export type useZIonAlertPropsType = {
  header?: string;
  subHeader?: string;
  message?: string;
  animated?: boolean;
  keyboardClose?: boolean;
  buttons?: (string | AlertButton)[];
};

export type UseZIonAlertReturnCustomType = (
  input: useZIonAlertPropsType
) => Promise<void> | void;

export type UseZIonAlertReturnType = {
  presentZIonAlert: (input: useZIonAlertPropsType) => Promise<void> | void;
};

export type UseZIonAlertSuccessReturnType = {
  presentZIonSuccessAlert: () => Promise<void> | void;
};

export type useZIonErrorAlertReturnType = {
  presentZIonErrorAlert: () => Promise<void> | void;
};

/**
 * types for ionic custom Loading hooks
 */
type useZIonLoadingPresentReturnType = (
  message?: string
) => Promise<void> | void;

type useZIonLoadingDismissReturnType = () => Promise<void> | void;

export type useZIonLoadingReturnType = {
  presentZIonLoader: useZIonLoadingPresentReturnType;
  dismissZIonLoader: useZIonLoadingDismissReturnType;
};

/**
 * types for ionic custom Toast hooks
 */
type useZIonToastPresentReturnType = (
  message?: string,
  color?: ZIonColorType
) => Promise<void> | void;

type useZIonToastDismissReturnType = () => Promise<void> | void;

export type useZIonToastReturnType = {
  presentZIonToast: useZIonToastPresentReturnType;
  dismissZionToast: useZIonToastDismissReturnType;
};

export type useZIonToastDangerReturnType = {
  presentZIonToastDanger: useZIonToastPresentReturnType;
  dismissZIonToastDanger: useZIonToastDismissReturnType;
};

export type useZIonToastSuccessReturnType = {
  presentZIonToastSuccess: useZIonToastPresentReturnType;
  dismissZIonToastSuccess: useZIonToastDismissReturnType;
};
