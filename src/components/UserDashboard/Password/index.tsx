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
	ZIonItem,
	ZIonInput,
	ZIonNote,
} from '@/components/ZIonComponents';

// Global Constants

// Images

// Recoil States

// Types
import { useFormikContext } from 'formik';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import classNames from 'classnames';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

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
				<div className='d-flex align-items-center border-bottom ion-padding-start pb-2'>
					<ZIonIcon icon={lockClosedOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='fw-bold ion-no-margin ion-padding-start'>
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
					<div className='d-block px-2 mt-3 mb-4'>
						<ZIonItem
							className={classNames({
								'ion-invalid':
									touched.password?.value && errors.password?.value,
								'ion-valid': touched.password?.value && !errors.password?.value,
							})}
						>
							<ZIonInput
								type='password'
								label='Password'
								labelPlacement='floating'
								name='password.value'
								onIonChange={handleChange}
								onIonBlur={handleBlur}
								value={values.password.value}
							></ZIonInput>
							<ZIonNote slot='error'>{errors?.password?.value}</ZIonNote>
						</ZIonItem>
					</div>
				) : (
					<div className='ms-4 mt-4'>
						<ZIonText className='fs-6'>
							Activate this option to protect your link with a password
						</ZIonText>
					</div>
				)}
			</ZIonCol>
		</>
	);
};

export default LinkPassword;
