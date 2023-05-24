// Core Imports
import React from 'react';

// Packages Import
import { alarmOutline } from 'ionicons/icons';
import classNames from 'classnames';
import RCSwitch from 'rc-switch';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonInput,
} from '@/components/ZIonComponents';

// Global Constants
import { TIMEZONES } from '@/utils/constants';
import { formatReactSelectOption } from '@/utils/helpers';

// Images

// Recoil States
import { useFormikContext } from 'formik';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import ZIonInputField from '@/components/CustomComponents/FormFields/ZIonInputField';

// Types

// Styles

const LinkExpiration: React.FC = () => {
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
		setFieldTouched,
	} = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

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
					<ZIonIcon icon={alarmOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='font-bold ion-no-margin ion-padding-start'>
							Link Expiration{' '}
							<ZIonRouterLink routerLink={ZaionsRoutes.HomeRoute}>
								(help)
							</ZIonRouterLink>
						</h6>
					</ZIonText>
					<RCSwitch
						onChange={(val) => {
							setFieldValue('linkExpiration.enabled', val, true);
						}}
						checked={values.linkExpiration.enabled}
						checkedChildren='on'
						unCheckedChildren='off'
						className='ms-auto me-2'
					/>
				</div>
				{values.linkExpiration.enabled ? (
					<div className='mt-4 block px-2 mb-4'>
						<ZIonRow>
							<ZIonCol>
								<ZIonInputField
									inputFieldProps={{
										label: 'End at:',
										labelPlacement: 'stacked',
										onIonChange: handleChange,
										onIonBlur: handleBlur,
										value: values.linkExpiration.expirationDate,
										name: 'linkExpiration.expirationDate',
										type: 'datetime-local',
									}}
								/>
							</ZIonCol>
							<ZIonCol>
								<ZaionsRSelect
									className='mt-2'
									placeholder='country*'
									name='linkExpiration.timezone'
									options={
										TIMEZONES.map((el) => {
											return { ...el };
										}) as unknown as ZaionsRSelectOptions[]
									}
									onChange={(_value) => {
										setFieldValue(
											`linkExpiration.timezone`,
											(_value as ZaionsRSelectOptions)?.value,
											true
										);
									}}
									value={
										formatReactSelectOption(
											values?.linkExpiration?.timezone as string,
											TIMEZONES,
											'label',
											'value'
										) || []
									}
								/>
							</ZIonCol>
						</ZIonRow>

						<ZIonInputField
							inputFieldProps={{
								label: 'Redirection Links*',
								labelPlacement: 'floating',
								onIonChange: (event) => {
									setFieldValue(
										'linkExpiration.redirectionLink',
										event.target.value,
										true
									);
								},
								onIonBlur: () => {
									setFieldTouched('linkExpiration.redirectionLink', true, true);
								},
								value: values.linkExpiration.redirectionLink,
								name: 'linkExpiration.redirectionLink',
								errorText: errors.linkExpiration?.redirectionLink,
								type: 'url',
								className: `${classNames({
									'mt-2 mx-auto': true,
									'ion-touched': touched.linkExpiration?.redirectionLink,
									'ion-invalid':
										touched.linkExpiration?.redirectionLink &&
										errors.linkExpiration?.redirectionLink,
									'ion-valid':
										touched.linkExpiration?.redirectionLink &&
										!errors.linkExpiration?.redirectionLink,
								})}`,
							}}
						/>
					</div>
				) : (
					<div className='ms-4 mt-4'>
						<ZIonText className='text-base'>
							Activate this option to change destination after expiration
							date/time
						</ZIonText>
					</div>
				)}
			</ZIonCol>
		</>
	);
};

export default LinkExpiration;
