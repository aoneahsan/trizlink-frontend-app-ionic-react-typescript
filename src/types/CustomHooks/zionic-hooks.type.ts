import { type AlertButton } from '@ionic/react';
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';

/**
 * types for ionic custom Alert hooks
 */
export interface useZIonAlertPropsType {
  header?: string;
  subHeader?: string;
  message?: string;
  animated?: boolean;
  keyboardClose?: boolean;
  buttons?: Array<string | AlertButton>;
}

export type UseZIonAlertReturnCustomType = (
  input: useZIonAlertPropsType
) => Promise<void> | void;

export interface UseZIonAlertReturnType {
  presentZIonAlert: (input: useZIonAlertPropsType) => Promise<void> | void;
}

export interface UseZIonAlertSuccessReturnType {
  presentZIonSuccessAlert: () => Promise<void> | void;
}

export interface useZIonErrorAlertReturnType {
  presentZIonErrorAlert: (props?: {
    message?: string;
    header?: string;
    subHeader?: string;
  }) => Promise<void> | void;
}

/**
 * types for ionic custom Loading hooks
 */
type useZIonLoadingPresentReturnType = (
  message?: string
) => Promise<void> | void;

type useZIonLoadingDismissReturnType = () => Promise<void> | void;

export interface useZIonLoadingReturnType {
  presentZIonLoader: useZIonLoadingPresentReturnType;
  dismissZIonLoader: useZIonLoadingDismissReturnType;
}

/**
 * types for ionic custom Toast hooks
 */
type useZIonToastPresentReturnType = (
  message?: string,
  color?: ZIonColorType
) => Promise<void> | void;

export interface useZIonToastReturnType {
  presentZIonToast: useZIonToastPresentReturnType;
}

export interface useZIonToastDangerReturnType {
  presentZIonToastDanger: useZIonToastPresentReturnType;
}

export interface useZIonToastSuccessReturnType {
  presentZIonToastSuccess: useZIonToastPresentReturnType;
}
