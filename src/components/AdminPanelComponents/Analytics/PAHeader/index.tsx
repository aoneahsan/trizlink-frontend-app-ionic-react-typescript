/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  barChartOutline,
  copyOutline,
  eyeOutline,
  linkOutline,
  pencilOutline,
  qrCodeOutline,
  reloadOutline,
  shareSocialOutline,
  trashBinOutline
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonRow,
  ZIonSkeletonText,
  ZIonText
} from '@/components/ZIonComponents';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';

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
interface PageAnalyticsHeaderI {
  shortLink?: string;
  createdAtText?: string;
  createdAtDate?: string;
  favicon?: string;
  linkTarget?: string;
  showSkeleton?: boolean;
  copyLinkBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  shareOnBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  viewBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  qrCodeBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  copyReportLinkBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  editBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  duplicateBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  restAnalyticBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  deleteBtnOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
  linkTargetOnClickHandler?: React.MouseEventHandler<HTMLIonButtonElement>;
}

/**
 * Functional Component
 * About: (link-in-bio page-analytics page header component)
 * @type {*}
 * */

const PageAnalyticsHeader: React.FC<PageAnalyticsHeaderI> = ({
  shortLink,
  createdAtText,
  createdAtDate,
  favicon,
  linkTarget,
  copyLinkBtnOnClickHandler,
  shareOnBtnOnClickHandler,
  viewBtnOnClickHandler,
  qrCodeBtnOnClickHandler,
  copyReportLinkBtnOnClickHandler,
  editBtnOnClickHandler,
  duplicateBtnOnClickHandler,
  restAnalyticBtnOnClickHandler,
  deleteBtnOnClickHandler,
  linkTargetOnClickHandler,
  showSkeleton = false
}) => {
  const { isLgScale, isSmScale, isMdScale } = useZMediaQueryScale();

  if (showSkeleton) {
    return <PageAnalyticsHeaderSkeleton />;
  }

  return (
    <ZIonRow
      className={classNames({
        'zaions__light_bg shadow-md ion-align-items-center': true,
        'ion-padding rounded-lg border': isSmScale,
        'ion-padding-vertical': !isSmScale
      })}>
      {/* column with have title, create, & generated short link */}
      <ZIonCol
        className='py-2 ps-3'
        sizeXl='6'
        sizeLg='6'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'>
        <div
          className={classNames({
            'flex ion-align-items-center': true,
            'ion-justify-content-center': !isLgScale
          })}>
          {/* Favicon */}
          <ZIonIcon
            icon={favicon}
            color='primary'
            className='w-[30px] h-[30px]'
          />

          {/* Generated short link */}
          <ZIonText
            className='ms-3'
            color='dark'>
            <h5 className='font-bold tracking-wide ion-no-margin'>
              {shortLink}
            </h5>
          </ZIonText>
        </div>

        <div
          className={classNames({
            'mt-3': true,
            'ion-text-center': !isLgScale
          })}>
          {/* Link-in-bio Title */}
          <ZIonText className='text-md fw-lighter'>
            {createdAtText}
            <ZIonText
              className='ms-1 text-md ps-1'
              color='medium'>
              - Created on {createdAtDate} {/* Created at */}
            </ZIonText>
          </ZIonText>
        </div>
      </ZIonCol>

      {/* column with have action button like copy-link-button, share-on button etc. */}
      <ZIonCol
        className=''
        sizeXl='6'
        sizeLg='6'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'>
        <div
          className={classNames({
            'ion-text-end': isLgScale,
            'ion-text-center flex ion-justify-content-between': !isLgScale,
            'flex-col gap-y-2 px-3 py-2': !isMdScale
          })}>
          {/* copy-link button */}
          <ZIonButton
            id='PAHCopyLinkBtn' // PAH => PageAnalyticHeader
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'primary' : 'light'}
            onClick={copyLinkBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Copy the link</ZIonText>
            )}
            <ZIonIcon
              icon={linkOutline}
              color={!isMdScale ? 'light' : 'dark'}
              className='w-[1.7rem] h-[1.7rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHCopyLinkBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Copy the link</ZIonText>
          </ZRTooltip>

          {/* share on button */}
          <ZIonButton
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            id='PAHShareOnBtn' // PAH => PageAnalyticHeader
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'primary' : 'light'}
            onClick={shareOnBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Share on</ZIonText>
            )}
            <ZIonIcon
              icon={shareSocialOutline}
              color={!isMdScale ? 'light' : 'dark'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHShareOnBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Share on</ZIonText>
          </ZRTooltip>

          {/* overview button */}
          <ZIonButton
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'primary' : 'light'}
            id='PAHPreviewBtn' // PAH => PageAnalyticHeader
            onClick={viewBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Preview</ZIonText>
            )}
            <ZIonIcon
              icon={eyeOutline}
              color={!isMdScale ? 'light' : 'dark'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHPreviewBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Preview</ZIonText>
          </ZRTooltip>

          {/* QR code button */}
          <ZIonButton
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'primary' : 'light'}
            id='PAHQRCodeBtn' // PAH => PageAnalyticHeader
            onClick={qrCodeBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Download QR Code</ZIonText>
            )}
            <ZIonIcon
              icon={qrCodeOutline}
              color={!isMdScale ? 'light' : 'dark'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHQRCodeBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Download QR Code</ZIonText>
          </ZRTooltip>

          {/* Copy report link button */}
          <ZIonButton
            id='PAHCopyReportLinkBtn' // PAH => PageAnalyticHeader
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'primary' : 'light'}
            onClick={copyReportLinkBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Copy the report link</ZIonText>
            )}
            <ZIonIcon
              icon={barChartOutline}
              color={!isMdScale ? 'light' : 'dark'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHCopyReportLinkBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Copy the report link</ZIonText>
          </ZRTooltip>

          {/* Edit link button */}
          <ZIonButton
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            id='PAHEditLinkBtn' // PAH => PageAnalyticHeader
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'primary' : 'light'}
            onClick={editBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Edit the Link</ZIonText>
            )}
            <ZIonIcon
              icon={pencilOutline}
              color={!isMdScale ? 'light' : 'dark'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHEditLinkBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Edit the Link</ZIonText>
          </ZRTooltip>

          {/* Duplicate link-in-bio button */}
          <ZIonButton
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            id='PAHDuplicateBtn' // PAH => PageAnalyticHeader
            title='Duplicate the link-in-bio'
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'primary' : 'light'}
            onClick={duplicateBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>
                Duplicate the link-in-bio
              </ZIonText>
            )}
            <ZIonIcon
              icon={copyOutline}
              color={!isMdScale ? 'light' : 'dark'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHDuplicateBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Duplicate the link-in-bio</ZIonText>
          </ZRTooltip>

          {/* Reset link-in-bio analytics button */}
          <ZIonButton
            className={classNames({
              'my-0 ion-no-padding': true,
              'me-3 pe-1': isMdScale
            })}
            id='PAHResetAnalyticBtn' // PAH => PageAnalyticHeader
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'danger' : 'light'}
            onClick={restAnalyticBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Reset link analytics</ZIonText>
            )}
            <ZIonIcon
              icon={reloadOutline}
              color={!isMdScale ? undefined : 'danger'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHResetAnalyticBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Reset link analytics</ZIonText>
          </ZRTooltip>

          {/* Delete link-in-bio analytics button */}
          <ZIonButton
            className='my-0 ion-no-padding'
            fill={!isMdScale ? 'solid' : 'clear'}
            expand={!isMdScale ? 'block' : undefined}
            color={!isMdScale ? 'danger' : 'light'}
            id='PAHDeleteBtn' // PAH => PageAnalyticHeader
            onClick={deleteBtnOnClickHandler}>
            {!isMdScale && (
              <ZIonText className='text-sm me-2'>Delete the link</ZIonText>
            )}
            <ZIonIcon
              icon={trashBinOutline}
              color={!isMdScale ? undefined : 'danger'}
              className='w-[1.5rem] h-[1.5rem]'
            />
          </ZIonButton>
          <ZRTooltip
            anchorSelect='#PAHDeleteBtn' // PAH => PageAnalyticHeader
            className='p-[.3rem!important]'>
            <ZIonText className='text-xs'>Delete the link</ZIonText>
          </ZRTooltip>
        </div>
        <div
          className={classNames({
            'w-full pt-2': true,
            'ion-text-end': isLgScale,
            'ion-text-center': !isLgScale
          })}>
          <ZIonText
            onClick={linkTargetOnClickHandler}
            color='medium'
            className='tracking-wide cursor-pointer text-md'>
            {linkTarget}
          </ZIonText>
        </div>
      </ZIonCol>
    </ZIonRow>
  );
};

const PageAnalyticsHeaderSkeleton: React.FC = () => {
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
  return (
    <ZIonRow
      className={classNames({
        'zaions__light_bg ion-align-items-center': true,
        'ion-padding rounded-lg border': isSmScale,
        'ion-padding-vertical': !isSmScale
      })}>
      {/* column with have title, create, & generated short link */}
      <ZIonCol
        className='py-2 ps-3'
        sizeXl='6'
        sizeLg='6'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'>
        <div
          className={classNames({
            'flex ion-align-items-center': true,
            'ion-justify-content-center': !isLgScale
          })}>
          {/* Favicon */}
          <ZIonSkeletonText className='w-[30px] h-[30px]' />

          {/* Generated short link */}
          <ZIonSkeletonText className='w-[15rem] h-[1.4rem] ms-2' />
        </div>

        <div
          className={classNames({
            'mt-3': true,
            'flex ion-justify-content-center': !isLgScale
          })}>
          {/* Link-in-bio Title */}
          <ZIonSkeletonText className='w-[12rem] h-[1.3rem]' />
        </div>
      </ZIonCol>

      {/* column with have action button like copy-link-button, share-on button etc. */}
      <ZIonCol
        sizeXl='6'
        sizeLg='6'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'>
        <div
          className={classNames({
            'flex ': true,
            'ion-justify-content-end': isLgScale,
            'ion-text-center flex ion-justify-content-between': !isLgScale,
            'flex-col gap-y-2 px-3 py-2': !isMdScale
          })}>
          {[...Array(9)].map((_, index) => {
            return (
              <ZIonSkeletonText
                key={index}
                className={classNames({
                  'w-[1.7rem] h-[1.7rem] me-[3px]': isMdScale,
                  'w-full h-[1.9rem]': !isMdScale
                })}
              />
            );
          })}
        </div>

        <div
          className={classNames({
            'w-full pt-2 flex': true,
            'ion-justify-content-end': isLgScale,
            'ion-justify-content-center': !isLgScale
          })}>
          <ZIonSkeletonText className='w-[15rem] h-[1.4rem] ms-2' />
        </div>
      </ZIonCol>
    </ZIonRow>
  );
};

export default PageAnalyticsHeader;
