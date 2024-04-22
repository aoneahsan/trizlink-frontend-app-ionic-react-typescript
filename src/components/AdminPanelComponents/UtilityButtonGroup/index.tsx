/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams } from 'react-router';
import { openOutline, trendingUpOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import { ZIonButton, ZIonIcon, ZIonText } from '@/components/ZIonComponents';
import ZInviteButton from '../InviteButton';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZHybridDeviceIsMobile } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Functional Component
 * About: (Contain utility buttons group like notification, upgrade, and help etc. will show below md screen.)
 * @type {*}
 * */

const ZUtilityButtonGroup: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId?: string }>();
  const { value: isHybridDevice } = useZHybridDeviceIsMobile();

  return (
    <div>
      {!isHybridDevice ? (
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
      ) : null}

      <ZIonButton
        className='mt-2 ion-no-margin ion-no-padding'
        minHeight='1.9rem'
        expand='block'
        color='primary'
        routerLink={ZaionsRoutes.AdminPanel.Workspaces.Main}>
        <ZIonIcon
          icon={openOutline}
          className='me-1'
        />
        <ZIonText className='mt-1 text-xs'>Go to workspaces</ZIonText>
      </ZIonButton>

      {/* <ZIonButton
        className='mt-2 ion-no-margin ion-no-padding'
        minHeight='1.9rem'
        expand='block'
        color='primary'>
        <ZIonIcon
          icon={helpCircleOutline}
          className='me-1'
        />
        <ZIonText className='mt-1 text-xs'>Help</ZIonText>
      </ZIonButton> */}

      {/* <ZIonButton
        className='mt-2 ion-no-margin ion-no-padding'
        minHeight='1.9rem'
        expand='block'
        color='primary'>
        <ZIonIcon
          icon={notificationsOutline}
          className='me-1'
        />
        <ZIonText className='mt-1 text-xs'>Notification</ZIonText>
      </ZIonButton> */}

      <ZInviteButton
        className='mt-2 ion-no-margin ion-no-padding'
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default ZUtilityButtonGroup;
