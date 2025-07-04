/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

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
import { LOCALSTORAGE_KEYS } from '@/utils/constants';
import { STORAGE } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { reportCustomError } from '@/utils/customErrorType';
import { errorCodes } from '@/utils/constants/apiConstants';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { Z404Svg } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */
const Z404View: React.FC = () => {
  const [compState, setCompState] = useState<{
    message: string;
  }>({
    message: 'Not found'
  });

  const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

  useEffect(() => {
    void (async () => {
      try {
        const _errorData = (await STORAGE.GET(
          LOCALSTORAGE_KEYS.ERROR_DATA
        )) as { message: string; status: number } | null;

        if (
          _errorData !== undefined &&
          _errorData?.status === errorCodes?.notFound
        ) {
          setCompState(oldValue => ({
            ...oldValue,
            message: _errorData?.message
          }));
        }
      } catch (error) {
        reportCustomError(error);
      }
    })();
  }, []);

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
            src={Z404Svg}
            className={classNames({
              'w-[60%] h-[60%]': isLgScale,
              'w-[22rem] h-[22rem]': !isLgScale && isSmScale,
              'w-[95%] h-[95%]': !isSmScale
            })}
          />

          <ZIonText className=' md:text-5xl'>{compState.message}</ZIonText>
          <ZIonText className='mt-3 md:text-lg ion-text-center'>
            404 Error: You&apos;ve ventured into uncharted territory! This page
            seems to be on a coffee break. Head back or visit our homepage.
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

export default Z404View;
