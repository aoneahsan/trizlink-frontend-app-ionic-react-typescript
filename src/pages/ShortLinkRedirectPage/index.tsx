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
	ZIonCol,
	ZIonContent,
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
	EZGeoLocationCondition,
	GeoLocationRotatorInterface,
	LinkExpirationInfoInterface,
	messengerPlatformsBlockEnum,
} from '@/types/AdminPanel/index.type';

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
				// if (__redirectUrl) {
				// 	window.location.replace(__redirectUrl);
				// }
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
	if (compState.isProcessing) {
		return <ZFallbackIonSpinner />;
	} else if (
		urlPath &&
		urlPath?.trim()?.length === 6 &&
		!compState.errorOccurred &&
		!compState.isProcessing
	) {
		return (
			<ZIonPage>
				<ZIonContent>{compState?.sl?.shortUrlPath}</ZIonContent>
			</ZIonPage>
		);
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
