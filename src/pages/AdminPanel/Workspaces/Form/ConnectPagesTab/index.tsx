/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import routeQueryString from 'qs';
import { useParams } from 'react-router';
import classNames from 'classnames';
import {
	addCircleOutline,
	addOutline,
	caretBackOutline,
	caretForwardOutline,
	closeCircle,
} from 'ionicons/icons';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

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
import ZWorkspaceFooterSteps from '@/components/WorkspacesComponents/FooterSteps';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

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
import { ProductLogo } from '@/assets/images';

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
				<ZIonRow className='mx-auto ion-align-items-center ion-justify-content-center gap-y-4'>
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
								className='h-[11rem]'
							>
								<ZWorkspaceFromConnectPagesCard pageType={el} />
							</ZIonCol>
						);
					})}

					{/* Just for Testing */}
					<ZIonCol
						sizeXs='12'
						sizeSm='4'
						sizeMd='4'
						sizeLg='3'
						sizeXl='2'
						className='h-[11rem]'
					>
						<Swiper
							className='h-[11rem]'
							spaceBetween={0}
							slidesPerView={1}
							onSlideChange={() => {}}
							onSwiper={(_) => {}}
						>
							{[1, 2, 3, 4].map((el) => (
								<SwiperSlide className='h-full' key={el}>
									<ZIonCard className='h-[94%]'>
										<ZIonCardContent className='pb-3 ion-text-center ion-no-padding ion-padding-horizontal py-1'>
											<div className='w-full flex ion-align-items-center ion-justify-content-between pb-1 '>
												<ZIonButton
													className='ion-no-padding ion-no-margin'
													fill='default'
												>
													<ZIonIcon
														icon={addCircleOutline}
														className='w-7 h-7'
													/>
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

											{/*  */}
											<ZIonImg
												src={ProductLogo}
												className='w-10 h-10 pt-1 mx-auto'
											/>
											{/*  */}
											<ZIonText className='mt-1 ion-text-center block'>
												zaions {el}
											</ZIonText>

											{/*  */}
											<ZIonText
												className={classNames({
													'ion-text-center block zaions__fs_13 text-muted':
														true,
												})}
											>
												@zaions
											</ZIonText>

											{/* Navigation buttons */}
											<ConnectPagesCardSwiperButtons />
											{/*  */}
										</ZIonCardContent>
									</ZIonCard>
								</SwiperSlide>
							))}
						</Swiper>
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
						'w-full': !isSmScale,
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
											params: [
												CONSTANTS.RouteParams.workspace.editWorkspaceIdParam,
											],
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
											params: [
												CONSTANTS.RouteParams.workspace.editWorkspaceIdParam,
											],
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

const ConnectPagesCardSwiperButtons: React.FC = () => {
	const swiper = useSwiper();
	return (
		<div className='w-full flex ion-align-items-center ion-justify-content-between pb-1 '>
			<ZIonButton
				className='ion-no-padding ion-no-margin'
				fill='default'
				onClick={() => swiper.slidePrev()}
			>
				<ZIonIcon icon={caretBackOutline} className='w-7 h-7' />
			</ZIonButton>
			<ZIonButton
				className='ion-no-padding ion-no-margin'
				fill='default'
				onClick={() => swiper.slideNext()}
			>
				<ZIonIcon icon={caretForwardOutline} className='w-7 h-7' />
			</ZIonButton>
		</div>
	);
};

export default ZWorkspaceFormConnectPagesTab;
