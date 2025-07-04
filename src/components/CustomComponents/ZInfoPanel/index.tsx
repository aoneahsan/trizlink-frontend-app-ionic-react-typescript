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
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type ZIonColorType } from '@/types/zaionsAppSettings.type';

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
 * ? Like if you have a type for props it should be place Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

interface ZaionsInfoPanelType {
  infoPanelColor?: ZIonColorType;
  iconColor?: ZIonColorType;
  textColor?: ZIonColorType;
  icon?: string;
  text?: string;
  className?: string;
}

const ZaionsInfoPanel: React.FC<ZaionsInfoPanelType> = ({
  infoPanelColor = 'primary',
  iconColor,
  textColor,
  icon,
  text,
  className
}) => {
  const { isMdScale } = useZMediaQueryScale();

  return (
    <>
      <ZIonRow
        className={classNames(className, {
          'ion-no-padding rounded': true,
          zaions__primary_set: infoPanelColor === 'primary',
          zaions__secondary_set: infoPanelColor === 'secondary',
          zaions__tertiary_set: infoPanelColor === 'tertiary',
          zaions__success_set: infoPanelColor === 'success',
          zaions__warning_set: infoPanelColor === 'warning',
          zaions__danger_set: infoPanelColor === 'danger',
          zaions__dark_set: infoPanelColor === 'dark',
          zaions__medium_set: infoPanelColor === 'medium',
          zaions__light_set: infoPanelColor === 'light'
        })}>
        <ZIonCol
          className={classNames({
            'py-2 my-1 px-3 ion-align-items-center': true,
            flex: isMdScale,
            'ion-text-center': !isMdScale
          })}>
          <ZIonIcon
            icon={icon}
            className={classNames({
              'font-bold': true,
              'text-[3rem]': !isMdScale,
              'text-[15px]': isMdScale
            })}
            color={iconColor}
          />
          <ZIonText
            className='text-[14px] ps-2 block'
            color={textColor}>
            {text}
          </ZIonText>
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default ZaionsInfoPanel;
