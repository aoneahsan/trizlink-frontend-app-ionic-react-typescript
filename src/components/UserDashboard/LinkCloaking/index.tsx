// Core Imports
import React from 'react';

// Packages Import
import { eyeOffOutline, warningOutline } from 'ionicons/icons';
import RCSwitch from 'rc-switch';

// Custom Imports
import {
  ZIonCol,
  ZIonText,
  ZIonIcon,
  ZIonRouterLink,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const LinkCloaking: React.FC = () => {
  return (
    <>
      <ZIonCol
        sizeXl='5.9'
        sizeLg='5.9'
        sizeMd='5.9'
        sizeSm='12'
        sizeXs='12'
        className='py-3 border zaions__bg_white'>
        <div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
          <ZIonIcon
            icon={eyeOffOutline}
            size='large'
          />
          <ZIonText className='font-bold ion-no-margin ps-2'>
            Link cloaking
            <ZIonRouterLink
              className='ms-1'
              routerLink={ZaionsRoutes.HomeRoute}>
              (help)
            </ZIonRouterLink>
          </ZIonText>
          <RCSwitch
            className='ms-auto me-2'
            checked={false}
            checkedChildren='on'
            unCheckedChildren='off'
          />
        </div>
        <div className='block px-4 mt-4 mb-2'>
          <ZIonTitle
            className='block px-3 py-2 border rounded border-warning ion-align-items-center'
            color={'warning'}
            size='small'>
            <ZIonIcon
              icon={warningOutline}
              className='pe-2'></ZIonIcon>{' '}
            Use your Use your own domain to activate this option{' '}
            <ZIonRouterLink
              routerLink={ZaionsRoutes.HomeRoute}
              className='underline'
              color={'warning'}>
              (learn more)
            </ZIonRouterLink>
          </ZIonTitle>
        </div>
      </ZIonCol>
    </>
  );
};

export default LinkCloaking;
