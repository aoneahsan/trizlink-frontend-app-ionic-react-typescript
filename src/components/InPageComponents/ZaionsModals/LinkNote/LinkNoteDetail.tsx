// Core Imports
import React from 'react';

// Packages Import
import { useRecoilValue } from 'recoil';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonHeader,
  ZIonContent,
  ZIonFooter,
  ZIonButton,
  ZIonImg
} from '@/components/ZIonComponents';

// Global Constants

// Images
import { ProductFaviconSmall } from '@/assets/images';

// Recoil States
import { ZaionsAppSettingsRState } from '@/ZaionsStore/zaionsAppSettings.recoil';
import { ShortLinkFormState } from '@/ZaionsStore/FormStates/shortLinkFormState';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

// Types

// Styles

const ZaionsLinkNoteDetailModal: React.FC<{
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({ dismissZIonModal }) => {
  const appSettings = useRecoilValue(ZaionsAppSettingsRState);

  const shortLinkFormState = useRecoilValue(ShortLinkFormState);

  /**
   * Handle Form Submission Function
   * add a Api Key function
   *  */

  // JSX Code
  return (
    <>
      {/**
       * Header of Modal will shown if the `showActionInModalHeader` is set to `true` in  appSetting and hide if it is `false`
       * default: false
       *  */}
      {appSettings.appModalsSetting.actions.showActionInModalHeader && (
        <ZIonHeader>
          <ZIonRow className='ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                onClick={() => {
                  // Close the Modal
                  dismissZIonModal();
                }}
                color='primary'
                className='ion-text-capitalize'
                fill='outline'>
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonHeader>
      )}

      <ZIonContent className='ion-padding'>
        <div className='flex flex-col ion-text-center ion-justify-content-center ion-padding-top ion-margin-top'>
          <div className='flex mx-auto mb-0 rounded-full w-11 h-11 ion-align-items-center ion-justify-content-enter'>
            <ZIonImg
              src={ProductFaviconSmall}
              className='w-10 h-10 mx-auto'
            />
          </div>

          <ZIonText
            color='dark'
            className='block mt-3 text-xl font-bold ion-text-center ion-padding-bottom'>
            Link Detail 📕
          </ZIonText>
        </div>

        <ZCustomScrollable
          className='ion-padding pt-0 h-[10.7rem]'
          scrollY={true}>
          <ZIonText>{shortLinkFormState.note}</ZIonText>
        </ZCustomScrollable>
      </ZIonContent>

      {/**
       * Footer of Modal will shown if the `showActionInModalFooter` is set to `true` in      appSetting, and hide if it is `false`
       * default: true
       *  */}
      {appSettings.appModalsSetting.actions.showActionInModalFooter && (
        <ZIonFooter>
          <ZIonRow className='mx-3 mt-2 ion-justify-content-between ion-align-items-center'>
            <ZIonCol>
              <ZIonButton
                fill='outline'
                size='default'
                className='ion-text-capitalize'
                onClick={() => {
                  // Close The Modal
                  dismissZIonModal();
                }}>
                Close
              </ZIonButton>
            </ZIonCol>
          </ZIonRow>
        </ZIonFooter>
      )}
    </>
  );
};

export default ZaionsLinkNoteDetailModal;
