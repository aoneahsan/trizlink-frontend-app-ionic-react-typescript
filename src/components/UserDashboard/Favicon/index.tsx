// Core Imports
import React from 'react';

// Packages Import
import { laptopOutline } from 'ionicons/icons';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
} from '@/components/ZIonComponents';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZDragAndDrop from '@/components/CustomComponents/ZDragAndDrop';
import { useFormikContext } from 'formik';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';

// Global Constants

// Images

// Recoil States

// Types

// Styles

const LinkFavIcon: React.FC = () => {
	const { values, setFieldValue } =
		useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();
	return (
		<>
			<ZIonCol
				sizeXl='5.7'
				sizeLg='5.6'
				sizeMd='5.6'
				sizeSm='12'
				sizeXs='12'
				className='border py-3 zaions__bg_white'
			>
				<div className='flex ion-align-items-center border-bottom ion-padding-start pb-2'>
					<ZIonIcon icon={laptopOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Favicon{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
				</div>
				<div className='flex ion-align-items-center ion-padding-bottom mt-4  px-2'>
					<ZDragAndDrop
						setFieldValue={setFieldValue}
						fieldName='favicon'
						imageUrl={values.favicon}
						title='Click to upload favicon'
						style={{ height: '9rem' }}
					/>
				</div>
			</ZIonCol>
		</>
	);
};

export default LinkFavIcon;
