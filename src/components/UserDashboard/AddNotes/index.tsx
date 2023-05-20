// Core Imports
import React from 'react';

// Packages Import
import { documentTextOutline } from 'ionicons/icons';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonItem,
	ZIonTextarea,
} from '@/components/ZIonComponents';
import { useFormikContext } from 'formik';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

// Global Constants

// Images

// Recoil States
// Types

// Styles

const AddNotes: React.FC = () => {
	const { values, handleChange } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
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
					<ZIonIcon icon={documentTextOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Add Notes{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</div>
				<div className='mt-4 block px-4'>
					<ZIonItem className='border'>
						<ZIonTextarea
							rows={2}
							placeholder='Description for your link'
							onIonChange={handleChange}
							autoGrow={true}
							name='linkNote'
							value={values.linkNote}
						></ZIonTextarea>
					</ZIonItem>
				</div>
			</ZIonCol>
		</>
	);
};

export default AddNotes;
