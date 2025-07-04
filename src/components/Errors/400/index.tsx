/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonContent,
  ZIonImg,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';
import ZaionsSecondaryHeader from '@/components/InPageComponents/ZaionsSecondaryHeader';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
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

import { Z400Svg } from '@/assets/images';
/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const Z400View: React.FC = () => {
  const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();
  return (
    <ZIonContent>
      <ZaionsSecondaryHeader />

      {/*  */}
      <ZIonRow className='w-full h-full ion-justify-content-center'>
        <div
          className={classNames({
            'flex flex-col ion-align-items-center ion-text-center': true,
            'w-[40rem] h-[40rem]': isLgScale,
            'w-[25rem]': !isLgScale && isMdScale,
            'w-[95%]': !isMdScale
          })}>
          <ZIonImg
            src={Z400Svg}
            className={classNames({
              'w-[60%] h-[60%]': isLgScale,
              'w-[22rem] h-[22rem]': !isLgScale && isSmScale,
              'w-[95%] h-[95%]': !isSmScale
            })}
          />

          <ZIonText className='mt-2 text-2xl md:text-4xl sm:text-3xl lg:text-4xl'>
            Bad Request
          </ZIonText>
          <ZIonText className='mt-3 text-sm md:text-lg lg:text-lg ion-text-center'>
            Uh-oh! Your request has hit a snag and couldn&apos;t be processed
            properly. Kindly review the data you&apos;ve provided and attempt
            again. Should you encounter persistent difficulties, don&apos;t
            hesitate to get in touch with our support team for expert help.
          </ZIonText>

          <ZIonButton
            routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}
            className={classNames({
              'sm:text-xs md:text-sm mt-4 w-[10rem]': true,
              'mb-4': !isLgScale,
              'w-[90%]': !isSmScale
            })}>
            Go Home
          </ZIonButton>
        </div>
      </ZIonRow>
    </ZIonContent>
  );
};

export default Z400View;
