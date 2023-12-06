/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonCol } from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type Property } from 'csstype/index';

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

interface ZLinkInBioSeparatorBlockInterface {
  children?: string;
  _borderWidth?: string;
  _borderColor?: string;
  _borderStyle?: Property.BorderTopStyle;
  _marginVertical?: number;
}

const ZLinkInBioSeparatorBlock: React.FC<ZLinkInBioSeparatorBlockInterface> = ({
  _borderWidth = '1px',
  _borderColor,
  _borderStyle,
  _marginVertical = 0
}) => {
  const _style = {
    borderTopWidth: _borderWidth,
    borderTopColor: _borderColor,
    borderTopStyle: _borderStyle,
    margin: `${_marginVertical}px 0px`
  };
  return (
    <ZIonCol>
      <div
        className='pb-2'
        style={_style}></div>
    </ZIonCol>
  );
};

export default ZLinkInBioSeparatorBlock;
