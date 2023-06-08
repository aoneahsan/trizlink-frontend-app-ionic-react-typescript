/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZaionsLinkSettingPanel from '@/components/UserDashboard/ZLinkdashboard/ZLinksSettingPanel';
import {
	ZIonCol,
	ZIonText,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonSplitPane,
	ZIonTitle,
	ZIonImg,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, {
	// BRACKPOINT_LG,
	BRACKPOINT_MD,
	BRACKPOINT_SM,
} from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { PAGE_MENU } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	ZLinkIonPanelSettingsSidebarActiveLinkType,
	ZLinkIonPanelSidebarActiveLinkType,
} from '@/types/AdminPanel/linksType';

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
import { customLinksEmptyState } from '@/assets/images';
import { ZIonButton } from '@/components/ZIonComponents';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be pleace Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZCustomdomain: React.FC = () => {
	// Medias Query
	// const isLgScale = useMediaQuery({
	// 	query: `(min-width: ${BRACKPOINT_LG})`,
	// });

	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});
	return (
		<>
			<ZaionsIonPage
				pageTitle='Setting'
				id={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
				menu={PAGE_MENU.DASHBOARD_PAGE_MENU}
			>
				<ZIonSplitPane
					when='lg'
					contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
				>
					{/* Side Bar */}
					<ZLinkIonPanelSidebar
						activeLink={ZLinkIonPanelSidebarActiveLinkType.settings}
					/>

					<div
						className='ion-page zaionsPaneContent'
						id={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
					>
						<ZLinkDashboardTopBar />
						<ZIonContent className='ion-padding'>
							<ZIonGrid>
								<ZIonRow>
									{/* If it is in md then the setting side panel will be visiable */}
									{isMdScale && (
										<ZaionsLinkSettingPanel
											activeLink={
												ZLinkIonPanelSettingsSidebarActiveLinkType.customdomain
											}
										/>
									)}
									<ZIonCol>
										<ZIonRow className='flex-col mt-3 ion-align-items-center ion-justify-content-center'>
											<ZIonImg
												src={customLinksEmptyState}
												className={classNames({
													zaions__w43: isMdScale,
													zaions__w60: !isMdScale && isSmScale,
													'w-full': !isSmScale,
												})}
												alt='Link in bio Inactive state'
											/>
											<ZIonTitle className='mt-4 mb-2 text-3xl font-bold'>
												People trust your links
											</ZIonTitle>
											<ZIonText className='text-lg ion-text-center'>
												Create trusted links with your own branded domain.
												Upgrade and <br /> choose a complimentary domain to get
												started.
											</ZIonText>
											<ZIonButton
												className='mt-4 ion-text-capitalize'
												routerLink=''
											>
												<ZIonText className='px-4 font-bold'>
													View our plans
												</ZIonText>
											</ZIonButton>
											<ZIonButton
												fill='clear'
												className='mt-3 ion-text-capitalize'
											>
												Learn more
											</ZIonButton>
										</ZIonRow>
									</ZIonCol>
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>
					</div>
				</ZIonSplitPane>
			</ZaionsIonPage>
		</>
	);
};

export default ZCustomdomain;
