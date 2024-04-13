import { logOutOutline } from 'ionicons/icons';
import {
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonSegmentButton
} from '../ZIonComponents';
import CONSTANTS, { LOCALSTORAGE_KEYS } from '@/utils/constants';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonLoading
} from '@/ZaionsHooks/zionic-hooks';
import MESSAGES from '@/utils/messages';
import { STORAGE, zAxiosApiRequest } from '@/utils/helpers';
import { API_URL_ENUM } from '@/utils/enums';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { reportCustomError } from '@/utils/customErrorType';

const LogoutButton: React.FC<{ useSegmentButton?: boolean }> = ({
  useSegmentButton
}) => {
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(); // hook to show loader
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();

  const ZLogoutAlert = async (): Promise<void> => {
    try {
      await presentZIonAlert({
        header: MESSAGES.Logout.LOGOUT_ALERT.HEADER,
        subHeader: MESSAGES.Logout.LOGOUT_ALERT.SUB_HEADER,
        message: MESSAGES.Logout.LOGOUT_ALERT.MESSAGES,
        buttons: [
          {
            text: 'Close',
            role: 'cancel'
          },
          {
            text: 'Logout',
            cssClass: 'zaions_ion_color_danger',
            role: 'danger',
            handler: () => {
              void profileLogoutHandler();
            }
          }
        ]
      });
    } catch (error) {
      await presentZIonErrorAlert();
    }
  };

  const profileLogoutHandler = async (): Promise<void> => {
    try {
      // Loading start...
      await presentZIonLoader('Logging out. please wait a second.');

      // logout user
      const _response = await zAxiosApiRequest<{
        data: { isSuccess: boolean };
      }>({
        _url: API_URL_ENUM.logout,
        _method: 'post',
        _isAuthenticatedRequest: false
      });

      if (_response?.data.isSuccess === true) {
        // clear User token.
        void STORAGE.CLEAR(LOCALSTORAGE_KEYS.USERDATA);
        // clear auth token.
        void STORAGE.CLEAR(LOCALSTORAGE_KEYS.AUTHTOKEN);

        // Dismiss the ion loader
        await dismissZIonLoader();

        // redirect to home
        window.location.replace(ZaionsRoutes.LoginRoute);
      } else {
        throw new Error('Something went wrong please try again!');
      }
    } catch (error) {
      // Dismiss the ion loader
      await dismissZIonLoader();

      reportCustomError(error);
    }
  };

  const content = (
    <>
      <ZIonIcon
        icon={logOutOutline}
        className='w-5 h-5 me-1 pe-1'
        color='danger'
      />
      <ZIonLabel className='pt-1 my-0'>Logout</ZIonLabel>
    </>
  );

  return (
    <>
      {useSegmentButton ? (
        <>
          <ZIonSegmentButton
            value='user-account-setting'
            className='flex normal-case'
            onClick={() => {
              void ZLogoutAlert();
            }}>
            {content}
          </ZIonSegmentButton>
        </>
      ) : (
        <>
          <ZIonItem
            className='text-sm cursor-pointer ion-activatable ion-focusable'
            minHeight='40px'
            lines='none'
            onClick={() => {
              void ZLogoutAlert();
            }}
            testingselector={
              CONSTANTS.testingSelectors.user.profilePopover.logout
            }>
            {content}
          </ZIonItem>
        </>
      )}
    </>
  );
};

export default LogoutButton;
