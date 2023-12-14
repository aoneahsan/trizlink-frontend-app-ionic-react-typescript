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
import { personOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonCol,
  ZIonIcon,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { isZNonEmptyString } from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';
import { LinkInBioCardStyleEnum } from '@/types/AdminPanel/linkInBioType/blockTypes';

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
interface ZLinkInBioAvatarBlockInterface {
  url?: string;
  title?: string;
  description?: string;
  fontFamily?: LinkInBioThemeFontEnum;
  style?: LinkInBioCardStyleEnum;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioAvatarBlock: React.FC<ZLinkInBioAvatarBlockInterface> = ({
  title,
  description,
  url,
  fontFamily,
  style
}) => {
  const _divStyle = { backgroundImage: `url(${url})` };
  return (
    <ZIonCol className='flex flex-col ion-justify-content-center ion-text-center'>
      {isZNonEmptyString(url) ? (
        // <ZIonImg
        //   src={url}
        //   className={classNames({
        //     'mx-auto': true,
        //     'bg-cover bg-center bg-no-repeat bg-transparent shadow-none': true,
        //     'rounded-full overflow-hidden':
        //       style === LinkInBioCardStyleEnum.circle,
        //     'rounded-none': style === LinkInBioCardStyleEnum.square,
        //     'w-full h-[15rem]': style === LinkInBioCardStyleEnum.album,
        //     'w-[6.5rem] h-[6.5rem] ':
        //       style === LinkInBioCardStyleEnum.square ||
        //       style === LinkInBioCardStyleEnum.circle
        //   })}
        // />
        <div
          style={_divStyle}
          className={classNames({
            'mx-auto': true,
            'bg-cover bg-center bg-no-repeat bg-transparent shadow-none': true,
            'rounded-full overflow-hidden':
              style === LinkInBioCardStyleEnum.circle,
            'rounded-none': style === LinkInBioCardStyleEnum.square,
            'w-full h-[17rem]': style === LinkInBioCardStyleEnum.album,
            'w-[6.5rem] h-[6.5rem] ':
              style === LinkInBioCardStyleEnum.square ||
              style === LinkInBioCardStyleEnum.circle
          })}></div>
      ) : (
        <div className='w-[6rem] h-[6rem] rounded-full overflow-hidden zaions__primary_set mx-auto flex ion-justify-content-center ion-align-items-center'>
          <ZIonIcon
            icon={personOutline}
            className='w-[40%] h-[40%]'
          />
        </div>
      )}

      {isZNonEmptyString(title) && (
        <ZIonTitle
          className={classNames(fontFamily, {
            'mt-2 text-2xl font-bold': true
          })}
          color='light'>
          {title}
        </ZIonTitle>
      )}

      {isZNonEmptyString(description) && (
        <ZIonText
          className={classNames(fontFamily, {
            'mt-2': true
          })}
          color='light'>
          {description}
        </ZIonText>
      )}
    </ZIonCol>
  );
};

export default ZLinkInBioAvatarBlock;
