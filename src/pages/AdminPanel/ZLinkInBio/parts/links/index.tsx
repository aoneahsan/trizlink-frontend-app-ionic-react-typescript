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
import {
	addOutline,
	appsOutline,
	arrowRedoOutline,
	calendarOutline,
	cellularOutline,
	fileTrayFullOutline,
	helpCircleOutline,
	imageOutline,
	lockClosedOutline,
	notificationsOutline,
	pencil,
	starOutline,
	trashOutline,
} from 'ionicons/icons';
import RCSwitch from 'rc-switch';
/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZLinkInBioNavigation from '@/components/UserDashboard/ZLinkInBioComps/LinkInBioNavigation';
import ZaionsIonPage from '@/components/ZaionsIonPage';
import {
	ZIonAccordion,
	ZIonAccordionGroup,
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonItem,
	ZIonLabel,
	ZIonList,
	ZIonRow,
	ZIonText,
} from '@/components/ZIonComponents';

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
import classes from './styles.module.css';
import {
	IonIcon,
	IonReorder,
	IonReorderGroup,
	ItemReorderEventDetail,
} from '@ionic/react';
import { ZaionsBusinessDetails } from '@/utils/constants';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBioLinksSection: React.FC = () => {
	const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
		// The `from` and `to` properties contain the index of the item
		// when the drag started and ended, respectively

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		event.detail.complete();
	};

	return (
		<ZaionsIonPage>
			<ZIonContent
				className={classNames(classes['link-page-background-color'])}
			>
				{/* Top Navigation */}
				<ZLinkInBioNavigation />

				{/* Main Container Start */}
				<ZIonGrid>
					<ZIonRow className='mx-2'>
						{/* Left side start */}
						<ZIonCol size='7'>
							{/* ------ Analytics ------ */}
							<ZIonAccordionGroup>
								<ZIonAccordion
									value='analytics'
									style={{ 'border-radius': '20px' }}
								>
									<ZIonItem
										slot='header'
										className={classNames(classes['link-page-analytics'], {
											'border-bottom__sand': true,
										})}
									>
										<ZIonLabel className='flex ion-align-items-center'>
											<ZIonText className='font-bold zaions__fs_15'>
												Analytics
											</ZIonText>
											<ZIonIcon
												className='ps-3 text-lg'
												icon={helpCircleOutline}
												title='info'
											/>
										</ZIonLabel>
									</ZIonItem>
									<div className='ion-padding' slot='content'>
										First Content
									</div>
								</ZIonAccordion>
							</ZIonAccordionGroup>

							{/* Container Start */}
							<ZIonRow className='ion-justify-content-center mt-4'>
								{/* ------ Add Link Button ------ */}
								<ZIonCol size='10.5'>
									<ZIonButton
										expand='block'
										shape='round'
										className='ion-text-capitalize font-bold zaions__fs_16'
										style={{
											'--padding-top': '1.4rem',
											'--padding-bottom': '1.4rem',
										}}
									>
										<ZIonIcon icon={addOutline} className='me-1' />
										Add link
									</ZIonButton>
								</ZIonCol>

								{/* Header button */}
								<ZIonCol size='10.5' className='mt-4'>
									<ZIonButton
										className='ion-text-capitalize me-2'
										shape='round'
										color='medium'
										style={{
											'--padding-top': '1.2rem',
											'--padding-bottom': '1.2rem',
											'--padding-end': '1rem',
											'--padding-start': '1rem',
											'--box-shadow': 'none',
											'--border-width': '1px',
										}}
										fill='outline'
									>
										<ZIonIcon
											icon={fileTrayFullOutline}
											color='dark'
											className='me-1'
										/>
										<ZIonText color='dark' className='font-bold'>
											Header
										</ZIonText>
									</ZIonButton>
								</ZIonCol>

								{/* List below header button */}
								<ZIonCol size='10.5'>
									<ZIonList lines='none' className='zaions__bg_transparent'>
										{/* The reorder gesture is disabled by default, enable it to drag and drop items */}
										<IonReorderGroup
											disabled={false}
											onIonItemReorder={handleReorder}
										>
											{/* Item as drag components inside list start */}
											<ZIonItem
												className='ion-margin-bottom'
												style={{ 'border-radius': '25px' }}
											>
												{/* AiOutlineHolder */}
												<IonReorder slot='start'>
													<IonIcon icon={appsOutline} />
												</IonReorder>
												<ZIonRow className='pt-3 pb-1'>
													<ZIonCol
														size='7'
														className='ion-no-padding ion-no-margin'
													>
														{/* Title Input */}
														<div className=''>
															{/* <ZIonInput
															value={'Seo Home - Zaions'}
															className='zaions__fs_14'
														/> */}
															<ZIonButton
																fill='clear'
																size='small'
																color='dark'
																className='ion-no-margin ion-no-padding ion-text-capitalize'
																style={{
																	'--background-hover': 'transparent',
																	'--background-hover-opacity': '0',
																	'margin-right': '2rem',
																}}
															>
																<ZIonText className='me-2 font-bold zaions__fs_14 letter-spacing-0px'>
																	Seo Home - Zaions
																</ZIonText>
																<ZIonIcon icon={pencil} />
															</ZIonButton>
														</div>
														{/* URL Input */}
														<div className=''>
															{/* <ZIonInput
																value={ZaionsBusinessDetails.WebsiteUrl}
																className='zaions__fs_14'
															/> */}
															<ZIonButton
																fill='clear'
																size='small'
																color='dark'
																className='ion-no-margin ion-no-padding ion-text-lowercase'
																style={{
																	'--background-hover': 'transparent',
																	'--background-hover-opacity': '0',
																	'margin-right': '2rem',
																}}
															>
																<ZIonText className='me-2 font-bold zaions__fs_13 letter-spacing-0px'>
																	{ZaionsBusinessDetails.WebsiteUrl}
																</ZIonText>
																<ZIonIcon icon={pencil} />
															</ZIonButton>
														</div>
													</ZIonCol>
													<ZIonCol className='flex ion-align-items-center ion-justify-content-end'>
														<ZIonButton
															fill='clear'
															className='ion-text-capitalize mx-2'
															shape='round'
															style={{
																'--padding-top': '.8rem',
																'--padding-bottom': '.8rem',
																'--padding-end': '.5rem',
																'--padding-start': '.5rem',
															}}
															color='dark'
															size='small'
															title='Notify subscribers'
														>
															<ZIonIcon icon={notificationsOutline} />
														</ZIonButton>
														<RCSwitch />
													</ZIonCol>

													<ZIonCol size='12' className='ps-0 flex'>
														<div>
															<ZIonButton
																fill='clear'
																className='ion-text-capitalize me-2 ms-0'
																style={{
																	'--padding-top': '.8rem',
																	'--padding-bottom': '.8rem',
																	'--padding-end': '.5rem',
																	'--padding-start': '.5rem',
																}}
																color='dark'
																size='small'
																title='Redirect'
															>
																<ZIonIcon icon={arrowRedoOutline} />
															</ZIonButton>

															<ZIonButton
																fill='clear'
																className='ion-text-capitalize me-2 ms-0'
																style={{
																	'--padding-top': '.8rem',
																	'--padding-bottom': '.8rem',
																	'--padding-end': '.5rem',
																	'--padding-start': '.5rem',
																}}
																color='dark'
																size='small'
																title='Thumbnail'
															>
																<ZIonIcon icon={imageOutline} />
															</ZIonButton>

															<ZIonButton
																fill='clear'
																className='ion-text-capitalize me-2 ms-0'
																style={{
																	'--padding-top': '.8rem',
																	'--padding-bottom': '.8rem',
																	'--padding-end': '.5rem',
																	'--padding-start': '.5rem',
																}}
																color='dark'
																size='small'
																title='Prioritize'
															>
																<ZIonIcon icon={starOutline} />
															</ZIonButton>

															<ZIonButton
																fill='clear'
																className='ion-text-capitalize me-2 ms-0'
																style={{
																	'--padding-top': '.8rem',
																	'--padding-bottom': '.8rem',
																	'--padding-end': '.5rem',
																	'--padding-start': '.5rem',
																}}
																color='dark'
																size='small'
																title='Schedule'
															>
																<ZIonIcon icon={calendarOutline} />
															</ZIonButton>

															<ZIonButton
																fill='clear'
																className='ion-text-capitalize me-2 ms-0'
																style={{
																	'--padding-top': '.8rem',
																	'--padding-bottom': '.8rem',
																	'--padding-end': '.5rem',
																	'--padding-start': '.5rem',
																}}
																color='dark'
																size='small'
																title='Lock'
															>
																<ZIonIcon icon={lockClosedOutline} />
															</ZIonButton>

															<ZIonButton
																fill='clear'
																className='ion-text-lowercase me-2 ms-0'
																style={{
																	'--padding-top': '.8rem',
																	'--padding-bottom': '.8rem',
																	'--padding-end': '.5rem',
																	'--padding-start': '.5rem',
																}}
																color='dark'
																size='small'
																title='Lifetime clicks'
															>
																<ZIonIcon icon={cellularOutline} />
																<ZIonText
																	className='ms-1 mt-1 ps-1 font-bold'
																	color='medium'
																>
																	0 clicks
																</ZIonText>
															</ZIonButton>
														</div>

														<div className='ms-auto'>
															<ZIonButton
																fill='clear'
																className='ion-text-capitalize me-0 ms-0'
																style={{
																	'--padding-top': '.8rem',
																	'--padding-bottom': '.8rem',
																	'--padding-end': '.5rem',
																	'--padding-start': '.5rem',
																}}
																color='dark'
																size='small'
																title='Delete'
															>
																<ZIonIcon icon={trashOutline} />
															</ZIonButton>
														</div>
													</ZIonCol>
												</ZIonRow>
											</ZIonItem>
											{/* Item as drag components inside list end */}
										</IonReorderGroup>
									</ZIonList>
								</ZIonCol>
							</ZIonRow>
							{/* Container Start */}
						</ZIonCol>
						{/* Left side end */}

						{/* Right side start */}
						<ZIonCol size='4.9'>column 2</ZIonCol>
						{/* Right side end */}
					</ZIonRow>
				</ZIonGrid>
				{/* Main Container Start */}
			</ZIonContent>
		</ZaionsIonPage>
	);
};

export default ZLinkInBioLinksSection;
