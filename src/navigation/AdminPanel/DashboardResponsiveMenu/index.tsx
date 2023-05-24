// Core Imports
import React from 'react';

// Packages Imports
import { IonToolbar } from '@ionic/react';

// Custom Imports
import {
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonMenu,
	ZIonTitle,
	ZIonImg,
	ZIonContent,
	ZIonBadge,
	ZIonAccordionGroup,
	ZIonAccordion,
} from '@/components/ZIonComponents';

// Types

// Recoil States

// Global Contents
import CONSTANTS, { BRACKPOINT_MD } from '@/utils/constants';
import { PAGE_MENU_SIDE } from '@/utils/enums';
import { useMediaQuery } from 'react-responsive';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { productSmLogo } from '@/assets/images';
import classNames from 'classnames';
import {
	analyticsOutline,
	caretDownCircleOutline,
	folderOutline,
	gitMergeOutline,
	globeOutline,
	linkOutline,
	phonePortraitOutline,
	settingsOutline,
} from 'ionicons/icons';
import { ZIonButton } from '@/components/ZIonComponents';

// Styles
// import classes from './styles.module.css';

type ZDashboardResponsiveMenu = {
	menuSide?: PAGE_MENU_SIDE;
};

const ZaionsDashboardResponsiveMenu: React.FC<ZDashboardResponsiveMenu> = ({
	menuSide,
}) => {
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});
	return (
		<ZIonMenu
			contentId={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
			side={menuSide || 'end'}
			menuId='zaions-dashboard-sidebar-menu'
		>
			<IonToolbar className='mt-3 border-bottom pb-2'>
				<ZIonTitle className='ion-padding-bottom'>
					<ZIonRouterLink
						routerLink={ZaionsRoutes.HomeRoute}
						className='flex ion-justify-content-center'
					>
						<ZIonImg
							src={productSmLogo}
							alt='product logo'
							className='logo mx-auto'
						/>
					</ZIonRouterLink>
				</ZIonTitle>
				<ZIonButton
					expand='block'
					className='ion-margin mt-0 ion-text-capitalize font-bold mb-1'
					routerLink={ZaionsRoutes.AdminPanel.ShortLinks.Create}
				>
					Create New
				</ZIonButton>
			</IonToolbar>
			<ZIonContent className=''>
				<ZIonList lines='none'>
					{/* Dashboard */}
					<ZIonRouterLink
						routerLink={
							ZaionsRoutes.AdminPanel.ZaionsDashboard.DashboardInactive
						}
						className='ion-text-end'
					>
						<ZIonItem
							className={classNames({
								'ion-text-center rounded': true,
							})}
						>
							<ZIonIcon icon={analyticsOutline} className='text-3xl me-3' />
							<ZIonText className='text-lg font-bold'>Dashboard</ZIonText>
						</ZIonItem>
					</ZIonRouterLink>

					{/* Links */}
					<ZIonRouterLink
						routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinks}
						className='ion-text-center'
					>
						<ZIonItem
							className={classNames({
								'ion-text-center rounded mt-2': true,
							})}
						>
							<ZIonIcon
								icon={linkOutline}
								className='text-3xl me-3 font-bold'
							/>
							<ZIonText className='text-lg font-bold'>Links</ZIonText>
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
							})}
						>
							<ZIonIcon
								icon={phonePortraitOutline}
								className='text-3xl me-3 font-bold'
							/>
							<ZIonText className='text-lg font-bold me-2'>
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
							})}
						>
							<ZIonIcon
								icon={folderOutline}
								className='text-3xl me-3 font-bold'
							/>
							<ZIonText className='text-lg font-bold'>Campaigns</ZIonText>
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
							})}
						>
							<ZIonIcon
								icon={globeOutline}
								className='text-3xl me-3 font-bold'
							/>
							<ZIonText className='text-lg font-bold'>Custom links</ZIonText>
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
							})}
						>
							<ZIonIcon
								icon={settingsOutline}
								className='text-3xl me-3 font-bold'
							/>
							<ZIonText className='text-lg font-bold'>Settings</ZIonText>
						</ZIonItem>
					</ZIonRouterLink>
					{!isMdScale && (
						<ZIonList lines='none' className='ms-5 ps-1'>
							{/* Profile */}
							<ZIonRouterLink
								className='ion-no-padding ion-no-margin mb-1'
								routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
								color='dark'
							>
								<ZIonText className='text-base ps-2 font-bold block mb-3'>
									Profile
								</ZIonText>
							</ZIonRouterLink>

							{/* Integrations */}
							<ZIonRouterLink
								className='ion-no-padding ion-no-margin mb-1'
								routerLink={
									ZaionsRoutes.AdminPanel.ZaionsDashboard.ZIntegration
								}
								color='dark'
							>
								<ZIonText className='text-base ps-2 font-bold block mb-3'>
									Integrations
								</ZIonText>
							</ZIonRouterLink>

							{/* Account Settings */}
							<ZIonText className='font-bold ps-2 block' color='secondary'>
								Account settings
							</ZIonText>

							<ZIonAccordionGroup className='mb-4 me-2'>
								<ZIonAccordion
									value='talhairshad'
									toggleIcon={caretDownCircleOutline}
									toggleIconSlot='end'
								>
									<ZIonItem
										slot='header'
										className='ion-no-padding ion-no-margin'
									>
										<ZIonLabel className='ps-2 font-bold' color='medium'>
											talhairshad
										</ZIonLabel>
									</ZIonItem>
									<ZIonList
										lines='none'
										slot='content'
										className='ms-2 ion-no-padding'
									>
										{/* Account details */}
										<ZIonItem
											className='ion-no-padding ion-no-margin mb-1 '
											routerLink={
												ZaionsRoutes.AdminPanel.ZaionsDashboard.ZAccountDetails
											}
										>
											<ZIonText className='ps-2 font-bold'>
												Account details
											</ZIonText>
										</ZIonItem>

										{/* Custom domains */}
										<ZIonItem
											className='ion-no-padding ion-no-margin mb-1'
											routerLink={
												ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCustomDomain
											}
										>
											<ZIonText className='ps-2 font-bold'>
												Custom domains
											</ZIonText>
										</ZIonItem>

										{/* Group */}
										<ZIonItem
											className='ion-no-padding ion-no-margin mb-1'
											routerLink={
												ZaionsRoutes.AdminPanel.ZaionsDashboard.ZGroup
											}
										>
											<ZIonText className='ps-2 font-bold'>Groups</ZIonText>
										</ZIonItem>

										{/* CVS Bulk Shortening */}
										<ZIonItem
											className='ion-no-padding ion-no-margin mb-1'
											routerLink={
												ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCSVBulk
											}
										>
											<ZIonText className='ps-2 font-bold'>
												CSV bulk shortening
											</ZIonText>
										</ZIonItem>
									</ZIonList>
								</ZIonAccordion>
							</ZIonAccordionGroup>

							{/* Developer Settings */}
							<ZIonText className='font-bold ps-2' color='secondary'>
								Developer settings
							</ZIonText>
							<ZIonRouterLink
								routerLink={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
								className='ion-text-center'
							>
								<ZIonItem
									className={classNames({
										'ion-text-center rounded mt-3': true,
									})}
								>
									<ZIonIcon
										icon={gitMergeOutline}
										className='text-3xl me-3 font-bold'
									/>
									<ZIonText className='text-lg font-bold'>Api</ZIonText>
								</ZIonItem>
							</ZIonRouterLink>
						</ZIonList>
					)}
				</ZIonList>
			</ZIonContent>
		</ZIonMenu>
	);
};

export default ZaionsDashboardResponsiveMenu;
