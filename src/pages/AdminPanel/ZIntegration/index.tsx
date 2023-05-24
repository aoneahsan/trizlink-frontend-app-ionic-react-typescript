/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { closeCircleOutline, warningOutline } from 'ionicons/icons';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZaionsIonPage from '@/components/ZaionsIonPage';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZaionsInfoPanel from '@/components/CustomComponents/ZInfoPanel';
import ZaionsLinkSettingPanel from '@/components/UserDashboard/ZLinkdashboard/ZLinksSettingPanel';
import {
	ZIonCol,
	ZIonText,
	ZIonRouterLink,
	ZIonItem,
	ZIonRow,
	ZIonGrid,
	ZIonContent,
	ZIonSplitPane,
	ZIonSelectOption,
	ZIonIcon,
	ZIonSelect,
	ZIonButton,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, {
	BRACKPOINT_MD,
	PRODUCT_DOMAIN,
	PRODUCT_NAME,
} from '@/utils/constants';
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

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZIntegration: React.FC = () => {
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
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
						<ZIonContent
							className={classNames({
								'ion-padding': isMdScale,
								'mt-0 pt-0 ion-padding-bottom ': !isMdScale,
							})}
						>
							<ZIonGrid
								className={classNames({
									'mt-0 pt-1': !isMdScale,
								})}
							>
								<ZIonRow>
									{/* If it is in md then the setting side panel will be visiable */}
									{isMdScale && (
										<ZaionsLinkSettingPanel
											activeLink={
												ZLinkIonPanelSettingsSidebarActiveLinkType.integrations
											}
										/>
									)}
									<ZIonCol
										className={classNames({
											'mt-0 pt-0': !isMdScale,
										})}
									>
										<ZIonRow
											className={classNames({
												'border-bottom': true,
												'pb-3': isMdScale,
											})}
										>
											<ZIonCol
												className={classNames({
													'mt-0 pt-0': !isMdScale,
												})}
											>
												<ZIonText>
													<h2
														className={classNames({
															'font-black': true,
															'ion-text-center': !isMdScale,
														})}
													>
														Integrations
													</h2>
												</ZIonText>
											</ZIonCol>
										</ZIonRow>

										<ZIonRow>
											<ZIonCol
												size='12'
												className={classNames({
													'mt-3': true,
													'ion-text-center': !isMdScale,
												})}
											>
												<ZIonText>
													<h4
														className={classNames({
															'font-black': true,
															'ion-text-center': !isMdScale,
															'pb-3': isMdScale,
														})}
													>
														Default app group
													</h4>
												</ZIonText>
												<ZIonText>
													Your apps will create your links in this group.{' '}
													<ZIonRouterLink>Learn more</ZIonRouterLink>
												</ZIonText>
											</ZIonCol>
											<ZIonCol
												sizeXl='3.5'
												sizeLg='5'
												sizeMd='12'
												sizeSm='12'
												sizeXs='12'
											>
												<ZIonItem className='my-2'>
													<ZIonSelect
														value='1'
														interface='popover'
														label='Default app group (required)'
														labelPlacement='stacked'
													>
														<ZIonSelectOption value='1'>
															talhaIrshad (talhaIrshad)
														</ZIonSelectOption>
													</ZIonSelect>
												</ZIonItem>
											</ZIonCol>
											<ZIonCol size='12'>
												<ZaionsInfoPanel
													icon={warningOutline}
													text={`Your links will use this group's default custom domain, ${PRODUCT_DOMAIN}, unless another one is selected within the app.`}
													textColor='dark'
													iconColor='primary'
													className='mt-2'
												/>
												<ZIonButton
													className='ion-text-capitalize mt-3'
													expand={!isMdScale ? 'block' : undefined}
												>
													Save Changes
												</ZIonButton>
											</ZIonCol>
											<ZIonCol
												className={classNames({
													'mt-3': true,
													'ion-text-center pt-4': !isMdScale,
												})}
											>
												<ZIonText>
													<h4 className='font-black pb-3'>App connections</h4>
												</ZIonText>
												<ZIonText>
													Third-party integrations that you've connected to{' '}
													{PRODUCT_NAME}
												</ZIonText>
											</ZIonCol>
											<ZIonCol className='mt-3 border px-0' size='12'>
												<ZIonRow className='border-bottom ion-justify-content-between pb-2 px-3 pt-1 '>
													<ZIonCol
														className='zaions__medium_set rounded'
														size='2'
													></ZIonCol>
													<ZIonCol
														className='zaions__medium_set rounded'
														size='2'
													></ZIonCol>
													<ZIonCol
														className='zaions__medium_set rounded'
														size='2'
													></ZIonCol>
													<ZIonCol
														className='zaions__medium_set rounded'
														size='2'
													></ZIonCol>
												</ZIonRow>
												<ZIonRow className='ion-padding'>
													<ZIonCol className='ps-3 pt-4 pb-5'>
														<ZIonIcon icon={closeCircleOutline} size='large' />
														<ZIonText className='block mt-2'>
															<h5 className='font-bold mb-0'>
																No apps connected
															</h5>
														</ZIonText>
														<ZIonText>
															If you integrate third party apps, they will
															appear here.
														</ZIonText>
													</ZIonCol>
												</ZIonRow>
											</ZIonCol>
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

export default ZIntegration;
