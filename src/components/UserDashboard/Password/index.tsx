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
	ZIonInput,
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
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-3 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={lockClosedOutline} size='large' />
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Password
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>

					<RCSwitch
						className='ms-auto me-2'
						defaultChecked={values.password.enabled}
						checkedChildren='on'
						unCheckedChildren='off'
						onChange={(val) => {
							setFieldValue('password.enabled', val, false);
						}}
					/>
				</div>
				{values.password.enabled ? (
					<div className='block px-2 mt-1'>
						<ZIonInput
							label='Password'
							labelPlacement='stacked'
							minHeight='40px'
							name='password.value'
							type='password'
							onIonChange={handleChange}
							onIonBlur={handleBlur}
							value={values.password.value}
							errorText={
								touched.password?.value ? errors?.password?.value : undefined
							}
							className={classNames({
								'mt-5': true,
								'ion-touched': touched.password?.value,
								'ion-invalid':
									touched.password?.value && errors.password?.value,
								'ion-valid': touched.password?.value && !errors.password?.value,
							})}
						/>
					</div>
				) : (
					<div className='mt-2 ion-padding-start'>
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
