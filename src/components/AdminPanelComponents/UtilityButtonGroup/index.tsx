/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import { ZIonButton, ZIonIcon, ZIonText } from '@/components/ZIonComponents';
import {
  addOutline,
  helpCircleOutline,
  notificationsOutline,
  openOutline,
  trendingUpOutline
} from 'ionicons/icons';
import React from 'react';
import { useParams } from 'react-router';
import ZInviteButton from '../InviteButton';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

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
 * About: (Contain utility buttons group like notification, upgrade, and help etc. will show below md screen.)
 * @type {*}
 * */

const ZUtilityButtonGroup: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId?: string }>();

  return (
    <div>
      <ZIonButton
        className='mt-2 ion-no-margin ion-no-padding'
        minHeight='1.9rem'
        expand='block'
        color='secondary'>
        <ZIonIcon
          icon={trendingUpOutline}
          className='me-1'
        />
        <ZIonText className='mt-1 text-xs'>Upgrade</ZIonText>
      </ZIonButton>

      <ZIonButton
        className='mt-2 ion-no-margin ion-no-padding'
        minHeight='1.9rem'
        expand='block'
        color='primary'>
        <ZIonIcon
          icon={openOutline}
          className='me-1'
        />
        <ZIonText className='mt-1 text-xs'>Go to workspace</ZIonText>
      </ZIonButton>

      <ZIonButton
        className='mt-2 ion-no-margin ion-no-padding'
        minHeight='1.9rem'
        expand='block'
        color='primary'>
        <ZIonIcon
          icon={helpCircleOutline}
          className='me-1'
        />
        <ZIonText className='mt-1 text-xs'>Help</ZIonText>
      </ZIonButton>

      <ZIonButton
        className='mt-2 ion-no-margin ion-no-padding'
        minHeight='1.9rem'
        expand='block'
        color='primary'>
        <ZIonIcon
          icon={notificationsOutline}
          className='me-1'
        />
        <ZIonText className='mt-1 text-xs'>Notification</ZIonText>
      </ZIonButton>

      <ZInviteButton
        className='mt-2 ion-no-margin ion-no-padding'
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default ZUtilityButtonGroup;
