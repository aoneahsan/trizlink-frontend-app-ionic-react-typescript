/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { ZIonText, ZIonTitle } from '@/components/ZIonComponents';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import Countdown, {
  CountdownRendererFn,
  CountdownRenderProps
} from 'react-countdown';
import { getRemainingTimeForCountDown } from '@/utils/helpers';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
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

const ZCustomRender: React.FC<{
  d: CountdownRenderProps;
  color?: ZIonColorType;
}> = ({ d, color = 'light' }) => {
  return (
    <div className='flex mx-auto ion-justify-content-between w-[80%] ion-align-items-center'>
      <div className='ion-text-center'>
        <ZIonTitle
          className='ion-no-padding'
          color={color}>
          {d.days}
        </ZIonTitle>
        <ZIonText
          className='text-xs'
          color={color}>
          DAYS
        </ZIonText>
      </div>
      <div className='mb-2'>
        <ZIonText
          className='font-bold text-[18px]'
          color={color}>
          :
        </ZIonText>
      </div>

      <div className='ion-text-center'>
        <ZIonTitle
          className='ion-no-padding'
          color={color}>
          {d.hours}
        </ZIonTitle>
        <ZIonText
          className='text-xs'
          color={color}>
          HRS
        </ZIonText>
      </div>
      <div className='mb-2'>
        <ZIonText
          className='font-bold text-[18px]'
          color={color}>
          :
        </ZIonText>
      </div>

      <div className='ion-text-center'>
        <ZIonTitle
          className='ion-no-padding'
          color={color}>
          {d.minutes}
        </ZIonTitle>
        <ZIonText
          className='text-xs'
          color={color}>
          MIN
        </ZIonText>
      </div>
      <div className='mb-2'>
        <ZIonText
          className='font-bold text-[18px]'
          color={color}>
          :
        </ZIonText>
      </div>

      <div className='ion-text-center'>
        <ZIonTitle
          className='ion-no-padding'
          color={color}>
          {d.seconds}
        </ZIonTitle>
        <ZIonText
          className='text-xs'
          color={color}>
          SEC
        </ZIonText>
      </div>
    </div>
  );
};

const ZCountdown: React.FC<{
  countDownTime?: string;
  color?: ZIonColorType;
  component?: React.FC<{
    d: CountdownRenderProps;
    color?: ZIonColorType;
  }>;
}> = ({ countDownTime, color, component }) => {
  return (
    <Countdown
      date={getRemainingTimeForCountDown(countDownTime)}
      renderer={(props: CountdownRenderProps) => {
        if (component === undefined) {
          return ZCustomRender({ d: props, color: color });
        } else {
          return component && component({ d: props, color: color });
        }
      }}
    />
  );
};

export default ZCountdown;
