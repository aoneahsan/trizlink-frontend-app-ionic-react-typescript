/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonAccordion,
	ZIonAccordionGroup,
	ZIonCheckbox,
	ZIonCol,
	ZIonContent,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonMenu,
	ZIonRadio,
	ZIonRadioGroup,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';
import CONSTANTS from '@/utils/constants';
import {
	arrowUpOutline,
	checkmarkCircle,
	checkmarkCircleOutline,
	checkmarkOutline,
	navigateCircleOutline,
	time,
	timeOutline,
} from 'ionicons/icons';

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

const ZWorkspaceViewPageFilterMenu: React.FC = () => {
	return (
		<ZIonMenu
			contentId={CONSTANTS.MENU_IDS.ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID}
			side='end'
			menuId={CONSTANTS.MENU_IDS.ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID}
		>
			<ZIonContent>
				<ZIonItem lines='full' className='fw-bold text-xl' minHeight='66px'>
					Filter & sort
				</ZIonItem>

				<ZIonRow>
					{/*  */}
					<ZIonCol size='12' className='border-bottom pb-4'>
						<ZIonLabel
							className='text-xs d-block mt-2 mb-1 ms-2 tracking-widest'
							color='medium'
						>
							SORT BY:
						</ZIonLabel>

						{/*  */}
						<ZIonAccordionGroup>
							<ZIonAccordion value='f'>
								<ZIonItem
									slot='header'
									lines='full'
									minHeight='46px'
									color='light'
								>
									<ZIonIcon icon={arrowUpOutline} className='w-4 h-4' />
									<ZIonText className='text-sm pt-1 ms-2'>
										First scheduled date
									</ZIonText>
								</ZIonItem>
								<div
									className='ion-padding zaions__light_bg mt-1'
									slot='content'
								>
									<ZIonRadioGroup>
										{/* First scheduled date */}
										<div className='pb-2'>
											<ZIonRadio
												value='FirstScheduledDate'
												labelPlacement='end'
												className='text-sm'
											>
												First scheduled date
											</ZIonRadio>
										</div>

										{/* Last scheduled date */}
										<div className='pb-2'>
											<ZIonRadio
												value='LastScheduledDate'
												labelPlacement='end'
												className='text-sm'
											>
												Last scheduled date
											</ZIonRadio>
										</div>

										{/* Last created */}
										<div className='pb-2'>
											<ZIonRadio
												value='LastCreated'
												labelPlacement='end'
												className='text-sm'
											>
												Last created
											</ZIonRadio>
										</div>

										{/* First created */}
										<div className='pb-2'>
											<ZIonRadio
												value='FirstCreated'
												labelPlacement='end'
												className='text-sm'
											>
												First created
											</ZIonRadio>
										</div>

										{/* Recent comments */}
										<div className='pb-2'>
											<ZIonRadio
												value='RecentComments'
												labelPlacement='end'
												className='text-sm'
											>
												Recent comments
											</ZIonRadio>
										</div>

										{/* Last activity */}
										<div className='pb-2'>
											<ZIonRadio
												value='LastActivity'
												labelPlacement='end'
												className='text-sm'
											>
												Last activity
											</ZIonRadio>
										</div>

										{/* Custom order */}
										<div className='pb-2'>
											<ZIonRadio
												value='CustomOrder'
												labelPlacement='end'
												className='text-sm'
											>
												Custom order
											</ZIonRadio>
										</div>
									</ZIonRadioGroup>
								</div>
							</ZIonAccordion>
						</ZIonAccordionGroup>
					</ZIonCol>

					{/*  */}
					<ZIonCol size='12' className='border-bottom pb-4'>
						<ZIonLabel
							className='text-xs d-block mt-2 mb-1 ms-2 tracking-widest'
							color='medium'
						>
							FILTER BY:
						</ZIonLabel>

						{/*  */}
						<ZIonAccordionGroup>
							<ZIonAccordion value='f'>
								<ZIonItem
									slot='header'
									lines='full'
									minHeight='46px'
									color='light'
								>
									<ZIonIcon icon={checkmarkOutline} className='w-4 h-4' />
									<ZIonText className='text-sm pt-1 ms-2'>
										Approval Status
									</ZIonText>
								</ZIonItem>
								<div
									className='ion-padding zaions__light_bg mt-1'
									slot='content'
								>
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='Approved'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={checkmarkCircleOutline}
													color='success'
												/>
												<ZIonText className='ms-1'>Approved 2</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='notApproved'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={checkmarkCircle}
													color='success'
												/>
												<ZIonText className='ms-1'>Not Approved 1</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='partiallyApproved'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={checkmarkCircleOutline}
												/>
												<ZIonText className='ms-1'>
													Partially approved 0
												</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='pendingMyApproval'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={checkmarkCircle}
													color='warning'
												/>
												<ZIonText className='ms-1'>
													Pending my approval 0
												</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='requestedByMe'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={checkmarkCircleOutline}
													color='warning'
												/>
												<ZIonText className='ms-1'>Requested by me 0</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>
								</div>
							</ZIonAccordion>
						</ZIonAccordionGroup>

						{/*  */}
						<ZIonAccordionGroup className='mt-2'>
							<ZIonAccordion value='f'>
								<ZIonItem
									slot='header'
									lines='full'
									minHeight='46px'
									color='light'
								>
									<ZIonIcon icon={timeOutline} className='w-4 h-4' />
									<ZIonText className='text-sm pt-1 ms-2'>Post Status</ZIonText>
								</ZIonItem>
								<div
									className='ion-padding zaions__light_bg mt-1'
									slot='content'
								>
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='Scheduled'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={time}
													color='primary'
												/>
												<ZIonText className='ms-1'>Scheduled 0</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='notScheduled'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={timeOutline}
													color='primary'
												/>
												<ZIonText className='ms-1'>Not scheduled 1</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='Published'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={navigateCircleOutline}
													color='primary'
												/>
												<ZIonText className='ms-1'>Published 2</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='notPublished'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={checkmarkCircle}
													color='warning'
												/>
												<ZIonText className='ms-1'>
													Pending my approval 0
												</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>

									{/*  */}
									<div className='pb-2'>
										<ZIonCheckbox
											labelPlacement='end'
											className='text-sm ion-align-items-center'
											value='requestedByMe'
										>
											<ZIonLabel className='text-sm ion-align-items-center flex '>
												<ZIonIcon
													className='w-5 h-5'
													icon={checkmarkCircleOutline}
													color='warning'
												/>
												<ZIonText className='ms-1'>Requested by me 0</ZIonText>
											</ZIonLabel>
										</ZIonCheckbox>
									</div>
								</div>
							</ZIonAccordion>
						</ZIonAccordionGroup>
					</ZIonCol>
				</ZIonRow>
			</ZIonContent>
		</ZIonMenu>
	);
};

export default ZWorkspaceViewPageFilterMenu;
