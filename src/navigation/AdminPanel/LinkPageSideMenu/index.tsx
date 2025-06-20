// Core Imports
import React from 'react';

// Packages Imports
import { IonToolbar } from '@ionic/react';

// Custom Imports
import {
  ZIonContent,
  ZIonHeader,
  ZIonMenu,
  ZIonTitle
} from '@/components/ZIonComponents';

// Types

// Recoil States

// Global Constants
import CONSTANTS from '@/utils/constants';

// Styles
// import classes from './styles.module.css';

const ZaionsAdminLinkPageSideMenu: React.FC = () => {
  return (
    <>
      <ZIonMenu
        contentId={CONSTANTS.PAGE_IDS.ADMIN_LINK_PAGE_CONTENT_ID}
        side='end'
        menuId={CONSTANTS.PAGE_IDS.ADMIN_LINK_PAGE_CONTENT_ID}>
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
