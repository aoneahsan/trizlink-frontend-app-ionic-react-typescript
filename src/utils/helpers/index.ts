import { type ABTestingRotatorInterface } from '@/types/AdminPanel/index.type';
import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { isPlatform } from '@ionic/react';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { workspaceFormConnectPagesEnum } from '@/types/AdminPanel/workspace/index';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
// Packages Import
import {
  type ConfirmResult,
  Dialog,
  type PromptResult
} from '@capacitor/dialog';
import { Preferences } from '@capacitor/preferences';
import {
  type LinkTargetType,
  PixelPlatformsEnum
} from '@/types/AdminPanel/linksType';
import isEmail from 'validator/lib/isEmail';
import CONSTANTS, {
  API_URLS,
  LOCALSTORAGE_KEYS,
  NOTIFICATIONS,
  ZLinkApiRootUrl
} from '@/utils/constants';
import {
  API_URL_ENUM,
  CONTAINS,
  zCreateElementTestingSelectorKeyEnum,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import { ENVS } from '@/utils/envKeys';
import MESSAGES from '@/utils/messages';
import { AES, enc } from 'crypto-js';
import { type UserAccountType } from '@/types/UserAccount/index.type';
import axiosInstance from '@/axiosInstance';
import {
  type ZCapDialogPropsType,
  type ZConsolePropsType,
  type ZRoutesObject
} from '@/types/ZaionsHelperFunction.type';
import {
  type AxiosRequestResponseType,
  type ZLinkGetApiType,
  type ZLinkMutateApiType
} from '@/types/ZaionsApis.type';
import {
  reportCustomError,
  throwZCustomErrorRequestFailed,
  throwZCustomErrorUnAuthenticated,
  ZCustomError
} from '@/utils/customErrorType';
import { type AxiosRequestConfig } from 'axios';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';

import VALIDATOR from 'validator';
import {
  LinkInBioThemeBackgroundEnum,
  type LinkInBioThemeBackgroundType
} from '@/types/AdminPanel/linkInBioType';
import zQueryString from 'qs';
import dayjs from 'dayjs';
import DayJsDurationPlugin from 'dayjs/plugin/duration';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';
import {
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoPinterest,
  logoTiktok,
  logoTwitter,
  logoGoogle,
  logoYoutube,
  gridOutline
} from 'ionicons/icons';
import { messengerPlatformsBlockEnum } from '@/types/AdminPanel/index.type';

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
    const _val = (await Preferences.get({ key: _key })).value;
    if (_val !== null) {
      return await decryptData(_val);
    } else {
      return undefined;
    }
  },
  SET: async (key: string, value: unknown): Promise<void> => {
    const valStr = encryptData(value);
    await Preferences.set({ key, value: valStr });
  },
  REMOVE: async (key: string): Promise<void> => {
    await Preferences.remove({ key });
  },
  CLEAR: async (key: string): Promise<void> => {
    await Preferences.clear();
  }
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
  GET_HOST: (): string => window.location.host
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
  inputPlaceholder = 'Enter your input here...'
}: // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
  switch (type) {
    case 'alert': {
      await Dialog.alert({
        title,
        message,
        buttonTitle
      });
      return;
    }
    case 'confirm':
      return await Dialog.confirm({
        title,
        message,
        okButtonTitle,
        cancelButtonTitle
      });
    case 'prompt':
      return await Dialog.prompt({
        title,
        message,
        okButtonTitle,
        cancelButtonTitle,
        inputText,
        inputPlaceholder
      });
    default:
      break;
  }
};

export const showZCapDialogAlert = async ({
  title,
  message,
  buttonTitle
}: // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
  return await showZCapDialog({ title, message, buttonTitle, type: 'alert' });
};

export const showZCapSuccessDialogAlert = async (): Promise<
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void | ConfirmResult | PromptResult
> => {
  return await showZCapDialogAlert({
    title: MESSAGES.GENERAL.SUCCESS,
    message: MESSAGES.GENERAL.SUCCESS_MESSAGE,
    buttonTitle: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT
  });
};

export const showZCapErrorDialogAlert = async (): Promise<
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void | ConfirmResult | PromptResult
> => {
  return await showZCapDialogAlert({
    title: MESSAGES.GENERAL.FAILED,
    message: MESSAGES.GENERAL.FAILED_MESSAGE,
    buttonTitle: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT
  });
};

export const showZCapDialogPrompt = async ({
  title,
  message,
  okButtonTitle,
  cancelButtonTitle,
  inputText,
  inputPlaceholder
}: // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
  return await showZCapDialog({
    title,
    message,
    okButtonTitle,
    cancelButtonTitle,
    inputText,
    inputPlaceholder,
    type: 'prompt'
  });
};

export const showZCapDialogConfirm = async ({
  title,
  message,
  okButtonTitle,
  cancelButtonTitle
}: // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ZCapDialogPropsType): Promise<void | ConfirmResult | PromptResult> => {
  return await showZCapDialog({
    title,
    message,
    okButtonTitle,
    cancelButtonTitle
  });
};

export const convertToTitleCase = (s: string | PixelPlatformsEnum): string => {
  // return s.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
  //   c ? (c as string).toUpperCase() : ' ' + (d as string).toUpperCase()
  // );
  return s
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .toLowerCase(); // Convert the string to lowercase
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
        CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_ANALYTICS.SHOULD_INCLUDE.length > 0 &&
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
        CONSTANTS.PIXEL_ACCOUNTS.GOOGLE_TAG_MANAGER.SHOULD_INCLUDE.length > 0 &&
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
        CONSTANTS.PIXEL_ACCOUNTS.VK.SHOULD_INCLUDE.length > 0 &&
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
          'replaceRouteParams: values and params array length not matching.'
      })
        .then()
        .catch(() => console.error);
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
export const stringifyZQueryString = (_object: ZGenericObject): string => {
  return zQueryString.stringify(_object);
};

/**
 * The purpose of this function is to just use (ZQueryString.parse) in one place if we change or replace ZQueryString.parse we just have to updated this function.
 * @param _value
 * @returns parse value.
 */
export const parseZQueryString = (
  _value: string
): {
  _queryStringData: zQueryString.ParsedQs;
  _urlData: URL;
} => {
  const _urlData = new URL(_value);
  const _queryStringData = zQueryString.parse(_urlData.search.replace('?', ''));
  return {
    _queryStringData,
    _urlData
  };
};

export const createRedirectRoute = ({
  url,
  routeSearchParams,
  routeHashParams,
  params = [],
  values = []
}: {
  url: string;
  routeSearchParams?: ZGenericObject;
  routeHashParams?: ZGenericObject;
  params?: string[];
  values?: string[];
}): string => {
  let _route = replaceRouteParams(url, params, values);
  if (routeSearchParams != null) {
    _route = `${_route}?${stringifyZQueryString(routeSearchParams)}`;
  }
  // The hash parameter must be placed after search parameter in url
  if (routeHashParams != null) {
    _route = `${_route}#${stringifyZQueryString(routeHashParams)}`;
  }

  return _route;
};

export const formatDataForZaionsRSelectOptions = (
  data: unknown,
  valueKey: string,
  labelKey: string
): Array<{
  value: string | undefined;
  label: string | undefined;
}> => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((el: Record<string, string>) => {
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
        label: _label
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
      return val.length >= CONSTANTS.ZPasswordMinCharacter;

    default:
      return /\d/.test(val);
  }
};

export const validateField = (
  fieldKey: string,
  values: Record<string, unknown>,
  errorsObj: Record<string, unknown>,
  validationRule: VALIDATION_RULE = VALIDATION_RULE.string
): void => {
  const _fieldKeyTitleCase = convertToTitleCase(fieldKey);
  const _val = (values[fieldKey] as string)?.trim();
  /**
   * Checking in the field key is empty then give `fieldKey is required` error message (generally for every field)
   */
  if (
    !Object.prototype.hasOwnProperty.call(values, fieldKey) ||
    _val.length === 0
  ) {
    errorsObj[fieldKey] = `${_fieldKeyTitleCase} is required`;
  } else if (validationRule === VALIDATION_RULE.email && !isEmail(_val)) {
    errorsObj[fieldKey] = `${_fieldKeyTitleCase} needs to be a valid email.`;
  } else if (validationRule === VALIDATION_RULE.password) {
    if (!checkIfContains(_val, CONTAINS.minCharacter)) {
      errorsObj[fieldKey] =
        `${_fieldKeyTitleCase} needs to be at least 8 digits long.`;
    } else if (!checkIfContains(_val, CONTAINS.number)) {
      errorsObj[fieldKey] = `${_fieldKeyTitleCase} must include a digit.`;
    } else if (!checkIfContains(_val, CONTAINS.letter)) {
      errorsObj[fieldKey] = `${_fieldKeyTitleCase} must include a letter.`;
    } else if (!checkIfContains(_val, CONTAINS.specialSymbol)) {
      errorsObj[fieldKey] =
        `${_fieldKeyTitleCase} must include a special character.`;
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
  values: Record<string, unknown>,
  errorsObj: Record<string, unknown>,
  validationRules: VALIDATION_RULE[]
): void => {
  if (fieldKeys.length !== validationRules.length) {
    Dialog.alert({
      title: 'Invalid Request!',
      message: 'Fields and Validation Rules array length not matching.'
    })
      .then()
      .catch(() => console.error);
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
        'Form Fields keys and API Error Object Keys array length not matching.'
    })
      .then()
      .catch(_ => console.error);
    return {};
  } else {
    // check if there are any errors in _apiErrorsObj
    if (Object.keys(_apiErrorsObj).length > 0) {
      const _error: ZGenericObject = {};
      for (let i = 0; i < _formFieldKeys.length; i++) {
        const _formFiledKey = _formFieldKeys[i];
        const _apiErrorFieldKey = _apiErrorObjectKeys[i];
        const _data = _apiErrorsObj[_apiErrorFieldKey] as unknown;

        if (
          Object.prototype.hasOwnProperty.call(
            _apiErrorsObj,
            _apiErrorFieldKey
          ) &&
          Array.isArray(_data) &&
          Boolean(_data[0])
        ) {
          _error[_formFiledKey] = _data[0];
        }
      }

      return _error;
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
    let _url: string;
    if (isExternalThirdPartyAPI) {
      _url = API_URLS[url];
    } else {
      if (includeAPIDefault) {
        _url = `${ZLinkApiRootUrl}${API_URLS[url]}`;
      } else {
        _url = `${ZLinkApiRootUrl.replace('/api/trizlink/v1', '')}${API_URLS[url]
          }`;
      }
    }

    if (
      itemIds !== undefined &&
      urlDynamicParts !== undefined &&
      itemIds.length === urlDynamicParts.length
    ) {
      for (let i = 0; i < urlDynamicParts.length; i++) {
        const dynamicPart = urlDynamicParts[i];
        if (_url.includes(dynamicPart)) {
          const itemId = itemIds[i];
          _url = _url.replace(dynamicPart, itemId);
        }
      }
    } else if (itemIds?.length !== urlDynamicParts?.length) {
      throw new Error('length does not match. invalid length');
    }

    // replace the default dynamic part in the url
    try {
      if (_url.includes(CONSTANTS.RouteParams.pageNumber)) {
        _url = _url.replace(
          CONSTANTS.RouteParams.pageNumber,
          CONSTANTS.pagination.startingPageIndex.toString()
        );
      }
    } catch (error) { }
    try {
      if (_url.includes(CONSTANTS.RouteParams.paginationLimit)) {
        _url = _url.replace(
          CONSTANTS.RouteParams.paginationLimit,
          CONSTANTS.pagination.defaultPageSize.toString()
        );
      }
    } catch (error) { }

    return _url;
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
  _contentType = zAxiosApiRequestContentType.Json
}: zAxiosApiRequestInterface): Promise<T | undefined> => {
  // Getting authToken from storage.
  const _authToken = await getAuthToken();

  // authToken is fount or not authenticatedRequest request then
  if (_authToken !== undefined || !_isAuthenticatedRequest) {
    // Creating an axios config object.
    const reqInput: AxiosRequestConfig = {
      method: _method,
      data: _data,
      url: getApiUrl(_url, _itemIds, _urlDynamicParts),
      headers: {
        Accept: zAxiosApiRequestContentType.Json,
        'Content-Type': _contentType,
        Authorization: `${CONSTANTS.DEFAULT_VALUES.API_TOKEN_PRIMARY_KEY} ${_authToken ?? ''
          }`
      }
    };

    // Making axios request.
    const _res =
      await axiosInstance.request<AxiosRequestResponseType>(reqInput);

    // retuning data of type T
    return _res.data as unknown as T;

    // else if this is an authenticatedRequest and authToken is not fount then
  } else if (_isAuthenticatedRequest && _authToken === undefined) {
    // Remove data from storage.
    await Promise.all([
      STORAGE.REMOVE(LOCALSTORAGE_KEYS.USERDATA),
      STORAGE.REMOVE(LOCALSTORAGE_KEYS.AUTHTOKEN)
    ]);
    // Redirect to login.
    window.location.replace(ZaionsRoutes.LoginRoute);

    // Throw UnAuthenticated error.
    throwZCustomErrorUnAuthenticated();
  } else {
    throwZCustomErrorRequestFailed();
  }
};

// as we are returning a simple js object, so typescript will automatically define the return type for this function
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserDataObjectForm = (_user: UserAccountType) => {
  return {
    id: _user?.id?.toString(),
    username: _user?.username,
    name: _user?.name,
    avatar: _user?.avatar,
    phoneNumber: _user?.phoneNumber,
    profileImage: _user?.profileImage,
    email: _user?.email,
    email_verified_at: _user?.email_verified_at,
    password: _user?.password,
    lastSeenAt: _user?.lastSeenAt,
    lastSeenAtFormatted: _user?.lastSeenAtFormatted,
    created_at: _user?.createdAt,
    updated_at: _user?.updatedAt
  };
};

export const emptyVoidReturnFunction = (): void => {
  zConsoleLog({ message: 'emptyVoidReturnFunction' });
};

export const emptyVoidReturnFunctionPromise = async (): Promise<void> => {
  zConsoleLog({ message: 'emptyVoidReturnFunction' });
};

export const zConsole = ({
  message = MESSAGES.GENERAL.SUCCESS,
  type = 'log',
  data,
  err
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
  err = null
}: ZConsolePropsType): void => {
  zConsole({ message, type: 'log', data, err });
};

export const zConsoleInfo = ({
  message = MESSAGES.GENERAL.SUCCESS,
  data = null,
  err = null
}: ZConsolePropsType): void => {
  zConsole({ message, type: 'info', data, err });
};

export const zConsoleWarning = ({
  message = MESSAGES.GENERAL.SUCCESS,
  data = null,
  err = null
}: ZConsolePropsType): void => {
  zConsole({ message, type: 'warning', data, err });
};

export const zConsoleSuccess = ({
  data = null,
  message = MESSAGES.GENERAL.SUCCESS
}: {
  data: unknown;
  message?: string;
}): void => {
  zConsoleLog({ message, data });
};

export const zConsoleError = ({
  err = null,
  message = MESSAGES.GENERAL.FAILED
}: {
  err: unknown;
  message?: string;
}): void => {
  zConsole({ message, type: 'error', err });
};

export const zConsoleCount = ({
  message = MESSAGES.GENERAL.FAILED
}: {
  message?: string;
}): void => {
  zConsole({ message, type: 'count' });
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
  const _item = _itemsDataArr?.find(_el => {
    return (
      Object.prototype.hasOwnProperty.call(_el, _idKeyName) &&
      _el[_idKeyName] === _itemId
    );
  });

  if (
    _item !== undefined &&
    Object.prototype.hasOwnProperty.call(_item, _idKeyName) &&
    Object.prototype.hasOwnProperty.call(_item, _labelKeyName)
  ) {
    return {
      value: _item[_idKeyName] as string,
      label: _item[_labelKeyName]
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
  const _formattedOptionsArr: ZaionsRSelectOptions[] = [];
  for (let i = 0; i < _itemIdArr.length; i++) {
    const _itemId = _itemIdArr[i];
    const _result = formatReactSelectOption(
      _itemId,
      _itemsDataArr,
      _idKeyName,
      _labelKeyName
    );

    if (_result !== undefined) {
      _formattedOptionsArr.push(_result);
    }
  }

  return _formattedOptionsArr;
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
    if (_backgroundData !== undefined) {
      if (_backgroundData.bgType === LinkInBioThemeBackgroundEnum.gradient) {
        const _gradientValue =
          _backgroundData.bgGradientColors !== undefined &&
          `linear-gradient(${_backgroundData.bgGradientColors.direction}deg, ${_backgroundData.bgGradientColors.startColor}, ${_backgroundData.bgGradientColors.endColor})`;

        value['--background'] = _gradientValue as string;
        value.background = _gradientValue as string;
      } else if (
        _backgroundData.bgType === LinkInBioThemeBackgroundEnum.solidColor
      ) {
        const _solidColorValue = _backgroundData.bgSolidColor as string;
        value['--background'] = _solidColorValue;
        value.background = _solidColorValue;
      } else if (
        _backgroundData.bgType === LinkInBioThemeBackgroundEnum.image
      ) {
        value['--background'] = `url(${_backgroundData.bgImageUrl as string})`;
        value.background = `url(${_backgroundData.bgImageUrl as string})`;
        value.backgroundImage = `url(${_backgroundData.bgImageUrl as string})`;
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
    if (_object !== undefined && _type !== undefined) {
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
            )}`
          });
      }

      // if any of the required parameter is not passed show invalid parameter dialog
    } else {
      Dialog.alert({
        title: 'extractInnerData, invalid parameters!',
        message: 'extractInnerData: parameters _object & _type are required'
      })
        .then()
        .catch(_ => console.error);

      throw new ZCustomError({
        message: 'Invalid parameters passed to extractInnerData'
      });
    }
  } catch (error) {
    reportCustomError(error);
  }
};

/**
 * ZSanitizeHTML gonna made for the text area (react-quill) for sanitize the html data but react-quill is doing it by it self we tested it and it is working well. if we need to add a package for sanitizing we will add it to this function and use this function in all the place need.
 * @param param0 value of type T
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ZSanitizeHTML = <T>({ value }: { value: T }) => {
  try {
    if (value !== undefined) {
      zConsoleLog({ data: { value } });
    }
  } catch (error) {
    reportCustomError(error);
  }
};

/**
 * this function will give the remaining time for count down component present in link-in-bio blocks.
 * @param countDownTimeFinishDate type string
 * @returns remaining time in milliseconds.
 */
export const getRemainingTimeForCountDown = (
  countDownTimeFinishDate: string | undefined
): number => {
  try {
    if (countDownTimeFinishDate !== null) {
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
  formatAs = 'minute'
}): number | undefined => {
  const result = dayjs.duration({
    days,
    hours,
    milliseconds,
    minutes,
    months,
    seconds,
    weeks,
    years
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

// const formattedAnalyticsBlocksData = (
//   _data: ZGenericObject[],
//   columnNames: string[]
// ): LinkInBioPageAnalyticsDataInterface[] | undefined => {
//   try {
//     if (columnNames.length >= 1 && columnNames.length <= 4) {
//       // Checking if data is passed or not
//       if (_data) {
//         const _result: LinkInBioPageAnalyticsDataInterface[] = [];
//         const _arr = ['value', 'visit', 'unique', 'visitPercentage'];

//         // Looping the _data
//         for (let i = 0; i < _data.length; i++) {
//           // Getting the value
//           const _item = _data[i];

//           columnNames.forEach((element, _i) => {
//             const replaceBy = _arr[_i];

//             // assign the value key to the `columnName`
//             _item[replaceBy] = _item[element];

//             // deleting the `columnName` key
//             delete _item[element];
//           });

//           // pushing the item in _result array
//           _result.push(_item);
//         }

//         return _result;
//       }
//     } else {
//       Dialog.alert({
//         title: 'formattedAnalyticsBlocksData, Invalid parameters',
//         message:
//           'formattedAnalyticsBlocksData: length of columnNames parament mush be in between 1 to 4!'
//       })
//         .then()
//         .catch(_ => console.error);

//       throw new ZCustomError({
//         message: 'Invalid parameters passed to extractInnerData'
//       });
//     }
//   } catch (error) {
//     reportCustomError(error);
//   }
// };

export const doesUrlIncludes = (
  _url: string,
  _searchString: string
): boolean | undefined => {
  try {
    if (_url !== undefined && _searchString !== undefined) {
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

/**
 * This function will give the icon of platform accounting to workspaceFormConnectPagesEnum basically used in workspaceView page and Compose modal etc.
 * @param type typeof workspaceFormConnectPagesEnum
 * @returns accounting to type it will return icon.
 */
export const getPlatformIcon = (
  type: workspaceFormConnectPagesEnum
): string | undefined => {
  try {
    if (type !== undefined) {
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

/**
 * Initiates the user logout process by making an API request to log out the user.
 * Clears user and authentication tokens from local storage upon successful logout.
 * Redirects the user to the home page after logout.
 */
export const UserLogoutFn = async (): Promise<void> => {
  try {
    const _response = await zAxiosApiRequest<{ isSuccess: boolean }>({
      _url: API_URL_ENUM.logout,
      _method: 'post',
      _isAuthenticatedRequest: false
    });

    if (_response !== undefined && _response?.isSuccess) {
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

export const areAllObjectsFilled = (array: object[]): boolean => {
  let isValid = true;
  for (let i = 0; i < array.length; i++) {
    if (Object.keys(array[i]).length > 0) {
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
export const zExtractUrlParts = (_url: string): URL => {
  const _zExtractedUrl = new URL(_url);

  return _zExtractedUrl;
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
 * Generates a random string of specified length or using the default length.
 *
 * @param {number} _length - The length of the random string. Defaults to the URL path length from CONSTANTS.
 * @returns {string} A random string of specified length.
 */
export const zGenerateRandomString = (
  _length: number | undefined = CONSTANTS.SHORT_LINK.urlPathLength
): string => {
  const _characters =
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
  const _charactersLength = _characters.length;

  const _randomStringCharts = new Array(_length);

  for (let _i = 0; _i < _length; _i++) {
    const _randomIndex = Math.floor(Math.random() * _charactersLength);
    _randomStringCharts[_i] = _characters.charAt(_randomIndex);
  }

  return _randomStringCharts.join('');
};

/**
 * Generates a short link URL using the provided domain and URL path.
 *
 * @param {Object} options - The options for generating the short link.
 * @param {string} options.domain - The domain to be used in the short link URL.
 * @param {string} options.urlPath - The URL path to be appended to the short link.
 * @returns {string} The generated short link URL.
 * @throws {ZCustomError} Throws an error if both domain and urlPath are not provided.
 */
export const zGenerateShortLink = ({
  domain,
  urlPath
}: {
  domain?: string;
  urlPath?: string;
}): string | undefined => {
  try {
    if (isZNonEmptyString(domain) && isZNonEmptyString(urlPath)) {
      return `${domain}/${CONSTANTS.SHORT_LINK.urlStaticPath}/${urlPath}`;
    } else {
      throw new ZCustomError({
        message: 'zGenerateShortLink: params domain & urlPath are required'
      });
    }
  } catch (error) {
    reportCustomError(error);
  }
};

/**
 * The zCreateElementTestingSelector function is designed to generate testing attributes for HTML and Ionic elements.
 * @param param0 It takes an object as input with two properties: _value and _key.
 * @returns an array destruct the array in to HTML or ionic element.
 */
export const zCreateElementTestingSelector = ({
  _value,
  _key = zCreateElementTestingSelectorKeyEnum.selector
}: {
  _value: string;
  _key?: zCreateElementTestingSelectorKeyEnum;
}): Record<string, string> => {
  const _prefix = CONSTANTS.testingSelectorsPrefix;

  const _attributeValue = `${_prefix}${_value}`;

  switch (_key) {
    case zCreateElementTestingSelectorKeyEnum.selector:
      return {
        'cy-es': _attributeValue
      };

    case zCreateElementTestingSelectorKeyEnum.listSelector:
      return {
        'cy-els': _attributeValue
      };

    case zCreateElementTestingSelectorKeyEnum.dateIdSelector:
      return {
        'data-trz-leid': _attributeValue
      };

    default:
      return {
        'cy-es': _attributeValue
      };
  }
};

/**
 * Compares a route template with a current route to determine if they match.
 *
 * @param {Object} options - The options for the function.
 * @param {string} options.routeTemplate - The template of the route to be compared.
 * @param {string} options.currentRoute - The current route to be compared against the template.
 * @returns {boolean} Returns true if the current route matches the template, otherwise false.
 */
export const zCompareRoutes = ({
  routeTemplate,
  currentRoute
}: {
  routeTemplate: string;
  currentRoute: string;
}): boolean => {
  const templateParts = routeTemplate.split('/');
  const currentParts = currentRoute.split('/');

  if (templateParts.length !== currentParts.length) {
    return false;
  }

  for (let i = 0; i < templateParts.length; i++) {
    const templatePart = templateParts[i];
    const currentPart = currentParts[i];

    if (templatePart.startsWith(':')) {
      // If template part is a parameter, continue to the next iteration
      continue;
    }

    if (templatePart !== currentPart) {
      return false;
    }
  }

  return true;
};

/**
 * Determines whether the current URL matches any of the defined routes in a structured route object.
 *
 * @param {Object} options - The options for the function.
 * @param {string} options._currentUrl - The current URL to be checked.
 * @param {Object} options._routesObj - The routes object to compare against.
 * @returns {string | undefined} Returns route if a matching route is found, otherwise undefined.
 */
export const ZGetCurrentRoute = ({
  _currentUrl,
  _routesObj
}: {
  _currentUrl: string;
  _routesObj: ZRoutesObject;
}): string | undefined => {
  try {
    for (const key in _routesObj) {
      if (typeof _routesObj[key] === 'string') {
        if (
          zCompareRoutes({
            routeTemplate: _routesObj[key] as string,
            currentRoute: _currentUrl
          })
        ) {
          return _routesObj[key] as string;
        }
      }

      if (typeof _routesObj[key] === 'object') {
        const _nestedRouteCheck = ZGetCurrentRoute({
          _currentUrl,
          _routesObj: _routesObj[key] as ZRoutesObject
        });

        if (_nestedRouteCheck !== undefined) {
          return _nestedRouteCheck;
        }
      }
    }
  } catch (error) {
    reportCustomError(error);
  }
};

/**
 * Retrieves an array of permission enums associated with the provided current route.
 *
 * @param {Object} options - The options for the function. options._currentRoute - The current route for which permissions are to be retrieved.
 * @returns {Array} An array of permission enums relevant to the current route, or undefined if no permissions are found.
 */
export const zGetRoutePermissions = ({
  _currentRoute
}: {
  _currentRoute: string;
}): permissionsEnum[] | undefined => {
  try {
    let _permissions: permissionsEnum[] = [];
    switch (_currentRoute) {
      case ZaionsRoutes.AdminPanel.Workspaces.Main:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_shareWS
        ];
        break;

      case ZaionsRoutes.AdminPanel.Workspaces.App:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_shareWS
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShortLinks.Main:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_shortLink
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShortLinks.Create:
        _permissions = [
          permissionsEnum.view_workspace,
          permissionsEnum.viewAny_pixel,
          permissionsEnum.viewAny_utmTag,
          permissionsEnum.viewAny_folder
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShortLinks.Edit:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.update_shortLink,
          permissionsEnum.viewAny_pixel,
          permissionsEnum.viewAny_utmTag,
          permissionsEnum.viewAny_folder
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShortLinks.Analytic:
        _permissions = [permissionsEnum.viewAny_workspace];
        break;

      case ZaionsRoutes.AdminPanel.LinkInBio.Main:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_linkInBio,
          permissionsEnum.view_shortLink
        ];
        break;

      case ZaionsRoutes.AdminPanel.LinkInBio.Edit:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.view_workspace,
          permissionsEnum.update_linkInBio
        ];
        break;

      case ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_workspaceTeam
        ];
        break;

      case ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_workspaceTeam
        ];
        break;

      case ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_workspaceTeam
        ];
        break;

      case ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel:
        _permissions = [permissionsEnum.viewAny_pixel];
        break;

      case ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag:
        _permissions = [permissionsEnum.viewAny_utmTag];
        break;

      case ZaionsRoutes.AdminPanel.Setting.UserAccount.NotificationSettings:
        _permissions = [permissionsEnum.viewAny_workspace];
        break;

      case ZaionsRoutes.AdminPanel.Setting.UserAccount.ProfileSettings:
        _permissions = [permissionsEnum.viewAny_emails];
        break;

      case ZaionsRoutes.AdminPanel.Setting.UserAccount.WSNotificationSettings:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_shareWS
        ];
        break;

      case ZaionsRoutes.AdminPanel.Setting.UserAccount.WorkspaceNotifications:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.view_workspace
        ];
        break;

      case ZaionsRoutes.AdminPanel.Setting.AccountSettings.ViewTeam:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.view_workspaceTeam
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.Startup:
        _permissions = [permissionsEnum.view_shareWS];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.View:
        _permissions = [permissionsEnum.view_shareWS];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main:
        _permissions = [permissionsEnum.view_shareWS];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.Link_in_bio.Main:
        _permissions = [permissionsEnum.view_shareWS];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.Short_link.Create:
        _permissions = [permissionsEnum.create_shareWS];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.Short_link.Edit:
        _permissions = [permissionsEnum.update_shareWS];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Main:
        _permissions = [permissionsEnum.update_shareWS];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Members:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_workspaceTeam
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.ReferralProgram:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_workspaceTeam
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Billing:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_workspaceTeam
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Pixel:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_ws_member
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.UTMTag:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_ws_member
        ];
        break;

      case ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.EmbedWidget:
        _permissions = [
          permissionsEnum.viewAny_workspace,
          permissionsEnum.viewAny_ws_member
        ];
        break;
    }

    return _permissions;
  } catch (error) {
    reportCustomError(error);
    return [];
  }
};

/**
 * zRedirectToTarget is a utility function that generates the appropriate redirect URL based on the target and type provided.
 * It supports various messenger platforms and generates URLs for links, emails, messenger apps, and more.
 *
 * @param _target - The target information containing different properties depending on the type.
 * @param type - The type of messenger platform or action (e.g., link, email, messenger).
 * @returns The generated redirect URL.
 */
export const zRedirectToTarget = ({
  _target,
  type
}: {
  _target: LinkTargetType;
  type: messengerPlatformsBlockEnum;
}): string | undefined => {
  try {
    if (_target !== undefined) {
      let _redirectUrl = '';
      switch (type) {
        case messengerPlatformsBlockEnum.link:
          if (
            _target?.url !== null &&
            _target?.url !== undefined &&
            _target?.url?.trim().length > 0
          ) {
            _redirectUrl = _target?.url;
          }
          break;

        case messengerPlatformsBlockEnum.email:
          if (
            _target?.email !== null &&
            _target?.email !== undefined &&
            _target?.email?.trim().length > 0
          ) {
            _redirectUrl = `mailto:${_target?.email}subject=${_target?.subject}&body=${_target?.message}`;
          }
          break;

        case messengerPlatformsBlockEnum.messenger:
          if (
            _target?.url !== null &&
            _target?.url !== undefined &&
            _target?.url?.trim().length > 0
          ) {
            _redirectUrl = _target?.url;
          }
          break;

        case messengerPlatformsBlockEnum.line:
          if (
            _target?.accountId != null &&
            _target?.accountId?.trim().length > 0
          ) {
            _redirectUrl = `https://line.me/R/oaMessage/${_target?.accountId}`;
          }
          break;

        case messengerPlatformsBlockEnum.whatsapp:
          if (
            _target?.phoneNumber !== undefined &&
            _target?.phoneNumber !== null &&
            _target?.phoneNumber?.trim().length > 0
          ) {
            _redirectUrl = `https://wa.me/+92${_target?.phoneNumber}`;
          }
          break;

        case messengerPlatformsBlockEnum.call:
          if (
            _target?.phoneNumber !== undefined &&
            _target?.phoneNumber !== null &&
            _target?.phoneNumber?.trim().length > 0
          ) {
            _redirectUrl = `tel:${_target?.phoneNumber}`;
          }
          break;

        case messengerPlatformsBlockEnum.sms:
          if (
            _target?.phoneNumber !== undefined &&
            _target?.phoneNumber !== null &&
            _target?.phoneNumber?.trim().length > 0
          ) {
            _redirectUrl = `sms:+${_target?.phoneNumber}&body=${_target?.message}`;
          }
          break;

        case messengerPlatformsBlockEnum.telegram:
          if (
            _target?.username !== undefined &&
            _target?.username !== null &&
            _target?.username?.trim().length > 0
          ) {
            _redirectUrl = `https://t.me/${_target?.username}`;
          }
          break;

        case messengerPlatformsBlockEnum.skype:
          if (
            _target?.username !== undefined &&
            _target?.username !== null &&
            _target?.username?.trim().length > 0
          ) {
            _redirectUrl = `skype:${_target?.username}?chat`;
          }
          break;

        case messengerPlatformsBlockEnum.viber:
          if (
            _target?.username !== undefined &&
            _target?.username !== null &&
            _target?.username?.trim().length > 0
          ) {
            _redirectUrl = `viber://pa?chatURI=${_target?.username}&text=${_target?.message}`;
          }
          break;

        default:
          break;
      }

      return _redirectUrl;
    }
  } catch (error) {
    reportCustomError(error);
  }
};

export const zGotoNextField = (uniqueId?: string): void => {
  if (uniqueId !== undefined) {
    const _nextField = document.getElementById(uniqueId) as HTMLIonInputElement;

    if (_nextField !== undefined && _nextField instanceof HTMLIonInputElement) {
      void _nextField?.setFocus();
    }
  }
};

export const zCalculateRotatorABTesting = ({
  _data
}: {
  _data: ABTestingRotatorInterface[];
}): {
  _totalPercentage: number;
  _remainingPercentage: number;
} => {
  try {
    const _totalPercentage = CONSTANTS.DEFAULT_VALUES.Z_PERCENTAGE;
    const _dataPercentage = _data.reduce(
      (sum, obj) => sum + (obj.percentage ?? 0),
      0
    );
    const _remainingPercentage = _totalPercentage - _dataPercentage;

    return { _totalPercentage, _remainingPercentage };
  } catch (error) {
    reportCustomError(error);
    return { _totalPercentage: 0, _remainingPercentage: 0 };
  }
};

export const zGetRandomLink = (
  _array: ABTestingRotatorInterface[]
): string | null | undefined => {
  try {
    // Generate a random number between 0 to 99
    const _randomNumber = Math.floor(Math.random() * 100);

    let _accumulatingPercentage = 0;

    // determine which link the random number fall under based on the percentage.
    for (const _item of _array) {
      _accumulatingPercentage += _item?.percentage ?? 0;

      if (_randomNumber < _accumulatingPercentage) {
        return _item?.redirectionLink;
      }
    }

    return null;
  } catch (error) {
    reportCustomError(error);
  }
};

export const zIsPlatforms = (): {
  isAndroidPlatform: boolean;
  isCapacitor: boolean;
  isCordova: boolean;
  isDesktop: boolean;
  isElectron: boolean;
  isHybrid: boolean;
  isIOS: boolean;
  isIPad: boolean;
  isIPhone: boolean;
  isMobile: boolean;
  isMobileWeb: boolean;
  isPhablet: boolean;
  isPWA: boolean;
  isTablet: boolean;
} => {
  const isAndroidPlatform = isPlatform('android');
  const isCapacitor = isPlatform('capacitor');
  const isCordova = isPlatform('cordova');
  const isDesktop = isPlatform('desktop');
  const isElectron = isPlatform('electron');
  const isHybrid = isPlatform('hybrid');
  const isIOS = isPlatform('ios');
  const isIPad = isPlatform('ipad');
  const isIPhone = isPlatform('iphone');
  const isMobile = isPlatform('mobile');
  const isMobileWeb = isPlatform('mobileweb');
  const isPhablet = isPlatform('phablet');
  const isPWA = isPlatform('pwa');
  const isTablet = isPlatform('tablet');

  return {
    isAndroidPlatform,
    isCapacitor,
    isCordova,
    isDesktop,
    isElectron,
    isHybrid,
    isIOS,
    isIPad,
    isIPhone,
    isMobile,
    isMobileWeb,
    isPhablet,
    isPWA,
    isTablet
  };
};

/**
 * Checks if the given value is a non-empty string.
 *
 * @param value - The string value to be checked.
 * @returns A boolean indicating whether the string is non-empty or not.
 */
export const isZNonEmptyString = (
  value: string | undefined | null
): boolean => {
  return value !== undefined && value !== null && value?.trim()?.length > 0;
};

/**
 * Checks if all the values in the given array are non-empty strings.
 *
 * @param values - An array of string values to be checked.
 * @returns A boolean indicating whether all strings in the array are non-empty or not.
 */
export const isZNonEmptyStrings = (
  values: Array<string | undefined | null>
): boolean => {
  const _result = values.every(_value => isZNonEmptyString(_value));

  return _result;
};

export const _getQueryKeyV1 = ({
  keys,
  workspaceId,
  shareWSId,
  shareWSUniqueId
}: {
  keys: string[];
  workspaceId?: string;
  shareWSId?: string;
  shareWSUniqueId?: string;
}): string[] => {
  try {
    if (
      workspaceId !== undefined &&
      workspaceId !== null &&
      workspaceId?.trim()?.length > 0
    ) {
      return [...keys, workspaceId];
    } else if (
      shareWSId !== undefined &&
      shareWSId !== null &&
      shareWSId?.trim()?.length > 0 &&
      shareWSUniqueId !== undefined &&
      shareWSUniqueId !== null &&
      shareWSUniqueId?.trim()?.length > 0
    ) {
      return [...keys, shareWSId, shareWSUniqueId];
    } else {
      return [...keys];
    }
  } catch (error) {
    reportCustomError(error);
    return [];
  }
};

export const _getQueryKey = ({
  keys,
  additionalKeys
}: {
  keys: string[];
  additionalKeys?: Array<string | null | undefined>;
}): string[] => {
  try {
    const result = [...keys];
    // if (
    //   workspaceId !== undefined &&
    //   workspaceId !== null &&
    //   workspaceId?.trim()?.length > 0
    // ) {
    //   result.push(workspaceId);
    // }

    // if (
    //   shareWSUniqueId !== undefined &&
    //   shareWSUniqueId !== null &&
    //   shareWSUniqueId?.trim()?.length > 0
    // ) {
    //   result.push(shareWSUniqueId);
    // }

    if (
      additionalKeys !== null &&
      additionalKeys !== undefined &&
      additionalKeys.length > 0
    ) {
      for (let i = 0; i < additionalKeys.length; i++) {
        const element = additionalKeys[i];
        if (
          element !== undefined &&
          element !== null &&
          element?.trim()?.length > 0
        ) {
          result.push(element);
        }
      }
    }

    return result;
  } catch (error) {
    reportCustomError(error);
    return [];
  }
};

export const shouldNotBeNullUndefined = <R>(val: unknown): R | undefined => {
  try {
    if (val !== null && val !== undefined) {
      if (typeof val === 'string' && val.trim().length > 0) {
        return val as R;
      } else {
        return val as R;
      }
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

const zBeforeUnloadHandler = (event: BeforeUnloadEvent): void => {
  // Recommended
  event.preventDefault();
  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

export const shouldBlockReload = (shouldBlock: boolean = false): void => {
  try {
    if (shouldBlock) {
      window.addEventListener('beforeunload', zBeforeUnloadHandler, {
        capture: true
      });

      // To block the user to use the browser back button. suggested by ahsan bhai it is working for now.
      history.pushState(null, '', location.href);
      window.onpopstate = function (event) {
        history.go(1);
      };
    } else {
      window.removeEventListener('beforeunload', zBeforeUnloadHandler, {
        capture: true
      });

      window.onpopstate = null;
    }
  } catch (error) {
    reportCustomError(error);
  }
};

export const zComponentTestingSelectorMaker = ({
  testinglistselector,
  testingselector,
  testingidselector
}: {
  testinglistselector?: string;
  testingselector?: string;
  testingidselector?: string;
}): {
  _testinglistselector: ZGenericObject;
  _testingSelector: ZGenericObject;
  _idSelector: ZGenericObject;
} => {
  const _testinglistselector =
    testinglistselector !== undefined
      ? {
        ...zCreateElementTestingSelector({
          _value: testinglistselector,
          _key: zCreateElementTestingSelectorKeyEnum.listSelector
        })
      }
      : {};

  const _testingSelector =
    testingselector !== undefined
      ? {
        ...zCreateElementTestingSelector({
          _value: testingselector
        })
      }
      : {};

  const _idSelector =
    testingidselector !== undefined
      ? {
        ...zCreateElementTestingSelector({
          _value: testingidselector,
          _key: zCreateElementTestingSelectorKeyEnum.dateIdSelector
        })
      }
      : {};

  return { _testinglistselector, _testingSelector, _idSelector };
};
