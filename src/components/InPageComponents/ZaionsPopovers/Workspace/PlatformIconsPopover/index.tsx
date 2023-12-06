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
  ZIonItem,
  ZIonRow
} from '@/components/ZIonComponents';
import { PlatformIconsData } from '@/data/UserDashboard/Workspace/MockUpPage/index.data';

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

const ZPlatformIconsPopover: React.FC<{
  dismissZIonPopover: (data?: string, role?: string | undefined) => void;
  _colorCode?: string;
  _icon: string;
}> = ({ _colorCode, _icon, dismissZIonPopover }) => {
  const _style = { color: _colorCode ?? '' };
  return (
    <ZIonRow className='pt-2 ion-padding'>
      {PlatformIconsData.defaultIcons.map((el, index) => {
        return (
          <ZIonCol
            size='3'
            key={index}>
            <div
              className={classNames({
                'rounded py-1 cursor-pointer flex ion-align-items-center ion-justify-content-center':
                  true,
                zaions__dark_set: _icon === el.icon
              })}
              onClick={() => {
                dismissZIonPopover(el.icon);
              }}
              title={el.iconName}>
              <ZIonIcon
                icon={el.icon}
                className='w-6 h-6'
                style={_style}
              />
            </div>
          </ZIonCol>
        );
      })}

      <ZIonCol
        size='12'
        className='mb-2'>
        <ZIonItem className='text-base ion-no-padding'>PLATFORM</ZIonItem>
      </ZIonCol>

      {PlatformIconsData.platformIcons.map((el, index) => {
        const _style = { color: _colorCode ?? '' };
        return (
          <ZIonCol
            size='3'
            key={index}>
            <div
              className={classNames({
                'rounded py-1 cursor-pointer flex ion-align-items-center ion-justify-content-center':
                  true,
                zaions__dark_set: _icon === el.icon
              })}
              onClick={() => {
                dismissZIonPopover(el.icon);
              }}>
              <ZIonIcon
                icon={el.icon}
                className='w-6 h-6'
                style={_style}
              />
            </div>
          </ZIonCol>
        );
      })}
    </ZIonRow>
  );
};

export default ZPlatformIconsPopover;
