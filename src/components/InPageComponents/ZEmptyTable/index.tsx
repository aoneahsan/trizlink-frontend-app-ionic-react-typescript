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
import { ZIonButton, ZIonImg, ZIonText } from '@/components/ZIonComponents';

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
import { zEmptyTable } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZEmptyTable: React.FC<{
  message?: string;
  btnOnClick?: React.MouseEventHandler<HTMLIonButtonElement>;
  btnText?: string;
  showBtn?: boolean;
  testingselector?: string;
  btnTestingselector?: string;
}> = ({
  message = 'no data found!',
  btnOnClick,
  btnText,
  showBtn = true,
  btnTestingselector,
  testingselector
}) => {
  const { isLgScale, isMdScale } = useZMediaQueryScale();
  return (
    <div
      className={classNames({
        'bg-transparent flex ion-align-items-center ion-justify-content-center w-full h-full':
          true,
        'flex-col': !isMdScale
      })}>
      <ZIonImg
        testingselector={`${testingselector}-image`}
        src={zEmptyTable}
        className={classNames({
          'mt-2': true,
          'w-[15rem]': isMdScale,
          'w-[10rem]': !isMdScale
        })}
      />
      <div
        className={classNames({
          'ms-4 max-w-[30%]': true,
          'min-w-[20%]': isLgScale,
          'min-w-[40%]': !isLgScale && isMdScale,
          'min-w-[95%] flex flex-col ion-align-items-center ion-text-center':
            !isMdScale
        })}>
        <ZIonText
          testingselector={`${testingselector}-text`}
          className={classNames({
            'inline-block max-content': true,
            'text-lg': isMdScale,
            'text-sm': !isMdScale
          })}
          color='medium'>
          {/* No short links founds. please create a short link. */}
          {message}
        </ZIonText>
        {showBtn ? (
          <ZIonButton
            onClick={btnOnClick}
            testingselector={btnTestingselector}
            className={classNames({
              'mt-2 ion-no-margin': true,
              'text-xs': !isMdScale
            })}>
            {btnText}
          </ZIonButton>
        ) : null}
      </div>
    </div>
  );
};

export default ZEmptyTable;
