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
  ZIonButton,
  ZIonCol,
  ZIonImg,
  ZIonText
} from '@/components/ZIonComponents';
import { predefinedMessengerPlatformImagesInWhite } from '@/utils/ZIcons';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { isZNonEmptyString } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type LinkInBioBlockAnimationEnum,
  type linkInBioBlockCardItemInterface
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { type messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';

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

interface ZLinkInBioMessengerBlockInterface {
  messengerBlockData?: linkInBioBlockCardItemInterface[];
  fontFamily?: LinkInBioThemeFontEnum;
  animationType?: LinkInBioBlockAnimationEnum;
}

const ZLinkInBioMessengerBlock: React.FC<ZLinkInBioMessengerBlockInterface> = ({
  messengerBlockData,
  fontFamily,
  animationType
}) => {
  return (
    <ZIonCol
      className={classNames(animationType, {
        'animated ': isZNonEmptyString(animationType)
      })}>
      {messengerBlockData?.map((element, index) => {
        return (
          <ZIonButton
            key={index}
            expand='block'
            className={classNames({
              'ion-text-capitalize font-bold text-[16px] my-0 mb-2 h-[3.5rem] rounded-[0.8rem] overflow-hidden':
                true,
              'mt-3': index >= 1
            })}
            color='success'
            routerLink={element.target?.url}>
            <ZIonImg
              src={
                predefinedMessengerPlatformImagesInWhite[
                  element.messengerCardType as messengerPlatformsBlockEnum
                ]
              }
              className='me-2 w-[25px]'
            />
            <ZIonText>
              <h5
                className={classNames(fontFamily, {
                  'ion-no-padding ion-no-margin': true
                })}>
                {element.title}
              </h5>
            </ZIonText>
          </ZIonButton>
        );
      })}
    </ZIonCol>
  );
};

export default ZLinkInBioMessengerBlock;
