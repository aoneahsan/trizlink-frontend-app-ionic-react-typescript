/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import { contractOutline, settingsOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonButtons,
	ZIonCol,
	ZIonIcon,
	ZIonImg,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';

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

const ZWorkspaceInstagramPageLayout: React.FC = () => {
	// Media Query Scale
	const { isXlScale, isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();

	return (
		<ZIonRow
			className={classNames({
				'mt-3 ion-justify-content-center': true,
			})}
		>
			{/*  */}
			<ZIonCol
				sizeXl='7'
				sizeLg='9.5'
				sizeMd='11'
				sizeSm='11.5'
				sizeXs='11.8'
				className={classNames({
					'ion-no-padding flex  py-2 ps-2': true,
					'ion-align-items-start': isXlScale || isLgScale,
					'ion-align-items-center':
						(!isLgScale && isMdScale) || isSmScale || !isSmScale,
				})}
			>
				<ZIonRow
					className={classNames({
						'w-[100%] mx-auto': (!isLgScale && isMdScale) || isSmScale,
						'w-[95%]': !isSmScale,
					})}
				>
					<ZIonCol
						size='2.5'
						sizeLg='2.5'
						sizeMd='max-content'
						sizeSm='max-content'
						sizeXs='max-content'
					>
						<div
							className={classNames({
								'rounded-full overflow-hidden': true,
								'w-[152px] h-[152px]': isXlScale || isLgScale,
								'w-[77px] h-[77px]': !isLgScale,
							})}
						>
							<ZIonImg
								src='https://d2b57pa8jvjkcd.cloudfront.net/xGF9qraKHpDFhkqdC/dz5XmBCTYv-webearbearscrop.jpg'
								className={classNames({
									'w-full h-full': true,
								})}
							/>
						</div>
					</ZIonCol>
					{/*  */}
					<ZIonCol>
						<div
							className={classNames({
								'flex flex-col px-2 mb-3': true,
								'mx-5': isXlScale || isLgScale,
								'mx-1': !isLgScale,
							})}
						>
							<ZIonText
								className={classNames({
									'text-lg mb-3 flex ': true,
									'ion-align-items-center': isXlScale || isLgScale,
									'flex-col ion-align-items-start': !isLgScale,
								})}
							>
								<ZIonRouterLink
									routerLink={CONSTANTS.ExternalURL.FacebookUrl}
									target='_blank'
									color='dark'
									className='text-3xl font-light zaions-transition'
								>
									MTI
								</ZIonRouterLink>

								<div className=''>
									<ZIonButton
										className={classNames({
											'ion-text-capitalize ion-no-margin': true,
											'ms-4': isXlScale || isLgScale,
											'ms-0':
												(!isLgScale && isMdScale) || isSmScale || !isSmScale,
										})}
										fill='outline'
										size='small'
										color='dark'
									>
										Edit profile
									</ZIonButton>

									<ZIonButton
										className={classNames({
											'ion-text-capitalize ion-no-margin': true,
											'ms-3': isXlScale || isLgScale,
											'ms-0':
												(!isLgScale && isMdScale) || isSmScale || !isSmScale,
										})}
										fill='clear'
										size='small'
										color='dark'
									>
										<ZIonIcon icon={contractOutline} className='w-6 h-6' />
									</ZIonButton>
								</div>
							</ZIonText>

							{/*  */}
							<ZIonText className='text-sm'>
								<ZIonRouterLink
									routerLink={CONSTANTS.ExternalURL.FacebookUrl}
									target='_blank'
									className='hover:underline font-bold zaions-transition'
									color='dark'
								>
									@zaions
								</ZIonRouterLink>
							</ZIonText>

							<div
								className={classNames({
									'h-[5rem] overflow-y-scroll': true,
									'w-[80%]': isXlScale || isLgScale,
									'w-[100%]':
										(!isLgScale && isMdScale) || isSmScale || !isSmScale,
								})}
							>
								<ZIonText className='text-sm'>
									Machine learning is a subset of artificial intelligence that
									enables computer systems to learn and improve from experience
									without being explicitly programmed. It involves the use of
									algorithms and statistical models to analyze and identify
									patterns in data and use those patterns to make predictions or
									decisions.
								</ZIonText>
							</div>
						</div>
					</ZIonCol>
				</ZIonRow>
			</ZIonCol>
		</ZIonRow>
	);
};

export default ZWorkspaceInstagramPageLayout;
