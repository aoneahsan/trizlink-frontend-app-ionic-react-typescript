// Core Imports
import React from 'react';

// Packages Import
import { globeOutline, trashBin } from 'ionicons/icons';
import classNames from 'classnames';
import { FieldArray, useFormikContext } from 'formik';

// Custom Imports
import {
	ZIonCol,
	ZIonRow,
	ZIonText,
	ZIonIcon,
	ZIonRouterLink,
	ZIonInput,
	ZIonNote,
	ZIonButton,
	ZIonGrid,
	ZIonSelect,
	ZIonSelectOption,
} from '@/components/ZIonComponents';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';

// Global Constants
import {
	formatReactSelectOption,
	getRandomKey,
	zAddUrlProtocol,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';

// Images

// Recoil States
import { ZCountryData } from '@/data/DiscoverEnterprise/index.data';

// Types
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { ZaionsShortUrlOptionFieldsValuesInterface } from '@/types/AdminPanel/linksType';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import CONSTANTS from '@/utils/constants';

// Styles

type GeoLocationErrorsType = {
	redirectionLink: string | boolean | undefined;
	country?: string;
};

const GeoLocation: React.FC = () => {
	const {
		values,
		errors,
		touched,
		setFieldValue,
		handleChange,
		handleBlur,
		setFieldTouched,
	} = useFormikContext<ZaionsShortUrlOptionFieldsValuesInterface>();

	const { isMdScale, isSmScale } = useZMediaQueryScale();

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
					<ZIonIcon icon={globeOutline} size='large' />
					<ZIonText className='font-bold ion-no-margin ps-2'>
						Geolocation
						<ZIonRouterLink
							className='ms-1'
							routerLink={ZaionsRoutes.HomeRoute}
						>
							(help)
						</ZIonRouterLink>
					</ZIonText>
				</div>
				<div className='block px-2 pt-2'>
					<FieldArray name='geoLocation'>
						{({ remove, push }) => (
							<ZIonGrid
								testingSelector={
									CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
										.container
								}
							>
								{values.geoLocation.length
									? values.geoLocation.map((_geoLocationEl, _index) => (
											<ZIonRow
												key={_index}
												className={classNames({
													'ion-align-items-top': true,
													'mt-2': _index !== 0,
													'mt-3 gap-2 ': isSmScale,
													'py-2 gap-1 mt-2 border-b':
														(!isMdScale && isSmScale) || !isSmScale,
												})}
											>
												<ZIonCol
													sizeXl='12'
													sizeLg='12'
													sizeMd='12'
													sizeSm='12'
													sizeXs='12'
												>
													<ZIonInput
														type='url'
														minHeight='40px'
														labelPlacement='stacked'
														label='Redirection Links*'
														onIonChange={handleChange}
														value={values.geoLocation[_index]?.redirectionLink}
														name={`geoLocation.${_index}.redirectionLink`}
														testingSelector={
															CONSTANTS.testingSelectors.shortLink.formPage
																.geoLocation.redirectionLinkInput
														}
														testingListSelector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.redirectionLinkInput}-${_geoLocationEl.id}`}
														onIonBlur={(e) => {
															handleBlur(e);
															const inputUrl =
																values?.geoLocation[_index]?.redirectionLink;
															const formattedUrl = zAddUrlProtocol(
																inputUrl || ''
															);
															setFieldValue(
																`geoLocation.${_index}.redirectionLink`,
																formattedUrl
															);
														}}
														errorText={
															errors.geoLocation?.length
																? ((
																		errors.geoLocation[
																			_index
																		] as GeoLocationErrorsType
																  )?.redirectionLink as string)
																: undefined
														}
														className={classNames({
															// 'pt-1 mt-1': true,
															'ion-touched':
																touched?.geoLocation &&
																touched?.geoLocation[_index]?.redirectionLink,
															'ion-invalid':
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.redirectionLink &&
																(
																	errors.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																).redirectionLink,
															'ion-valid':
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.country &&
																!(
																	errors.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																).country,
														})}
													/>
												</ZIonCol>

												<ZIonCol
													sizeXl='5.6'
													sizeLg='5.6'
													sizeMd='5.6'
													sizeSm='12'
													sizeXs='12'
												>
													<ZIonSelect
														minHeight='2.5rem'
														interface='popover'
														fill='outline'
														label='Condition'
														labelPlacement='stacked'
														name={`geoLocation.${_index}.country`}
														value={
															values?.geoLocation[_index]?.country as string
														}
														testingListSelector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.countrySelector}-${_geoLocationEl.id}`}
														testingSelector={
															CONSTANTS.testingSelectors.shortLink.formPage
																.geoLocation.countrySelector
														}
													>
														<ZIonSelectOption>d</ZIonSelectOption>
													</ZIonSelect>
												</ZIonCol>
												<ZIonCol
													sizeXl='5.6'
													sizeLg='5.6'
													sizeMd='5.6'
													sizeSm='11'
													sizeXs='11'
												>
													{/* <ZIonSelect
														minHeight='2.5rem'
														interface='popover'
														fill='outline'
														label='country*'
														labelPlacement='stacked'
														name={`geoLocation.${_index}.country`}
														value={
															values?.geoLocation[_index]?.country as string
														}
														testingListSelector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.countrySelector}-${_geoLocationEl.id}`}
														testingSelector={
															CONSTANTS.testingSelectors.shortLink.formPage
																.geoLocation.countrySelector
														}
														errorText={
															errors.geoLocation?.length
																? ((
																		errors.geoLocation[
																			_index
																		] as GeoLocationErrorsType
																  )?.redirectionLink as string)
																: undefined
														}
														onIonChange={({ target }) => {
															setFieldValue(
																`geoLocation.${_index}.country`,
																target?.value,
																true
															);
														}}
														onIonBlur={() => {
															setFieldTouched(
																`geoLocation.${_index}.country`,
																true,
																true
															);
														}}
														className={classNames({
															'pb-0 mb-0 geo-location-country-field': false,
															'ion-touched':
																touched?.geoLocation &&
																touched?.geoLocation[_index]?.country,
															'ion-invalid':
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.country &&
																(
																	errors.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																).country,
															'ion-valid':
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.country &&
																!(
																	errors.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																).country,
														})}
													>
														{ZCountryData.map((el, index) => {
															return (
																<ZIonSelectOption value={el.value} key={index}>
																	{el.label}
																</ZIonSelectOption>
															);
														})}
													</ZIonSelect> */}
													<ZaionsRSelect
														placeholder='country*'
														name={`geoLocation.${_index}.country`}
														options={ZCountryData}
														testingSelector={
															CONSTANTS.testingSelectors.shortLink.formPage
																.geoLocation.countrySelector
														}
														testingListSelector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.countrySelector}-${_geoLocationEl.id}`}
														onChange={(_value) => {
															setFieldValue(
																`geoLocation.${_index}.country`,
																(_value as ZaionsRSelectOptions).value,
																true
															);
														}}
														className={classNames({
															'pb-0 mb-0 geo-location-country-field': true,
															invalid:
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.country &&
																(
																	errors?.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																)?.country,

															valid:
																touched?.geoLocation &&
																errors?.geoLocation &&
																touched?.geoLocation[_index]?.country &&
																!(
																	errors?.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																)?.country,
														})}
														onBlur={() => {
															setFieldTouched(
																`geoLocation.${_index}.country`,
																true,
																true
															);
														}}
														value={
															formatReactSelectOption(
																values?.geoLocation[_index]?.country as string,
																ZCountryData as ZGenericObject[],
																'label',
																'value'
															) || []
														}
													/>
													{errors?.geoLocation &&
													touched?.geoLocation &&
													(errors.geoLocation[_index] as GeoLocationErrorsType)
														?.country &&
													touched?.geoLocation[_index]?.country ? (
														<ZIonNote
															className='ion-padding-start text-xs'
															color='danger'
															testingSelector={
																CONSTANTS.testingSelectors.shortLink.formPage
																	.geoLocation.countrySelectorError
															}
															testingListSelector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.countrySelectorError}-${_geoLocationEl.id}`}
														>
															{errors.geoLocation?.length &&
																(
																	errors.geoLocation[
																		_index
																	] as GeoLocationErrorsType
																)?.country}
														</ZIonNote>
													) : (
														''
													)}
												</ZIonCol>

												{/* delete */}
												<ZIonCol className='mt-5'>
													<ZIonIcon
														icon={trashBin}
														onClick={() => remove(_index)}
														color='danger'
														className='w-[21px] h-[21px] zaions__nav_item'
														testingSelector={
															CONSTANTS.testingSelectors.shortLink.formPage
																.geoLocation.deleteSingleGeoLocationBtn
														}
														testingListSelector={`${CONSTANTS.testingSelectors.shortLink.formPage.geoLocation.deleteSingleGeoLocationBtn}-${_geoLocationEl.id}`}
													/>
												</ZIonCol>
											</ZIonRow>
									  ))
									: ''}

								{!values.rotatorABTesting.length ? (
									<ZIonButton
										fill='clear'
										className='mt-3 ion-text-capitalize ion-no-padding'
										size='small'
										testingSelector={
											CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
												.addSingleGeoLocationBtn
										}
										onClick={() =>
											push({
												id: getRandomKey(),
												redirectionLink: 'https://',
												country: '',
											})
										}
									>
										Add a redirection
									</ZIonButton>
								) : (
									<ZIonButton
										disabled
										color={'dark'}
										className='mt-3 ion-text-capitalize ion-no-padding'
										fill='clear'
										testingSelector={
											CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
												.deleteSingleGeoLocationBtn
										}
									>
										You can't add a redirection if AB testing is activated
									</ZIonButton>
								)}
							</ZIonGrid>
						)}
					</FieldArray>
				</div>
			</ZIonCol>
		</>
	);
};

export default GeoLocation;
