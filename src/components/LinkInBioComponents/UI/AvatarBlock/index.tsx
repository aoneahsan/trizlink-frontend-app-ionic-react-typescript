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
import { ZIonCol, ZIonImg, ZIonTitle } from '@/components/ZIonComponents';

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
import classes from './styles.module.css';

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

const ZLinkInBioAvatarBlock: React.FC = () => {
  return (
    <ZIonCol className='flex flex-col ion-justify-content-center ion-text-center'>
      <ZIonImg
        src={
          'https://firebasestorage.googleapis.com/v0/b/urlshortener-f1125.appspot.com/o/images%2FdS32FOVIGthrBZ8zP1GBoLkCg1z1%2Flinks%2F2023-02-28T08%3A22%3A13.154Z?alt=media&token=5f00094f-9e2d-4ade-aa0f-f0dd1542ae7d'
        }
        className={classNames(classes['zaions-pdt-profile-photo'], {
          'mx-auto': true
        })}
      />
      <ZIonTitle
        className='mt-2 font-bold'
        color='light'>
        The Title
      </ZIonTitle>
    </ZIonCol>
  );
};

export default ZLinkInBioAvatarBlock;
