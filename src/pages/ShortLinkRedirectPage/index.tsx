/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { AxiosError } from 'axios';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import dayjs from 'dayjs';
import DayJsTimezonePlugin from 'dayjs/plugin/timezone';
import DayJsUtcPlugin from 'dayjs/plugin/utc';
dayjs.extend(DayJsUtcPlugin);
dayjs.extend(DayJsTimezonePlugin);

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
	ZIonButton,
	ZIonCol,
	ZIonContent,
	ZIonImg,
	ZIonInput,
	ZIonItem,
	ZIonNote,
	ZIonRouterLink,
	ZIonRow,
	ZIonText,
	ZIonTitle,
} from '@/components/ZIonComponents';
import ZIonPage from '@/components/ZIonPage';
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQCreateRequest } from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { ExternalURL } from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import { ENVS } from '@/utils/envKeys';
import {
	extractInnerData,
	formatApiRequestErrorForFormikFormField,
	zGetRandomLink,
	zRedirectToTarget,
	zStringify,
} from '@/utils/helpers';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { LinkTargetType, ShortLinkType } from '@/types/AdminPanel/linksType';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import {
	ABTestingRotatorInterface,
	EZGeoLocationCondition,
	GeoLocationRotatorInterface,
	LinkExpirationInfoInterface,
	messengerPlatformsBlockEnum,
	PasswordInterface,
} from '@/types/AdminPanel/index.type';
import { ProductLogo } from '@/assets/images';
import { Formik } from 'formik';
import classNames from 'classnames';
import { reportCustomError } from '@/utils/customErrorType';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (This page handles the redirection of short links, such as "/s/mrtf". It extracts the unique link identifier, validates it, and redirects the user to the corresponding destination.)
 * @type {*}
 * */

const conditionPriority: Record<EZGeoLocationCondition, number> = {
	[EZGeoLocationCondition.equalTo]: 1,
	[EZGeoLocationCondition.within]: 2,
	[EZGeoLocationCondition.notEqualTo]: 3,
	[EZGeoLocationCondition.notWithin]: 4,
};

const ZShortLinkRedirectPage: React.FC = () => {
	const [compState, setCompState] = useState<{
		shouldFetch: boolean;
		isProcessing: boolean;
		errorCode?: number;
		errorOccurred: boolean;
		sl?: ShortLinkType;
		redirectLink?: string;
		error?: string;
	}>({
		shouldFetch: false,
		isProcessing: true,
		errorOccurred: false,
	});

	const { urlPath } = useParams<{ urlPath: string }>();

	const { mutateAsync: createSLRecodeAsyncMutate, error: SLRecodeError } =
		useZRQCreateRequest({
			_url: API_URL_ENUM.shortLink_get_target_url_info,
			_urlDynamicParts: [CONSTANTS.RouteParams.urlPath],
			_itemsIds: [urlPath],
			_showAlertOnError: false,
			_authenticated: false,
			_showLoader: false,
		});

	const { mutateAsync: checkLinkPasswordValidation } = useZRQCreateRequest({
		_url: API_URL_ENUM.shortLink_check_target_password,
		_urlDynamicParts: [CONSTANTS.RouteParams.urlPath],
		_itemsIds: [urlPath],
		_showAlertOnError: false,
		_authenticated: false,
		_showLoader: false,
	});

	const logDeviceInfo = useCallback(async () => {
		const _deviceInfo = await Device.getInfo();

		return _deviceInfo;
	}, []);

	// const logBatteryInfo = useCallback(async () => {
	// 	const _batteryInfo = await Device.getBatteryInfo();

	// 	return _batteryInfo;
	// }, []);

	async function getCountryFromCoordinates({
		latitude,
		longitude,
	}: {
		latitude?: number;
		longitude?: number;
	}) {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${ENVS?.googleMapApiKey}`
		);
		const data = await response.json();

		const countryComponent = (
			data.results[0].address_components as {
				long_name: string;
				short_name: string;
				types: string[];
			}[]
		).find((component) => component.types.includes('country'));

		return countryComponent ? countryComponent?.long_name : null;
	}

	//
	const createURlRecodeCallback = useCallback(async () => {
		const __deviceInfo = await logDeviceInfo();

		const __data = zStringify({
			type: 'click',
			userIP: '',
			userLocationCoords: zStringify({}),
			userDeviceInfo: zStringify(__deviceInfo),
		});

		const _response = await createSLRecodeAsyncMutate(__data);

		if ((_response as ZLinkMutateApiType<ShortLinkType>).success) {
			const _data = extractInnerData<ShortLinkType>(
				_response,
				extractInnerDataOptionsEnum.createRequestResponseItem
			);

			if (_data && _data.id) {
				setCompState((oldValues) => ({
					...oldValues,
					sl: _data,
					isProcessing: false,
				}));

				const __target = _data?.target as LinkTargetType;
				const __type = _data?.type as messengerPlatformsBlockEnum;
				const __geoLocations =
					_data?.geoLocationRotatorLinks as GeoLocationRotatorInterface[];
				const __abTestingRotator =
					_data?.abTestingRotatorLinks as ABTestingRotatorInterface[];
				const __linkExpiration =
					_data?.linkExpirationInfo as LinkExpirationInfoInterface;
				const __userPosition = await Geolocation.getCurrentPosition();
				const __userCountry = await getCountryFromCoordinates({
					latitude: __userPosition?.coords?.latitude,
					longitude: __userPosition?.coords?.longitude,
				});

				// generating redirect link according to __target and type. (the default redirection)
				let __redirectUrl = zRedirectToTarget({
					_target: __target,
					type: __type,
				});

				const __randomRotatorLink = zGetRandomLink(__abTestingRotator);

				if (__randomRotatorLink && __abTestingRotator?.length > 0) {
					__redirectUrl = __randomRotatorLink;
				}

				let highestPriority = Infinity; // Start with a high value

				// Checking if any geo-location define. if define then redirect according to it.
				// Now check if the user's country exists in the geoRedirects array.
				for (const geoLocation of __geoLocations) {
					if (
						(geoLocation.country &&
							geoLocation.condition === EZGeoLocationCondition.equalTo &&
							geoLocation.country === __userCountry) ||
						(geoLocation.condition === EZGeoLocationCondition.notEqualTo &&
							geoLocation.country !== __userCountry) ||
						(geoLocation.condition === EZGeoLocationCondition.within &&
							Array.isArray(geoLocation.country) &&
							geoLocation.country.includes(__userCountry!)) ||
						(geoLocation.condition === EZGeoLocationCondition.notWithin &&
							Array.isArray(geoLocation.country) &&
							!geoLocation.country.includes(__userCountry!))
					) {
						const currentPriority = conditionPriority[geoLocation.condition!];
						if (currentPriority < highestPriority) {
							highestPriority = currentPriority;
							__redirectUrl = geoLocation.redirectionLink;
						}
					}
				}

				// console.log({ __geoLocations, __redirectUrl });

				// If there is link-expiration define. then redirect according to it.
				if (
					__linkExpiration?.enabled &&
					__linkExpiration?.redirectionLink &&
					__linkExpiration?.redirectionLink?.trim()?.length > 0
				) {
					const __expirationTimePass = dayjs
						.tz(dayjs(), __linkExpiration?.timezone)
						.isAfter(
							dayjs.tz(
								__linkExpiration?.expirationDate,
								__linkExpiration?.timezone
							)
						);

					if (__expirationTimePass) {
						__redirectUrl = __linkExpiration?.redirectionLink;
					}
				}

				// redirecting...
				if (__redirectUrl) {
					setCompState((oldValues) => ({
						...oldValues,
						redirectLink: __redirectUrl,
					}));

					if (!(_data?.password as PasswordInterface)?.enabled) {
						window.location.replace(__redirectUrl);
					}
				}
			}
		}
	}, []);

	/**
	 * If error return from target_url_info api the storing error info in useState for showing appropriate view.
	 */
	useEffect(() => {
		if (SLRecodeError instanceof AxiosError) {
			if (SLRecodeError?.response?.data?.status) {
				setCompState((oldValues) => ({
					...oldValues,
					errorCode: SLRecodeError?.response?.data?.status,
					errorOccurred: true,
					isProcessing: false,
				}));
			}
		}
	}, [SLRecodeError]);

	/**
	 * Checking if :urlPath matches the requirement.
	 */
	useEffect(() => {
		if (urlPath && urlPath?.trim()?.length === 6) {
			void createURlRecodeCallback();
			setCompState((oldState) => ({
				...oldState,
				shouldFetch: true,
			}));
		} else {
			setCompState((oldState) => ({
				...oldState,
				errorOccurred: true,
				isProcessing: false,
			}));
		}
	}, [urlPath]);

	// const printCurrentPosition = useCallback(async () => {
	// 	const coordinates = await Geolocation.getCurrentPosition();

	// 	console.log('Current position:', coordinates);
	// }, []);
	// printCurrentPosition();

	/**
	 * Showing appropriate view.
	 */
	if ((compState?.sl?.password as PasswordInterface)?.enabled) {
		return (
			<ZIonPage>
				<ZIonContent color='light' className='h-full'>
					<ZIonRow className='flex h-full ion-align-items-center ion-justify-content-center'>
						<ZIonCol
							size='5'
							className='flex rounded-xl ion-align-items-center ion-justify-content-center zaions__bg_white shadow-xl flex-col px-[3rem] py-[5rem] ion-text-center gap-3'
						>
							<ZIonImg
								src={ProductLogo}
								className='min-w-[7rem] max-w-[10rem] mb-5'
							/>

							<ZIonText className='text-2xl font-bold'>
								This link is protected
							</ZIonText>

							<ZIonText>
								This link is protected by a password. To access this link,
								please provide the password.
							</ZIonText>

							<Formik
								initialValues={{
									password: '',
								}}
								validate={() => {
									const errors = {};

									return errors;
								}}
								onSubmit={async (values, { setErrors, setFieldError }) => {
									try {
										const _zStringifyData = zStringify({
											password: values?.password,
										});

										const __response:
											| unknown
											| ZLinkMutateApiType<{ success: boolean }> =
											await checkLinkPasswordValidation(_zStringifyData);

										// if we have a successful response then...
										if (
											(__response as ZLinkMutateApiType<{ success: boolean }>)
												.success
										) {
											// extract Data from _response.
											const _data = extractInnerData<{ success: boolean }>(
												__response,
												extractInnerDataOptionsEnum.createRequestResponseItem
											);

											// if we have data then update cache and show success message.
											if (_data && _data.success) {
												window.location.replace(compState?.redirectLink!);
											}
										}
									} catch (error) {
										if (error instanceof AxiosError) {
											// await presentZIonErrorAlert();
											// Setting errors on form fields
											const __apiErrors = (
												error.response?.data as { errors: ZGenericObject }
											)?.errors;
											const __errors = formatApiRequestErrorForFormikFormField(
												['password'],
												['password'],
												__apiErrors
											);

											setCompState((oldValues) => ({
												...oldValues,
												error: (__errors as { password: string }).password,
											}));
										}
										reportCustomError(error);
									}
								}}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									submitForm,
								}) => {
									return (
										<>
											<ZIonItem
												className='ion-item-start-no-padding overflow-hidden rounded w-[90%] mt-5'
												style={{ '--inner-padding-end': '0px' }}
												lines='none'
												minHeight='3rem'
											>
												<ZIonInput
													aria-label='Password'
													type='text'
													name='password'
													fill='outline'
													minHeight='3rem'
													clearInput={true}
													placeholder='Password'
													counter={false}
													onIonChange={handleChange}
													onIonBlur={handleBlur}
													// errorText={errors?.password}
													value={values.password}
													className={classNames({
														'rounded zaions__bg_white': true,
														// 'ion-touched': touched.password,
														// 'ion-valid': errors?.password?.trim()?.length === 0,
														// 'ion-invalid':
														// 	errors?.password &&
														// 	errors?.password?.trim()?.length > 0,
													})}
													onKeyUp={(event) => {
														if (event?.key === 'Enter') {
															void submitForm();
														}
													}}
													testingSelector={
														CONSTANTS.testingSelectors.shortLink.listPage
															.searchInput
													}
													style={{
														'--padding-start': '10px',
														'--border-radius': '0',
													}}
												/>
												<ZIonButton
													slot='end'
													className='ion-no-margin ion-text-capitalize'
													onClick={() => void submitForm()}
													testingSelector={
														CONSTANTS.testingSelectors.shortLink.listPage
															.searchBtn
													}
													style={{
														height: '100%',
														'--border-radius': '0',
													}}
												>
													<ZIonText className='block px-3 text-sm'>
														Enter
													</ZIonText>
												</ZIonButton>
											</ZIonItem>

											<ZIonNote color='danger'>{compState.error}</ZIonNote>
										</>
									);
								}}
							</Formik>
						</ZIonCol>
					</ZIonRow>
				</ZIonContent>
			</ZIonPage>
		);
	}
	if (compState.isProcessing) {
		return <ZFallbackIonSpinner />;
	} else if (
		urlPath &&
		urlPath?.trim()?.length === 6 &&
		!compState.errorOccurred &&
		!compState.isProcessing
	) {
		return <ZFallbackIonSpinner />;
	} else {
		return (
			<ZIonPage>
				<ZIonContent>
					<ZIonRow className='flex h-full ion-align-items-center ion-justify-content-center ion-text-center'>
						<ZIonCol
							size='6'
							className='flex flex-col ion-align-items-center ion-justify-content-center ion-text-center h-max'
						>
							<ZIonTitle className='text-4xl font-bold ion-no-padding'>
								Something's wrong here.
							</ZIonTitle>

							<ZIonText className='block mt-3 text-lg tracking-wide'>
								Oops! It seems like you've encountered a 404 error. This
								indicates that the link you clicked on is either incorrect or
								the URL you entered is invalid. You might find what you're
								searching for at
								<ZIonRouterLink className='cursor-pointer ms-1 hover:underline'>
									{ExternalURL.GenericExternalURL}
								</ZIonRouterLink>
								. Please note that our links are case sensitive. Feel free to
								visit
								<ZIonRouterLink className='mx-1 cursor-pointer hover:underline'>
									{ExternalURL.GenericExternalURL}
								</ZIonRouterLink>
								for more information.
							</ZIonText>
						</ZIonCol>
					</ZIonRow>
				</ZIonContent>
			</ZIonPage>
		);
	}
};

export default ZShortLinkRedirectPage;
