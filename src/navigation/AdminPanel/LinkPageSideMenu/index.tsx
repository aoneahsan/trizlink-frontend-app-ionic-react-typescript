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
} from '@/components/ZIonComponents';

// Types

// Recoil States

// Global Constants
import CONSTANTS from '@/utils/constants';

// Styles
// import classes from './styles.module.css';

const ZaionsAdminLinkPageSideMenu = () => {
	return (
		<>
			<ZIonMenu
				contentId={CONSTANTS.MENU_IDS.ADMIN_LINK_PAGE_CONTENT_ID}
				side='end'
				menuId={CONSTANTS.MENU_IDS.ADMIN_LINK_PAGE_CONTENT_ID}
			>
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
