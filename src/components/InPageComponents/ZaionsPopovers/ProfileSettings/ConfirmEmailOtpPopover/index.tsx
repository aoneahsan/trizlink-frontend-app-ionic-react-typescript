/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { ZIonButton, ZIonInput, ZIonText } from '@/components/ZIonComponents';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

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

const ZConfirmEmailOTPPopover: React.FC = () => {
  return (
    <div className='ion-text-center'>
      <ZIonText>
        A verification OTP(One-time-password) has been sent to your email. Enter
        it below
      </ZIonText>

      <ZIonInput
        name='confirmOTP'
        label='Confirm OTP'
        labelPlacement='stacked'
        minHeight='2.3rem'
      />

      <ZIonButton>Confirm OTP</ZIonButton>
    </div>
  );
};

export default ZConfirmEmailOTPPopover;
