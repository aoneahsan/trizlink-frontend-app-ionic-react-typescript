// Core Imports

// Packages Imports
import {
  type QueryFilters,
  type QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
  type UseInfiniteQueryResult,
  type UseMutationResult,
  type InfiniteData
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useResetRecoilState, useRecoilValue } from 'recoil';

// Custom Imports
import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zionic-hooks';
import { useZPermissionChecker } from '@/ZaionsHooks/ZGenericHooks';

// Global constants
import {
  zAxiosApiRequest,
  emptyVoidReturnFunction,
  STORAGE
} from '@/utils/helpers';
import { reportCustomError } from '@/utils/customErrorType';
import { type API_URL_ENUM } from '@/utils/enums';
import MESSAGES from '@/utils/messages';
import { errorCodes } from '@/utils/constants/apiConstants';
import { clearAuthDataFromLocalStorageAndRecoil } from '@/utils/helpers/apiHelpers';
import { LOCALSTORAGE_KEYS } from '@/utils/constants';

// Types
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { zAxiosApiRequestContentType } from '@/types/CustomHooks/zapi-hooks.type';

// Recoils
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import { appWiseIonicLoaderIsOpenedRSelector } from '@/ZaionsStore/AppRStates';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { showErrorNotification } from '@/utils/notification';

/**
 * The custom hook for getting data from an API using useQuery hook from react-query package.
 * @param URL URL of the API for getting data.
 * @param key Key param means queryKey of the useQuery.
 * @returns return API data if request succeed or return an presentZIonErrorAlert and error if not succeed.
 */
export const useZRQGetRequest = <T>({
  _url,
  _key,
  _itemsIds,
  _urlDynamicParts,
  _shouldFetchWhenIdPassed = false,
  _authenticated,
  _showLoader = true,
  _shouldExtractData = true,
  _extractType = ZRQGetRequestExtractEnum.extractItems,
  _staleTime = 10 * 60000,
  _checkPermissions = true,
  _showAlertOnError = true,
  _queryOptions = {
    refetchOnWindowFocus: false,
    networkMode: 'offlineFirst',
    retry: 2
  }
}: {
  _url: API_URL_ENUM;
  _key: string[];
  _shouldExtractData?: boolean;
  _extractType?: ZRQGetRequestExtractEnum;
  _authenticated?: boolean;
  _showLoader?: boolean;
  _itemsIds?: string[];
  _urlDynamicParts?: string[];
  _shouldFetchWhenIdPassed?: boolean;
  _staleTime?: number | typeof Infinity;
  _checkPermissions?: boolean;
  _showAlertOnError?: boolean;

  _queryOptions?: {
    refetchOnWindowFocus?: boolean;
    networkMode?: 'always' | 'offlineFirst' | 'online';
    retry?: number;
  };
}): UseQueryResult<T | null | undefined, Error> => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const resetUserAccountState = useResetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const zAppWiseIonicLoaderIsOpenedRSelector = useRecoilValue(
    appWiseIonicLoaderIsOpenedRSelector
  );
  const { permissionsChecker } = useZPermissionChecker();

  const _response = useQuery({
    queryKey: [..._key],
    queryFn: async (): Promise<T | undefined | null> => {
      if (_checkPermissions) {
        const _permissionsCheckerResult = await permissionsChecker();
        if (_permissionsCheckerResult !== undefined) {
          if (!_permissionsCheckerResult.hasAllPermissions) {
            return null;
          }
        }
      }

      if (_shouldFetchWhenIdPassed !== null && _shouldFetchWhenIdPassed) {
        return null;
      } else {
        // Present ion loading before api start
        !zAppWiseIonicLoaderIsOpenedRSelector &&
          _showLoader &&
          (await presentZIonLoader(
            _itemsIds?.length !== undefined
              ? MESSAGES.GENERAL.API_REQUEST.FETCHING_SINGLE_DATA
              : MESSAGES.GENERAL.API_REQUEST.FETCHING
          ));

        /**
         * @_url - takes the get url to fetch data from api.
         *  second argument take the method (post | get | update | delete). as this is the get api data so it  will be get
         * !second argument must be get because this hook is used to get data.
         * third argument is if this is the authenticated request or not.
         * @return return the data from api.
         * fourth argument _itemIds if in url you went to put some ids, with will replace by fifth argument _urlDynamicParts.
         * fifth argument _urlDynamicParts if in url you went to put some ids this ids will be replaced by _urlDynamicParts.
         */
        return await zAxiosApiRequest<T>({
          _url,
          _method: 'get',
          _isAuthenticatedRequest: _authenticated,
          _data: undefined,
          _itemIds: _itemsIds,
          _urlDynamicParts
        });
      }
    },
    // onSuccess: _data => {
    //   // onSucceed dismissing loader...
    //   zAppWiseIonicLoaderIsOpenedRSelector &&
    //     _showLoader &&
    //     void dismissZIonLoader();
    //   // zConsoleLog({
    //   // message:
    //   // 'From ZaionsHook -> useZRQCreateRequest -> useQuery -> onSuccess',
    //   // data: _data,
    //   // });
    // },
    // onError: async _error => {
    //   // need to dismiss the loader first, then showing error just so, user will not get redirected to login without knowing that there was a authenticated error
    //   // OnError dismissing loader...
    //   zAppWiseIonicLoaderIsOpenedRSelector &&
    //     _showLoader &&
    //     void dismissZIonLoader();

    //   if (_error instanceof AxiosError) {
    //     const __error = (_error as AxiosError)?.response;
    //     const __errorMessage = (__error?.data as { errors: { item: string[] } })
    //       ?.errors?.item[0];
    //     // check if it's unauthenticated error
    //     if (__error?.status && __error?.status === errorCodes.unauthenticated) {
    //       // clear localstorage
    //       await clearAuthDataFromLocalStorageAndRecoil(resetUserAccountState);

    //       window.location.replace(ZaionsRoutes.LoginRoute);

    //       // showInfoNotification(MESSAGES.Login.loginExpiredMessage);
    //     } else if (__error?.status === errorCodes.notFound) {
    //       const __data = {
    //         message: __errorMessage || 'Not found',
    //         status: __error?.status
    //       };
    //       void STORAGE.SET(LOCALSTORAGE_KEYS.ERROR_DATA, __data);

    //       // redirect to 404
    //       // window.location.replace(ZaionsRoutes.Error.Z404);
    //     } else {
    //       // showing error alert...
    //       _showAlertOnError && void presentZIonErrorAlert();
    //     }
    //   } else {
    //     // showing error alert...
    //     _showAlertOnError && void presentZIonErrorAlert();
    //   }

    //   // throw the request_failed error
    //   _showAlertOnError && reportCustomError(_error);
    // },
    select: data => {
      if (_shouldExtractData) {
        switch (_extractType) {
          case ZRQGetRequestExtractEnum.extractItems:
            return (data as unknown as { data: { items: T } })?.data?.items;

          case ZRQGetRequestExtractEnum.extractItem:
            return (data as unknown as { data: { item: T } })?.data?.item;

          case ZRQGetRequestExtractEnum.extractData:
            return (data as unknown as { data: T })?.data;

          default:
            return data;
        }
      }
    },
    refetchOnWindowFocus: _queryOptions.refetchOnWindowFocus,
    networkMode: _queryOptions.networkMode,
    retry: _queryOptions.retry,
    staleTime: _staleTime
  });

  if (_response?.error !== null && _response?.error !== undefined) {
    void (async () => {
      const error = _response.error;
      // need to dismiss the loader first, then showing error just so, user will not get redirected to login without knowing that there was a authenticated error
      // OnError dismissing loader...
      void (
        zAppWiseIonicLoaderIsOpenedRSelector &&
        _showLoader &&
        dismissZIonLoader()
      );

      if (error instanceof AxiosError) {
        const _error = (error as AxiosError)?.response;
        const _errorMessage = (_error?.data as { errors: { item: string[] } })
          ?.errors?.item[0];
        // check if it's unauthenticated error
        if (
          _error?.status !== null &&
          _error?.status === errorCodes.unauthenticated
        ) {
          // clear localstorage
          await clearAuthDataFromLocalStorageAndRecoil(resetUserAccountState);

          window.location.replace(ZaionsRoutes.LoginRoute);

          // showInfoNotification(MESSAGES.Login.loginExpiredMessage);
        } else if (_error?.status === errorCodes.notFound) {
          const _data = {
            message: _errorMessage ?? 'Not found',
            status: _error?.status
          };
          void STORAGE.SET(LOCALSTORAGE_KEYS.ERROR_DATA, _data);

          // redirect to 404
          // window.location.replace(ZaionsRoutes.Error.Z404);
        } else {
          // showing error alert...
          void (_showAlertOnError && presentZIonErrorAlert());
        }
      } else {
        // showing error alert...
        void (_showAlertOnError && presentZIonErrorAlert());
      }

      // throw the request_failed error
      _showAlertOnError && reportCustomError(error);
    })();
  }

  if (_response?.data !== null) {
    // onSucceed dismissing loader...
    void (
      zAppWiseIonicLoaderIsOpenedRSelector &&
      _showLoader &&
      dismissZIonLoader()
    );
    // zConsoleLog({
    // message:
    // 'From ZaionsHook -> useZRQCreateRequest -> useQuery -> onSuccess',
    // data: _data,
    // });
  }

  return _response;
};

export const useZInfiniteQuery = <T>({
  _url,
  _key,
  _itemsIds,
  _urlDynamicParts,
  _shouldFetchWhenIdPassed,
  _authenticated,
  _showLoader = true,
  _shouldExtractData = true,
  _extractType = ZRQGetRequestExtractEnum.extractItems,
  _staleTime = 10 * 60000,
  _checkPermissions = true,
  _showAlertOnError = true,
  _initialPageParam = 0,
  _pageParam = 0,
  _queryOptions = {
    refetchOnWindowFocus: false,
    networkMode: 'offlineFirst',
    retry: 2
  }
}: {
  _url: API_URL_ENUM;
  _key: string[];
  _shouldExtractData?: boolean;
  _extractType?: ZRQGetRequestExtractEnum;
  _authenticated?: boolean;
  _showLoader?: boolean;
  _itemsIds?: string[];
  _urlDynamicParts?: string[];
  _shouldFetchWhenIdPassed?: boolean;
  _staleTime?: number | typeof Infinity;
  _checkPermissions?: boolean;
  _showAlertOnError?: boolean;
  _initialPageParam?: number;
  _pageParam?: number;

  _queryOptions?: {
    refetchOnWindowFocus?: boolean;
    networkMode?: 'always' | 'offlineFirst' | 'online';
    retry?: number;
  };
}): UseInfiniteQueryResult<
  T | InfiniteData<T | null | undefined> | undefined,
  Error
> => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const resetUserAccountState = useResetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  const zAppWiseIonicLoaderIsOpenedRSelector = useRecoilValue(
    appWiseIonicLoaderIsOpenedRSelector
  );
  const { permissionsChecker } = useZPermissionChecker();

  const _response = useInfiniteQuery({
    queryKey: [..._key],
    queryFn: async (): Promise<T | undefined | null> => {
      if (_checkPermissions) {
        const _permissionsCheckerResult = await permissionsChecker();
        if (_permissionsCheckerResult !== null) {
          if (
            !(_permissionsCheckerResult as { hasAllPermissions: boolean })
              ?.hasAllPermissions
          ) {
            return null;
          }
        }
      }

      if (
        _shouldFetchWhenIdPassed === true &&
        _shouldFetchWhenIdPassed !== undefined &&
        _shouldFetchWhenIdPassed !== null
      ) {
        return null;
      } else {
        // Present ion loading before api start
        !zAppWiseIonicLoaderIsOpenedRSelector &&
          _showLoader &&
          (await presentZIonLoader(
            _itemsIds?.length !== null
              ? MESSAGES.GENERAL.API_REQUEST.FETCHING_SINGLE_DATA
              : MESSAGES.GENERAL.API_REQUEST.FETCHING
          ));

        /**
         * @_url - takes the get url to fetch data from api.
         *  second argument take the method (post | get | update | delete). as this is the get api data so it  will be get
         * !second argument must be get because this hook is used to get data.
         * third argument is if this is the authenticated request or not.
         * fourth argument _itemIds if in url you went to put some ids, with will replace by fifth argument _urlDynamicParts.
         * fifth argument _urlDynamicParts if in url you went to put some ids this ids will be replaced by _urlDynamicParts.
         * @return return the data from api.
         */
        return await zAxiosApiRequest<T>({
          _url,
          _method: 'get',
          _isAuthenticatedRequest: _authenticated,
          _data: undefined,
          _itemIds: _itemsIds,
          _urlDynamicParts
        });
      }
    },
    initialPageParam: _initialPageParam,

    getPreviousPageParam: data => {
      return (data as { previousId: unknown })?.previousId ?? undefined;
    },
    getNextPageParam: (data, pages) => {
      const pagesIndex = Array.from(
        pages,
        el =>
          (el as unknown as { data: { currentPage: number } })?.data
            ?.currentPage
      );
      // console.log({ pagesIndex, _pageParam });

      if (
        pagesIndex !== undefined &&
        pagesIndex !== null &&
        !pagesIndex?.includes(_pageParam)
      ) {
        return true;
      }
      return false;
    },
    select: data => {
      const _data = data as { pages: unknown[]; pageParams: number[] };

      // _data?.pages?.map(el => el)
      const _items = Array.from(_data?.pages, el => [
        ...(el as { data: { items: unknown[] } })?.data?.items
      ]);
      console.log({ _items });
      if (_shouldExtractData) {
        switch (_extractType) {
          case ZRQGetRequestExtractEnum.extractItems:
            return (data as unknown as { pages: { data: { items: T } } })?.pages
              ?.data?.items;

          case ZRQGetRequestExtractEnum.extractItem:
            return (data as unknown as { pages: { data: { item: T } } })?.pages
              ?.data?.item;

          case ZRQGetRequestExtractEnum.extractData:
            return (data as unknown as { pages: { data: T } })?.pages?.data;

          case ZRQGetRequestExtractEnum.extractPage:
            return (data as unknown as { pages: T })?.pages;

          default:
            return data;
        }
      }
    },
    refetchOnWindowFocus: _queryOptions.refetchOnWindowFocus,
    networkMode: _queryOptions.networkMode,
    retry: _queryOptions.retry,
    staleTime: _staleTime
  });

  if (_response?.error !== undefined && _response?.error !== null) {
    void (async () => {
      const error = _response.error;
      // need to dismiss the loader first, then showing error just so, user will not get redirected to login without knowing that there was a authenticated error
      // OnError dismissing loader...
      void (
        zAppWiseIonicLoaderIsOpenedRSelector &&
        _showLoader &&
        dismissZIonLoader()
      );

      if (error instanceof AxiosError) {
        const _error = (error as AxiosError)?.response;
        const _errorMessage = (_error?.data as { errors: { item: string[] } })
          ?.errors?.item[0];
        console.log({ __errorMessage: _errorMessage });
        // check if it's unauthenticated error
        if (
          _error?.status !== undefined &&
          _error?.status === errorCodes.unauthenticated
        ) {
          // clear localstorage
          await clearAuthDataFromLocalStorageAndRecoil(resetUserAccountState);

          window.location.replace(ZaionsRoutes.LoginRoute);

          // showInfoNotification(MESSAGES.Login.loginExpiredMessage);
        } else if (_error?.status === errorCodes.notFound) {
          const _data = {
            message: _errorMessage ?? 'Not found',
            status: _error?.status
          };
          void STORAGE.SET(LOCALSTORAGE_KEYS.ERROR_DATA, _data);

          // redirect to 404
          window.location.replace(ZaionsRoutes.Error.Z404);
        } else {
          // showing error alert...
          void (_showAlertOnError && presentZIonErrorAlert());
        }
      } else {
        // showing error alert...
        void (_showAlertOnError && presentZIonErrorAlert());
      }

      // throw the request_failed error
      _showAlertOnError && reportCustomError(error);
    })();
  }

  if (_response?.data !== undefined) {
    // onSucceed dismissing loader...
    void (
      zAppWiseIonicLoaderIsOpenedRSelector &&
      _showLoader &&
      dismissZIonLoader()
    );
    // zConsoleLog({
    // message:
    // 'From ZaionsHook -> useZRQCreateRequest -> useQuery -> onSuccess',
    // data: _data,
    // });
  }

  return _response;
};

/**
 * The custom hook for create data from an API using useQuery hook from react-query package.
 * @param _url URL of the API for create data.
 * @param _queriesKeysToInvalidate _queriesKeysToInvalidate param means queryKey of the useQuery to invalidate query.
 * query.
 * @returns return an presentZIonErrorAlert and error if not succeed. if success then a new recode will created.
 */
export const useZRQCreateRequest = <T>({
  _url,
  _queriesKeysToInvalidate,
  _authenticated,
  _itemsIds,
  _urlDynamicParts,
  _contentType = zAxiosApiRequestContentType.Json,
  _showAlertOnError = true,
  _showLoader = true,
  _loaderMessage = MESSAGES.GENERAL.API_REQUEST.CREATING
}: {
  _url: API_URL_ENUM;
  _queriesKeysToInvalidate?: QueryFilters | QueryKey;
  _authenticated?: boolean;
  _itemsIds?: string[];
  _urlDynamicParts?: string[];
  _contentType?: zAxiosApiRequestContentType;
  _showAlertOnError?: boolean;
  _showLoader?: boolean;
  _loaderMessage?: string;
}): UseMutationResult<T | undefined, Error, string | FormData, void> => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  // const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const queryClient = useQueryClient();
  const resetUserAccountState = useResetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  // const { getRQCDataHandler } = useZGetRQCacheData();

  // const _roleAndPermissions = getRQCDataHandler({
  // key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.ROLE_PERMISSIONS],
  // });

  return useMutation({
    mutationFn: async (
      _requestData: string | FormData
    ): Promise<T | undefined> => {
      // if (_permissions && _permissions?.length > 0) {
      // const userPermissions =
      // currentLoggedInUserRoleAndPermissionsStateAtom?.permissions;
      // // const haveRequiredPermission = userPermissions?.includes(havePermission);
      // const haveRequiredPermission = _permissions.every((el) =>
      // userPermissions?.includes(el)
      // );

      // if (haveRequiredPermission === false) {
      // return undefined;
      // }
      // }

      // Present ion loading before api start
      // await presentZIonLoader(_loaderMessage);
      /**
       * @_url - takes the post url to post data to api.
       *  second argument take the method (post | get | update | delete). as this is the post api so it  will be post
       * !second argument must be post because this hook is used to create data.
       * third argument is if this is the authenticated request or not.
       * @return return the data from api.
       */
      return await zAxiosApiRequest<T>({
        _url,
        _method: 'post',
        _isAuthenticatedRequest: _authenticated,
        _data: _requestData,
        _itemIds: _itemsIds,
        _urlDynamicParts,
        _contentType
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries(_queriesKeysToInvalidate as QueryFilters);
    },
    onSuccess: async _data => {
      // onSucceed dismissing loader...
      // await (_showLoader && dismissZIonLoader());
      if (_queriesKeysToInvalidate !== undefined) {
        await queryClient.invalidateQueries({
          queryKey: _queriesKeysToInvalidate as QueryKey
        });
      }
    },
    onError: async _error => {
      // OnError dismissing loader...
      // void (_showLoader && dismissZIonLoader());

      // showing error alert...
      void (_showAlertOnError && presentZIonErrorAlert());

      // throw the request_failed error
      _showAlertOnError && reportCustomError(_error);

      // check if it's unauthenticated error
      const errorCode = (_error as AxiosError)?.response?.status;
      if (errorCode !== undefined && errorCode === errorCodes.unauthenticated) {
        // clear localstorage
        await clearAuthDataFromLocalStorageAndRecoil(resetUserAccountState);
      } else if (errorCode === errorCodes.tooManyRequests) {
        showErrorNotification(MESSAGES.GENERAL.TOO_MANY_REQUESTS);
      }
    },

    networkMode: 'offlineFirst' // will remove later
  });
};

/**
 * The custom hook for updating recode from an API using useQuery hook from react-query package.
 * @param _url URL of the API for update recode.
 * @param _queriesKeysToInvalidate _queriesKeysToInvalidate param means queryKey of the useQuery to invalidate query.
 * query.
 * @returns return an presentZIonErrorAlert and error if not succeed. if success then a recode will updated.
 */
export const useZRQUpdateRequest = <T>({
  _url,
  _queriesKeysToInvalidate,
  authenticated,
  _contentType = zAxiosApiRequestContentType.Json,
  _showAlertOnError = true,
  _showLoader = true,
  _loaderMessage = MESSAGES.GENERAL.API_REQUEST.UPDATING
}: {
  _url: API_URL_ENUM;
  _queriesKeysToInvalidate?: QueryFilters | QueryKey;
  authenticated?: boolean;
  _contentType?: zAxiosApiRequestContentType;
  _showAlertOnError?: boolean;
  _showLoader?: boolean;
  _loaderMessage?: string;
}): UseMutationResult<
  T | undefined,
  Error,
  {
    itemIds: string[];
    urlDynamicParts: string[];
    requestData: string;
  },
  void
> => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const queryClient = useQueryClient();
  const resetUserAccountState = useResetRecoilState(
    ZaionsUserAccountRStateAtom
  );
  return useMutation({
    mutationFn: async ({
      // Please note, the "itemIds" & "urlDynamicParts" array length should be equal, mean, if you pass 4 ids in "itemIds", then you need to pass 4 strings representing the dynamic parts in "urlDynamicParts" array, so we can replace all dynamic/id parts with the respective IDs properly.
      // the way how we replace the IDs is simple, the first index in "itemIds" will replace the first id defined in "urlDynamicParts" in the url.
      // e.g:
      /*
       * Url: https://localhost/api/:id1/something/:id2 ...
       * itemIds: [1,2]
       * urlDynamicParts: [':id1', ':id2']
       * finalUrl: https://localhost/api/1/something/2 ...
       */
      itemIds, // this will be array of ids which we need to replace in url with the "urlDynamicParts"
      urlDynamicParts, // this will be array of strings defining the "dynamic/id" parts in url, which will get replaced with the itemIds passed above.
      requestData
    }: {
      itemIds: string[];
      urlDynamicParts: string[];
      requestData: string;
    }): Promise<T | undefined> => {
      // Present ion loading before api start
      _showLoader && (await presentZIonLoader(_loaderMessage));
      /**
       * @_url - takes the post url to post data to api.
       *  second argument take the method (post | get | update | delete). as this is the put api for updating so it  will be put
       * !second argument must be put because this hook is used to update data.
       * third argument is if this is the authenticated request or not.
       * @return return the data from api.
       */
      // const generateEditURl =
      return await zAxiosApiRequest({
        _url,
        _method: 'put',
        _isAuthenticatedRequest: authenticated,
        _data: requestData,
        _itemIds: itemIds,
        _urlDynamicParts: urlDynamicParts,
        _contentType
      });
    },
    onMutate: () => {
      void queryClient.cancelQueries(_queriesKeysToInvalidate as QueryFilters);
    },
    onSuccess: _data => {
      // onSucceed dismissing loader...
      void (_showLoader && dismissZIonLoader());
      if (_queriesKeysToInvalidate !== undefined) {
        void queryClient.invalidateQueries({
          queryKey: _queriesKeysToInvalidate as QueryKey
        });
      }
    },
    onError: async _error => {
      // OnError dismissing loader...
      void (_showLoader && dismissZIonLoader());

      // showing error alert...
      void (_showAlertOnError && presentZIonErrorAlert());
      // TODO create a helper function to throw a ZCustomError so if we add sentry or some other error logging then it will be easy to track that as well

      // throw the request_failed error
      _showAlertOnError && reportCustomError(_error);

      // check if it's unauthenticated error
      const errorCode = (_error as AxiosError)?.response?.status;
      if (errorCode !== undefined && errorCode === errorCodes.unauthenticated) {
        // clear localstorage
        await clearAuthDataFromLocalStorageAndRecoil(resetUserAccountState);
      }
    },

    networkMode: 'offlineFirst' // will remove later
  });
};

/**
 * The custom hook for deleting recode from an API using useQuery hook from react-query package.
 * @param _url URL of the API for deleting recode.
 * @param _queriesKeysToInvalidate _queriesKeysToInvalidate param means queryKey of the useQuery to invalidate query.
 * query.
 * @returns return an presentZIonErrorAlert and error if not succeed. if success then a recode will deleted.
 */
export const useZRQDeleteRequest = <T>({
  _url,
  _queriesKeysToInvalidate,
  _authenticated,
  _showAlertOnError = true,
  _showLoader = true,
  _loaderMessage = MESSAGES.GENERAL.API_REQUEST.DELETING
}: {
  _url: API_URL_ENUM;
  _queriesKeysToInvalidate?: QueryFilters;
  _authenticated?: boolean;
  _showAlertOnError?: boolean;
  _showLoader?: boolean;
  _loaderMessage?: string;
}): UseMutationResult<
  T | undefined,
  Error,
  {
    itemIds: string[];
    urlDynamicParts: string[];
  },
  void
> => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const queryClient = useQueryClient();
  const resetUserAccountState = useResetRecoilState(
    ZaionsUserAccountRStateAtom
  );

  return useMutation({
    mutationFn: async ({
      itemIds,
      urlDynamicParts
    }: {
      itemIds: string[];
      urlDynamicParts: string[];
    }): Promise<T | undefined> => {
      // Present ion loading before api start
      _showLoader && (await presentZIonLoader(_loaderMessage));

      /**
       * @_url - takes the post url to post data to api.
       *  second argument take the method (post | get | update | delete). as this is the delete api so it  will be delete
       * !second argument must be delete because this hook is used to delete data.
       * third argument is if this is the authenticated request or not.
       * @return return the data from api.
       */
      // const generateEditURl =
      return await zAxiosApiRequest({
        _url,
        _method: 'delete',
        _isAuthenticatedRequest: _authenticated,
        _data: undefined,
        _itemIds: itemIds,
        _urlDynamicParts: urlDynamicParts
      });
    },
    onMutate: () => {
      void queryClient.cancelQueries(_queriesKeysToInvalidate);
    },
    onSuccess: _data => {
      // onSucceed dismissing loader...
      void (_showLoader && dismissZIonLoader());
      if (_queriesKeysToInvalidate !== undefined) {
        void queryClient.invalidateQueries({
          queryKey: _queriesKeysToInvalidate as QueryKey
        });
      }
    },
    onError: async _error => {
      // OnError dismissing loader...
      void (_showLoader && dismissZIonLoader());

      // showing error alert...
      void (_showAlertOnError && presentZIonErrorAlert());
      // TODO create a helper function to throw a ZCustomError so if we add sentry or some other error logging then it will be easy to track that as well

      // throw the request_failed error
      reportCustomError(_error);

      // check if it's unauthenticated error
      const errorCode = (_error as AxiosError)?.response?.status;
      if (errorCode !== undefined && errorCode === errorCodes.unauthenticated) {
        // clear localstorage
        await clearAuthDataFromLocalStorageAndRecoil(resetUserAccountState);
      }
    }
  });
};

export const useZInvalidateReactQueries = ():
  | {
      zInvalidateReactQueries: (
        _queriesKeysToInvalidate?: string[]
      ) => Promise<void>;
    }
  | {
      zInvalidateReactQueries: () => void;
    } => {
  const queryClient = useQueryClient();
  try {
    const zInvalidateReactQueries = async (
      _queriesKeysToInvalidate?: string[]
    ): Promise<void> => {
      await queryClient.invalidateQueries({
        queryKey: _queriesKeysToInvalidate
      });
    };

    return { zInvalidateReactQueries };
  } catch (error) {
    reportCustomError(error);
    return { zInvalidateReactQueries: emptyVoidReturnFunction };
  }
};

// Update data in React-Query
export const useZUpdateRQCacheData = (): {
  updateRQCDataHandler: <T>({
    key,
    data,
    id,
    updateHoleData,
    extractType
  }: {
    key: string | string[];
    id: string;
    data: T;
    updateHoleData?: boolean | undefined;
    extractType?: ZRQGetRequestExtractEnum | undefined;
  }) => unknown;
} => {
  try {
    const queryClient = useQueryClient();

    const updateRQCDataHandler = <T>({
      key,
      data,
      id,
      updateHoleData = false,
      extractType = ZRQGetRequestExtractEnum.extractItems
    }: {
      key: string | string[];
      id: string;
      data: T;
      updateHoleData?: boolean;
      extractType?: ZRQGetRequestExtractEnum;
    }): unknown => {
      if (updateHoleData) {
        queryClient.setQueryData([...key], (oldData: unknown) => {
          const updatedData = structuredClone(oldData);
          if (updatedData !== undefined) {
            switch (extractType) {
              case ZRQGetRequestExtractEnum.extractItem:
                (updatedData as { data: { item: T } }).data.item = data;
                break;

              case ZRQGetRequestExtractEnum.extractItems:
                (updatedData as { data: { items: T } }).data.items = data;
                break;
            }
          }

          return updatedData;
        });
      } else {
        const _res = queryClient.setQueryData([...key], (oldData: unknown) => {
          if (oldData !== undefined) {
            if (Array.isArray(oldData)) {
              const updatedData = [...oldData];
              const index = updatedData.findIndex(el => el.id === id);
              if (index !== -1) {
                updatedData[index] = data;
              }
              return updatedData;
            } else if (typeof oldData === 'object') {
              const updatedData = structuredClone(oldData);
              const actualDataItems = (
                updatedData as { data: { items: unknown[] } }
              )?.data?.items;
              if (
                actualDataItems !== undefined &&
                Array.isArray(actualDataItems) &&
                actualDataItems.length > 0
              ) {
                const updatedDataItems = [...actualDataItems];
                const index = updatedDataItems.findIndex(
                  (el: unknown) => (el as { id: string })?.id === id
                );
                if (index !== -1) {
                  updatedDataItems[index] = data;
                }
                (updatedData as { data: { items: unknown[] } }).data.items =
                  updatedDataItems;
              }
              return updatedData;
            }
          }
          return oldData;
        });

        return _res;
      }
    };

    return { updateRQCDataHandler };
  } catch (error) {
    reportCustomError(error);
    return { updateRQCDataHandler: emptyVoidReturnFunction };
  }
};

/**
 * Get data from React-query cache.
 * Made this hook just because to use QueryClient.getQueryData in one place so if in feature we change it, just have to change this in this hook. (as same for all above).
 * @param
 * id: string
 * @return
 * getRQCDataHandler: <T>(key: string[]): T|undefined
 */
export const useZGetRQCacheData = ():
  | {
      getRQCDataHandler: <T>({ key }: { key: string[] }) => T | undefined;
    }
  | {
      getRQCDataHandler: () => void;
    } => {
  try {
    const QueryClient = useQueryClient();

    const getRQCDataHandler = <T>({
      key
    }: {
      key: string[];
    }): T | undefined => {
      const _res = QueryClient.getQueryData<T>(key);

      return _res;
    };

    return { getRQCDataHandler };
  } catch (error) {
    reportCustomError(error);
    return { getRQCDataHandler: emptyVoidReturnFunction };
  }
};

/**
 * Remove data from React-query cache.
 * Made this hook just because to use QueryClient.removeQueries in one place so if in feature we change it, just have to change this in this hook. (as same for all above).
 * @param
 * pass the key: string[] in removeRQCDataHandler
 * @return
 * removeRQCDataHandler: ({ key }: { key: string[]; }) => void
 */
export const useZRemoveRQCacheData = (): {
  removeRQCDataHandler: ({ key }: { key: string[] }) => void;
} => {
  try {
    const QueryClient = useQueryClient();

    const removeRQCDataHandler = ({ key }: { key: string[] }): void => {
      QueryClient.removeQueries({
        queryKey: key,
        exact: true
      });
    };

    return { removeRQCDataHandler };
  } catch (error) {
    reportCustomError(error);
    return { removeRQCDataHandler: emptyVoidReturnFunction };
  }
};
