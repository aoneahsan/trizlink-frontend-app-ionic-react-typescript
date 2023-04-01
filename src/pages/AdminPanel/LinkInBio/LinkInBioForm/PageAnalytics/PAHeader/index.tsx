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
  trashBinOutline,
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
  ZIonImg,
  ZIonRow,
  ZIonText,
} from '@/components/ZIonComponents';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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
import { ProductLogo } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (link-in-bio page-analytics page header component)
 * @type {*}
 * */

const PageAnalyticsHeader: React.FC = () => {
  const { isLgScale, isSmScale } = useZMediaQueryScale();

  return (
    <ZIonRow
      className={classNames({
        'zaions__bg_white ion-align-items-center': true,
        'ion-padding rounded border': isSmScale,
        'ion-padding-vertical': !isSmScale,
      })}
    >
      {/* column with have title, create, & generated short link   */}
      <ZIonCol
        className='py-3 ps-3'
        sizeXl='6'
        sizeLg='6'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
      >
        <div
          className={classNames({
            'd-flex ion-align-items-center': true,
            'ion-justify-content-center': !isLgScale,
          })}
        >
          {/* Favicon */}
          <ZIonImg
            src={ProductLogo}
            style={{ width: '30px', height: '30px' }}
          />

          {/* Generated short link */}
          <ZIonText className='ms-3' color='primary'>
            <h5 className='fw-bold ion-no-margin'>
              https://switchy2.zaions.com/CSY8
            </h5>
          </ZIonText>
        </div>

        <div
          className={classNames({
            'mt-3': true,
            'ion-text-center': !isLgScale,
          })}
        >
          {/* Link-in-bio Title */}
          <ZIonText className='fw-lighter fs-5'>
            My smartpage -
            <ZIonText className='text-muted ms-1 ps-1'>
              Created on 24 February 2023 {/* Created at */}
            </ZIonText>
          </ZIonText>
        </div>
      </ZIonCol>

      {/* column with have action button like copy-link-button, share-on button etc. */}
      <ZIonCol
        className={classNames({
          'ion-text-end': isLgScale,
          'ion-text-center d-flex ion-justify-content-between': !isLgScale,
        })}
        sizeXl='6'
        sizeLg='6'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
      >
        {/* copy-link button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          title='Copy the link'
          fill='clear'
          color='light'
        >
          <ZIonIcon
            icon={linkOutline}
            color='dark'
            style={{ width: '1.7rem', height: '1.7rem' }}
          />
        </ZIonButton>

        {/* share on button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          title='Share on'
          fill='clear'
          color='light'
        >
          <ZIonIcon
            icon={shareSocialOutline}
            color='dark'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>

        {/* overview button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          fill='clear'
          color='light'
        >
          <ZIonIcon
            icon={eyeOutline}
            color='dark'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>

        {/* QR code button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          fill='clear'
          title='Download QR Code'
          color='light'
        >
          <ZIonIcon
            icon={qrCodeOutline}
            color='dark'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>

        {/* Copy report link button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          fill='clear'
          title='Copy the report link'
          color='light'
        >
          <ZIonIcon
            icon={barChartOutline}
            color='dark'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>

        {/* Edit link button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          fill='clear'
          title='Edit the Link'
          color='light'
        >
          <ZIonIcon
            icon={pencilOutline}
            color='dark'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>

        {/* Duplicate link-in-bio button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          fill='clear'
          title='Duplicate the link-in-bio'
          color='light'
        >
          <ZIonIcon
            icon={copyOutline}
            color='dark'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>

        {/* Reset link-in-bio analytics button */}
        <ZIonButton
          className='me-3 pe-1 ion-no-padding'
          fill='clear'
          title='Reset link analytics'
          color='light'
        >
          <ZIonIcon
            icon={reloadOutline}
            color='danger'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>

        {/* Delete link-in-bio analytics button */}
        <ZIonButton
          className='ion-no-padding'
          fill='clear'
          title='Delete the link'
          color='light'
        >
          <ZIonIcon
            icon={trashBinOutline}
            color='danger'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ZIonButton>
      </ZIonCol>
    </ZIonRow>
  );
};

export default PageAnalyticsHeader;
