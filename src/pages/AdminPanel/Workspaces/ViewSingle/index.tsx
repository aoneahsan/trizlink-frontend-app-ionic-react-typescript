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
	createOutline,
	ellipsisVerticalOutline,
	filterOutline,
	helpCircleOutline,
	imageOutline,
	logoFacebook,
	notificationsOutline,
} from 'ionicons/icons';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZUserAvatarInfo from '@/components/WorkspacesComponents/UserButton';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonRow,
	ZIonSegment,
	ZIonSegmentButton,
	ZIonText,
} from '@/components/ZIonComponents';
import ZIonSearchbar from '@/components/ZIonComponents/ZIonSearchbar';
import ZWorkspaceLinkedinPageLayout from '@/components/WorkspacesComponents/PagesLayout/Linkedin';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

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
import { addIcon, ProductLogo } from '@/assets/images';
import ZWorkspaceTiktokPageLayout from '@/components/WorkspacesComponents/PagesLayout/Tiktok';
import ZWorkspacePinterestPageLayout from '@/components/WorkspacesComponents/PagesLayout/Pinterest';
import ZWorkspaceYoutubePageLayout from '@/components/WorkspacesComponents/PagesLayout/Youtube';
import ZWorkspaceTwitterPageLayout from '@/components/WorkspacesComponents/PagesLayout/Twitter';
import ZWorkspaceInstagramPageLayout from '@/components/WorkspacesComponents/PagesLayout/Instagram';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ViewSingleWorkspace: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale, isXsScale } =
		useZMediaQueryScale();

	return (
		<ZaionsIonPage pageTitle='Zaions view single workspace page'>
			<ZIonHeader
				className={classNames({
					'ion-padding-horizontal': true,
					'p-0': !isLgScale,
				})}
			>
				<ZIonGrid className='pb-0'>
					{/* First row */}
					<ZIonRow className='ion-align-items-center'>
						{/* Go to workspaces button and Searchbar */}
						<ZIonCol
							sizeXl='4'
							sizeLg='5'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
							className={classNames({
								'flex items-center gap-2': true,
								'order-3': !isLgScale,
							})}
						>
							<ZIonButton
								expand='block'
								className={classNames({
									'text-transform-initial': true,
									'w-1/4': !isLgScale,
								})}
							>
								Workspaces
							</ZIonButton>

							<div
								className={classNames({
									'w-3/4': !isLgScale,
								})}
							>
								<ZIonSearchbar
									animated
									showClearButton='focus'
									color='light'
									style={{ '--box-shadow': 'none' }}
								/>
							</div>
						</ZIonCol>

						{/* workspace name & edit button */}
						<ZIonCol
							sizeXl='5'
							sizeLg='4'
							sizeMd='6'
							sizeSm='6'
							sizeXs='4'
							className={classNames({
								'flex items-center justify-center text-transform-initial': true,
								'ion-justify-content-center': isXlScale,
								'ion-justify-content-start':
									isLgScale || isMdScale || isSmScale || isXsScale,
							})}
						>
							<ZIonButton fill='default' className='fs-4'>
								MTI
							</ZIonButton>
						</ZIonCol>

						{/* Help Button, Notifications Button, and UserAvatarInfo */}
						<ZIonCol
							sizeXl='3'
							sizeLg='3'
							sizeMd='6'
							sizeSm='6'
							sizeXs='8'
							className='flex items-center justify-end gap-2'
						>
							<ZIonButton
								fill='default'
								className='ion-no-margin text-transform-initial'
							>
								<ZIonText>Help</ZIonText>
								<ZIonIcon icon={helpCircleOutline} className='w-6 h-6 ms-2' />
							</ZIonButton>

							<ZIonButton fill='default' className='ion-no-margin me-2'>
								<ZIonIcon icon={notificationsOutline} className='w-6 h-6' />
							</ZIonButton>

							<ZUserAvatarInfo />
						</ZIonCol>
					</ZIonRow>

					{/* Second row */}
					<ZIonRow
						className={classNames({
							'ion-align-items-center pb-0': true,
							'mt-2': !isXlScale,
						})}
					>
						{/* Users buttons */}
						<ZIonCol
							className={classNames({
								'pb-0': true,
								'mb-2': !isXlScale,
							})}
							sizeXl='2.5'
							sizeLg='6'
							sizeMd='6'
							sizeSm='6'
							sizeXs='6'
						>
							<ZUserAvatarInfo
								className='w-[10px] h-[10px]'
								userAvatar={ProductLogo}
								style={{ height: '35px', width: '35px' }}
							/>

							{/* add user button */}
							<ZUserAvatarInfo
								className='ms-2'
								userAvatar={addIcon}
								style={{ height: '35px', width: '35px' }}
							/>
						</ZIonCol>

						{/* Pages */}
						<ZIonCol
							className={classNames({
								'pb-0': true,
								'order-2': isXlScale,
								'order-3': !isXlScale,
							})}
							sizeXl='6'
							sizeLg='12'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<ZIonSegment scrollable={true} value='1'>
								{[1, 2, 3, 4].map((el) => (
									<ZIonSegmentButton
										className='text-transform-initial'
										value={String(el)}
									>
										<ZIonIcon icon={logoFacebook} className='w-7 h-7 mb-2' />
										<ZIonText className='pb-2'>page name</ZIonText>
									</ZIonSegmentButton>
								))}
							</ZIonSegment>
						</ZIonCol>

						{/* Menu, filter, media, compose buttons */}
						<ZIonCol
							sizeXl='3.5'
							sizeLg='6'
							sizeMd='6'
							sizeSm='6'
							sizeXs='12'
							className={classNames({
								'pb-0 d-flex': true,
								'order-3': isXlScale,
								'order-2 mb-2': !isXlScale,
								'ion-justify-content-end': isSmScale,
								'ion-justify-content-start': !isSmScale,
							})}
						>
							<ZIonButtons
								className={classNames({
									'gap-2': true,
									'flex ion-justify-content-between w-100': !isSmScale,
								})}
							>
								{/* Menu */}
								<ZIonButton>
									<ZIonIcon icon={ellipsisVerticalOutline} />
								</ZIonButton>

								{/* filter */}
								<ZIonButton className='text-transform-initial'>
									<ZIonIcon icon={filterOutline} />
									<ZIonText className='ms-2'>Filter</ZIonText>
								</ZIonButton>

								{/* media */}
								<ZIonButton className='text-transform-initial'>
									<ZIonIcon icon={imageOutline} />
									<ZIonText className='ms-2'>Media</ZIonText>
								</ZIonButton>

								{/* compose */}
								<ZIonButton
									color='primary'
									fill='solid'
									className='border-radius__100vmax'
								>
									<ZIonIcon icon={createOutline} />
									<ZIonText className='ms-2'>Compose</ZIonText>
								</ZIonButton>
							</ZIonButtons>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonHeader>

			{/*  */}
			<ZIonContent color='light'>
				<ZWorkspaceInstagramPageLayout />
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ViewSingleWorkspace;
