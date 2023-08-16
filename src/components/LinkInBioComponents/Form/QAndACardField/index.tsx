// Core Imports
import React from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { ItemReorderEventDetail } from '@ionic/react';
import { FieldArray, useFormikContext } from 'formik';

// Custom Imports
import ZTextEditor from '@/components/CustomComponents/ZTextEditor';
import LinkInBioTitleField from '../TitleField';
import {
	ZIonButton,
	ZIonIcon,
	ZIonItem,
	ZIonReorder,
	ZIonReorderGroup,
} from '@/components/ZIonComponents';

// Types
import {
	cardDisplayEnum,
	linkInBioBlockCardItemInterface,
	LinkInBioSingleBlockContentType,
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { reportCustomError } from '@/utils/customErrorType';
import CONSTANTS from '@/utils/constants';

// Styles

const LinkInBioQAndACardField: React.FC = () => {
	// handle reorder function (preview panel)

	const { values, handleBlur, handleChange, setFieldValue } =
		useFormikContext<LinkInBioSingleBlockContentType>();

	const handleCarouselCardReorder = (
		event: CustomEvent<ItemReorderEventDetail>
	) => {
		// The `from` and `to` properties contain the index of the item
		// when the drag started and ended, respectively

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		// eslint-disable-next-line
		event.detail.complete();
	};

	const getNewCardItemEmptyObjForQAndA: () => linkInBioBlockCardItemInterface =
		() => {
			return {
				imageUrl: '',
				title: '',
				text: '',
				isActive: true,
				cardDisplayType: cardDisplayEnum.QandA,
			};
		};

	return (
		<>
			<ZIonReorderGroup
				onIonItemReorder={handleCarouselCardReorder}
				disabled={false}
			>
				<FieldArray name='cardItems'>
					{({ remove, push }) => {
						return (
							<>
								<ZIonButton
									expand='block'
									className='ion-text-capitalize'
									onClick={() => push(getNewCardItemEmptyObjForQAndA)}
									testingSelector={
										CONSTANTS.testingSelectors.linkInBio.formPage.design
											.blockForm.fields.QAndA.addCardBtn
									}
								>
									<ZIonIcon icon={addOutline} className='me-1' />
									add new Q&A
								</ZIonButton>
								{values.cardItems?.length
									? values.cardItems.map((_cardItem, _index) => (
											<ZIonItem
												key={_index}
												lines='none'
												className='pb-3 my-4 border zaions-linkInBio-block'
												testingListSelector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.cardItem}-${_index}`}
												testingSelector={
													CONSTANTS.testingSelectors.linkInBio.formPage.design
														.blockForm.fields.QAndA.cardItem
												}
												style={{
													'--background': 'transparent',
												}}
											>
												<ZIonReorder slot='start' className='ms-3'>
													<ZIonIcon
														icon={appsOutline}
														color='dark'
														className='w-6 h-6'
													/>
												</ZIonReorder>

												<div className='w-full'>
													<LinkInBioTitleField
														className='mt-3'
														placeholder='Question'
														name={`cardItems.${_index}.title`}
														onIonChange={handleChange}
														onIonBlur={handleBlur}
														testingListSelector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.titleInput}-${_index}`}
														testingSelector={
															CONSTANTS.testingSelectors.linkInBio.formPage
																.design.blockForm.fields.QAndA.titleInput
														}
														value={
															values.cardItems && values.cardItems[_index].title
														}
													/>

													<ZTextEditor
														placeholder='Answer'
														className='mt-3'
														testingListSelector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.textEditor}-${_index}`}
														testingSelector={
															CONSTANTS.testingSelectors.linkInBio.formPage
																.design.blockForm.fields.QAndA.textEditor
														}
														value={
															values.cardItems && values.cardItems[_index].text
														}
														onChange={(_value) => {
															setFieldValue(
																`cardItems.${_index}.text`,
																_value,
																false
															);
														}}
													/>
												</div>

												{/* Delete block button */}
												<ZCustomDeleteComponent
													slot='end'
													iconColor='danger'
													className='ion-no-padding me-1'
													testingListSelector={`${CONSTANTS.testingSelectors.linkInBio.formPage.design.blockForm.fields.QAndA.deleteBtn}-${_index}`}
													testingSelector={
														CONSTANTS.testingSelectors.linkInBio.formPage.design
															.blockForm.fields.QAndA.deleteBtn
													}
													deleteFn={(detail: OverlayEventDetail<unknown>) => {
														try {
															if (detail && detail.role === 'destructive') {
																void remove(_index);
															}
														} catch (error) {
															reportCustomError(error);
														}
													}}
												/>
											</ZIonItem>
									  ))
									: ''}
							</>
						);
					}}
				</FieldArray>
			</ZIonReorderGroup>
		</>
	);
};

export default LinkInBioQAndACardField;
