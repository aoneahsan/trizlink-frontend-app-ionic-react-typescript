import { workspaceFormConnectPagesEnum } from './../../types/AdminPanel/workspace/index';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
// Packages Import
import { ConfirmResult, Dialog, PromptResult } from '@capacitor/dialog';
import { Preferences } from '@capacitor/preferences';
import { PixelPlatformsEnum } from '@/types/AdminPanel/linksType';
import isEmail from 'validator/lib/isEmail';
import CONSTANTS, {
	API_URLS,
	LOCALSTORAGE_KEYS,
	NOTIFICATIONS,
	ZLinkApiRootUrl,
} from '@/utils/constants';
import {
	API_URL_ENUM,
	CONTAINS,
	createElementTestingSelectorKeyEnum,
	extractInnerDataOptionsEnum,
	VALIDATION_RULE,
} from '@/utils/enums';
import { ENVS } from '@/utils/envKeys';
import MESSAGES from '@/utils/messages';
import { AES, enc } from 'crypto-js';
import { UserAccountType } from '@/types/UserAccount/index.type';
import axiosInstance from '@/axiosInstance';
import {
	ZCapDialogPropsType,
	ZConsolePropsType,
} from '@/types/ZaionsHelperFunction.type';
import {
	AxiosRequestResponseType,
	ZLinkGetApiType,
	ZLinkMutateApiType,
} from '@/types/ZaionsApis.type';
import {
	reportCustomError,
	throwZCustomErrorRequestFailed,
	throwZCustomErrorUnAuthenticated,
	ZCustomError,
} from '@/utils/customErrorType';
import { AxiosRequestConfig } from 'axios';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

import VALIDATOR from 'validator';
import {
	LinkInBioThemeBackgroundEnum,
	LinkInBioThemeBackgroundType,
} from '@/types/AdminPanel/linkInBioType';
import zQueryString from 'qs';
import dayjs from 'dayjs';
import DayJsDurationPlugin from 'dayjs/plugin/duration';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';
import { LinkInBioPageAnalyticsDataInterface } from '@/types/InPageComponentTypes/ZaionsTables.type';
import {
	logoFacebook,
	logoInstagram,
	logoLinkedin,
	logoPinterest,
	logoTiktok,
	logoTwitter,
	logoGoogle,
	logoYoutube,
	gridOutline,
} from 'ionicons/icons';

dayjs.extend(DayJsDurationPlugin);

export const isValidUrl = (url: string): boolean => {
	const re = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+#]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+#=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return re.test(url);
};

export const STORAGE = {
	GET: async <T>(_key: string): Promise<T | undefined> => {
		const __val = (await Preferences.get({ key: _key })).value;
		if (__val) {
			return decryptData(__val);
		} else {
			return undefined;
		}
	},
	SET: async (key: string, value: unknown): Promise<void> => {
		const valStr = encryptData(value);
		return await Preferences.set({ key, value: valStr });
	},
	REMOVE: async (key: string): Promise<void> => {
		return await Preferences.remove({ key });
	},
	CLEAR: async (key: string): Promise<void> => {
		return await Preferences.clear();
	},
};

export const W_LOCATION = {
	GET_HREF: (): string => window.location.href,
	SET_HREF: (val: string): void => {
		window.location.href = val;
	},
	GET_PATHNAME: (): string => window.location.pathname,
	RELOAD: (): void => {
		window.location.reload();
	},
	GET_SEARCH: (): string => window.location.search,
	GET_ORIGIN: (): string => window.location.origin,
	GET_HOST: (): string => window.location.host,
};

// Zaions Capacitor Dialog Alerts Helper Functions

export const showZCapDialog = async ({
	title = MESSAGES.GENERAL.SUCCESS,
	message = MESSAGES.GENERAL.SUCCESS_MESSAGE,
	type = 'alert',
	buttonTitle = NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
	okButtonTitle = NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
	cancelButtonTitle = NOTIFICATIONS.ZIonAlerts.CANCEL_BUTTON.TEXT,
	inputText = '',
	inputPlaceholder = 'Enter your input here...',
}: ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
	switch (type) {
		case 'alert':
			return await Dialog.alert({
				title,
				message,
				buttonTitle,
			});
		case 'confirm':
			return await Dialog.confirm({
				title,
				message,
				okButtonTitle,
				cancelButtonTitle,
			});
		case 'prompt':
			return await Dialog.prompt({
				title,
				message,
				okButtonTitle,
				cancelButtonTitle,
				inputText,
				inputPlaceholder,
			});
		default:
			break;
	}
};

export const showZCapDialogAlert = async ({
	title,
	message,
	buttonTitle,
}: ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
	return await showZCapDialog({ title, message, buttonTitle, type: 'alert' });
};

export const showZCapSuccessDialogAlert = async (): Promise<
	void | ConfirmResult | PromptResult
> => {
	return await showZCapDialogAlert({
		title: MESSAGES.GENERAL.SUCCESS,
		message: MESSAGES.GENERAL.SUCCESS_MESSAGE,
		buttonTitle: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
	});
};

export const showZCapErrorDialogAlert = async (): Promise<
	void | ConfirmResult | PromptResult
> => {
	return await showZCapDialogAlert({
		title: MESSAGES.GENERAL.FAILED,
		message: MESSAGES.GENERAL.FAILED_MESSAGE,
		buttonTitle: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
	});
};

export const showZCapDialogPrompt = async ({
	title,
	message,
	okButtonTitle,
	cancelButtonTitle,
	inputText,
	inputPlaceholder,
}: ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
	return await showZCapDialog({
		title,
		message,
		okButtonTitle,
		cancelButtonTitle,
		inputText,
		inputPlaceholder,
		type: 'prompt',
	});
};

export const showZCapDialogConfirm = async ({
	title,
	message,
	okButtonTitle,
	cancelButtonTitle,
}: ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
	return await showZCapDialog({
		title,
		message,
		okButtonTitle,
		cancelButtonTitle,
	});
};

export const convertToTitleCase = (s: string | PixelPlatformsEnum): string => {
	return s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
		c ? (c as string).toUpperCase() : ' ' + (d as string).toUpperCase()
	);
};

// if string is returned mean validation failed, and that was the error message to show to user, if null return mean validation passed, no error message
export const validatePixelAccountID = (
	pixelAccountType: PixelPlatformsEnum,
	pixelID: string
): string | undefined => {
	switch (pixelAccountType) {
		case PixelPlatformsEnum.facebook:
			if (pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.FACEBOOK.WORD_COUNT) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.FACEBOOK.WORD_COUNT;
			} else {
				return undefined;
			}

		case (PixelPlatformsEnum.google_analytics,
		PixelPlatformsEnum.google_analytics_4):
			if (
				pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.WORD_COUNT
			) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS
					.WORD_COUNT;
			} else if (
				CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.SHOULD_INCLUDE &&
				!pixelID
					.toLowerCase()
					.includes(CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.SHOULD_INCLUDE)
			) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS
					.SHOULD_INCLUDE;
			} else {
				return undefined;
			}

		case (PixelPlatformsEnum.bing, PixelPlatformsEnum.linkedin):
			if (
				pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.LINKEDINANDBING.WORD_COUNT
			) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.LINKEDINANDBING
					.WORD_COUNT;
			} else {
				return undefined;
			}

		case PixelPlatformsEnum.twitter:
			if (pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.TWITTER.WORD_COUNT) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.TWITTER.WORD_COUNT;
			} else {
				return undefined;
			}

		case PixelPlatformsEnum.google_ads:
			if (pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ADS.WORD_COUNT) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.GOOGLE_ADS.WORD_COUNT;
			} else {
				return undefined;
			}

		case PixelPlatformsEnum.google_tag_manager:
			if (
				CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.SHOULD_INCLUDE &&
				!pixelID
					.toLowerCase()
					.startsWith(
						CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.SHOULD_INCLUDE
					)
			) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER
					.SHOULD_INCLUDE;
			} else if (
				pixelID.length !==
				CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.WORD_COUNT
			) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER
					.WORD_COUNT;
			} else {
				return undefined;
			}

		case PixelPlatformsEnum.quora:
			if (pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.QUORA.WORD_COUNT) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.QUORA.WORD_COUNT;
			} else {
				return undefined;
			}

		case PixelPlatformsEnum.snapchat:
			if (pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.SNAPCHAT.WORD_COUNT) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.SNAPCHAT.WORD_COUNT;
			} else {
				return undefined;
			}

		case PixelPlatformsEnum.pinterest:
			if (pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.SNAPCHAT.WORD_COUNT) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.SNAPCHAT.WORD_COUNT;
			} else {
				return undefined;
			}

		case PixelPlatformsEnum.vk:
			if (
				CONSTANTS.PIXEL_ACCOUNTS.VK.SHOULD_INCLUDE &&
				!pixelID
					.toLowerCase()
					.startsWith(CONSTANTS.PIXEL_ACCOUNTS.VK.SHOULD_INCLUDE)
			) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.VK.SHOULD_INCLUDE;
			} else if (pixelID.length !== CONSTANTS.PIXEL_ACCOUNTS.VK.WORD_COUNT) {
				return MESSAGES.FORM_VALIDATIONS.PIXEL_ACCOUNTS.VK.WORD_COUNT;
			} else {
				return undefined;
			}

		default:
			return undefined;
	}
};

export const getRandomKey = (): string => {
	const head = Date.now().toString(36);
	const tail = Math.random().toString(36).substr(2);
	return (head + tail).toString();
};

export const replaceParams = (
	url: string,
	params: string,
	value: string
): string => {
	return url.replace(params, value);
};

export const replaceRouteParams = (
	url: string,
	params: string[],
	values: string[]
): string => {
	try {
		let _url = url;
		if (values.length !== params.length) {
			Dialog.alert({
				title: 'Invalid Request!',
				message:
					'replaceRouteParams: values and params array length not matching.',
			})
				.then()
				.catch((err) => console.error);
			return '';
		}

		for (let i = 0; i < params.length; i++) {
			const _param = params[i];
			const _value = values[i];
			_url = replaceParams(_url, _param, _value);
		}

		return _url;
	} catch (error) {
		reportError(error);
		return '';
	}
};

/**
 * The purpose of this function is to just use (zQueryString.stringify) in one place if we change or replace zQueryString.stringify we just have to updated this function.
 * @param _object
 * @returns stringify object.
 */
export const stringifyZQueryString = (_object: ZGenericObject) => {
	return zQueryString.stringify(_object);
};

/**
 * The purpose of this function is to just use (ZQueryString.parse) in one place if we change or replace ZQueryString.parse we just have to updated this function.
 * @param _value
 * @returns parse value.
 */
export const parseZQueryString = (_value: string) => {
	const __urlData = new URL(_value);
	const __queryStringData = zQueryString.parse(
		__urlData.search.replace('?', '')
	);
	return {
		__queryStringData,
		__urlData,
	};
};

export const createRedirectRoute = ({
	url,
	routeSearchParams,
	routeHashParams,
	params = [],
	values = [],
}: {
	url: string;
	routeSearchParams?: ZGenericObject;
	routeHashParams?: ZGenericObject;
	params?: string[];
	values?: string[];
}): string => {
	let _route = replaceRouteParams(url, params, values);
	if (routeSearchParams) {
		_route = `${_route}?${stringifyZQueryString(routeSearchParams)}`;
	}
	// The hash parameter must be placed after search parameter in url
	if (routeHashParams) {
		_route = `${_route}#${stringifyZQueryString(routeHashParams)}`;
	}

	return _route;
};

export const formatDataForZaionsRSelectOptions = (
	data: unknown,
	valueKey: string,
	labelKey: string
) => {
	if (Array.isArray(data) && data.length) {
		return data.map((el: { [valueKey: string]: string }) => {
			let _value, _label;

			if (Object.prototype.hasOwnProperty.call(el, valueKey)) {
				_value = el[valueKey];
			}

			if (Object.prototype.hasOwnProperty.call(el, labelKey)) {
				_label = el[labelKey];
			} else {
				_label = _value;
			}

			return {
				value: _value,
				label: _label,
			};
		});
	}

	return [];
};

export const getDemoArray = (arrLength = 5): number[] => {
	return Array(arrLength)
		.fill(null)
		.map((_, i) => i);
};

export const checkIfContains = (
	val: string,
	contains: CONTAINS = CONTAINS.number
): boolean => {
	switch (contains) {
		case CONTAINS.number:
			return /\d/.test(val);
		case CONTAINS.letter:
			return /[a-zA-Z]+/.test(val);
		case CONTAINS.specialSymbol:
			return /[\W_]+/.test(val);
		case CONTAINS.minCharacter:
			return val.length >= 8;

		default:
			return /\d/.test(val);
	}
};

export const validateField = (
	fieldKey: string,
	values: { [key: string]: unknown },
	errorsObj: { [key: string]: unknown },
	validationRule: VALIDATION_RULE = VALIDATION_RULE.string
): void => {
	const _fieldKeyTitleCase = convertToTitleCase(fieldKey);
	const _val = (values[fieldKey] as string)?.trim();
	/**
	 * Checking in the field key is empty then give `fieldKey is required` error message (generally for every field)
	 */
	if (!Object.prototype.hasOwnProperty.call(values, fieldKey) || !_val) {
		errorsObj[fieldKey] = `${_fieldKeyTitleCase} is required`;
	} else if (validationRule === VALIDATION_RULE.email && !isEmail(_val)) {
		errorsObj[fieldKey] = `${_fieldKeyTitleCase} needs to be a valid email.`;
	} else if (validationRule === VALIDATION_RULE.password) {
		if (!checkIfContains(_val, CONTAINS.minCharacter)) {
			errorsObj[
				fieldKey
			] = `${_fieldKeyTitleCase} needs to be at least 8 digits long.`;
		} else if (!checkIfContains(_val, CONTAINS.number)) {
			errorsObj[fieldKey] = `${_fieldKeyTitleCase} must include a digit.`;
		} else if (!checkIfContains(_val, CONTAINS.letter)) {
			errorsObj[fieldKey] = `${_fieldKeyTitleCase} must include a letter.`;
		} else if (!checkIfContains(_val, CONTAINS.specialSymbol)) {
			errorsObj[
				fieldKey
			] = `${_fieldKeyTitleCase} must include a special character.`;
		}
	} else if (validationRule === VALIDATION_RULE.url && !VALIDATOR.isURL(_val)) {
		errorsObj[fieldKey] =
			MESSAGES.FORM_VALIDATIONS.LINK.TARGET.URL_INCORRECT_FORMATE;
	} else if (
		validationRule === VALIDATION_RULE.phoneNumber &&
		!VALIDATOR.isMobilePhone(_val)
	) {
		errorsObj[fieldKey] =
			MESSAGES.FORM_VALIDATIONS.LINK.TARGET.INVALID_PHONE_NUMBER;
	}
};

export const validateFields = (
	fieldKeys: string[],
	values: { [key: string]: unknown },
	errorsObj: { [key: string]: unknown },
	validationRules: VALIDATION_RULE[]
): void => {
	if (fieldKeys.length !== validationRules.length) {
		Dialog.alert({
			title: 'Invalid Request!',
			message: 'Fields and Validation Rules array length not matching.',
		})
			.then()
			.catch((err) => console.error);
		return;
	}
	for (let i = 0; i < fieldKeys.length; i++) {
		const _field = fieldKeys[i];
		const _rule = validationRules[i];
		validateField(_field, values, errorsObj, _rule);
	}
};

export const encryptData = (val: unknown): string => {
	return AES.encrypt(JSON.stringify(val), ENVS.cryptoSecret).toString();
};

export const decryptData = <T>(val: string): T | undefined => {
	try {
		return zJsonParse<T | undefined>(
			AES.decrypt(val, ENVS.cryptoSecret).toString(enc.Utf8)
		);
	} catch (err) {
		return undefined;
	}
};

export const formatApiRequestErrorForFormikFormField = (
	_formFieldKeys: string[],
	_apiErrorObjectKeys: string[],
	_apiErrorsObj: ZGenericObject
): ZGenericObject => {
	if (_formFieldKeys.length !== _apiErrorObjectKeys.length) {
		Dialog.alert({
			title: 'Invalid Request!',
			message:
				'Form Fields keys and API Error Object Keys array length not matching.',
		})
			.then()
			.catch((_) => console.error);
		return {};
	} else {
		// check if there are any errors in _apiErrorsObj
		if (_apiErrorsObj && Object.keys(_apiErrorsObj).length) {
			const __error: ZGenericObject = {};
			for (let i = 0; i < _formFieldKeys.length; i++) {
				const __formFiledKey = _formFieldKeys[i];
				const __apiErrorFieldKey = _apiErrorObjectKeys[i];
				const ___data = _apiErrorsObj[__apiErrorFieldKey] as unknown;

				if (
					Object.prototype.hasOwnProperty.call(
						_apiErrorsObj,
						__apiErrorFieldKey
					) &&
					Array.isArray(___data) &&
					___data[0]
				) {
					__error[__formFiledKey] = ___data[0];
				}
			}

			return __error;
		}

		return {};
	}
};

export const getApiUrl = (
	url: API_URL_ENUM,
	itemIds?: string[],
	urlDynamicParts?: string[],
	includeAPIDefault = true,
	isExternalThirdPartyAPI = false
): string | undefined => {
	try {
		let __url: string;
		if (isExternalThirdPartyAPI) {
			__url = API_URLS[url];
		} else {
			if (includeAPIDefault) {
				__url = `${ZLinkApiRootUrl}${API_URLS[url]}`;
			} else {
				__url = `${ZLinkApiRootUrl.replace('/api/zlink/v1', '')}${
					API_URLS[url]
				}`;
			}
		}

		if (
			itemIds &&
			urlDynamicParts &&
			itemIds.length === urlDynamicParts.length
		) {
			for (let i = 0; i < urlDynamicParts.length; i++) {
				const dynamicPart = urlDynamicParts[i];
				if (__url.includes(dynamicPart)) {
					const itemId = itemIds[i];
					__url = __url.replace(dynamicPart, itemId);
				}
			}
		} else if (itemIds?.length !== urlDynamicParts?.length) {
			throw new Error('length does not match. invalid length');
		}
		return __url;
	} catch (error) {
		reportError(error);
	}
};

/**
 *
 * @param _url this is the type of API_URL_ENUM.
 * @param _data this will be the array of field with we gonna pass when making a axios post request.
 * @returns
 */
interface zAxiosApiRequestInterface {
	_url: API_URL_ENUM;
	_method: 'get' | 'post' | 'put' | 'delete';
	_isAuthenticatedRequest?: boolean;
	_data?: string | FormData;
	_itemIds?: string[];
	_urlDynamicParts?: string[];
	_contentType?: zAxiosApiRequestContentType;
}
export const zAxiosApiRequest = async <T>({
	_url,
	_method,
	_isAuthenticatedRequest = true,
	_data,
	_itemIds,
	_urlDynamicParts,
	_contentType = zAxiosApiRequestContentType.Json,
}: zAxiosApiRequestInterface): Promise<T | undefined> => {
	const _authToken = await getAuthToken();
	if (_authToken || !_isAuthenticatedRequest) {
		const reqInput: AxiosRequestConfig = {
			method: _method,
			data: _data,
			url: getApiUrl(_url, _itemIds, _urlDynamicParts),
			headers: {
				Accept: zAxiosApiRequestContentType.Json,
				'Content-Type': _contentType,
				Authorization: `${CONSTANTS.DEFAULT_VALUES.API_TOKEN_PRIMARY_KEY} ${
					_authToken || ''
				}`,
			},
		};
		const __res = await axiosInstance.request<AxiosRequestResponseType>(
			reqInput
		);
		return __res.data as unknown as T;
	} else if (_isAuthenticatedRequest && !_authToken) {
		throwZCustomErrorUnAuthenticated();
	} else {
		throwZCustomErrorRequestFailed();
	}
};

// as we are returning a simple js object, so typescript will automatically define the return type for this function
export const getUserDataObjectForm = (_user: UserAccountType) => {
	return {
		id: _user?.id?.toString(),
		name: _user?.username,
		email: _user?.email,
		email_verified_at: _user?.email_verified_at,
		password: _user?.password,
		created_at: _user?.createdAt,
		updated_at: _user?.updatedAt,
	};
};

export const emptyVoidReturnFunction = (): void => {
	zConsoleLog({ message: 'emptyVoidReturnFunction' });
};

export const zConsole = ({
	message = MESSAGES.GENERAL.SUCCESS,
	type = 'log',
	data,
	err,
}: ZConsolePropsType): void => {
	switch (type) {
		case 'log':
			console.dir({ message, data, err });
			break;
		case 'info':
			console.info({ message, data, err });
			break;
		case 'warning':
			console.warn({ message, data, err });
			break;
		case 'error':
			console.error({ message, data, err });
			break;
		case 'count':
			console.count(message);
			break;
		default:
			break;
	}
};

export const zConsoleLog = ({
	message = MESSAGES.GENERAL.SUCCESS,
	data = null,
	err = null,
}: ZConsolePropsType): void => {
	return zConsole({ message, type: 'log', data, err });
};

export const zConsoleInfo = ({
	message = MESSAGES.GENERAL.SUCCESS,
	data = null,
	err = null,
}: ZConsolePropsType): void => {
	return zConsole({ message, type: 'info', data, err });
};

export const zConsoleWarning = ({
	message = MESSAGES.GENERAL.SUCCESS,
	data = null,
	err = null,
}: ZConsolePropsType): void => {
	return zConsole({ message, type: 'warning', data, err });
};

export const zConsoleSuccess = ({
	data = null,
	message = MESSAGES.GENERAL.SUCCESS,
}: {
	data: unknown;
	message?: string;
}): void => {
	return zConsoleLog({ message, data });
};

export const zConsoleError = ({
	err = null,
	message = MESSAGES.GENERAL.FAILED,
}: {
	err: unknown;
	message?: string;
}): void => {
	return zConsole({ message, type: 'error', err });
};

export const zConsoleCount = ({
	message = MESSAGES.GENERAL.FAILED,
}: {
	message?: string;
}): void => {
	return zConsole({ message, type: 'count' });
};

export const zStringify = (_data: unknown): string => {
	return JSON.stringify(_data);
};

export const zJsonParse = <T>(_data: string): T | undefined => {
	try {
		return JSON.parse(_data) as T;
	} catch (error) {
		return undefined;
	}
};

export const getAuthToken = async (): Promise<string | undefined> => {
	// getting the auth token from local storage and storing it in authToken constant so we can check that the user is authenticated or not.
	return await STORAGE.GET(LOCALSTORAGE_KEYS.AUTHTOKEN);
};

// : ZaionsRSelectOptions | undefined

export const formatReactSelectOption = (
	_itemId: string,
	_itemsDataArr: ZGenericObject[],
	_idKeyName: string,
	_labelKeyName: string
): ZaionsRSelectOptions | undefined => {
	const __item = _itemsDataArr?.find((_el) => {
		return (
			Object.prototype.hasOwnProperty.call(_el, _idKeyName) &&
			_el[_idKeyName] === _itemId
		);
	});

	if (
		__item &&
		Object.prototype.hasOwnProperty.call(__item, _idKeyName) &&
		Object.prototype.hasOwnProperty.call(__item, _labelKeyName)
	) {
		return {
			value: __item[_idKeyName] as string,
			label: __item[_labelKeyName],
		};
	} else {
		return undefined;
	}
};

export const formatReactSelectOptionsArray = (
	_itemIdArr: string[],
	_itemsDataArr: ZGenericObject[],
	_idKeyName: string,
	_labelKeyName: string
): ZaionsRSelectOptions[] | undefined => {
	const __formattedOptionsArr: ZaionsRSelectOptions[] = [];
	for (let i = 0; i < _itemIdArr.length; i++) {
		const __itemId = _itemIdArr[i];
		const _result = formatReactSelectOption(
			__itemId,
			_itemsDataArr,
			_idKeyName,
			_labelKeyName
		);

		if (_result) {
			__formattedOptionsArr.push(_result);
		}
	}

	return __formattedOptionsArr;
};
export const getPrimaryDomain = (url: string): string => {
	let hostname = url.replace(/^(https?:\/\/)?(www\.)?/i, '');
	hostname = hostname.split('/')[0];
	const parts = hostname.split('.').reverse();
	if (parts.length > 2 && parts[1].length <= 3) {
		return parts[2] + '.' + parts[1] + '.' + parts[0];
	} else {
		return parts[1] + '.' + parts[0];
	}
};

// Function for generating pre-defined styles for theme (Old generatePredefinedThemeBackgroundValue for backup)
// export const generatePredefinedThemeBackgroundValue = (
//   _predefinedTheme: LinkInBioPredefinedThemeType
// ): ZGenericObject => {
//   try {
//     const value: ZGenericObject = {};
//     if (_predefinedTheme && _predefinedTheme?.background) {
//       const _backgroundData =
//         _predefinedTheme?.background as LinkInBioThemeBackgroundType;
//       if (_backgroundData.bgType === LinkInBioThemeBackgroundEnum.gradient) {
//         const __gradientValue =
//           _backgroundData.bgGradientColors &&
//           `linear-gradient(${_backgroundData.bgGradientColors.direction}deg, ${_backgroundData.bgGradientColors.startColor}, ${_backgroundData.bgGradientColors.endColor})`;

//         value['--background'] = __gradientValue as string;
//         value['background'] = __gradientValue as string;
//       } else if (
//         _backgroundData.bgType === LinkInBioThemeBackgroundEnum.solidColor
//       ) {
//         const __solidColorValue = _backgroundData.bgSolidColor as string;
//         value['--background'] = __solidColorValue;
//         value['background'] = __solidColorValue;
//       } else if (
//         _backgroundData.bgType === LinkInBioThemeBackgroundEnum.image
//       ) {
//         value['--background'] = `url(${_backgroundData.bgImageUrl as string})`;
//         value['background'] = `url(${_backgroundData.bgImageUrl as string})`;
//         value['backgroundImage'] = `url(${
//           _backgroundData.bgImageUrl as string
//         })`;
//       }
//       // value.backgroundSize = CSS_BACKGROUND_OPTION.cover;

//       return value;
//     }
//   } catch (error) {
//     reportCustomError(error);
//   }
//   return {};
// };

// Function for generating pre-defined styles for theme
export const generatePredefinedThemeBackgroundValue = (
	_backgroundData: LinkInBioThemeBackgroundType
): ZGenericObject => {
	try {
		const value: ZGenericObject = {};
		if (_backgroundData) {
			if (_backgroundData.bgType === LinkInBioThemeBackgroundEnum.gradient) {
				const __gradientValue =
					_backgroundData.bgGradientColors &&
					`linear-gradient(${_backgroundData.bgGradientColors.direction}deg, ${_backgroundData.bgGradientColors.startColor}, ${_backgroundData.bgGradientColors.endColor})`;

				value['--background'] = __gradientValue as string;
				value['background'] = __gradientValue as string;
			} else if (
				_backgroundData.bgType === LinkInBioThemeBackgroundEnum.solidColor
			) {
				const __solidColorValue = _backgroundData.bgSolidColor as string;
				value['--background'] = __solidColorValue;
				value['background'] = __solidColorValue;
			} else if (
				_backgroundData.bgType === LinkInBioThemeBackgroundEnum.image
			) {
				value['--background'] = `url(${_backgroundData.bgImageUrl as string})`;
				value['background'] = `url(${_backgroundData.bgImageUrl as string})`;
				value['backgroundImage'] = `url(${
					_backgroundData.bgImageUrl as string
				})`;
			}
			// value.backgroundSize = CSS_BACKGROUND_OPTION.cover;

			return value;
		}
	} catch (error) {
		reportCustomError(error);
	}
	return {};
};

/**
 * (extractInnerData)
 * Function for extract the data, the item or items from object or from api request...
 * this function will take two parameters
 * @param _object this will be the object from we went to extract the data out
 * @param _type enum (extractInnerDataOptionsEnum) menus how the data will extract
 * @returns
 */
export const extractInnerData = <T>(
	_object: ZGenericObject | unknown,
	_type: extractInnerDataOptionsEnum
): T | undefined => {
	try {
		// checking _object and _type is passed.
		if (_object && _type) {
			// extract accounting to the type
			switch (_type) {
				case extractInnerDataOptionsEnum.createRequestResponseItem:
					return (_object as unknown as ZLinkMutateApiType<T>).data.item;

				case extractInnerDataOptionsEnum.createRequestResponseItems:
					return (_object as unknown as ZLinkGetApiType<T>).data.items;

				default:
					throw new ZCustomError({
						message: `Unsupported extractInnerData type option: ${String(
							_type
						)}`,
					});
			}

			// if any of the required parameter is not passed show invalid parameter dialog
		} else {
			Dialog.alert({
				title: 'extractInnerData, invalid parameters!',
				message: 'extractInnerData: parameters _object & _type are required',
			})
				.then()
				.catch((_) => console.error);

			throw new ZCustomError({
				message: 'Invalid parameters passed to extractInnerData',
			});
		}
	} catch (error) {
		reportCustomError(error);
	}
};

// ZSanitizeHTML gonna made for the text area (react-quill) for sanitize the html data but react-quill is doing it by it self we tested it and it is working well. if we need to add a package for sanitizing we will add it to this function and use this function in all the place need.
export const ZSanitizeHTML = <T>({ value }: { value: T }) => {
	try {
		if (value) {
			zConsoleLog({ data: { value } });
		}
	} catch (error) {
		reportCustomError(error);
	}
};

// this function will give the remaining time for count down component
export const getRemainingTimeForCountDown = (
	countDownTimeFinishDate: string | undefined
): number => {
	try {
		if (countDownTimeFinishDate) {
			const endDate = dayjs(countDownTimeFinishDate);
			if (endDate.isValid()) {
				const remainingTimeInMilliSeconds = endDate.diff(
					dayjs(new Date()),
					'milliseconds'
				);

				return Date.now() + remainingTimeInMilliSeconds;
			} else return 0;
		} else {
			return 0; // time finished for countdown (as no date passed)
		}
	} catch (error) {
		reportCustomError(error);
		return 0;
	}
};
export const convertTimeToSpecificUnit = ({
	days = 0,
	hours = 0,
	milliseconds = 0,
	minutes = 0,
	months = 0,
	seconds = 0,
	weeks = 0,
	years = 0,
	formatAs = 'minute',
}) => {
	const result = dayjs.duration({
		days,
		hours,
		milliseconds,
		minutes,
		months,
		seconds,
		weeks,
		years,
	});

	if (formatAs === 'minute') {
		return result.asMinutes();
	}
};

// Function for getting link-in-bio page-analytics data and convert it to `LinkInBioPageAnalyticsDataInterface` interface
// const processAnalyticsData = (
//   _data: ZGenericObject[],
//   columnName: string
// ): LinkInBioPageAnalyticsDataInterface[] | undefined => {
//   try {
//     // Checking if data is passed or not
//     if (_data) {
//       const _result: LinkInBioPageAnalyticsDataInterface[] = [];

//       // Looping the _data
//       for (let i = 0; i < _data.length; i++) {
//         // Getting the value
//         const _item = _data[i];

//         // assign the value key to the `columnName`
//         _item['value'] = _item[columnName];

//         // deleting the `columnName` key
//         delete _item[columnName];

//         // pushing the item in _result array
//         _result.push(_item);
//       }

//       return _result;
//     }
//   } catch (error) {
//     reportCustomError(error);
//   }
// };

const formattedAnalyticsBlocksData = (
	_data: ZGenericObject[],
	columnNames: string[]
): LinkInBioPageAnalyticsDataInterface[] | undefined => {
	try {
		if (columnNames.length >= 1 && columnNames.length <= 4) {
			// Checking if data is passed or not
			if (_data) {
				const _result: LinkInBioPageAnalyticsDataInterface[] = [];
				const _arr = ['value', 'visit', 'unique', 'visitPercentage'];

				// Looping the _data
				for (let i = 0; i < _data.length; i++) {
					// Getting the value
					const _item = _data[i];

					columnNames.forEach((element, _i) => {
						const replaceBy = _arr[_i];

						// assign the value key to the `columnName`
						_item[replaceBy] = _item[element];

						// deleting the `columnName` key
						delete _item[element];
					});

					// pushing the item in _result array
					_result.push(_item);
				}

				return _result;
			}
		} else {
			Dialog.alert({
				title: 'formattedAnalyticsBlocksData, Invalid parameters',
				message:
					'formattedAnalyticsBlocksData: length of columnNames parament mush be in between 1 to 4!',
			})
				.then()
				.catch((_) => console.error);

			throw new ZCustomError({
				message: 'Invalid parameters passed to extractInnerData',
			});
		}
	} catch (error) {
		reportCustomError(error);
	}
};

export const doesUrlIncludes = (_url: string, _searchString: string) => {
	try {
		if (_url && _searchString) {
			return _url.includes(_searchString);
		} else {
			throw new Error(
				'doesUrlIncludes function says: the `_url && _searchString` parameters are required!'
			);
		}
	} catch (error) {
		reportCustomError(error);
	}
};

// this function will give the icon of platform accounting to workspaceFormConnectPagesEnum basically used in workspaceView page and Compose modal etc.
export const getPlatformIcon = (type: workspaceFormConnectPagesEnum) => {
	try {
		if (type) {
			let icon;
			switch (type) {
				case workspaceFormConnectPagesEnum.facebook:
					icon = logoFacebook;
					break;

				case workspaceFormConnectPagesEnum.instagram:
					icon = logoInstagram;
					break;

				case workspaceFormConnectPagesEnum.linkedin:
					icon = logoLinkedin;
					break;

				case workspaceFormConnectPagesEnum.twitter:
					icon = logoTwitter;
					break;

				case workspaceFormConnectPagesEnum.tiktok:
					icon = logoTiktok;
					break;

				case workspaceFormConnectPagesEnum.pinterest:
					icon = logoPinterest;
					break;

				case workspaceFormConnectPagesEnum.googleBusiness:
					icon = logoGoogle;
					break;

				case workspaceFormConnectPagesEnum.youtube:
					icon = logoYoutube;
					break;

				case workspaceFormConnectPagesEnum.universalContent:
					icon = gridOutline;
					break;

				default:
					icon = gridOutline;
					break;
			}
			return icon;
		}
	} catch (error) {
		reportCustomError(error);
	}
};

export const UserLogoutFn = async () => {
	try {
		const __response = await zAxiosApiRequest<{ isSuccess: boolean }>({
			_url: API_URL_ENUM.logout,
			_method: 'post',
			_isAuthenticatedRequest: false,
		});

		if (__response?.isSuccess) {
			// clear User token.
			void STORAGE.CLEAR(LOCALSTORAGE_KEYS.USERDATA);
			// clear auth token.
			void STORAGE.CLEAR(LOCALSTORAGE_KEYS.AUTHTOKEN);

			// redirect to home
			window.location.replace('/');
		} else {
			throw new Error('Something went wrong please try again!');
		}
	} catch (error) {
		reportCustomError(error);
	}
};

export const areAllObjectsFilled = (array: Array<object>): boolean => {
	let isValid = true;
	for (let i = 0; i < array.length; i++) {
		if (Object.keys(array[i]).length) {
			isValid = false;
		}
	}
	return isValid;
};

/**
 * The purpose of this function is to just use (new URL()) in one place if we change or replace new URL() we just have to updated this function.
 * @param _url
 * @returns parts of url.
 */
export const zExtractUrlParts = (_url: string) => {
	const __zExtractedUrl = new URL(_url);

	return __zExtractedUrl;
};

/**
 * Function that will check if giving string contains https/http protocol if not then add it.
 * @param _url
 * @returns string.
 */
export const zAddUrlProtocol = (url: string): string => {
	if (!url.startsWith('http://') && !url.startsWith('https://')) {
		return `https://${url}`;
	}
	return url;
};

/**
 * Function which will generate a random-unique string of giving length for short-link url path.
 * @param _length
 * @returns
 */
export const zGenerateRandomString = (
	_length: number | undefined = CONSTANTS.SHORT_LINK.urlPathLength
): string => {
	const __characters =
		'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
	const __charactersLength = __characters.length;

	const __randomStringCharts = new Array(_length);

	for (let _i = 0; _i < _length; _i++) {
		const _randomIndex = Math.floor(Math.random() * __charactersLength);
		__randomStringCharts[_i] = __characters.charAt(_randomIndex);
	}

	return __randomStringCharts.join('');
};

export const generateShortLink = ({
	domain,
	urlPath,
}: {
	domain?: string;
	urlPath?: string;
}) => {
	try {
		if (domain && urlPath) {
			return `${domain}/${CONSTANTS.SHORT_LINK.urlStaticPath}/${urlPath}`;
		} else {
			throw new ZCustomError({
				message: 'generateShortLink: params domain & urlPath are required',
			});
		}
	} catch (error) {
		reportCustomError(error);
	}
};

export const createElementTestingSelector = ({
	_value,
	_key = createElementTestingSelectorKeyEnum.selector,
}: {
	_value: string;
	_key?: createElementTestingSelectorKeyEnum;
}): { [key: string]: string } => {
	const __prefix = CONSTANTS.testingSelectorsPrefix;

	const __attributeValue = `${__prefix}${_value}`;

	switch (_key) {
		case createElementTestingSelectorKeyEnum.selector:
			return {
				'cy-es': __attributeValue,
			};

		case createElementTestingSelectorKeyEnum.listSelector:
			return {
				'cy-els': __attributeValue,
			};

		default:
			return {
				'cy-es': __attributeValue,
			};
	}
};
