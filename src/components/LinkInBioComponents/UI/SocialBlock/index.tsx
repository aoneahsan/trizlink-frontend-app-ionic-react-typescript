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
import { ZIonCol, ZIonImg, ZIonRow } from '@/components/ZIonComponents';
import {
  type linkInBioBlockCardItemInterface,
  LinkInBioSocialPlatformEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { predefinedSocialWhiteImages } from '@/utils/ZIcons';

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

interface ZLinkInBioSocialBlockInterface {
  socialBlockData?: linkInBioBlockCardItemInterface[];
}

const ZLinkInBioSocialBlock: React.FC<ZLinkInBioSocialBlockInterface> = ({
  socialBlockData
}) => {
  return (
    <ZIonCol>
      <ZIonRow className='ion-align-items-center ion-justify-content-center row-gap-1-point-6-rem'>
        {socialBlockData?.map((el, index) => {
          return (
            <ZIonCol
              key={index}
              size='3'
              className='flex ion-align-items-center ion-justify-content-center'>
              <ZIonImg
                src={
                  predefinedSocialWhiteImages[
                    el.socialCardType as LinkInBioSocialPlatformEnum
                  ]
                }
                style={{
                  width:
                    el.socialCardType === LinkInBioSocialPlatformEnum.facebook
                      ? '1.2rem'
                      : '1.5rem'
                }}
              />
            </ZIonCol>
          );
        })}
      </ZIonRow>
    </ZIonCol>
  );
};

export default ZLinkInBioSocialBlock;
