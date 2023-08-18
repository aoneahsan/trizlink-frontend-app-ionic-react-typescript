import { permissionsEnum } from '@/utils/enums/RoleAndPermissions';
import { currentLoggedInUserRoleAndPermissionsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import {
	useZIonToastSuccess,
	useZIonToastDanger,
	useZIonSuccessAlert,
	useZIonErrorAlert,
} from '@/ZaionsHooks/zionic-hooks';
import { notificationTypeEnum } from '@/utils/enums';
import { reportCustomError, ZCustomError } from '@/utils/customErrorType';
import {
	showErrorNotification,
	showSuccessNotification,
} from '@/utils/notification';
import {
	useZMediaQueryScaleReturnInterface,
	zNotificationInterface,
	zNotificationSlotEnum,
} from '@/types/CustomHooks/zgeneric-hooks.type';
import { useMediaQuery } from 'react-responsive';
import {
	BRACKPOINT_MD,
	BRACKPOINT_XL,
	BRACKPOINT_LG,
	BRACKPOINT_SM,
	BRACKPOINT_XS,
} from '@/utils/constants';
import { useLocation } from 'react-router';
import {
	emptyVoidReturnFunction,
	ZGetCurrentRoute,
	ZGetRoutePermissions,
} from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import { useRecoilValue } from 'recoil';

export const useZNotification = () => {
	const { presentZIonToastDanger } = useZIonToastDanger();
	const { presentZIonToastSuccess } = useZIonToastSuccess();

	const { presentZIonSuccessAlert } = useZIonSuccessAlert();
	const { presentZIonErrorAlert } = useZIonErrorAlert();

	const presentZNotification = async ({
		message,
		notificationType,
		slot,
	}: zNotificationInterface) => {
		try {
			switch (notificationType) {
				case notificationTypeEnum.toast:
					if (slot === zNotificationSlotEnum.error) {
						return await presentZIonToastDanger(message);
					} else {
						return await presentZIonToastSuccess(message);
					}

				case notificationTypeEnum.sideNotification:
					if (slot === zNotificationSlotEnum.error) {
						return showErrorNotification(message);
					} else {
						return showSuccessNotification(message);
					}

				case notificationTypeEnum.alert:
					if (slot === zNotificationSlotEnum.success) {
						return await presentZIonSuccessAlert();
					} else if (slot === zNotificationSlotEnum.error) {
						return await presentZIonErrorAlert();
					}
					break;

				default:
					if (slot === zNotificationSlotEnum.error) {
						return await presentZIonToastDanger(message);
					} else {
						return await presentZIonToastSuccess(message);
					}
			}
		} catch (error) {
			reportCustomError(error);
		}
	};

	return { presentZNotification };
};

/**
 * A custom hook to determine the media query scale of the screen.
 * @returns an object with boolean values for each defined media scale.
 */
export const useZMediaQueryScale = (): useZMediaQueryScaleReturnInterface => {
	// Check if the screen width is at extra-large (xl) scale
	const isXlScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XL})`,
	});

	// Check if the screen width is at 1300px scale
	const is1300pxScale = useMediaQuery({
		query: `(min-width: 1300px)`,
	});

	// Check if the screen width is at 1250px scale
	const is1250pxScale = useMediaQuery({
		query: `(min-width: 1250px)`,
	});

	// Check if the screen width is at 1200px scale
	const is1200pxScale = useMediaQuery({
		query: `(min-width: 1200px)`,
	});

	// Check if the screen width is at 1150px scale
	const is1150pxScale = useMediaQuery({
		query: `(min-width: 1150px)`,
	});

	// Check if the screen width is at 1100px scale
	const is1100pxScale = useMediaQuery({
		query: `(min-width: 1100px)`,
	});

	// Check if the screen width is at large (lg) scale
	const isLgScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_LG})`,
	});

	// Check if the screen width is at medium (md) scale
	const isMdScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_MD})`,
	});

	// Check if the screen width is at small (sm) scale
	const isSmScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_SM})`,
	});

	// Check if the screen width is at extra small (xs) scale
	const isXsScale = useMediaQuery({
		query: `(min-width: ${BRACKPOINT_XS})`,
	});

	return {
		isXlScale,
		isLgScale,
		isMdScale,
		isSmScale,
		isXsScale,
		is1300pxScale,
		is1200pxScale,
		is1250pxScale,
		is1150pxScale,
		is1100pxScale,
	};
};

/**
 * A custom React hook that provides a permissions checker function to determine if the current user
 * has the required permissions for the current route. It relies on the user's roles and permissions,
 * as well as the defined route permissions.
 *
 * @returns An object containing the permissions checker function.
 */
export const useZPermissionChecker = (): {
	permissionsChecker: () => Promise<{
		hasAllPermissions: boolean;
		permissions: permissionsEnum[];
	}> | void;
} => {
	try {
		// for getting pathname from location.
		const __location = useLocation();

		// getting current users permissions.
		const currentUserAllPermissions = useRecoilValue(
			currentLoggedInUserRoleAndPermissionsRStateAtom
		);

		/**
		 * Asynchronous function to check if the current user has all the required permissions for the current route.
		 * @returns A promise that resolves to an object with information about whether the user has all permissions and the associated permissions list.
		 */
		const permissionsChecker = async (): Promise<{
			hasAllPermissions: boolean;
			permissions: permissionsEnum[];
		}> => {
			try {
				/**
				 * An array of permission enums associated with the current route.
				 */
				let permissions: permissionsEnum[] = [];

				//
				const result = await new Promise<boolean>((res, _) => {
					/**
					 * A boolean indicating if the user has all the required permissions for the current route.
					 */
					let _hasAllPermissions = false;

					if (__location.pathname) {
						/**
						 * getting current route from url and checking if exist in ZaionsRoutes then return that route from ZaionsRoutes
						 */
						const __currentRoute = ZGetCurrentRoute({
							_currentUrl: __location.pathname,
							_routesObj: ZaionsRoutes,
						});

						if (__currentRoute) {
							// getting permissions of that routes.
							const __permissions = ZGetRoutePermissions({
								_currentRoute: __currentRoute,
							});

							if (__permissions && __permissions.length) {
								const userPermissions = currentUserAllPermissions?.permissions
									?.length
									? [...currentUserAllPermissions.permissions]
									: [];

								// checking if users has all the permission of that to asses it.
								const haveRequiredPermission = __permissions.every((el) =>
									userPermissions?.includes(el)
								);

								permissions = [...__permissions];
								_hasAllPermissions = haveRequiredPermission;
							}
						} else {
							new ZCustomError({
								message:
									'useZPermissionChecker: __currentRoute is undefined. :(',
							});
						}
					} else {
						new ZCustomError({
							message:
								'useZPermissionChecker: filed to fetch pathname from location. :(',
						});
					}
					res(_hasAllPermissions);
				});

				/**
				 * In the end. the permissionsChecker will return route permissions and user has all permissions or not.
				 */
				return { hasAllPermissions: result, permissions };
			} catch (error) {
				reportCustomError(error);
				return { hasAllPermissions: false, permissions: [] };
			}
		};

		//
		return { permissionsChecker };
	} catch (error) {
		if (error instanceof ZCustomError || error instanceof Error) {
			alert(error.message);
		}
		reportCustomError(error);
		return { permissionsChecker: emptyVoidReturnFunction };
		// return { hasAllPermissions: false, permissions: [] };
	}
};
