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
	ZIonButton,
	ZIonContent,
	ZIonGrid,
	ZIonIcon,
	ZIonInput,
	ZIonItem,
	ZIonMenu,
	ZIonMenuToggle,
	ZIonRadioGroup,
	ZIonReorder,
	ZIonReorderGroup,
	ZIonText,
} from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import {
	addCircleOutline,
	checkmarkOutline,
	closeOutline,
	trashBinOutline,
} from 'ionicons/icons';
import { ItemReorderEventDetail } from '@ionic/react';
import { Formik } from 'formik';

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

const ZProjectBoardStatusMenu: React.FC = () => {
	function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
		// The `from` and `to` properties contain the index of the item
		// when the drag started and ended, respectively
		console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		event.detail.complete();
	}

	return (
		<ZIonMenu
			contentId={CONSTANTS.MENU_IDS.ADMIN_PROJECT_BOARD_STATUS_MENU_ID}
			side='end'
			menuId={CONSTANTS.MENU_IDS.ADMIN_PROJECT_BOARD_STATUS_MENU_ID}
			style={{ '--width': '37%' }}
		>
			<ZIonContent>
				<ZIonGrid className='px-[2rem] py-[1rem]'>
					<div className='w-full flex ion-align-items-center'>
						<ZIonText className='mt-2 font-bold text-xl'>
							Edit Statuses
						</ZIonText>

						<ZIonMenuToggle className='ms-auto'>
							<ZIonIcon
								icon={closeOutline}
								className='pt-1 cursor-pointer w-6 h-6'
							/>
						</ZIonMenuToggle>
					</div>
					<ZIonText className='block mt-1'>
						Edit existing statuses, reorder them and create new ones.
					</ZIonText>

					<Formik
						initialValues={{
							addStatus: false,
						}}
						onSubmit={() => {}}
					>
						{({ values, setFieldValue }) => {
							return (
								<>
									<div className='mt-8'>
										<ZIonReorderGroup
											disabled={false}
											onIonItemReorder={handleReorder}
										>
											{[1, 2, 3].map((el) => {
												return (
													<div
														className='flex ion-align-items-center mt-4'
														key={el}
													>
														<ZIonReorder></ZIonReorder>
														<ZIonButton
															className='ion-no-margin mx-2'
															color='primary'
															style={{ '--padding-start': '1rem' }}
															height='27px'
														></ZIonButton>
														<ZIonItem
															lines='none'
															className='w-full ion-activatable rounded-lg cursor-pointer'
															minHeight='40px'
															style={{ '--padding-start': '9px' }}
														>
															MTI {el}
														</ZIonItem>
														<ZIonButton
															className='ion-no-margin ms-3'
															height='34px'
															color='medium'
														>
															<ZIonIcon icon={trashBinOutline} />
														</ZIonButton>
													</div>
												);
											})}
										</ZIonReorderGroup>
									</div>

									{values.addStatus && (
										<ZIonReorderGroup>
											<div className='flex ion-align-items-center mt-4'>
												<ZIonReorder></ZIonReorder>
												<ZIonButton
													className='ion-no-margin mx-2'
													color='primary'
													style={{ '--padding-start': '1rem' }}
													height='27px'
												></ZIonButton>

												<ZIonInput minHeight='34px' autofocus />

												<ZIonButton
													className='ion-no-margin ms-3'
													height='34px'
													color='success'
												>
													<ZIonIcon icon={checkmarkOutline} />
												</ZIonButton>

												<ZIonButton
													className='ion-no-margin ms-3'
													height='34px'
													color='secondary'
													onClick={() => {
														setFieldValue('addStatus', false, false);
													}}
												>
													<ZIonIcon icon={closeOutline} />
												</ZIonButton>
											</div>
										</ZIonReorderGroup>
									)}

									{!values.addStatus && (
										<div className='w-full mt-3 flex ion-justify-content-end'>
											<ZIonButton
												onClick={() => {
													setFieldValue('addStatus', true, false);
												}}
											>
												<ZIonIcon icon={addCircleOutline} />
												<ZIonText>Add status</ZIonText>
											</ZIonButton>
										</div>
									)}
								</>
							);
						}}
					</Formik>
				</ZIonGrid>
			</ZIonContent>
		</ZIonMenu>
	);
};

export default ZProjectBoardStatusMenu;
