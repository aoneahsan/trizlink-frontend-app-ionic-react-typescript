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
import { doesUrlIncludes, replaceParams } from '@/utils/helpers';
import { useLocation } from 'react-router';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const AdminPanelMainSidebarMenu: React.FC = () => {
	const [ZDashboardState, setZDashboardState] =
		useRecoilState(ZDashboardRState);
	const location = useLocation();
	// Made this constant for readability.
	const isCollabes = ZDashboardState.dashboardMainSidebarIsCollabes.isCollabes;

	// console.log({
	// 	check: location.pathname.includes('short-links/list'),
	// 	check2: doesUrlIncludes(location.pathname, 'short-links/list'),
	// });

	const _searchStrings = {
		shortLink: '/short-links/',
		linkInBio: '/link-in-bio/',
	};

	return (
		<ZIonCol
			size={isCollabes ? '1.9' : '.5'}
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
								isCollabes: !isCollabes,
							},
						}));
					}}
					style={{ right: isCollabes ? '-9%' : '-30%', top: '12%' }}
				>
					<ZIonIcon
						icon={isCollabes ? chevronBackOutline : chevronForwardOutline}
					/>
				</ZIonButton>

				<ZIonGrid className='h-100'>
					<ZIonRow className='h-100 ion-align-items-start'>
						<ZIonCol
							size='12'
							className='py-2 d-flex ion-justify-content-center'
						>
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								<ZIonImg
									src={ProductLogo}
									alt={`${PRODUCT_NAME} logo`}
									className={classNames(classes['zaions-ap-msm-logo'], {
										'rounded-circle zaions-transition': true,
									})}
									style={{
										width: isCollabes ? '80px' : '42px',
										height: isCollabes ? '80px' : '42px',
									}}
								/>
							</ZIonRouterLink>
						</ZIonCol>

						{/* Short Links */}
						<ZIonCol size='12'>
							<ZIonButton
								fill='clear'
								color='light'
								expand='block'
								className={classNames({
									'ion-no-padding ion-no-margin text-transform-initial': true,
									zaions__primary_set: doesUrlIncludes(
										location.pathname,
										_searchStrings.shortLink
									),
								})}
								routerLink={replaceParams(
									ZaionsRoutes.AdminPanel.ZaionsAdminLinkIndexPageRoute,
									CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
									'all'
								)}
							>
								<ZIonText
									className={classNames({
										'd-flex ion-align-items-center': true,
										'ps-3 me-auto': isCollabes,
									})}
								>
									<ZIonIcon icon={linkOutline} size='large' />

									<ZIonText
										className={classNames({
											'ps-2 zaions-transition': true,
											'd-inline-block': isCollabes,
											'd-none': !isCollabes,
										})}
									>
										Short Links
									</ZIonText>
								</ZIonText>
							</ZIonButton>
						</ZIonCol>

						{/* Link-in-bio */}
						<ZIonCol size='12'>
							<ZIonButton
								fill='clear'
								color='light'
								expand='block'
								className={classNames({
									'ion-no-padding ion-no-margin text-transform-initial': true,
									zaions__primary_set: doesUrlIncludes(
										location.pathname,
										_searchStrings.linkInBio
									),
								})}
								routerLink={replaceParams(
									ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinkInBio,
									CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio,
									'all'
								)}
							>
								<ZIonText
									className={classNames({
										'd-flex ion-align-items-center': true,
										'ps-3 me-auto': isCollabes,
									})}
								>
									<ZIonIcon icon={idCardOutline} size='large' />

									<ZIonText
										className={classNames({
											'ps-2 zaions-transition': true,
											'd-inline-block': isCollabes,
											'd-none': !isCollabes,
										})}
									>
										Links-in-bio
									</ZIonText>
								</ZIonText>
							</ZIonButton>
						</ZIonCol>

						{/* Chrome extension */}
						<ZIonCol size='12'>
							<ZIonButton
								fill='clear'
								color='light'
								expand='block'
								className='ion-no-padding ion-no-margin text-transform-initial'
							>
								<ZIonText
									className={classNames({
										'd-flex ion-align-items-center': true,
										'ps-3 me-auto': isCollabes,
									})}
								>
									<ZIonIcon icon={logoChrome} size='large' />

									<ZIonText
										className={classNames({
											'ps-2 zaions-transition': true,
											'd-inline-block': isCollabes,
											'd-none': !isCollabes,
										})}
									>
										Chrome extension
									</ZIonText>
								</ZIonText>
							</ZIonButton>
						</ZIonCol>

						{/* Integrations */}
						<ZIonCol size='12'>
							<ZIonButton
								fill='clear'
								color='light'
								expand='block'
								className='ion-no-padding ion-no-margin text-transform-initial'
							>
								<ZIonText
									className={classNames({
										'd-flex ion-align-items-center': true,
										'ps-3 me-auto': isCollabes,
									})}
								>
									<ZIonIcon icon={fileTrayStackedOutline} size='large' />

									<ZIonText
										className={classNames({
											'ps-2 zaions-transition': true,
											'd-inline-block': isCollabes,
											'd-none': !isCollabes,
										})}
									>
										Integrations
									</ZIonText>
								</ZIonText>
							</ZIonButton>
						</ZIonCol>

						{/* Help center */}
						<ZIonCol size='12'>
							<ZIonButton
								fill='clear'
								color='light'
								expand='block'
								className='ion-no-padding ion-no-margin text-transform-initial'
							>
								<ZIonText
									className={classNames({
										'd-flex ion-align-items-center': true,
										'ps-3 me-auto': isCollabes,
									})}
								>
									<ZIonIcon icon={helpCircleOutline} size='large' />

									<ZIonText
										className={classNames({
											'ps-2 zaions-transition': true,
											'd-inline-block': isCollabes,
											'd-none': !isCollabes,
										})}
									>
										Help center
									</ZIonText>
								</ZIonText>
							</ZIonButton>
						</ZIonCol>

						{/* Account */}
						<ZIonCol size='12'>
							<ZIonButton
								fill='clear'
								color='light'
								expand='block'
								className='ion-no-padding ion-no-margin text-transform-initial'
							>
								<ZIonText
									className={classNames({
										'd-flex ion-align-items-center': true,
										'ps-3 me-auto': isCollabes,
									})}
								>
									<ZIonIcon icon={personOutline} size='large' />

									<ZIonText
										className={classNames({
											'ps-2 zaions-transition': true,
											'd-inline-block': isCollabes,
											'd-none': !isCollabes,
										})}
									>
										Account
									</ZIonText>
								</ZIonText>
							</ZIonButton>
						</ZIonCol>

						{/* Settings */}
						<ZIonCol size='12'>
							<ZIonButton
								fill='clear'
								color='light'
								expand='block'
								className='ion-no-padding ion-no-margin text-transform-initial'
							>
								<ZIonText
									className={classNames({
										'd-flex ion-align-items-center': true,
										'ps-3 me-auto': isCollabes,
									})}
								>
									<ZIonIcon icon={settingsOutline} size='large' />

									<ZIonText
										className={classNames({
											'ps-2 zaions-transition': true,
											'd-inline-block': isCollabes,
											'd-none': !isCollabes,
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
	);
};

export default AdminPanelMainSidebarMenu;
