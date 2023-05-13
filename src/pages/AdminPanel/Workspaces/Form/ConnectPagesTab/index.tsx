/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import { useParams } from 'react-router';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCard,
	ZIonCardContent,
	ZIonCol,
	ZIonContent,
	ZIonFooter,
	ZIonIcon,
	ZIonImg,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import ZWorkspaceFromConnectPagesCard from '@/components/WorkspacesComponents/ConnectPagesCard';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { createRedirectRoute } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
	workspaceFormConnectPagesEnum,
	workspaceFormTabEnum,
} from '@/types/AdminPanel/workspace';
import ZWorkspaceFooterSteps from '@/components/WorkspacesComponents/FooterSteps';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { ProductLogo } from '@/assets/images';
import { addCircleOutline, addOutline, closeCircle } from 'ionicons/icons';

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

const pagesCards = [
	workspaceFormConnectPagesEnum.facebook,
	workspaceFormConnectPagesEnum.twitter,
	workspaceFormConnectPagesEnum.instagram,
	workspaceFormConnectPagesEnum.linkedin,
	workspaceFormConnectPagesEnum.googleBusiness,
	workspaceFormConnectPagesEnum.youtube,
	workspaceFormConnectPagesEnum.tiktok,
	workspaceFormConnectPagesEnum.pinterest,
	workspaceFormConnectPagesEnum.universalContent,
];

const ZWorkspaceFormConnectPagesTab: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();

	// getting workspace id from route (url), when user refresh the page the id from route will be get and workspace of that id will be fetch from backend.
	const { editWorkspaceId } = useParams<{
		editWorkspaceId: string;
	}>();

	// getting search param from url with the help of 'qs' package
	const routeQSearchParams = routeQueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	return (
		<>
			<ZIonContent className='mt-4'>
				<ZIonRow className='mx-auto ion-align-items-center ion-justify-content-center'>
					{/* Facebook */}
					{pagesCards.map((el, index) => {
						return (
							<ZIonCol
								sizeXs='12'
								sizeSm='4'
								sizeMd='4'
								sizeLg='3'
								sizeXl='2'
								key={index}
							>
								<ZWorkspaceFromConnectPagesCard pageType={el} />
							</ZIonCol>
						);
					})}

					{/* Just for Testing */}
					<ZIonCol sizeXs='12' sizeSm='4' sizeMd='4' sizeLg='3' sizeXl='2'>
						<ZIonCard className=''>
							<ZIonCardContent className='pb-3 ion-text-center'>
								<div className='w-100 flex ion-align-items-center ion-justify-content-between pb-1 '>
									<ZIonButton
										className='ion-no-padding ion-no-margin'
										fill='default'
									>
										<ZIonIcon icon={addCircleOutline} className='w-7 h-7' />
									</ZIonButton>
									<ZIonButton
										className='ion-no-padding ion-no-margin'
										fill='default'
									>
										<ZIonIcon
											icon={closeCircle}
											color='danger'
											className='w-7 h-7'
										/>
									</ZIonButton>
								</div>
								<ZIonImg src={ProductLogo} className='w-10 h-10 pt-1 mx-auto' />
								{/*  */}
								<ZIonText className='mt-1 ion-text-center d-block'>
									zaions
								</ZIonText>

								{/*  */}
								<ZIonText
									className={classNames({
										'ion-text-center d-block zaions__fs_13 text-muted': true,
									})}
								>
									@zaions
								</ZIonText>

								{/*  */}
								<ZIonText
									className={classNames({
										'ion-text-center d-block': true,
									})}
								>
									CONNECT
								</ZIonText>
							</ZIonCardContent>
						</ZIonCard>
					</ZIonCol>
				</ZIonRow>
			</ZIonContent>

			{/* Footer */}
			<ZIonFooter className='flex py-2 align-items-center' collapse='fade'>
				<div
					className={classNames({
						'mx-auto': true,
						'w-4/12': isXlScale,
						'w-5/12': !isXlScale && isLgScale,
						'w-6/12': !isLgScale && isMdScale,
						'w-7/12': !isMdScale && isSmScale,
						'w-100': !isSmScale,
					})}
				>
					<ZIonRow
						className={classNames({
							'ion-justify-content-center':
								routeQSearchParams.tab ===
								workspaceFormTabEnum.workspaceDetailForm,
						})}
					>
						{routeQSearchParams.tab === workspaceFormTabEnum.inviteClients ||
						routeQSearchParams.tab === workspaceFormTabEnum.connectPages ? (
							<>
								{/* Go Back button */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
								>
									<ZIonButton
										expand='block'
										fill='outline'
										className='text-transform-initial'
										routerLink={createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
											params: [CONSTANTS.RouteParams.editWorkspaceIdParam],
											values: [editWorkspaceId],
											routeSearchParams: {
												tab: workspaceFormTabEnum.inviteClients,
											},
										})}
									>
										Go Back
									</ZIonButton>
								</ZIonCol>

								{/* Connect Later button */}
								<ZIonCol
									sizeXl='6'
									sizeLg='6'
									sizeMd='6'
									sizeSm='6'
									sizeXs='12'
								>
									<ZIonButton
										expand='block'
										className='text-transform-initial'
										routerLink={createRedirectRoute({
											url: ZaionsRoutes.AdminPanel.Workspaces.Edit,
											params: [CONSTANTS.RouteParams.editWorkspaceIdParam],
											values: [editWorkspaceId],
											routeSearchParams: {
												tab: workspaceFormTabEnum.Approval,
											},
										})}
									>
										Connect Later
									</ZIonButton>
								</ZIonCol>
							</>
						) : (
							''
						)}
					</ZIonRow>

					{/*  */}
					<ZWorkspaceFooterSteps />
				</div>
			</ZIonFooter>
		</>
	);
};

export default ZWorkspaceFormConnectPagesTab;
