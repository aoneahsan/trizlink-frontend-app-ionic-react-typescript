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
import ZCustomCard from '@/components/CustomComponents/ZCustomCard';
import { ZMediaEnum } from '@/types/zaionsAppSettings.type';

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
interface ZAudioBlockInterface {
  audioLink?: string;
  title?: string;
}

/**
 * Functional Component
 * About: This component will handle RSS data, ZCustomCard is a genetic component used in multiple places, this ZLinkInBioRSSBlock is specific for handling RSS data and RSS UI.
 * @type {*}
 * */

const ZAudioBlock: React.FC<ZAudioBlockInterface> = ({ audioLink, title }) => {
  return (
    <ZCustomCard
      mediaType={ZMediaEnum.audio}
      mediaLink={audioLink}
      title={title}
    />
  );
};

export default ZAudioBlock;
