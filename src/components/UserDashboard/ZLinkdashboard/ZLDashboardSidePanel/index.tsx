/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { IonToolbar } from '@ionic/react';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonItem,
	ZIonList,
	ZIonMenu,
	ZIonTitle,
	ZIonImg,
	ZIonContent,
	ZIonBadge,
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

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
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { productSmLogo } from '@/assets/images';
import {
	addOutline,
	analyticsOutline,
	chevronBackOutline,
	chevronForwardOutline,
	folderOutline,
	globeOutline,
	linkOutline,
	phonePortraitOutline,
	settingsOutline,
} from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';
import { ZIonButton } from '@/components/ZIonComponents';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be place Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkIonPanelSidebar: React.FC<{
	activeLink: ZLinkIonPanelSidebarActiveLinkType;
}> = ({ activeLink = ZLinkIonPanelSidebarActiveLinkType.dashboard }) => {
	const [ZDashboardState, setZDashboardState] =
		useRecoilState(ZDashboardRState);
	return (
		<ZIonMenu
			contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}
			className={classNames(classes.ZDashboardMenuWidth)}
			style={{
				'--side-min-width': ZDashboardState.dashboardMainSidebarIsCollabes
					.isExpand
					? '84px'
					: '240px',
			}}
			menuId='CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL'
		>
			<IonToolbar className='mt-3 border-bottom pb-2'>
				<ZIonTitle className='ion-padding-bottom'>
					<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute} className='flex'>
						<ZIonImg
							src={productSmLogo}
							alt='product logo'
							className='menu-product-logo'
						/>
					</ZIonRouterLink>
				</ZIonTitle>
				{!ZDashboardState.dashboardMainSidebarIsCollabes.isExpand ? (
					<ZIonButton
						expand='block'
						className='ion-margin ion-text-capitalize font-bold mb-1'
						
					>
						Create New
					</ZIonButton>
				) : (
					<ZIonButton
						className='ion-margin ion-text-capitalize font-bold mb-1'
						title='Create New Short Link'
					>
						<ZIonIcon icon={addOutline} />
					</ZIonButton>
				)}
			</IonToolbar>
			<ZIonContent className=''>
				{!ZDashboardState.dashboardMainSidebarIsCollabes.isExpand ? (
					<ZIonList lines='none' className='px-2'>
						{/* Dashboard */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.DashboardInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.dashboard,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.dashboard
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={analyticsOutline}
									className='text-xl me-2'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.dashboard
											? 'primary'
											: 'dark'
									}
								/>
								<ZIonText
									className='text-base font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.dashboard
											? 'primary'
											: 'dark'
									}
								>
									Dashboard
								</ZIonText>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Links */}
						<ZIonRouterLink
							routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinks}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.links,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.links
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={linkOutline}
									className='text-xl me-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.links
											? 'primary'
											: 'dark'
									}
								/>
								<ZIonText
									className='text-base font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.links
											? 'primary'
											: 'dark'
									}
								>
									Links
								</ZIonText>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Link-in-bio */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3': true,
									[classes.linkActiveState]:
										activeLink ===
										ZLinkIonPanelSidebarActiveLinkType.linksInBio,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.linksInBio
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={phonePortraitOutline}
									className='text-xl me-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.linksInBio
											? 'primary'
											: 'dark'
									}
								/>
								<ZIonText
									className='text-base font-bold me-2'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.linksInBio
											? 'primary'
											: 'dark'
									}
								>
									Link-in-bio
								</ZIonText>
								<ZIonBadge className='ZLIonBadge'>NEW!</ZIonBadge>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Campaigns */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkCampaignsInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.campaigns,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.campaigns
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={folderOutline}
									className='text-xl me-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.campaigns
											? 'primary'
											: 'dark'
									}
								/>
								<ZIonText
									className='text-base font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.campaigns
											? 'primary'
											: 'dark'
									}
								>
									Campaigns
								</ZIonText>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Custom Links */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.CustomlinksInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3 border-bottom pb-2': true,
									[classes.linkActiveState]:
										activeLink ===
										ZLinkIonPanelSidebarActiveLinkType.customLinks,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.customLinks
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={globeOutline}
									className='text-xl me-2 font-bold'
									color={
										activeLink ===
										ZLinkIonPanelSidebarActiveLinkType.customLinks
											? 'primary'
											: 'dark'
									}
								/>
								<ZIonText
									className='text-base font-bold'
									color={
										activeLink ===
										ZLinkIonPanelSidebarActiveLinkType.customLinks
											? 'primary'
											: 'dark'
									}
								>
									Custom links
								</ZIonText>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Settings */}
						<ZIonRouterLink
							routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.settings,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.settings
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={settingsOutline}
									className='text-xl me-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.settings
											? 'primary'
											: 'dark'
									}
								/>
								<ZIonText
									className='text-base font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.settings
											? 'primary'
											: 'dark'
									}
								>
									Settings
								</ZIonText>
							</ZIonItem>
						</ZIonRouterLink>
					</ZIonList>
				) : (
					<ZIonList lines='none' className='ion-text-center'>
						{/* Dashboard */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.DashboardInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded ps-1': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.dashboard,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.dashboard
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={analyticsOutline}
									className='text-xl ms-2'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.dashboard
											? 'primary'
											: 'dark'
									}
								/>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Links */}
						<ZIonRouterLink
							routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinks}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3 ps-1': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.links,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.links
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={linkOutline}
									className='text-xl ms-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.links
											? 'primary'
											: 'dark'
									}
								/>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Link-in-bio */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3 ps-1': true,
									[classes.linkActiveState]:
										activeLink ===
										ZLinkIonPanelSidebarActiveLinkType.linksInBio,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.linksInBio
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={phonePortraitOutline}
									className='text-xl ms-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.linksInBio
											? 'primary'
											: 'dark'
									}
								/>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Campaigns */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkCampaignsInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3 ps-1': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.campaigns,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.campaigns
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={folderOutline}
									className='text-xl ms-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.campaigns
											? 'primary'
											: 'dark'
									}
								/>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Custom Links */}
						<ZIonRouterLink
							routerLink={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.CustomlinksInactive
							}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3 border-bottom pb-2 ps-1': true,
									[classes.linkActiveState]:
										activeLink ===
										ZLinkIonPanelSidebarActiveLinkType.customLinks,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.customLinks
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={globeOutline}
									className='text-xl ms-2 font-bold'
									color={
										activeLink ===
										ZLinkIonPanelSidebarActiveLinkType.customLinks
											? 'primary'
											: 'dark'
									}
								/>
							</ZIonItem>
						</ZIonRouterLink>

						{/* Settings */}
						<ZIonRouterLink
							routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
							className='ion-text-center'
						>
							<ZIonItem
								className={classNames({
									'ion-text-center rounded mt-3 ps-1': true,
									[classes.linkActiveState]:
										activeLink === ZLinkIonPanelSidebarActiveLinkType.settings,
								})}
								color={
									activeLink === ZLinkIonPanelSidebarActiveLinkType.settings
										? 'light'
										: undefined
								}
							>
								<ZIonIcon
									icon={settingsOutline}
									className='text-xl ms-2 font-bold'
									color={
										activeLink === ZLinkIonPanelSidebarActiveLinkType.settings
											? 'primary'
											: 'dark'
									}
								/>
							</ZIonItem>
						</ZIonRouterLink>
					</ZIonList>
				)}
				<ZIonButton
					expand='full'
					onClick={() =>
						setZDashboardState((oldVals) => ({
							...oldVals,
							dashboardMainSidebarIsCollabes: {
								...oldVals.dashboardMainSidebarIsCollabes,
								isExpand:
									!ZDashboardState.dashboardMainSidebarIsCollabes.isExpand,
							},
						}))
					}
					className='mt-5'
				>
					<ZIonIcon
						icon={
							ZDashboardState.dashboardMainSidebarIsCollabes.isExpand
								? chevronForwardOutline
								: chevronBackOutline
						}
						className={classNames({
							[classes.menuToggleButton]: true,
						})}
					/>
				</ZIonButton>
			</ZIonContent>
		</ZIonMenu>
	);
};

export default ZLinkIonPanelSidebar;
