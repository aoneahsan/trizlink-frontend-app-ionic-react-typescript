/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useMemo } from 'react';

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
  ZIonCard,
  ZIonCardContent,
  ZIonCardHeader,
  ZIonCardTitle,
  ZIonCol,
  ZIonIcon,
  ZIonImg,
  ZIonText
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type LinkInBioBlockAnimationEnum,
  LinkInBioCardStyleEnum
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import { ZMediaEnum } from '@/types/zaionsAppSettings.type';
import ZReactMediaPlayer from '../ZCustomAudio';
import { useRecoilValue } from 'recoil';
import { NewLinkInBioFormState } from '@/ZaionsStore/UserDashboard/LinkInBio/LinkInBioFormState.recoil';
import ZCountdown from '../ZCountDown';
import { isZNonEmptyString } from '@/utils/helpers';
import {
  calendar,
  codeSlashOutline,
  imageOutline,
  layersOutline,
  mapOutline,
  videocamOutline,
  volumeHighOutline,
  wifiOutline
} from 'ionicons/icons';
import ZCapGMap from '../GoogleMaps/ZCapGMap';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
// import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZCustomCardInterface {
  title?: string;
  description?: string;
  mediaLink?: string;
  type?: LinkInBioCardStyleEnum;
  mediaType?: ZMediaEnum;
  image?: string;
  countDownTime?: string;
  className?: string;
  iframeSrcDocText?: string;
  mapId?: string;
  coordinates?: {
    lat: number | undefined;
    lng: number | undefined;
  };
  animationType?: LinkInBioBlockAnimationEnum;
}

/**
 * Functional Component
 * About: Generic card...
 * @type {*}
 * */
const ZCustomCard: React.FC<ZCustomCardInterface> = ({
  title,
  description,
  mediaLink,
  type = LinkInBioCardStyleEnum.horizontal,
  mediaType = ZMediaEnum.image,
  image,
  animationType,
  countDownTime,
  className,
  mapId,
  coordinates,
  iframeSrcDocText
}) => {
  // getting the custom style for all the buttons from linkInBioFormState recoil.
  const linkInBioFormState = useRecoilValue(NewLinkInBioFormState);

  // #region comp constants
  const _zIonCardHeaderStyle = useMemo(
    () => ({
      width:
        type === LinkInBioCardStyleEnum.horizontal ||
        type === LinkInBioCardStyleEnum.vertical
          ? '100%'
          : type === LinkInBioCardStyleEnum.thumbRound
          ? '202px'
          : type === LinkInBioCardStyleEnum.thumbCircle
          ? '115px'
          : type === LinkInBioCardStyleEnum.thumbStrip
          ? '56%'
          : '100%',
      height:
        mediaType === ZMediaEnum.iframe && isZNonEmptyString(mediaLink)
          ? '380px'
          : mediaType === ZMediaEnum.iframeSrcDoc &&
            isZNonEmptyString(iframeSrcDocText)
          ? '16rem'
          : mediaType === ZMediaEnum.calendar && isZNonEmptyString(mediaLink)
          ? '16rem'
          : isZNonEmptyString(mapId) &&
            mediaType === ZMediaEnum.map &&
            coordinates !== undefined &&
            coordinates !== null
          ? '17rem'
          : type === LinkInBioCardStyleEnum.horizontal
          ? '160px'
          : type === LinkInBioCardStyleEnum.vertical
          ? '330px'
          : type === LinkInBioCardStyleEnum.thumbStrip
          ? 'auto'
          : '15rem',
      position: 'relative',
      borderRadius: type === LinkInBioCardStyleEnum.thumbRound && '15px',
      overflow: 'hidden'
    }),
    [type, mediaType, mediaLink, iframeSrcDocText, mapId, coordinates]
  );

  const _zIonCardContentStyle = useMemo(
    () => ({
      width:
        type === LinkInBioCardStyleEnum.thumbRound
          ? 'calc(100% - 202px)'
          : type === LinkInBioCardStyleEnum.thumbCircle
          ? 'calc(100% - 115px)'
          : '100%',
      height: 'max-content'
    }),
    [type]
  );

  const ZMediaImageStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    objectFit: 'cover'
  };

  const ZMediaPlayerStyle = useMemo(
    () => ({ url: mediaLink, width: '100%', height: '100%' }),
    [mediaLink]
  );
  // #endregion

  return (
    <ZIonCol
      className={classNames(className, {
        'h-full': true
      })}>
      <ZIonCard
        className={classNames(animationType, {
          'ion-no-padding ion-no-margin h-full': true,
          flex:
            type === LinkInBioCardStyleEnum.thumbCircle ||
            type === LinkInBioCardStyleEnum.thumbRound ||
            type === LinkInBioCardStyleEnum.thumbStrip,
          'ion-align-items-center':
            type === LinkInBioCardStyleEnum.thumbCircle ||
            type === LinkInBioCardStyleEnum.thumbRound,
          'animated ': isZNonEmptyString(animationType)
        })}>
        <ZIonCardHeader
          className={classNames({
            'ion-no-padding ion-no-margin flex ion-justify-content-center ion-align-items-center zaions__primary_set':
              true,

            'ion-margin':
              type === LinkInBioCardStyleEnum.thumbCircle ||
              type === LinkInBioCardStyleEnum.thumbRound,
            'border-radius__100vmax':
              type === LinkInBioCardStyleEnum.thumbCircle
          })}
          color='primary'
          style={_zIonCardHeaderStyle}>
          {/* If no image provided or get from api the default image */}
          {!isZNonEmptyString(mediaLink) &&
            mediaType !== ZMediaEnum.map &&
            mediaType !== ZMediaEnum.iframeSrcDoc && (
              <ZIonIcon
                // icon={calendarOutline}
                color='light'
                className='w-[6rem] h-[6rem]'
                icon={
                  mediaType === ZMediaEnum.image
                    ? imageOutline
                    : mediaType === ZMediaEnum.rss
                    ? wifiOutline
                    : mediaType === ZMediaEnum.video
                    ? videocamOutline
                    : mediaType === ZMediaEnum.audio ||
                      mediaType === ZMediaEnum.iframe
                    ? volumeHighOutline
                    : mediaType === ZMediaEnum.carousel
                    ? layersOutline
                    : mediaType === ZMediaEnum.calendar
                    ? calendar
                    : ''
                }
              />
            )}

          {!isZNonEmptyString(mapId) &&
            mediaType === ZMediaEnum.map &&
            (coordinates === undefined || coordinates === null) && (
              <ZIonIcon
                color='light'
                className='w-[6rem] h-[6rem]'
                icon={mapOutline}
              />
            )}

          {!isZNonEmptyString(iframeSrcDocText) &&
            mediaType === ZMediaEnum.iframeSrcDoc &&
            (coordinates === undefined || coordinates === null) && (
              <ZIonIcon
                color='light'
                className='w-[6rem] h-[6rem]'
                icon={codeSlashOutline}
              />
            )}

          {/* For Image */}
          {isZNonEmptyString(mediaLink) &&
            (mediaType === ZMediaEnum.image ||
              mediaType === ZMediaEnum.countDown) && (
              <ZIonImg
                src={mediaLink}
                style={ZMediaImageStyle}
              />
            )}

          {/* For Video */}
          {isZNonEmptyString(mediaLink) && mediaType === ZMediaEnum.video && (
            <ZReactMediaPlayer
              playerProps={ZMediaPlayerStyle}
              mediaType='video'
            />
          )}

          {isZNonEmptyString(mapId) &&
            mediaType === ZMediaEnum.map &&
            coordinates !== undefined &&
            coordinates !== null && (
              <ZCapGMap
                mapId={mapId ?? ''}
                coordinates={coordinates}
              />
            )}

          {/* For audio */}
          {/* {isZNonEmptyString(mediaLink) && mediaType === ZMediaEnum.audio && (
            <ZReactMediaPlayer
              playerProps={ZMediaPlayerStyle}
              mediaType='audio'
            />
          )} */}

          {isZNonEmptyString(mediaLink) &&
            (mediaType === ZMediaEnum.iframe ||
              mediaType === ZMediaEnum.calendar) && (
              <ZIonCol>
                <iframe
                  width='100%'
                  scrolling='no'
                  frameBorder='0'
                  allow='encrypted-media'
                  height='100%'
                  src={mediaLink}
                />
              </ZIonCol>
            )}

          {isZNonEmptyString(iframeSrcDocText) &&
            mediaType === ZMediaEnum.iframeSrcDoc && (
              <ZIonCol>
                <iframe
                  width='100%'
                  height='100%'
                  scrolling='yes'
                  frameBorder='0'
                  allow='encrypted-media'
                  srcDoc={iframeSrcDocText}
                />
              </ZIonCol>
            )}
        </ZIonCardHeader>

        {(isZNonEmptyString(title) ||
          isZNonEmptyString(description) ||
          mediaType === ZMediaEnum.countDown) && (
          <ZIonCardContent
            className={classNames({
              'ion-margin-top': true,
              'ion-text-center':
                type === LinkInBioCardStyleEnum.horizontal ||
                type === LinkInBioCardStyleEnum.vertical,
              'ion-text-start':
                type === LinkInBioCardStyleEnum.thumbCircle ||
                type === LinkInBioCardStyleEnum.thumbRound ||
                type === LinkInBioCardStyleEnum.thumbStrip,
              'ps-1':
                type === LinkInBioCardStyleEnum.thumbCircle ||
                type === LinkInBioCardStyleEnum.thumbRound
            })}
            style={_zIonCardContentStyle}>
            {title !== undefined && title?.trim()?.length > 0 && (
              <ZIonCardTitle
                className={classNames(linkInBioFormState?.theme?.font, {
                  'font-bold': true,
                  'mb-2':
                    type === LinkInBioCardStyleEnum.horizontal ||
                    type === LinkInBioCardStyleEnum.vertical,
                  'flex flex-col ion-justify-content-center':
                    type === LinkInBioCardStyleEnum.thumbCircle ||
                    type === LinkInBioCardStyleEnum.thumbRound ||
                    type === LinkInBioCardStyleEnum.thumbStrip
                })}>
                {title}
              </ZIonCardTitle>
            )}

            {/*  */}
            {description !== undefined && description?.trim()?.length > 0 && (
              <div className='h-max'>
                <ZIonText
                  className={classNames(linkInBioFormState?.theme?.font, {
                    'inline-block whitespace-break-spaces': true
                  })}>
                  {description}
                </ZIonText>
              </div>
            )}

            {mediaType === ZMediaEnum.countDown && (
              <ZCountdown
                color='dark'
                countDownTime={countDownTime}
              />
            )}
          </ZIonCardContent>
        )}
      </ZIonCard>
    </ZIonCol>
  );
};

export default ZCustomCard;
