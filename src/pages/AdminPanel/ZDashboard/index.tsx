/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';
import {
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

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZLinkIonPanelSidebarActiveLinkType } from '@/types/AdminPanel/linksType';

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
import { dashboardEmptyState } from '@/assets/images';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useMediaQuery } from 'react-responsive';
import { PAGE_MENU } from '@/utils/enums';
import classNames from 'classnames';
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

const ZDashboard: React.FC = () => {
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
				pageTitle='Dashboard'
				id={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
				menu={PAGE_MENU.DASHBOARD_PAGE_MENU}
			>
				<ZIonSplitPane
					when='lg'
					contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
				>
					{/* Side Bar */}
					<ZLinkIonPanelSidebar
						activeLink={ZLinkIonPanelSidebarActiveLinkType.dashboard}
					/>

					<div
						className='ion-page zaionsPaneContent'
						id={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
					>
						<ZLinkDashboardTopBar />
						<ZIonContent className='ion-padding'>
							<ZIonGrid>
								<ZIonRow className='flex-col mt-3 ion-align-items-center ion-justify-content-center'>
									<ZIonImg
										src={dashboardEmptyState}
										alt='dashboard Inactive state'
										className={classNames({
											'w-[40%]': isMdScale,
											'w-[60%]': !isMdScale && isSmScale,
											'w-full': !isSmScale,
										})}
									/>
									<ZIonTitle className='mt-4 mb-2 text-3xl font-bold'>
										Every click tell a story
									</ZIonTitle>
									<ZIonText className='text-lg ion-text-center'>
										See all your link data in one dashboard. View click metrics
										by <br /> location, device, referrers and more.
									</ZIonText>
									<ZIonButton
										className='mt-4 ion-text-capitalize'
										routerLink=''
									>
										<ZIonText className='px-4 font-bold'>
											View our plans
										</ZIonText>
									</ZIonButton>
									<ZIonButton fill='clear' className='mt-3 ion-text-capitalize'>
										Learn more
									</ZIonButton>
								</ZIonRow>
							</ZIonGrid>
						</ZIonContent>
					</div>
				</ZIonSplitPane>
			</ZaionsIonPage>
		</>
	);
};

export default ZDashboard;
