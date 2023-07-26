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
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-2 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={laptopOutline} size='large' />
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Favicon
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</div>

				<div className='flex px-2 mt-2 ion-align-items-center ion-padding-bottom'>
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
