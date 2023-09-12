/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import {
	ZIonButton,
	ZIonCard,
	ZIonCardContent,
	ZIonCardHeader,
	ZIonCol,
	ZIonRow,
	ZIonSkeletonText,
	ZIonText,
} from '@/components/ZIonComponents';
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

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

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZWorkspacesCardSkeleton: React.FC = () => {
	return (
		<ZIonCol sizeXl='4' sizeLg='6' sizeMd='6' sizeSm='6' sizeXs='12'>
			<ZIonCard className='cursor-pointer h-[11.4rem]'>
				<ZIonRow className='flex-col h-full'>
					<ZIonCol className='flex-1'>
						{/* Card header */}
						<ZIonCardHeader>
							<ZIonRow className='ion-align-items-center'>
								<ZIonCol className='flex gap-3 ion-align-items-center'>
									<div className='rounded w-[50px] h-[50px] overflow-hidden'>
										<ZIonSkeletonText width='100%' height='100%' />
									</div>
									<div>
										<ZIonText
											className='block text-base font-bold'
											color='dark'
										>
											<ZIonSkeletonText width='100%' height='15px' />
										</ZIonText>

										<ZIonText className='block text-xs'>
											<ZIonSkeletonText width='80px' height='15px' />
										</ZIonText>
									</div>
								</ZIonCol>

								{/* Add to Favorites button col */}
								<ZIonCol className='ion-text-end me-2'>
									<ZIonButton
										fill='clear'
										className='h-auto mb-1 ion-no-padding ion-no-margin'
									>
										<ZIonSkeletonText width='17px' height='15px' />
									</ZIonButton>
								</ZIonCol>

								{/* user avatar */}
								<ZIonCol
									size='12'
									className='mt-2 ion-no-margin ion-no-padding'
								>
									{/* Row */}
									<ZIonRow>
										{/* Col */}
										<ZIonCol>
											<div className='w-[38px] h-[40px] rounded-full zaions-object-fit-cover'>
												<ZIonSkeletonText width='100%' height='100%' />
											</div>
										</ZIonCol>
									</ZIonRow>
								</ZIonCol>
							</ZIonRow>
						</ZIonCardHeader>
					</ZIonCol>

					<ZIonCol>
						{/* Card body */}
						<ZIonCardContent className='flex flex-col h-full ion-justify-content-end ion-align-items-end'>
							{/* Bottom row */}
							<ZIonRow className='w-full ion-align-items-center'>
								{/* Last active */}
								<ZIonCol>
									<ZIonButton
										className='normal-case '
										color='secondary'
										size='default'
									>
										<ZIonSkeletonText width='40px' height='14px' />
									</ZIonButton>
								</ZIonCol>

								{/* actions popover button */}
								<ZIonCol className='ion-text-end'>
									<ZIonButton
										fill='clear'
										className='h-auto mt-1 mb-1 normal-case ion-no-padding ion-no-margin'
										color='dark'
									>
										<ZIonSkeletonText width='30px' height='15px' />
									</ZIonButton>
								</ZIonCol>
							</ZIonRow>
						</ZIonCardContent>
					</ZIonCol>
				</ZIonRow>
			</ZIonCard>
		</ZIonCol>
	);
};

export default ZWorkspacesCardSkeleton;
