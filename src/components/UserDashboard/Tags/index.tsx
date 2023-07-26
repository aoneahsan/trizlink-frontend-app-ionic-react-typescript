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
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-2 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					{/* Icon */}
					<ZIonIcon icon={pricetagsOutline} size='large' />

					{/* Text */}
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Tags
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</div>

				{/*  */}
				<div className='block px-4 mt-4'>
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
						minHeight='40px'
						style={{
							'--padding-start': '0px',
						}}
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
