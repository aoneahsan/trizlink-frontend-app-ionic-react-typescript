import {
  UserRoleAndPermissionsInterface,
  WSRoleType
} from '@/types/UserAccount/index.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import CONSTANTS from '@/utils/constants';
import { reportCustomError } from '@/utils/customErrorType';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';
import {
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';
import { extractInnerData } from '@/utils/helpers';
import {
  useZGetRQCacheData,
  useZRQGetRequest
} from '@/ZaionsHooks/zreactquery-hooks';
import { currentLoggedInUserRoleAndPermissionsRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Z403View from '../Errors/403';

interface CanComponentProps {
  children: React.ReactNode;
  havePermissions: permissionsEnum[] | shareWSPermissionEnum[];
  permissionType?: permissionsTypeEnum;
  shareWSId?: string;
  returnPermissionDeniedView?: boolean;
}

const ZCan: React.FC<CanComponentProps> = ({
  children,
  havePermissions,
  returnPermissionDeniedView = false,
  permissionType = permissionsTypeEnum.loggedInUserPermissions,
  shareWSId
}) => {
  // Component state.
  const [compState, setCompState] = useState<{
    userPermissions?: string[];
  }>();

  // #region Custom hooks.
  const { getRQCDataHandler } = useZGetRQCacheData();
  // #endregion

  // #region Recoil states.
  // getting current logged in user permissions from recoil
  const [
    currentLoggedInUserRoleAndPermissionsStateAtom,
    setCurrentLoginUserRoleAndPermissionsStateAtom
  ] = useRecoilState(currentLoggedInUserRoleAndPermissionsRStateAtom);
  // #endregion

  // #region APIs.
  // getting the role & permissions of the current log in user.
  const { data: getUserRoleAndPermissions } = useZRQGetRequest<{
    isSuccess: boolean;
    result: UserRoleAndPermissionsInterface;
  }>({
    _url: API_URL_ENUM.getUserRolePermission,
    _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.ROLE_PERMISSIONS],
    _extractType: ZRQGetRequestExtractEnum.extractItem
  });
  // #endregion

  // #region useEffects.
  useEffect(() => {
    try {
      if (
        !currentLoggedInUserRoleAndPermissionsStateAtom?.permissions.length &&
        getUserRoleAndPermissions
      ) {
        // Storing in recoil.
        setCurrentLoginUserRoleAndPermissionsStateAtom(oldValues => ({
          ...oldValues,
          role: getUserRoleAndPermissions.result.role,
          permissions: getUserRoleAndPermissions.result.permissions,
          fetched: true
        }));
      }
    } catch (error) {
      reportCustomError(error);
    }
  }, [getUserRoleAndPermissions]);

  useEffect(() => {
    // if permissionType is permissionsTypeEnum.loggedInUserPermissions then check from user permissions.
    if (permissionType === permissionsTypeEnum.loggedInUserPermissions) {
      setCompState(oldValues => ({
        ...oldValues,
        userPermissions:
          currentLoggedInUserRoleAndPermissionsStateAtom?.permissions
      }));
    } else if (
      permissionType === permissionsTypeEnum.shareWSMemberPermissions &&
      shareWSId
    ) {
      // if permissionType is permissionsTypeEnum.shareWSMemberPermissions then this means it a share workspace so first getting permissions of this workspace of the current user as member in the workspace and checking from the that permission.
      const _permissionFromRQ = getRQCDataHandler({
        key: [
          CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS
            .MEMBER_ROLE_AND_PERMISSIONS,
          shareWSId
        ]
      });

      if (_permissionFromRQ) {
        const __data = extractInnerData<{
          memberRole?: string;
          memberPermissions?: string[];
        }>(
          _permissionFromRQ,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        setCompState(oldValues => ({
          ...oldValues,
          userPermissions: __data?.memberPermissions
        }));
      }
    }
  }, [permissionType, shareWSId]);
  // #endregion

  // const haveRequiredPermission = userPermissions?.includes(havePermission);
  let haveRequiredPermission = undefined;
  if (shareWSId) {
    haveRequiredPermission = (havePermissions as shareWSPermissionEnum[]).every(
      el => compState?.userPermissions?.includes(el)
    );
  } else {
    haveRequiredPermission = (havePermissions as permissionsEnum[]).every(el =>
      compState?.userPermissions?.includes(el)
    );
  }

  //
  let content = null;

  if (haveRequiredPermission) {
    // if user have permission then user can view content
    content = children;
  } else if (
    returnPermissionDeniedView &&
    currentLoggedInUserRoleAndPermissionsStateAtom?.fetched
  ) {
    content = <Z403View />;
  }

  return <>{content}</>;
};

export default ZCan;
