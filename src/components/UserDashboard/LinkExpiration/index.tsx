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
	ZIonItem,
	ZIonInput,
	ZIonNote,
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
				<div className='d-flex align-items-center border-bottom ion-padding-start pb-2'>
					<ZIonIcon icon={alarmOutline} size={'large'}></ZIonIcon>
					<ZIonText>
						<h6 className='fw-bold ion-no-margin ion-padding-start'>
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
					<div className='mt-4 d-block px-2 mb-4'>
						<ZIonRow>
							<ZIonCol>
								<ZIonItem>
									<ZIonInput
										label='End at:'
										labelPlacement='stacked'
										type='datetime-local'
										name='linkExpiration.expirationDate'
										onIonChange={handleChange}
										value={values.linkExpiration.expirationDate}
										onIonBlur={handleBlur}
									></ZIonInput>
								</ZIonItem>
							</ZIonCol>
							<ZIonCol>
								{/* <ZIonItem>
									<ZIonSelect
										placeholder='Timezone'
										className='zaions__max_content'
										name='linkExpiration.timezone'
										onIonChange={handleChange}
										onIonBlur={() =>
											setFieldTouched('linkExpiration.timezone', true, true)
										}
										defaultValue={values.linkExpiration.timezone}
									>
										{TIMEZONES.map((el, i) => (
											<ZIonSelectOption
												className='zaions__max_content'
												value={el}
												key={getRandomKey()}
											>
												{el}
											</ZIonSelectOption>
										))}
									</ZIonSelect>
								</ZIonItem> */}
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
						<ZIonItem
							className={`${classNames({
								'mt-2': true,
								'ion-touched': touched.linkExpiration?.redirectionLink,
								'ion-invalid':
									touched.linkExpiration?.redirectionLink &&
									errors.linkExpiration?.redirectionLink,
								'ion-valid':
									touched.linkExpiration?.redirectionLink &&
									!errors.linkExpiration?.redirectionLink,
							})}`}
						>
							<ZIonInput
								type='url'
								label='Redirection Links*'
								labelPlacement='floating'
								name='linkExpiration.redirectionLink'
								onIonChange={(event) => {
									setFieldValue(
										'linkExpiration.redirectionLink',
										event.target.value,
										true
									);
								}}
								onIonBlur={() => {
									setFieldTouched('linkExpiration.redirectionLink', true, true);
								}}
								value={values.linkExpiration.redirectionLink}
							/>
							<ZIonNote slot='error'>
								{errors.linkExpiration?.redirectionLink}
							</ZIonNote>
						</ZIonItem>
					</div>
				) : (
					<div className='ms-4 mt-4'>
						<ZIonText className='fs-6'>
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
