// Core Imports
import React from 'react';

// Packages Imports
import { addOutline, appsOutline } from 'ionicons/icons';
import { FieldArray, useFormikContext } from 'formik';
import { ItemReorderEventDetail } from '@ionic/react';

// Custom Imports
import {
	ZIonButton,
	ZIonIcon,
	ZIonItem,
	ZIonReorder,
	ZIonReorderGroup,
} from '@/components/ZIonComponents';
import LinkInBioLinkField from '../LinkField';
import LinkInBioUploadField from '../UploadField';
import LinkInBioTitleField from '../TitleField';
import LinkInBioDescriptionField from '../DescriptionField';

// Types
import {
	cardDisplayEnum,
	linkInBioBlockCardItemInterface,
	LinkInBioSingleBlockContentType,
} from '@/types/AdminPanel/linkInBioType/blockTypes';
import ZCustomDeleteComponent from '@/components/CustomComponents/ZCustomDeleteComponent';
import { reportCustomError } from '@/utils/customErrorType';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

// Styles

const LinkInBioCarouselCardField: React.FC = () => {
	// handle reorder function (preview panel)

	const { values, handleBlur, handleChange } =
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

	const getNewCardItemEmptyObjForCarousel: () => linkInBioBlockCardItemInterface =
		() => {
			return {
				target: {
					url: '',
				},
				imageUrl: '',
				title: '',
				text: '',
				description: '',
				isActive: true,
				cardDisplayType: cardDisplayEnum.carousel,
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
									className='ion-text-capitalize'
									onClick={() => push(getNewCardItemEmptyObjForCarousel)}
									expand='block'
								>
									<ZIonIcon icon={addOutline} className='me-1' />
									add card
								</ZIonButton>
								{values.cardItems?.length
									? values.cardItems.map((_cardItem, _index) => (
											<ZIonItem
												className='py-3 my-3 border zaions-linkInBio-block'
												style={{
													'--background': 'transparent',
												}}
												lines='none'
												key={_index}
											>
												<ZIonReorder slot='start' className='ms-3 me-3'>
													<ZIonIcon
														icon={appsOutline}
														color='dark'
														className='w-6 h-6'
													/>
												</ZIonReorder>

												<div className='w-full pe-3'>
													<LinkInBioLinkField
														name={`cardItems.${_index}.target.url`}
														onIonChange={handleChange}
														onIonBlur={handleBlur}
														value={
															values.cardItems &&
															values.cardItems[_index].target?.url
														}
													/>

													<LinkInBioUploadField
														className='mt-2'
														dropdownHeight='7rem'
													/>

													<LinkInBioTitleField
														name={`cardItems.${_index}.title`}
														onIonChange={handleChange}
														onIonBlur={handleBlur}
														value={
															values.cardItems && values.cardItems[_index].title
														}
														className='mt-2'
													/>

													<LinkInBioDescriptionField
														name={`cardItems.${_index}.description`}
														onIonChange={handleChange}
														onIonBlur={handleBlur}
														value={
															values.cardItems &&
															values.cardItems[_index].description
														}
														className='mt-2'
													/>
												</div>

												{/* Delete block button */}
												<ZCustomDeleteComponent
													deleteFn={(detail: OverlayEventDetail<unknown>) => {
														try {
															if (detail && detail.role === 'destructive') {
																void remove(_index);
															}
														} catch (error) {
															reportCustomError(error);
														}
													}}
													className='ion-no-padding ms-3 me-1'
													slot='end'
													iconColor='danger'
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

export default LinkInBioCarouselCardField;
