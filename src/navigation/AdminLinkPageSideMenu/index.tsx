// Core Imports
import React from 'react';

// Packages Imports
import { IonToolbar } from '@ionic/react';

// Custom Imports
import {
  ZIonContent,
  ZIonHeader,
  ZIonMenu,
  ZIonTitle,
} from 'components/ZIonComponents';

// Types

// Recoil States

// Global Contants
import { ADMIN_LINK_PAGE_CONTENT_ID } from 'utils/constants';

// Styles
// import classes from './styles.module.css';

const ZaionsAdminLinkPageSideMenu = () => {
  return (
    <>
      <ZIonMenu contentId={ADMIN_LINK_PAGE_CONTENT_ID} side='end' menuId='2'>
        <ZIonHeader>
          <IonToolbar>
            <ZIonTitle>Dashboard Menu Content</ZIonTitle>
          </IonToolbar>
        </ZIonHeader>
        <ZIonContent className='ion-padding'>
          This is the menu for dashboard...
        </ZIonContent>
      </ZIonMenu>
    </>
  );
};

export default ZaionsAdminLinkPageSideMenu;
