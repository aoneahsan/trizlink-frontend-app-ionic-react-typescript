// Core Imports
import React from 'react';

// Packages Import
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

// Custom Imports
import {
  ZIonCol,
  ZIonRow,
  ZIonText,
  ZIonRouterLink
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const APSettingspassword: React.FC = () => {
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
            Pop-up with logo <ZIonRouterLink>(learn more)</ZIonRouterLink>
          </ZIonText>
        </ZIonCol>
        <ZIonCol className='ion-text-end'>
          <ZRCSwitch />
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default APSettingspassword;
