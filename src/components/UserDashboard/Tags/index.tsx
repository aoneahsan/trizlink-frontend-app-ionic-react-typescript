// Core Imports
import React from 'react';

// Packages Import
import { IonChip } from '@ionic/react';
import { close, pricetagsOutline } from 'ionicons/icons';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonItem,
	ZIonLabel,
	ZIonInput,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';
import { useFormikContext } from 'formik';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Types

// Styles

const Tags: React.FC = () => {
	const { values, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
	const { presentZIonToast } = useZIonToast();

	const handleTagSubmit = async (_tag: string) => {
		try {
			if (!values.tags.includes(_tag)) {
				const __tags = [...values.tags];
				__tags.push(_tag);
				setFieldValue('tags', __tags, true);
			} else {
				await presentZIonToast(`"${_tag}" Tag already exists.`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const removeTags = (_tag: string) => {
		if (values.tags.includes(_tag)) {
			const _tags = values.tags.filter((el) => el !== _tag);
			setFieldValue('tags', _tags, true);
		}
	};
	return (
		<>
			<ZIonCol
				sizeXl='5.8'
				sizeLg='5.7'
				sizeMd='5.6'
				sizeSm='12'
				sizeXs='12'
				className='border py-3 zaions__bg_white'
			>
				<div className='flex ion-align-items-center border-bottom ion-padding-start pb-2'>
					<ZIonIcon icon={pricetagsOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Tags{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</div>
				<div className='mt-4 block px-4 mb-4'>
					<ZIonInput
						placeholder='Add tag'
						onKeyUp={({ currentTarget, key }) => {
							if (!!currentTarget?.value && key === 'Enter') {
								void handleTagSubmit(
									currentTarget?.value?.toString().toLowerCase()
								);
								currentTarget.value = '';
							}
						}}
						name='tags'
						label=''
					/>
					<div className='tags ion-padding-top'>
						{values.tags && values.tags.length
							? values.tags.map((el) => {
									return (
										<IonChip
											onClick={() => {
												removeTags(el);
											}}
											key={el}
										>
											<ZIonLabel>{el}</ZIonLabel>
											<ZIonIcon icon={close}></ZIonIcon>
										</IonChip>
									);
							  })
							: ''}
					</div>
				</div>
			</ZIonCol>
		</>
	);
};

export default Tags;
