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
  downloadOutline,
  shareOutline,
  swapHorizontalOutline
} from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList
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

const ZWorkspaceImportExportPopover: React.FC = () => {
  return (
    <>
      <ZIonList lines='none'>
        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='32px'>
          <ZIonIcon
            icon={shareOutline}
            className='w-5 h-5 me-1'
          />
          <ZIonLabel className='m-0'>Imports posts</ZIonLabel>
        </ZIonItem>

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='32px'>
          <ZIonIcon
            icon={downloadOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>Exports posts</ZIonLabel>
        </ZIonItem>

        <ZIonItem
          className='text-sm cursor-pointer ion-activatable ion-focusable'
          minHeight='32px'>
          <ZIonIcon
            icon={swapHorizontalOutline}
            className='w-5 h-5 me-1 pe-1'
          />
          <ZIonLabel className='pt-1 my-0'>Page settings</ZIonLabel>
        </ZIonItem>
      </ZIonList>
    </>
  );
};

export default ZWorkspaceImportExportPopover;
