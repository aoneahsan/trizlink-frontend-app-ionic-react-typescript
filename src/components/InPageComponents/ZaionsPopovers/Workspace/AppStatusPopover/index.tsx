/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  bulbOutline,
  cashOutline,
  chatboxEllipsesOutline,
  ellipse,
  giftOutline,
  helpCircleOutline,
  logoAndroid,
  logoApple
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonButtons,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
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

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspaceAppStatusPopover: React.FC = () => {
  return (
    <>
      <ZIonText className='block mx-3 mt-2 text-xs tracking-widest'>
        APP STATUS
      </ZIonText>

      <ZIonList lines='none'>
        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='32px'
          lines='full'>
          <ZIonIcon
            icon={ellipse}
            color='success'
            className='w-3 h-3 me-2'
          />
          <ZIonLabel>All Systems Operational</ZIonLabel>
        </ZIonItem>

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='40px'>
          <ZIonIcon
            icon={giftOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>What&apos;s new?</ZIonLabel>
        </ZIonItem>

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='40px'>
          <ZIonIcon
            icon={bulbOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>Suggest an idea</ZIonLabel>
        </ZIonItem>

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='40px'>
          <ZIonIcon
            icon={helpCircleOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>Help center</ZIonLabel>
        </ZIonItem>

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='40px'>
          <ZIonIcon
            icon={cashOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>Pricing</ZIonLabel>
        </ZIonItem>

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='40px'
          lines='full'>
          <ZIonIcon
            icon={chatboxEllipsesOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>Contact support</ZIonLabel>
        </ZIonItem>
      </ZIonList>

      <ZIonText className='block mx-3 mt-2 text-xs tracking-widest'>
        DOWNLOAD APPS
      </ZIonText>

      <ZIonButtons className='flex mx-4 my-2 ion-justify-content-between'>
        <ZIonButton className='text-xs normal-case'>
          <ZIonIcon
            icon={logoApple}
            className='me-2'
          />{' '}
          IOS
        </ZIonButton>
        <ZIonText>|</ZIonText>
        <ZIonButton className='text-xs normal-case'>
          <ZIonIcon
            icon={logoAndroid}
            className='me-2'
          />{' '}
          Android
        </ZIonButton>
      </ZIonButtons>
    </>
  );
};

export default ZWorkspaceAppStatusPopover;
