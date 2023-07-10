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
import { chevronDownOutline } from 'ionicons/icons';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZUserProfileButton from '@/components/AdminPanelComponents/UserProfileButton';
import {
	ZIonCol,
	ZIonGrid,
	ZIonHeader,
	ZIonIcon,
	ZIonImg,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
	ZIonToolbar,
} from '@/components/ZIonComponents';
import ZIonSearchbar from '@/components/ZIonComponents/ZIonSearchbar';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

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

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZProjectHeader: React.FC = () => {
	const { isXlScale, isLgScale, isSmScale, isMdScale } = useZMediaQueryScale();
	return (
		<ZIonHeader>
			{/* Tooltip */}
			<ZIonToolbar
				className={classNames({
					'flex flex-wrap px-0 mx-auto ion-align-items-center ion-justify-content-between sm:px-4':
						true,
					container: isXlScale,
					'px-2': !isSmScale,
				})}
			>
				{/* Grid */}
				<ZIonGrid className='ion-no-margin ion-no-padding'>
					{/* Row */}
					<ZIonRow className='ion-no-margin ion-no-padding ion-align-items-center'>
						{/* Col-1 */}
						<ZIonCol
							className={classNames({
								'ion-no-margin ion-no-padding ion-align-items-center lg:h-auto':
									true,
								'flex h-12': isMdScale,
							})}
							sizeXl='8.8'
							sizeLg='7.8'
							sizeMd='12'
							sizeSm='12'
							sizeXs='12'
						>
							<div className='max-w-[9rem] h-full py-3 w-max lg:mr-6 md:mr-3'>
								<ZIonRouterLink
									routerLink={ZaionsRoutes.AdminPanel.Projects.View}
									color='dark'
								>
									<ZIonImg
										className='h-6 sm:h-8'
										src='http://localhost:8000/storage/uploaded-files/mPIpUcl3S4lEwRGTrLPwI1cQmYPhHePbzcGpgmPB.png'
									/>

									{/* <ZIonTitle className='block text-base font-medium truncate transition duration-150 ease-in-out ion-no-padding hover:no-underline md:text-lg lg:text-xl sm:text-md lg:mt-1'>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Nesciunt error saepe laudantium odit accusamus blanditiis
											magnam hic quibusdam facilis nulla. Id quasi, porro
											necessitatibus expedita quam voluptas enim. Voluptatibus,
											adipisci.
										</ZIonTitle> */}
								</ZIonRouterLink>
							</div>

							{/*  */}
							<div
								className={classNames({
									'flex h-full ion-align-items-center': true,
									'ion-justify-content-center pb-[2px]': isMdScale,
									'w-full': !isMdScale,
								})}
							>
								{/*  */}
								<ZIonText className='flex h-full px-1 py-2 mr-3 font-semibold border-b-2 border-transparent cursor-pointer lg:mt-1 z-ion-border-color-danger_opacity_point7 ion-align-items-center ion-justify-content-center'>
									<ZIonText className='tracking-wide ms-1 md:text-md lg:text-[.9rem] sm:text-sm'>
										Feature request
									</ZIonText>
									<ZIonText className=''>
										<ZIonIcon
											icon={chevronDownOutline}
											className={classNames({
												'w-5 h-5 pt-[2px] ms-1 mt-1 z-hover-color-danger': true,
											})}
										/>
									</ZIonText>
								</ZIonText>

								{/*  */}
								<ZIonText
									className={classNames({
										'px-1 mr-3 border-b-2 border-transparent cursor-pointer py-2 sm:flex hover:no-underline lg:mt-1 ms-1 md:text-md lg:text-[.9rem] sm:text-sm z-hover-color-danger':
											true,
									})}
								>
									Roadmap
								</ZIonText>

								{/*  */}
								<ZIonText
									className={classNames({
										'px-1 py-2 mr-3 border-b-2 border-transparent cursor-pointer sm:flex hover:no-underline lg:mt-1 ms-1 md:text-md lg:text-[.9rem] sm:text-sm z-hover-color-danger':
											true,
									})}
								>
									Changelog
								</ZIonText>
							</div>
						</ZIonCol>

						{/* Col-1 */}
						<ZIonCol
							sizeXl=''
							sizeLg=''
							sizeMd='10.5'
							sizeSm='10.5'
							sizeXs='10.5'
							className='flex h-full ion-no-margin ion-no-padding ion-align-items-center ion-justify-content-center'
						>
							<ZIonSearchbar
								animated={true}
								placeholder='Search ideas...'
								className={classNames({
									'pb-[0px!important]': true,
									'px-[0px!important]': !isLgScale,
								})}
								mode='ios'
							></ZIonSearchbar>
						</ZIonCol>

						{/* Col-3 */}
						<ZIonCol
							sizeXl='max-content'
							sizeLg='max-content'
							sizeMd='1.4'
							sizeSm='1.4'
							sizeXs='1.4'
							className={classNames({
								'flex ion-align-items-center ion-justify-content-end':
									!isLgScale,
							})}
						>
							{/*  */}
							<ZUserProfileButton
								className={classNames({
									'w-[50px!important] h-[50px!important]': isLgScale,
									'w-[40px!important] h-[40px!important]': !isLgScale,
								})}
							/>
						</ZIonCol>
					</ZIonRow>
				</ZIonGrid>
			</ZIonToolbar>
		</ZIonHeader>
	);
};

export default ZProjectHeader;
