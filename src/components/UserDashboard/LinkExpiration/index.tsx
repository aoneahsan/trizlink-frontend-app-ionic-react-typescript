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
import { formatReactSelectOption, zAddUrlProtocol } from '@/utils/helpers';

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
				sizeXl='5.9'
				sizeLg='5.9'
				sizeMd='5.9'
				sizeSm='12'
				sizeXs='12'
				className='py-3 border zaions__bg_white'
			>
				<div className='flex pb-2 ion-align-items-center border-bottom ion-padding-start'>
					<ZIonIcon icon={alarmOutline} size='large' />
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Link Expiration
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>

					<RCSwitch
						onChange={(value) => {
							setFieldValue('linkExpiration.enabled', value, true);
						}}
						checked={values.linkExpiration.enabled}
						checkedChildren='on'
						unCheckedChildren='off'
						className='ms-auto me-2'
					/>
				</div>
				{values.linkExpiration.enabled ? (
					<div className='block px-2 mt-4 '>
						<ZIonRow className='ion-justify-content-between'>
							{/* expirationDate */}
							<ZIonCol size='5.9'>
								<ZIonInput
									label='End at:'
									labelPlacement='stacked'
									name='linkExpiration.expirationDate'
									type='datetime-local'
									minHeight='40px'
									onIonChange={handleChange}
									onIonBlur={handleBlur}
									value={values.linkExpiration.expirationDate}
								/>
							</ZIonCol>

							{/* timezone */}
							<ZIonCol size='5.9'>
								<ZaionsRSelect
									className=''
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

						{/* redirectionLink */}
						<ZIonInput
							type='url'
							minHeight='40px'
							label='Redirection Links*'
							labelPlacement='stacked'
							name='linkExpiration.redirectionLink'
							value={values.linkExpiration.redirectionLink}
							errorText={
								touched.linkExpiration?.redirectionLink
									? errors.linkExpiration?.redirectionLink
									: undefined
							}
							onIonBlur={() => {
								setFieldTouched('linkExpiration.redirectionLink', true, true);
								const inputUrl = values?.linkExpiration?.redirectionLink;
								const formattedUrl = zAddUrlProtocol(inputUrl || '');
								setFieldValue('linkExpiration.redirectionLink', formattedUrl);
							}}
							onIonChange={(event) => {
								setFieldValue(
									'linkExpiration.redirectionLink',
									event.target.value,
									true
								);
							}}
							className={classNames({
								'mt-5 mx-auto': true,
								'ion-touched': touched.linkExpiration?.redirectionLink,
								'ion-invalid':
									touched.linkExpiration?.redirectionLink &&
									errors.linkExpiration?.redirectionLink,
								'ion-valid':
									touched.linkExpiration?.redirectionLink &&
									!errors.linkExpiration?.redirectionLink,
							})}
						/>
					</div>
				) : (
					<div className='mt-2 ion-padding-start'>
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
