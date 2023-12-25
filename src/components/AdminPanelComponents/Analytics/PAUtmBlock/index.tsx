/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { pricetagOutline } from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonIcon, ZIonText } from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type IAnalyticsModalTable } from '@/types/AdminPanel/index.type';

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
interface PAUtmBlockI {
  data?: IAnalyticsModalTable[];
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const PAUtmBlock: React.FC<PAUtmBlockI> = () => {
  const { isLgScale } = useZMediaQueryScale();

  return (
    <div className='h-full overflow-hidden border rounded-lg shadow-md zaions__light_bg'>
      <div
        className={classNames({
          'px-2 py-3 border-b zaions__bg_white': true,
          'ion-text-center': !isLgScale
        })}>
        <ZIonText className='text-lg'>🎫 UTMs tags</ZIonText>
      </div>

      {/*  */}
      <div className='flex flex-col gap-3 ion-padding ion-align-items-center ion-justify-content-center'>
        <ZIonIcon
          icon={pricetagOutline}
          className='w-20 h-20'
          color='medium'
        />
        <div className='flex flex-col mt-3 ion-text-center'>
          <ZIonText className='text-lg'>Want to add UTMs tags?</ZIonText>
          <ZIonText
            className='mt-2'
            color='medium'>
            You can add UTMs on the link edition.
          </ZIonText>
        </div>
      </div>
    </div>
  );
};

export default PAUtmBlock;
