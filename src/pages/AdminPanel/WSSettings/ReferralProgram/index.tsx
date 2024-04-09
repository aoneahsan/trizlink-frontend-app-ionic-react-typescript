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
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { PRODUCT_NAME } from '@/utils/constants';
import { gift } from '@/assets/images';
import SupportTrizlinkOnPatreon from '@/components/SupportTrizlinkOnPatreon';

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

const ZWSReferralProgramListPage: React.FC = () => {
  // getting current workspace id Or wsShareId & shareWSMemberId form params. if workspaceId then this will be owned-workspace else if wsShareId & shareWSMemberId then this will be share-workspace
  //   const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
  //     workspaceId?: string;
  //     shareWSMemberId?: string;
  //     wsShareId?: string;
  //   }>();

  // #region Custom hooks.
  const { isSmScale, isLgScale } = useZMediaQueryScale();
  // #endregion

  return (
    <>
      <SupportTrizlinkOnPatreon />
      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='6'
          sizeLg='5'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'mb-2': !isSmScale
          })}>
          <ZIonTitle
            className={classNames({
              'block font-bold ion-no-padding': true,
              'text-2xl': isLgScale,
              'text-xl': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            Account
          </ZIonTitle>

          <ZIonText
            className={classNames({
              'block mt-2': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            Discover our referral program & earn commissions
          </ZIonText>
        </ZIonCol>
      </ZIonRow>

      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='6'
          sizeLg='5'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'mb-2': !isSmScale
          })}>
          <ZIonText
            className={classNames({
              'block font-semibold': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            Invite friends and get 30% commission! Join the Referral Program
            (beta)
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='6'
          sizeLg='7'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end': true,
            'ion-justify-content-between flex gap-1': !isLgScale && isSmScale,
            'w-full': !isSmScale
          })}>
          <ZIonButton
            color='primary'
            fill='solid'
            minHeight={isLgScale ? '39px' : '2rem'}
            expand={!isLgScale ? 'block' : undefined}
            // testingselector={
            //   CONSTANTS.testingSelectors.pixels.listPage.createBtn
            // }
            className={classNames({
              'my-2': true,
              'text-xs ion-no-margin ion-no-padding w-[33.33%]':
                !isLgScale && isSmScale,
              'w-full': !isSmScale
            })}
            // onClick={() => {
            //   presentZAddPixelAccount({
            //     _cssClass: 'pixel-account-modal-size'
            //   });
            // }}
          >
            Apply
          </ZIonButton>
        </ZIonCol>
      </ZIonRow>

      <ZIonRow className='border rounded-lg zaions__light_bg ion-align-items-center ion-padding'>
        <ZIonCol
          sizeXl='8'
          sizeLg='5'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'py-5': true,
            'mb-2': !isSmScale
          })}>
          <ZIonText
            className={classNames({
              'block ': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            We are trying to grow up {PRODUCT_NAME} as fast as possible to offer
            you the best plateform! Help us to achieve this goal by inviting
            friends. 💖
          </ZIonText>

          <ZIonText
            className={classNames({
              'block mt-5': true,
              'text-sm': !isLgScale,
              'ion-text-center': !isLgScale
            })}>
            We offer 30% commission every-time you refer a friend that join us!
          </ZIonText>
        </ZIonCol>

        <ZIonCol
          sizeXl='4'
          sizeLg='7'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'ion-text-end flex py-6': true,
            'ion-justify-content-end': isLgScale,
            'ion-justify-content-center gap-1': !isLgScale,
            'w-full': !isSmScale
          })}>
          <ZIonImg
            src={gift}
            className={classNames({
              'w-[11rem] h-[11rem] ': true,
              'me-10': isLgScale
            })}
          />
        </ZIonCol>
      </ZIonRow>
    </>
  );
};

export default ZWSReferralProgramListPage;
