/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { Suspense, useEffect } from 'react';
/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZFallbackIonSpinner from '@/components/CustomComponents/FallbackSpinner';
import Z401View from '@/components/Errors/401';
import Z500View from '@/components/Errors/500';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZPrivateRouteChecker } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import { API_URL_ENUM } from '@/utils/enums';
import { ZErrorCodeEnum } from '@/utils/enums/ErrorsCodes';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { UserRoleAndPermissionsInterface } from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import {
	currentLoggedInUserRoleAndPermissionsRStateAtom,
	IsAuthenticatedRStateSelector,
} from '@/ZaionsStore/UserAccount/index.recoil';
import { reportCustomError } from '@/utils/customErrorType';

interface IFetchRequiredAppDataHOCProps {
	children?: React.ReactNode;
}

/**
 * data we can fetch here (can be much more)
 * user permission
 * firebase
 *  remote config
 */
const FetchRequiredAppDataHOC: React.FC<IFetchRequiredAppDataHOCProps> = ({
	children,
}) => {
	return (
		<Suspense fallback={<ZFallbackIonSpinner />}>
			<FetchRequiredAppDataHOCAsync>{children}</FetchRequiredAppDataHOCAsync>
		</Suspense>
	);
};

const FetchRequiredAppDataHOCAsync: React.FC<IFetchRequiredAppDataHOCProps> = ({
	children,
}) => {
	const [compState, setCompState] = React.useState<{
		isProcessing: boolean;
		userIsAuthenticated: boolean;
		errorOccurred: boolean;
		guestUser: boolean;
		errorCode: string; // use enum or whatever so you know which component to show
	}>({
		isProcessing: true,
		userIsAuthenticated: false,
		errorOccurred: false,
		guestUser: false,
		errorCode: '',
	});

	const loggedIn = useRecoilValue(IsAuthenticatedRStateSelector);
	// recoil state for storing current user roles & permissions.
	const setUserRoleAndPermissions = useSetRecoilState(
		currentLoggedInUserRoleAndPermissionsRStateAtom
	);

	const { zIsPrivateRoute } = useZPrivateRouteChecker();

	// #region APIS.
	// getting the role & permissions of the current log in user.
	const {
		data: getUserRoleAndPermissions,
		refetch: refetchUserRoleAndPermissions,
		isFetched: isUserRoleAndPermissionsFetching,
	} = useZRQGetRequest<{
		isSuccess: boolean;
		result: UserRoleAndPermissionsInterface;
	}>({
		_url: API_URL_ENUM.getUserRolePermission,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.ROLE_PERMISSIONS],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
		_shouldFetchWhenIdPassed: !loggedIn || !zIsPrivateRoute,
		_checkPermissions: false,
	});
	// #endregion

	useEffect(() => {
		if (!zIsPrivateRoute) {
			setCompState((oldState) => ({
				...oldState,
				isProcessing: false,
				userIsAuthenticated: false,
				guestUser: true,
			}));
		}
	}, [zIsPrivateRoute]);

	useEffect(() => {
		try {
			if (getUserRoleAndPermissions?.isSuccess) {
				// Storing in recoil.
				setUserRoleAndPermissions((oldValues) => ({
					...oldValues,
					role: getUserRoleAndPermissions.result.role,
					permissions: getUserRoleAndPermissions.result.permissions,
					fetched: true,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [getUserRoleAndPermissions]);

	useEffect(() => {
		refetchUserRoleAndPermissions();
		if (loggedIn && !isUserRoleAndPermissionsFetching) {
			setCompState((oldState) => ({
				...oldState,
				isProcessing: false,
				userIsAuthenticated: true,
				guestUser: false,
			}));
		}
	}, [loggedIn, isUserRoleAndPermissionsFetching]);

	if (compState.isProcessing) {
		return <ZFallbackIonSpinner />;
	} else if (
		!compState.isProcessing &&
		((!compState.errorOccurred && compState.userIsAuthenticated) ||
			compState.guestUser)
	) {
		return <>{children}</>;
	} else if (
		!compState.isProcessing &&
		compState.errorOccurred &&
		compState.errorCode === ZErrorCodeEnum.unauthorized
	) {
		return <Z401View />;
	} else {
		return <Z500View />;
	}
};

export default FetchRequiredAppDataHOC;
