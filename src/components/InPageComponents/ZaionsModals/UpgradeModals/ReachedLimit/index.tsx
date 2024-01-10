/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonContent,
  ZIonIcon,
  ZIonImg,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductFavicon } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZReachedLimitModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
  zNavigatePushRoute?: (_url: string) => void;
}> = ({ dismissZIonModal, zNavigatePushRoute }) => {
  return (
    <ZIonContent className='ion-padding'>
      {/* Close modal button */}
      <div className='ion-text-end'>
        <ZIonIcon
          icon={closeOutline}
          className='cursor-pointer w-7 h-7'
          testingselector={
            CONSTANTS.testingSelectors.reachedLimitModal.closeBtn
          }
          onClick={() => {
            dismissZIonModal();
          }}
        />
      </div>

      {/*  */}
      <div className='flex flex-col ion-text-center ion-justify-content-center'>
        <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
          <ZIonImg
            src={ProductFavicon}
            className='w-12 h-12 mx-auto'
          />
        </div>

        <ZIonText
          color='dark'
          className='mt-3 text-xl font-bold'>
          Oh, seems you have reached your plan limits
        </ZIonText>

        <ZIonText
          color='medium'
          className='mt-3 text-md w-[72%] mx-auto my-3'>
          To move forward, increase your limit. Choose the best plan that fit
          your needs!
        </ZIonText>

        <ZIonButton
          expand='block'
          className='mt-4'
          onClick={() => {
            if (zNavigatePushRoute !== undefined) {
              dismissZIonModal();

              zNavigatePushRoute(
                ZaionsRoutes.AdminPanel.Setting.UserAccount.AccountPlansSettings
              );
            }
          }}
          testingselector={
            CONSTANTS.testingSelectors.reachedLimitModal.upgradeBtn
          }>
          Upgrade
        </ZIonButton>
      </div>
    </ZIonContent>
  );
};

export default ZReachedLimitModal;
