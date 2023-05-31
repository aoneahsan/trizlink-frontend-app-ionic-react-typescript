import { UserRoleAndPermissionsInterface } from '@/types/UserAccount/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM } from '@/utils/enums';
import {
	permissionsEnum,
	permissionsTypeEnum,
} from '@/utils/enums/RoleAndPermissions';
import { useZRQGetRequest } from '@/ZaionsHooks/zreactquery-hooks';
import { currentLoggedInUserRoleAndPermissionsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

interface CanComponentProps {
	children: React.ReactNode;
	havePermission: permissionsEnum;
	permissionType?: permissionsTypeEnum;
	returnPermissionDeniedView?: boolean;
}

const ZCan: React.FC<CanComponentProps> = ({
	children,
	havePermission,
	returnPermissionDeniedView = false,
	permissionType,
}) => {
	// getting current logged in user permissions from recoil
	const [
		currentLoggedInUserRoleAndPermissionsStateAtom,
		setCurrentLoginUserRoleAndPermissionsStateAtom,
	] = useRecoilState(currentLoggedInUserRoleAndPermissionsRStateAtom);

	// getting the role & permissions of the current log in user.
	const { data: getUserRoleAndPermissions } = useZRQGetRequest<{
		isSuccess: boolean;
		result: UserRoleAndPermissionsInterface;
	}>({
		_url: API_URL_ENUM.getUserRolePermission,
		_key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.ROLE_PERMISSIONS],
		_extractType: ZRQGetRequestExtractEnum.extractItem,
	});

	useEffect(() => {
		try {
			if (
				!currentLoggedInUserRoleAndPermissionsStateAtom?.permissions.length &&
				getUserRoleAndPermissions
			) {
				// Storing in recoil.
				setCurrentLoginUserRoleAndPermissionsStateAtom((oldValues) => ({
					...oldValues,
					role: getUserRoleAndPermissions.result.role,
					permissions: getUserRoleAndPermissions.result.permissions,
				}));
			}
		} catch (error) {
			reportCustomError(error);
		}
	}, [getUserRoleAndPermissions]);

	// extracting permissions from currentLoggedInUserRoleAndPermissionsStateAtom
	const userPermissions =
		currentLoggedInUserRoleAndPermissionsStateAtom?.permissions;
	const haveRequiredPermission = userPermissions?.includes(havePermission);

	//
	let content = null;

	if (haveRequiredPermission) {
		// if user have permission then user can view content
		content = children;
	} else if (returnPermissionDeniedView) {
		content = <>you do not have permission to view this page</>;
	}

	return <>{content}</>;
};

export default ZCan;
