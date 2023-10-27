// Core Imports
import React from 'react';

// Packages Import

// Custom Imports
import ZaionsPixelAccountData from '@/components/InPageComponents/ZaionsTable/pixelAccountTable';
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { ZIonButton } from '@/components/ZIonComponents';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsAddPixelAccount from '@/components/InPageComponents/ZaionsModals/AddPixelsAccount';
import { useParams } from 'react-router';

// Types

// Styles

const APSettingsPixels: React.FC = () => {
  // getting link-in-bio and workspace ids from url with the help of useParams.
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const { presentZIonModal: presentZAddPixelAccount } = useZIonModal(
    ZaionsAddPixelAccount,
    { workspaceId }
  );

  return (
    <>
      <ZIonRow className='px-4 py-4 mx-4 mt-5 zaions__bg_white ion-align-items-center'>
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className=''>
          <ZIonText
            className='p-0 font-bold'
            color={'dark'}>
            Your Pixels <ZIonRouterLink>(learn more)</ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
        <ZIonCol
          sizeXl='6'
          sizeLg='6'
          sizeMd='6'
          sizeSm='6'
          sizeXs='12'
          className='ion-text-end'>
          <ZIonButton
            className='ion-text-capitalize'
            onClick={() => {
              presentZAddPixelAccount({
                _cssClass: 'pixel-account-modal-size'
              });
            }}>
            Add a new pixel
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
      <ZaionsPixelAccountData />
    </>
  );
};

export default APSettingsPixels;
