// Core Imports
import React from 'react';

// Packages Import
import { lockClosedOutline } from 'ionicons/icons';
import RCSwitch from 'rc-switch';

// Custom Imports
import {
	ZIonCol,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States

// Types
import { useFormikContext } from 'formik';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import classNames from 'classnames';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Styles

const LinkPassword: React.FC = () => {
	const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
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
					<ZIonIcon icon={lockClosedOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Password{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
					<RCSwitch
						className='ms-auto me-2'
						onChange={(val) => {
							setFieldValue('password.enabled', val, true);
						}}
						defaultChecked={values.password.enabled}
						checkedChildren='on'
						unCheckedChildren='off'
					/>
				</div>
				{values.password.enabled ? (
					<div className='block px-2 mt-3 mb-4'>
						<ZIonInputField
							inputFieldProps={{
								label: 'Password',
								labelPlacement: 'floating',
								onIonChange: handleChange,
								onIonBlur: handleBlur,
								value: values.password.value,
								name: 'password.value',
								errorText: errors?.password?.value,
								type: 'password',
								className: `${classNames({
									'mt-5': true,
									'ion-invalid':
										touched.password?.value && errors.password?.value,
									'ion-valid':
										touched.password?.value && !errors.password?.value,
								})}`,
							}}
						/>
					</div>
				) : (
					<div className='ms-4 mt-4'>
						<ZIonText className='text-base'>
							Activate this option to protect your link with a password
						</ZIonText>
					</div>
				)}
			</ZIonCol>
		</>
	);
};

export default LinkPassword;
