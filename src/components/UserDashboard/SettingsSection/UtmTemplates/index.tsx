// Core Imports
import React from 'react';

// Packages Import

// Custom Imports
import ZaionsUTMTagsTemplateTable from '@/components/InPageComponents/ZaionsTable/UTMTagsTemplateTable';
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink,
  ZIonButton
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { useZIonModal } from '@/ZaionsHooks/zionic-hooks';
import ZaionsAddUtmTags from '@/components/InPageComponents/ZaionsModals/AddUtmTags';

// Types

// Styles

const APSettingsUtmTags: React.FC = () => {
  const { presentZIonModal: presentUtmTagsModal } =
    useZIonModal(ZaionsAddUtmTags);
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
            Create new UTMs tags preset{' '}
            <ZIonRouterLink>(learn more)</ZIonRouterLink>
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
              presentUtmTagsModal({
                _cssClass: 'utm-tags-modal-size'
              });
            }}>
            Add
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>
      <ZaionsUTMTagsTemplateTable />
    </>
  );
};

export default APSettingsUtmTags;
