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
import { ZIonCol, ZIonText } from '@/components/ZIonComponents';
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';
import classNames from 'classnames';
import { type LinkInBioBlockAnimationEnum } from '@/types/AdminPanel/linkInBioType/blockTypes';
import { isZNonEmptyString } from '@/utils/helpers';

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

interface ZLinkInBioTextBlockInterface {
  children?: string;
  fontFamily?: LinkInBioThemeFontEnum;
  animationType?: LinkInBioBlockAnimationEnum;
}

const ZLinkInBioTextBlock: React.FC<ZLinkInBioTextBlockInterface> = ({
  children,
  fontFamily,
  animationType
}) => {
  const _dangerouslySetInnerHTML = { __html: children ?? '' };
  return (
    <ZIonCol className='overflow-hidden line-clamp-3 ms-3'>
      <ZIonText
        className={classNames(fontFamily, animationType, {
          'font-bold text-[15px] block': true,
          'animated ': isZNonEmptyString(animationType)
        })}
        color='light'>
        {children !== undefined ? (
          <div dangerouslySetInnerHTML={_dangerouslySetInnerHTML} />
        ) : null}
      </ZIonText>
    </ZIonCol>
  );
};

export default ZLinkInBioTextBlock;
