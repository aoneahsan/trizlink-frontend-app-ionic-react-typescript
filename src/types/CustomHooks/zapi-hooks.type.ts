import { apiTypeToValidateEnum, notificationTypeEnum } from '@/utils/enums';

/**
 * Enums
 */
export enum zAxiosApiRequestContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
}

/**
 * Interfaces
 */
export interface validateRequestResponseInterface {
  resultObj: unknown;
  successNotificationType?: notificationTypeEnum;
  errorNotificationType?: notificationTypeEnum;
  showNotification?: boolean;
  apiTypeToValidate?: apiTypeToValidateEnum;
}
