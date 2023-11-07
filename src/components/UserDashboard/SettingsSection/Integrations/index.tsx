// Core Imports
import React from 'react';

import { noToken } from '@/assets/images';
import { useRecoilValue } from 'recoil';

// Custom Imports
import ZaionsAPIKeysTable from '@/components/InPageComponents/ZaionsTable/APIKeysTable';
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { APIKeyState } from '@/ZaionsStore/UserDashboard/APIKey';
import { PRODUCT_NAME } from '@/utils/constants';
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsAddAPIKeyModal from '@/components/InPageComponents/ZaionsModals/AddAPIKey';

// Types

// Styles

const APSettingsApiKey: React.FC = () => {
  const ApiKeysData = useRecoilValue(APIKeyState);
  const { presentZIonModal: presentZApiKeyModal } =
    useZIonModal(ZaionsAddAPIKeyModal);
  return (
    <>
      <ZIonRow className='px-4 py-4 mx-4 mt-5 mb-3 zaions__bg_white ion-align-items-center'>
        <ZIonCol
          sizeXl='4'
          sizeLg='5'
          sizeMd='6'
          sizeSm='8'
          sizeXs='12'>
          <ZIonText
            className='p-0 mb-2 font-bold'
            color={'dark'}>
            Generate a new API Key <ZIonRouterLink>(learn more)</ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
        <ZIonCol className='ion-text-end'>
          <ZIonButton
            className='ion-text-capitalize'
            onClick={() => {
              presentZApiKeyModal({
                _cssClass: 'api-key-modal-size'
              });
            }}>
            Generate
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
      {ApiKeysData?.length > 0 ? (
        <ZaionsAPIKeysTable />
      ) : (
        <ZIonRow className='px-4 py-4 mx-4 mt-5 zaions__bg_white ion-align-items-center'>
          <ZIonCol className='pt-5 ion-text-center'>
            <ZIonText
              className='inline-block p-0 mb-4 font-bold'
              color={'dark'}>
              Add new API key
            </ZIonText>
            <br />
            <ZIonText color={'medium'}>
              API keys provide full access to your {PRODUCT_NAME} <br /> account
              so, keep them safe 😉
            </ZIonText>
            <br />
            <ZIonImg
              src={noToken}
              className='w-[40%] mx-auto mt-5'
            />
          </ZIonCol>
        </ZIonRow>
      )}
    </>
  );
};

export default APSettingsApiKey;
