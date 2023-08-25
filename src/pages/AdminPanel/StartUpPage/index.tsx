/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import { ZIonContent, ZIonLoading } from '@/components/ZIonComponents';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { API_URL_ENUM } from '@/utils/enums';
import CONSTANTS from '@/utils/constants';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { UserRoleAndPermissionsInterface } from '@/types/UserAccount/index.type';
import { useSetRecoilState } from 'recoil';
import { currentLoggedInUserRoleAndPermissionsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import { reportCustomError } from '@/utils/customErrorType';

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
 * About: (Info of component here...)
 * @type {*}
 * */

const ZAppStartupPage: React.FC = () => {
	//
	const [loadingIsOpen, setLoadingIsOpen] = useState(true);

	// recoil state for storing current user roles & permissions.
	const setCurrentLoginUserRoleAndPermissionsStateAtom = useSetRecoilState(
		currentLoggedInUserRoleAndPermissionsRStateAtom
	);

	// custom hooks
	const { zNavigatePushRoute } = useZNavigate(); // hook to navigate

	// getting the role & permissions of the current log in user.
	const {
		data: getUserRoleAndPermissions,
		isFetching: isUserRoleAndPermissionsFetching,
		refetch: refetchUserRoleAndPermissions,
	} = useZRQGetRequest<{
		isSuccess: boolean;
		result: UserRoleAndPermissionsInterface;
	}>({
		_url: API_URL_ENUM.getUserRolePermission,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.ROLE_PERMISSIONS],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
		_checkPermissions: false,
	});

	//
	const { data: getUserSetting, isFetching: isUserSettingFetching } =
		useZRQGetRequest({
			_url: API_URL_ENUM.user_setting_list_create,
			_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.SETTING.MAIN],
			_checkPermissions: false,
		});

	// storing the role & permissions in recoil state
	const isZFetching = isUserRoleAndPermissionsFetching || isUserSettingFetching;

	useEffect(() => {
		try {
			if (getUserRoleAndPermissions?.isSuccess) {
				// Storing in recoil.
				setCurrentLoginUserRoleAndPermissionsStateAtom((oldValues) => ({
					...oldValues,
					role: getUserRoleAndPermissions.result.role,
					permissions: getUserRoleAndPermissions.result.permissions,
					fetched: true,
				}));

				setLoadingIsOpen(false);
				// Redirect to workspaces index page
				if (!isZFetching) {
					zNavigatePushRoute(ZaionsRoutes.AdminPanel.Workspaces.Main);
				}
			} else if (getUserRoleAndPermissions === undefined) {
				refetchUserRoleAndPermissions();
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [getUserRoleAndPermissions, isZFetching]);

	return (
		<ZIonPage pageTitle='zaions startup page'>
			<ZIonContent>
				<ZIonLoading
					isOpen={isZFetching}
					message='Loading dashboard please await a second!'
				/>
			</ZIonContent>
		</ZIonPage>
	);
};

export default ZAppStartupPage;
