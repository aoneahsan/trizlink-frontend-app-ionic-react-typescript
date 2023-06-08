/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonImg,
	ZIonItem,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import {
	albumsOutline,
	chevronBackOutline,
	chevronForwardOutline,
	fileTrayStackedOutline,
	helpCircleOutline,
	idCardOutline,
	linkOutline,
	logoChrome,
	personOutline,
	settingsOutline,
} from 'ionicons/icons';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZDashboardRState } from '@/ZaionsStore/UserDashboard/ZDashboard';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */
import classes from './styles.module.css';

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { ProductLogo } from '@/assets/images';
import { replaceParams, replaceRouteParams } from '@/utils/helpers';
import { useLocation, useParams } from 'react-router';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZIonSegment from '@/components/ZIonComponents/ZIonSegment';
import ZIonSegmentButton from '@/components/ZIonComponents/ZIonSegmentButton';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';
import { AdminPanelMainSidebarMenuPageEnum } from '@/types/AdminPanel/index.type';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const AdminPanelMainSidebarMenu: React.FC<{
	activePage: AdminPanelMainSidebarMenuPageEnum;
}> = ({ activePage }) => {
	const { isLgScale } = useZMediaQueryScale();
	const [ZDashboardState, setZDashboardState] =
		useRecoilState(ZDashboardRState);

	// Made this constant for readability.
	const isExpand = ZDashboardState.dashboardMainSidebarIsCollabes.isExpand;

	// console.log({
	// 	check: location.pathname.includes('short-links/list'),
	// 	check2: doesUrlIncludes(location.pathname, 'short-links/list'),
	// });

	const { zNavigatePushRoute } = useZNavigate();

	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();

	return (
		<>
			{isLgScale ? (
				<ZIonCol
					size={isExpand ? '2' : '.8'}
					className='zaions__medium_bg zaions-transition'
				>
					<ZIonContent color='dark'>
						{/* Toggler menu button */}
						<ZIonButton
							slot='fixed'
							className={classNames(classes['zaions-ap-msm-toggle-button'], {
								'zaions-transition': true,
							})}
							shape='round'
							onClick={() => {
								setZDashboardState((oldValues) => ({
									...oldValues,
									dashboardMainSidebarIsCollabes: {
										...oldValues.dashboardMainSidebarIsCollabes,
										isExpand: !isExpand,
									},
								}));
							}}
							style={{ right: isExpand ? '-9%' : '-30%', top: '12%' }}
						>
							<ZIonIcon
								icon={isExpand ? chevronBackOutline : chevronForwardOutline}
							/>
						</ZIonButton>

						<ZIonGrid className='h-full'>
							<ZIonRow className='h-full ion-align-items-start'>
								<ZIonCol
									size='12'
									className='flex py-4 ion-justify-content-center'
								>
									<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
										<ZIonImg
											src={ProductLogo}
											alt={`${PRODUCT_NAME} logo`}
											className={classNames(classes['zaions-ap-msm-logo'], {
												'rounded-full zaions-transition': true,
											})}
											style={{
												width: isExpand ? '80px' : '42px',
												height: isExpand ? '80px' : '42px',
											}}
										/>
									</ZIonRouterLink>
								</ZIonCol>

								{/* Short Links */}
								<ZIonCol size='12' className='my-3'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className={classNames({
											'ion-no-padding ion-no-margin text-transform-initial':
												true,
											zaions__primary_set:
												activePage ===
												AdminPanelMainSidebarMenuPageEnum.shortLink,
										})}
										routerLink={replaceRouteParams(
											ZaionsRoutes.AdminPanel.ShortLinks.Main,
											[
												CONSTANTS.RouteParams.workspace.workspaceId,
												CONSTANTS.RouteParams.folderIdToGetShortLinks,
											],
											[workspaceId, 'all']
										)}
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={linkOutline} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													hidden: !isExpand,
												})}
											>
												Short Links
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol>

								{/* Link-in-bio */}
								<ZIonCol size='12' className='my-3'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className={classNames({
											'ion-no-padding ion-no-margin text-transform-initial':
												true,
											zaions__primary_set:
												activePage ===
												AdminPanelMainSidebarMenuPageEnum.linkInBio,
										})}
										routerLink={''}
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={idCardOutline} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													hidden: !isExpand,
												})}
											>
												Links-in-bio
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol>

								{/* Chrome extension */}
								{/* <ZIonCol size='12' title='Extension'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className='ion-no-padding ion-no-margin text-transform-initial'
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={logoChrome} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													'hidden': !isExpand,
												})}
											>
												Extension
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol> */}

								{/* Integrations */}
								{/* <ZIonCol size='12'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className='ion-no-padding ion-no-margin text-transform-initial'
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={fileTrayStackedOutline} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													'hidden': !isExpand,
												})}
											>
												Integrations
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol> */}

								{/* Workspaces */}
								<ZIonCol size='12' className='my-3'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className={classNames({
											'ion-no-padding ion-no-margin text-transform-initial':
												true,
											zaions__primary_set:
												activePage ===
												AdminPanelMainSidebarMenuPageEnum.workspaces,
										})}
										routerLink={replaceRouteParams(
											ZaionsRoutes.AdminPanel.Workspaces.View,
											[CONSTANTS.RouteParams.workspace.workspaceId],
											[workspaceId]
										)}
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={albumsOutline} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													hidden: !isExpand,
												})}
											>
												Workspace detail
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol>

								{/* Help center */}
								{/* <ZIonCol size='12' className='my-3'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className='ion-no-padding ion-no-margin text-transform-initial'
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={helpCircleOutline} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													'hidden': !isExpand,
												})}
											>
												Help center
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol> */}

								{/* Account */}
								<ZIonCol size='12' className='my-3'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className='ion-no-padding ion-no-margin text-transform-initial'
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={personOutline} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													hidden: !isExpand,
												})}
											>
												Account
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol>

								{/* Settings */}
								<ZIonCol size='12' className='my-3'>
									<ZIonButton
										fill='clear'
										color='light'
										expand='block'
										className='ion-no-padding ion-no-margin text-transform-initial'
									>
										<ZIonText
											className={classNames({
												'flex ion-align-items-center': true,
												'ps-3 me-auto': isExpand,
											})}
										>
											<ZIonIcon icon={settingsOutline} size='large' />

											<ZIonText
												className={classNames({
													'ps-2 zaions-transition': true,
													'inline-block': isExpand,
													hidden: !isExpand,
												})}
											>
												Settings
											</ZIonText>
										</ZIonText>
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonGrid>
					</ZIonContent>
				</ZIonCol>
			) : (
				<ZIonCol
					size='12'
					className='mb-5 ion-align-items-center zaions__light_bg'
				>
					<ZIonSegment
						scrollable={true}
						value={activePage}
						// color='secondary'
						className='zaions_pretty_scrollbar'
					>
						{/* Short Links */}
						<ZIonSegmentButton
							value={AdminPanelMainSidebarMenuPageEnum.shortLink}
							className='text-transform-initial'
							onClick={() => {
								zNavigatePushRoute(
									replaceRouteParams(
										ZaionsRoutes.AdminPanel.ShortLinks.Main,
										[
											CONSTANTS.RouteParams.workspace.workspaceId,
											CONSTANTS.RouteParams.folderIdToGetShortLinks,
										],
										[workspaceId, 'all']
									)
								);
							}}
						>
							Short links
						</ZIonSegmentButton>

						{/* Link-in-bio */}
						<ZIonSegmentButton
							value={AdminPanelMainSidebarMenuPageEnum.linkInBio}
							className='text-transform-initial'
							// onClick={() => {
							// 	zNavigatePushRoute('');
							// }}
						>
							Link-in-bio
						</ZIonSegmentButton>

						{/* Extension */}
						<ZIonSegmentButton
							value='extension'
							className='text-transform-initial'
							onClick={() => {
								zNavigatePushRoute(
									replaceParams(
										ZaionsRoutes.AdminPanel.ShortLinks.Main,
										CONSTANTS.RouteParams.folderIdToGetShortLinks,
										'all'
									)
								);
							}}
						>
							Extension
						</ZIonSegmentButton>

						{/* Integrations */}
						<ZIonSegmentButton
							value='integrations'
							className='text-transform-initial'
							onClick={() => {
								zNavigatePushRoute(
									replaceParams(
										ZaionsRoutes.AdminPanel.ShortLinks.Main,
										CONSTANTS.RouteParams.folderIdToGetShortLinks,
										'all'
									)
								);
							}}
						>
							Integrations
						</ZIonSegmentButton>

						{/* Workspaces */}
						<ZIonSegmentButton
							value='Workspaces'
							className='text-transform-initial'
							onClick={() => {
								zNavigatePushRoute(
									replaceParams(
										ZaionsRoutes.AdminPanel.Workspaces.View,
										CONSTANTS.RouteParams.folderIdToGetShortLinks,
										workspaceId
									)
								);
							}}
						>
							Workspaces
						</ZIonSegmentButton>

						{/* Help center */}
						<ZIonSegmentButton
							value='help-center'
							className='text-transform-initial'
							onClick={() => {
								zNavigatePushRoute(
									replaceParams(
										ZaionsRoutes.AdminPanel.ShortLinks.Main,
										CONSTANTS.RouteParams.folderIdToGetShortLinks,
										'all'
									)
								);
							}}
						>
							Help center
						</ZIonSegmentButton>

						{/* Settings */}
						<ZIonSegmentButton
							value='settings'
							className='text-transform-initial'
							onClick={() => {
								zNavigatePushRoute(
									replaceParams(
										ZaionsRoutes.AdminPanel.ShortLinks.Main,
										CONSTANTS.RouteParams.folderIdToGetShortLinks,
										'all'
									)
								);
							}}
						>
							Settings
						</ZIonSegmentButton>
					</ZIonSegment>
				</ZIonCol>
			)}
		</>
	);
};

export default AdminPanelMainSidebarMenu;
