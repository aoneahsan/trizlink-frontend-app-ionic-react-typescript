import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
// zapi-hooks means "Zaions Api Hooks"

// import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { reportCustomError } from '@/utils/customErrorType';
import { apiTypeToValidateEnum, notificationTypeEnum } from '@/utils/enums';
import { type validateRequestResponseInterface } from '@/types/CustomHooks/zapi-hooks.type';
import { useZNotification } from './ZGenericHooks';
import { zNotificationSlotEnum } from '@/types/CustomHooks/zgeneric-hooks.type';

// Ahsan bhai said when ever I say verify change it to validate

// The hook that will show notification.
export const useZValidateRequestResponse = (): {
  validateRequestResponse: ({
    resultObj,
    successNotificationType,
    errorNotificationType,
    apiTypeToValidate
  }: validateRequestResponseInterface) => Promise<void>;
} => {
  /**
   * useZNotification hook will show notification, like if we went success toast notification or error toast notification or like success sideNotification or error sideNotification etc.
   */
  const { presentZNotification } = useZNotification();

  //
  const validateRequestResponse = async ({
    resultObj, // the result object that you went to validate.
    successNotificationType = notificationTypeEnum.toast, // the type of notification that you went to show in it success.
    errorNotificationType = notificationTypeEnum.sideNotification, // the type of notification that you went to show in it error.
    apiTypeToValidate = apiTypeToValidateEnum.MutationApi // structure of object.
  }: validateRequestResponseInterface): Promise<void> => {
    try {
      if (resultObj !== undefined) {
        /**
         * Accounting to the structure of object(return of the api request). we will extract the object and check if the success is true/false and show success/error notification.
         * As different API request return different type of objects so the switch will extract accounting to the object structure and check the success key and return the notification accounting to success.
         */
        switch (apiTypeToValidate) {
          case apiTypeToValidateEnum.MutationApi:
            if ((resultObj as ZLinkMutateApiType<unknown>).success) {
              await presentZNotification({
                message: (resultObj as ZLinkMutateApiType<unknown>).message,
                notificationType: successNotificationType,
                slot: zNotificationSlotEnum.success
              });
            } else if (!(resultObj as ZLinkMutateApiType<unknown>).success) {
              await presentZNotification({
                message: (resultObj as ZLinkMutateApiType<unknown>).message,
                notificationType: errorNotificationType,
                slot: zNotificationSlotEnum.error
              });
            }
            break;

          default:
            break;
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return { validateRequestResponse };
};
