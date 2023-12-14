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
  ZIonDatetime,
  ZIonIcon,
  ZIonImg
} from '@/components/ZIonComponents';
import ZRScrollbars from '@/components/CustomComponents/ZRScrollBar';
import ZTimezoneInput from '@/components/CustomComponents/ZTimezone';
import { type LinkInBioThemeFontEnum } from '@/types/AdminPanel/linkInBioType';
import { isZNonEmptyString } from '@/utils/helpers';
import { rssWithBackground } from '@/assets/images';
import { calendarOutline } from 'ionicons/icons';
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
interface ZLinkInBioCalendarBlockInterface {
  fontFamily?: LinkInBioThemeFontEnum;
  mediaLink?: string;
  title?: string;
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioCalendarBlock: React.FC<ZLinkInBioCalendarBlockInterface> = ({
  fontFamily,
  mediaLink,
  title
}) => {
  return (
    // <ZIonCol>
    //   {/* <ZRScrollbars className='w-full h-[500px]'>
    //     <div className='flex flex-col ion-align-items-center'>
    //       <ZIonDatetime />
    //       <ZTimezoneInput
    //         className={classNames(fontFamily, {
    //           'w-[90%] ion-margin-top': true
    //         })}
    //       />
    //     </div>
    //   </ZRScrollbars> */}
    //   {isZNonEmptyString(mediaLink) ? (
    //     <iframe
    //       width='100%'
    //       scrolling='no'
    //       frameBorder='0'
    //       allow='encrypted-media'
    //       height='634px'
    //       src={mediaLink}></iframe>
    //   ) : (
    //     <div className='flex w-full py-2 m-3 rounded-lg shadow-md ion-align-items-center ion-justify-content-center zaions__primary_set'>
    //       <ZIonIcon
    //         icon={calendarOutline}
    //         className='w-[6rem] h-[6rem]'
    //         color='light'
    //       />
    //     </div>
    //   )}
    // </ZIonCol>
    <ZCustomCard
      mediaType={ZMediaEnum.iframe}
      mediaLink={mediaLink}
      title={title}
    />
  );
};

export default ZLinkInBioCalendarBlock;
