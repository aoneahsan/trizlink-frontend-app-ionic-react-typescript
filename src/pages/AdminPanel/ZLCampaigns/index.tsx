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
import ZIonPage from '@/components/ZIonPage';
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
	BRACKPOINT_MD,
	BRACKPOINT_SM,
	PRODUCT_NAME,
} from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { PAGE_MENU } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any extarnal type import is a Type import
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
import { campaignsEmptyState } from '@/assets/images';
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

const ZLinkCampaigns: React.FC = () => {
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});
	return (
		<>
			<ZIonPage
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
						activeLink={ZLinkIonPanelSidebarActiveLinkType.campaigns}
					/>

					<div
						className='ion-page  overflow-y-scroll'
						id={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
					>
						<ZLinkDashboardTopBar />
						<ZIonContent className='ion-padding'>
							<ZIonGrid>
								<ZIonRow className='ion-align-items-center ion-justify-content-center flex-col mt-3'>
									<ZIonImg
										src={campaignsEmptyState}
										alt='Link in bio Inactive state'
										className={classNames({
											'w-[43%]': isMdScale,
											'w-[60%]': !isMdScale && isSmScale,
											'w-full': !isSmScale,
										})}
									/>
									<ZIonTitle className='text-3xl font-bold mb-2 mt-4'>
										Some links belong together
									</ZIonTitle>
									<ZIonText className='text-lg ion-text-center'>
										Organize your links in ${PRODUCT_NAME} Campaigns and compare
										performance <br /> across channels. Available on the Premium
										plan. there.
									</ZIonText>
									<ZIonButton
										className='ion-text-capitalize mt-4'
										routerLink={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
									>
										<ZIonText className='px-4 font-bold'>
											view our plans
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
			</ZIonPage>
		</>
	);
};

export default ZLinkCampaigns;
