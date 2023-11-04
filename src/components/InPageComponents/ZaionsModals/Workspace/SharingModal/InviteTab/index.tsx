/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  createOutline,
  linkOutline,
  sendOutline,
  trashBin
} from 'ionicons/icons';
import classNames from 'classnames';
import { Formik } from 'formik';
import { AxiosError } from 'axios';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonBadge,
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonIcon,
  ZIonInput,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZRTooltip from '@/components/CustomComponents/ZRTooltip';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import ZaionsSeparator from '@/components/InPageComponents/ZaionsSepatator/ZaionsSeparator';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import { useZIonToast } from '@/ZaionsHooks/zionic-hooks';
import {
  useZGetRQCacheData,
  useZRQCreateRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import {
  extractInnerData,
  formatApiRequestErrorForFormikFormField,
  validateField,
  zStringify
} from '@/utils/helpers';
import {
  API_URL_ENUM,
  extractInnerDataOptionsEnum,
  VALIDATION_RULE
} from '@/utils/enums';
import { reportCustomError } from '@/utils/customErrorType';
import { showSuccessNotification } from '@/utils/notification';
import MESSAGES from '@/utils/messages';
import CONSTANTS from '@/utils/constants';
import { ENVS } from '@/utils/envKeys';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  WSRolesNameEnum,
  type WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import { type ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import {
  type FormikSetFieldValueEventPromiseVoidType,
  type FormikSetErrorsType
} from '@/types/ZaionsFormik.type';
import { type ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import { FormMode } from '@/types/AdminPanel/index.type';

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

const ZInviteTab: React.FC<{
  workspaceId?: string;
  shareWSMemberId?: string;
  wsShareId?: string;
  formMode?: FormMode;
  role?: WSRolesNameEnum;
  email?: string;
  memberId?: string;
  dismissZIonModal: (data?: string, role?: string | undefined) => void;
}> = ({
  workspaceId,
  dismissZIonModal,
  formMode = FormMode.ADD,
  role,
  email,
  memberId,
  shareWSMemberId,
  wsShareId
}) => {
  const [compState, setCompState] = useState<{
    formMode?: FormMode;
    role?: WSRolesNameEnum;
    email?: string;
    memberId?: string;
    canCreateShortUrl?: boolean;
    selectedItem?: WSTeamMembersInterface;
  }>({
    canCreateShortUrl: false
  });

  // #region Custom hooks
  const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();
  const { presentZIonToast } = useZIonToast();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIS.
  // If owned workspace then this api will use to invite member in workspace.
  const { mutateAsync: inviteTeamMemberAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.member_sendInvite_list,
    _itemsIds: [workspaceId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showAlertOnError: false,
    _loaderMessage: MESSAGES.MEMBER.SENDING_INVITATION_LINK_API
  });

  // If share workspace and member has permission to invite other members then this api will use to invite member in workspace.
  const { mutateAsync: swsInviteTeamMemberAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.sws_member_sendInvite_list,
    _itemsIds: [shareWSMemberId ?? ''],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.shareWSMemberId],
    _showAlertOnError: false,
    _loaderMessage: MESSAGES.MEMBER.INVITE_LINK_API
  });

  // If owned workspace then this api will use to update member role.
  const { mutateAsync: updateRoleAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.member_role_update,
    _loaderMessage: MESSAGES.MEMBER.UPDATE_ROLE_API
  });

  // If share workspace and member has permission to update role of other members then this api will use to update member role.
  const { mutateAsync: swsUpdateRoleAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.sws_member_role_update,
    _loaderMessage: MESSAGES.MEMBER.UPDATE_ROLE_API
  });

  // If this is a owned workspace then this api will add a short url in for invitation link.
  const { mutateAsync: invitationLinkShortUrlAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.member_create_short_url,
      _loaderMessage: MESSAGES.MEMBER.INVITE_LINK_API
    });

  // If this is a share workspace and member has permission to add short url then this api will add a short url in for invitation link.
  const { mutateAsync: swsInvitationLinkShortUrlAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.sws_member_create_short_url,
      _loaderMessage: MESSAGES.MEMBER.INVITE_LINK_API
    });
  // #endregion

  // #region useEffects.
  useEffect(() => {
    setCompState(oldValues => ({
      ...oldValues,
      role,
      email,
      memberId,
      formMode
    }));

    if (email !== undefined && memberId !== undefined) {
      setCompState(oldValues => ({
        ...oldValues,
        canCreateShortUrl: true
      }));
    }
  }, [role, email, memberId, formMode]);

  useEffect(() => {
    try {
      let membersRQData: WSTeamMembersInterface[] | undefined = [];
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim().length > 0
      ) {
        membersRQData =
          getRQCDataHandler({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
              workspaceId
            ]
          }) ?? [];
      } else if (
        wsShareId !== undefined &&
        wsShareId !== null &&
        wsShareId?.trim()?.length > 0 &&
        shareWSMemberId !== undefined &&
        shareWSMemberId !== null &&
        shareWSMemberId?.trim()?.length > 0
      ) {
        membersRQData =
          getRQCDataHandler({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
              wsShareId
            ]
          }) ?? [];
      }

      if (membersRQData !== undefined && membersRQData !== null) {
        const _extractItems = extractInnerData<WSTeamMembersInterface[]>(
          membersRQData,
          extractInnerDataOptionsEnum.createRequestResponseItems
        );

        const _selectedItem = _extractItems?.find(el => el?.id === memberId);

        if (_selectedItem !== undefined && _selectedItem !== null) {
          setCompState(oldValues => ({
            ...oldValues,
            selectedItem: _selectedItem,
            canCreateShortUrl: _selectedItem?.shortUrlId === null
          }));
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, workspaceId, wsShareId, shareWSMemberId]);

  // #endregion

  // #region Functions.
  const formikSubmitHandler = async (
    _value: string,
    setErrors: FormikSetErrorsType,
    setFieldValue: FormikSetFieldValueEventPromiseVoidType
  ): Promise<void> => {
    try {
      if (_value?.trim()?.length > 0) {
        let _response;
        if (compState?.formMode === FormMode.ADD) {
          if (
            workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim().length > 0
          ) {
            _response = await inviteTeamMemberAsyncMutate(_value);
          } else if (
            wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            _response = await swsInviteTeamMemberAsyncMutate(_value);
          }
        } else if (compState?.formMode === FormMode.EDIT) {
          if (
            workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim().length > 0
          ) {
            _response = await updateRoleAsyncMutate({
              itemIds: [workspaceId, compState?.memberId ?? ''],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.workspaceId,
                CONSTANTS.RouteParams.workspace.memberInviteId
              ],
              requestData: _value
            });
          } else if (
            wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            _response = await swsUpdateRoleAsyncMutate({
              itemIds: [shareWSMemberId, compState?.memberId ?? ''],
              urlDynamicParts: [
                CONSTANTS.RouteParams.workspace.shareWSMemberId,
                CONSTANTS.RouteParams.workspace.memberInviteId
              ],
              requestData: _value
            });
          }
        }

        if ((_response as ZLinkMutateApiType<WSTeamMembersInterface>).success) {
          const _data = extractInnerData<WSTeamMembersInterface>(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data?.id !== null) {
            let WSmembersRQData;
            if (
              workspaceId !== undefined &&
              workspaceId !== null &&
              workspaceId?.trim().length > 0
            ) {
              WSmembersRQData = getRQCDataHandler({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                  workspaceId
                ]
              });
            } else if (
              wsShareId !== undefined &&
              shareWSMemberId !== undefined
            ) {
              WSmembersRQData = getRQCDataHandler({
                key: [
                  CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
                  wsShareId
                ]
              });
            }

            if (WSmembersRQData !== undefined) {
              const _oldTeamsMemberData =
                extractInnerData<WSTeamMembersInterface[]>(
                  WSmembersRQData,
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) ?? [];

              if (compState?.formMode === FormMode.ADD) {
                const _updatedMembersData = [..._oldTeamsMemberData, _data];

                if (
                  workspaceId !== undefined &&
                  workspaceId !== null &&
                  workspaceId?.trim().length > 0
                ) {
                  await updateRQCDataHandler({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                      workspaceId
                    ],
                    data: _updatedMembersData,
                    id: '',
                    updateHoleData: true,
                    extractType: ZRQGetRequestExtractEnum.extractItems
                  });
                } else if (
                  wsShareId !== undefined &&
                  wsShareId !== null &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ) {
                  await updateRQCDataHandler({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE
                        .SWS_MEMBERS_MAIN,
                      wsShareId
                    ],
                    data: _updatedMembersData,
                    id: '',
                    updateHoleData: true,
                    extractType: ZRQGetRequestExtractEnum.extractItems
                  });
                }

                showSuccessNotification(MESSAGES.MEMBER.INVITE_SEND);
              } else if (compState?.formMode === FormMode.EDIT) {
                if (
                  workspaceId !== undefined &&
                  workspaceId !== null &&
                  workspaceId?.trim().length > 0
                ) {
                  await updateRQCDataHandler({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                      workspaceId
                    ],
                    data: _data,
                    id: _data?.id ?? ''
                  });
                } else if (
                  wsShareId !== undefined &&
                  wsShareId !== null &&
                  wsShareId?.trim()?.length > 0 &&
                  shareWSMemberId !== undefined &&
                  shareWSMemberId !== null &&
                  shareWSMemberId?.trim()?.length > 0
                ) {
                  await updateRQCDataHandler({
                    key: [
                      CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE
                        .SWS_MEMBERS_MAIN,
                      wsShareId
                    ],
                    data: _data,
                    id: _data?.id ?? ''
                  });
                }

                showSuccessNotification(MESSAGES.MEMBER.ROLE_UPDATED);
              }

              setCompState(oldValues => ({
                ...oldValues,
                selectedItem: _data,
                memberId: _data?.id,
                canCreateShortUrl: _data?.shortUrlId === null,
                formMode: FormMode.EDIT
              }));
            }

            // dismissZIonModal();
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const _apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;
        const _errors = formatApiRequestErrorForFormikFormField(
          ['email', 'role'],
          ['email', 'role'],
          _apiErrors
        );
        if ((_errors as { email: string })?.email?.trim()?.length > 0) {
          void setFieldValue('isApiEmailError', true, false);
          void setFieldValue(
            'apiEmailErrorText',
            (_errors as { email: string })?.email,
            false
          );
        }

        setErrors(_errors);
      }
      reportCustomError(error);
    }
  };

  //
  const addInvitationShortLink = async (
    invitationId: string
  ): Promise<void> => {
    try {
      let _response;
      if (
        workspaceId !== undefined &&
        workspaceId !== null &&
        workspaceId?.trim().length > 0
      ) {
        // WSTeamMembersInterface
        _response = await invitationLinkShortUrlAsyncMutate({
          itemIds: [workspaceId, invitationId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.workspaceId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ],
          requestData: ''
        });
      } else if (wsShareId !== undefined && shareWSMemberId !== undefined) {
        _response = await swsInvitationLinkShortUrlAsyncMutate({
          itemIds: [shareWSMemberId, invitationId],
          urlDynamicParts: [
            CONSTANTS.RouteParams.workspace.shareWSMemberId,
            CONSTANTS.RouteParams.workspace.memberInviteId
          ],
          requestData: ''
        });
      }

      if (_response !== undefined) {
        const _data = extractInnerData<WSTeamMembersInterface>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data?.id !== null) {
          if (
            workspaceId !== undefined &&
            workspaceId !== null &&
            workspaceId?.trim().length > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                workspaceId
              ],
              data: _data,
              id: _data?.id ?? '',
              extractType: ZRQGetRequestExtractEnum.extractItem
            });
          } else if (
            wsShareId !== undefined &&
            wsShareId !== null &&
            wsShareId?.trim()?.length > 0 &&
            shareWSMemberId !== undefined &&
            shareWSMemberId !== null &&
            shareWSMemberId?.trim()?.length > 0
          ) {
            await updateRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.SWS_MEMBERS_MAIN,
                wsShareId
              ],
              data: _data,
              id: _data?.id ?? '',
              extractType: ZRQGetRequestExtractEnum.extractItem
            });
          }

          setCompState(oldValues => ({
            ...oldValues,
            selectedItem: _data,
            canCreateShortUrl: _data?.shortUrlId === null,
            formMode: FormMode.EDIT
          }));

          showSuccessNotification(MESSAGES.MEMBER.INVITATION_SHORT_URL_ADDED);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <Formik
      initialValues={{
        role:
          compState?.selectedItem?.memberRole.name ?? WSRolesNameEnum.Approver,
        email: compState?.selectedItem?.email ?? '',
        canCreateShortUrl: compState?.canCreateShortUrl ?? false,

        isApiEmailError: false,
        apiEmailErrorText: ''
      }}
      validate={values => {
        const errors: { email?: string } = {};

        validateField('email', values, errors, VALIDATION_RULE.email);

        return errors;
      }}
      enableReinitialize={true}
      onSubmit={async (values, { setErrors, setFieldValue }) => {
        let _zStringifyData = zStringify({
          email: values.email,
          role: values.role
        });

        if (compState?.formMode === FormMode.EDIT) {
          _zStringifyData = zStringify({
            role: values.role
          });
        }

        if (compState?.formMode === FormMode.EDIT && role !== values.role) {
          await formikSubmitHandler(
            _zStringifyData,
            setErrors,
            setFieldValue as FormikSetFieldValueEventPromiseVoidType
          );
        } else if (compState?.formMode === FormMode.ADD) {
          await formikSubmitHandler(
            _zStringifyData,
            setErrors,
            setFieldValue as FormikSetFieldValueEventPromiseVoidType
          );
        }
      }}>
      {({
        values,
        touched,
        errors,
        isValid,
        setFieldValue,
        handleChange,
        handleBlur,
        submitForm
      }) => {
        return (
          <>
            <ZIonGrid
              className={classNames({
                'mt-1': true,
                'px-3': isLgScale,
                'px-1': !isLgScale
              })}>
              <ZIonRow className='mb-1'>
                <ZIonCol size='12'>
                  <ZIonTitle
                    className={classNames({
                      'block font-normal ion-no-padding': true
                    })}>
                    <ZIonText
                      className={classNames({
                        'text-lg': isLgScale,
                        'text-sm': !isLgScale
                      })}
                      color='medium'>
                      Assign role:
                    </ZIonText>
                    <ZIonText
                      className={classNames({
                        'ms-2': true,
                        'text-xl': isLgScale,
                        'text-lg': !isLgScale
                      })}>
                      {values.role}
                    </ZIonText>
                  </ZIonTitle>
                </ZIonCol>

                <ZIonCol>
                  <ZIonTitle
                    className={classNames({
                      'block font-normal ion-no-padding': true
                    })}>
                    <ZIonText
                      className={classNames({
                        'text-lg': isLgScale,
                        'text-sm': !isLgScale
                      })}
                      color='medium'>
                      Permissions:
                    </ZIonText>
                  </ZIonTitle>
                </ZIonCol>

                {/* All permissions */}
                <ZIonRow>
                  {/* Comment on posts */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='6'
                    className={classNames({
                      'flex gap-1 ion-align-items-center': true,
                      'ion-no-padding': !isSmScale
                    })}>
                    <ZIonIcon
                      icon={checkmarkCircleOutline}
                      color='success'
                      className={classNames({
                        'w-5 h-5': isSmScale,
                        'w-4 h-4': !isSmScale
                      })}
                    />
                    <ZIonText
                      className={classNames({
                        'text-sm': !isSmScale
                      })}>
                      Comment on posts
                    </ZIonText>
                  </ZIonCol>

                  {/* Create & edit posts */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='6'
                    className={classNames({
                      'flex gap-1 ion-align-items-center': true,
                      'ion-no-padding': !isSmScale
                    })}>
                    <ZIonIcon
                      icon={
                        values.role === WSRolesNameEnum.Contributor ||
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Writer
                          ? checkmarkCircleOutline
                          : values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Approver ||
                            values.role === WSRolesNameEnum.Commenter ||
                            values.role === WSRolesNameEnum.Manager
                          ? closeCircleOutline
                          : ''
                      }
                      color={
                        values.role === WSRolesNameEnum.Contributor ||
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Writer
                          ? 'success'
                          : values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Approver ||
                            values.role === WSRolesNameEnum.Commenter ||
                            values.role === WSRolesNameEnum.Manager
                          ? 'danger'
                          : undefined
                      }
                      className={classNames({
                        'w-5 h-5': isSmScale,
                        'w-4 h-4': !isSmScale
                      })}
                    />
                    <ZIonText
                      className={classNames({
                        'text-sm': !isSmScale
                      })}>
                      Create & edit posts
                    </ZIonText>
                  </ZIonCol>

                  {/* Approve & disapprove */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='6'
                    className={classNames({
                      'flex gap-1 ion-align-items-center': true,
                      'ion-no-padding': !isSmScale
                    })}>
                    <ZIonIcon
                      icon={
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Approver
                          ? checkmarkCircleOutline
                          : values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Writer ||
                            values.role === WSRolesNameEnum.Commenter ||
                            values.role === WSRolesNameEnum.Manager
                          ? closeCircleOutline
                          : ''
                      }
                      color={
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Approver
                          ? 'success'
                          : values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Writer ||
                            values.role === WSRolesNameEnum.Commenter ||
                            values.role === WSRolesNameEnum.Manager
                          ? 'danger'
                          : undefined
                      }
                      className={classNames({
                        'w-5 h-5': isSmScale,
                        'w-4 h-4': !isSmScale
                      })}
                    />
                    <ZIonText
                      className={classNames({
                        'text-sm': !isSmScale
                      })}>
                      Approve & disapprove
                    </ZIonText>
                  </ZIonCol>

                  {/* Publish & schedule */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='6'
                    className={classNames({
                      'flex gap-1 ion-align-items-center': true,
                      'ion-no-padding': !isSmScale
                    })}>
                    <ZIonIcon
                      icon={
                        values.role === WSRolesNameEnum.Contributor ||
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Manager
                          ? checkmarkCircleOutline
                          : values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Writer ||
                            values.role === WSRolesNameEnum.Approver ||
                            values.role === WSRolesNameEnum.Commenter
                          ? closeCircleOutline
                          : ''
                      }
                      color={
                        values.role === WSRolesNameEnum.Contributor ||
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Manager
                          ? 'success'
                          : values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Writer ||
                            values.role === WSRolesNameEnum.Approver ||
                            values.role === WSRolesNameEnum.Commenter
                          ? 'danger'
                          : undefined
                      }
                      className={classNames({
                        'w-5 h-5': isSmScale,
                        'w-4 h-4': !isSmScale
                      })}
                    />
                    <ZIonText
                      className={classNames({
                        'text-sm': !isSmScale
                      })}>
                      Publish & schedule
                    </ZIonText>
                  </ZIonCol>

                  {/* Manage users & pages */}
                  <ZIonCol
                    sizeXl='6'
                    sizeLg='6'
                    sizeMd='6'
                    sizeSm='6'
                    sizeXs='6'
                    className={classNames({
                      'flex gap-1 ion-align-items-center': true,
                      'ion-no-padding': !isSmScale
                    })}>
                    <ZIonIcon
                      icon={
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Manager
                          ? checkmarkCircleOutline
                          : values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Writer ||
                            values.role === WSRolesNameEnum.Approver ||
                            values.role === WSRolesNameEnum.Commenter
                          ? closeCircleOutline
                          : ''
                      }
                      color={
                        values.role === WSRolesNameEnum.Administrator ||
                        values.role === WSRolesNameEnum.Manager
                          ? 'success'
                          : values.role === WSRolesNameEnum.Contributor ||
                            values.role === WSRolesNameEnum.Guest ||
                            values.role === WSRolesNameEnum.Writer ||
                            values.role === WSRolesNameEnum.Approver ||
                            values.role === WSRolesNameEnum.Commenter
                          ? 'danger'
                          : undefined
                      }
                      className={classNames({
                        'w-5 h-5': isSmScale,
                        'w-4 h-4': !isSmScale
                      })}
                    />
                    <ZIonText
                      className={classNames({
                        'text-sm': !isSmScale
                      })}>
                      Manage users & pages
                    </ZIonText>
                  </ZIonCol>
                </ZIonRow>
              </ZIonRow>

              {/* Fields */}
              <ZIonRow>
                {/* Email fields */}
                <ZIonCol
                  sizeXl='6'
                  size='6'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'>
                  <ZIonInput
                    name='email'
                    aria-label='type email'
                    // labelPlacement='floating'
                    // errorText={errors.pageName}
                    disabled={compState?.formMode === FormMode.EDIT}
                    readonly={compState?.formMode === FormMode.EDIT}
                    placeholder='Type email'
                    type='email'
                    minHeight='2.3rem'
                    onIonChange={e => {
                      handleChange(e);
                      if (values.isApiEmailError) {
                        void setFieldValue('isApiEmailError', false);
                      }
                    }}
                    onIonBlur={handleBlur}
                    value={values.email}
                    errorText={
                      touched?.email === true
                        ? errors?.email !== undefined &&
                          errors?.email !== null &&
                          errors?.email?.trim()?.length > 0
                          ? errors.email
                          : values.isApiEmailError
                          ? values?.apiEmailErrorText
                          : undefined
                        : undefined
                    }
                    className={classNames({
                      'ion-touched': touched?.email === true,
                      'ion-invalid':
                        (touched?.email === true &&
                          errors?.email !== undefined &&
                          errors?.email !== null &&
                          errors?.email?.trim()?.length > 0) ||
                        values.isApiEmailError,
                      'ion-valid':
                        touched?.email === true &&
                        (errors.email === undefined ||
                          errors.email === null ||
                          errors?.email?.trim()?.length === 0)
                    })}
                  />
                </ZIonCol>

                {/* role fields */}
                <ZIonCol
                  sizeXl='6'
                  size='6'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'>
                  <ZaionsRSelect
                    name='role'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
                        .countrySelector
                    }
                    onChange={_value => {
                      void setFieldValue(
                        'role',
                        (_value as ZaionsRSelectOptions).value,
                        true
                      );
                    }}
                    value={CONSTANTS?.ZRolesOptions?.find(
                      el => el.value === values.role
                    )}
                    options={CONSTANTS?.ZRolesOptions}
                  />
                </ZIonCol>
              </ZIonRow>

              <ZIonRow>
                {/* Send invite btn */}
                <ZIonCol
                  sizeXl='6'
                  size='6'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'
                  className={classNames({
                    'cursor-not-allowed':
                      compState?.formMode === FormMode.EDIT &&
                      compState?.selectedItem?.memberRole?.name === values.role
                  })}>
                  <ZIonButton
                    size='small'
                    color='primary'
                    fill='solid'
                    id='role-popover-index'
                    height='2.3rem'
                    disabled={
                      (compState?.formMode === FormMode.ADD && !isValid) ||
                      (compState?.formMode === FormMode.EDIT &&
                        role === values.role)
                    }
                    onClick={() => {
                      void submitForm();
                    }}
                    className={classNames({
                      'm-0 flex h-full normal-case ion-align-items-start': true
                    })}
                    style={{
                      '--border-width': '1px'
                    }}>
                    <ZIonIcon
                      icon={
                        compState?.formMode === FormMode.ADD
                          ? sendOutline
                          : compState?.formMode === FormMode.EDIT
                          ? createOutline
                          : undefined
                      }
                      className='me-2'
                    />
                    {compState?.formMode === FormMode.ADD
                      ? 'Send invite'
                      : compState?.formMode === FormMode.EDIT
                      ? 'Update role'
                      : null}
                  </ZIonButton>
                </ZIonCol>

                {/* Create invite link btn */}
                {(compState?.selectedItem?.shortUrlId === null ||
                  compState?.selectedItem?.shortUrlId === undefined) && (
                  <ZIonCol
                    sizeXl='6'
                    size='6'
                    sizeMd='12'
                    sizeSm='12'
                    sizeXs='12'>
                    <div
                      className={classNames({
                        'w-full h-full': true,
                        'cursor-not-allowed': !values?.canCreateShortUrl
                      })}>
                      <ZIonButton
                        disabled={!values?.canCreateShortUrl}
                        fill='outline'
                        id='role-popover-index'
                        size='small'
                        color={values?.canCreateShortUrl ? 'primary' : 'medium'}
                        height='2.3rem'
                        onClick={() => {
                          if (
                            compState?.memberId !== undefined &&
                            compState?.memberId !== null
                          ) {
                            void addInvitationShortLink(compState?.memberId);
                          }
                        }}
                        className={classNames({
                          'm-0 flex h-full normal-case ion-align-items-start':
                            true
                        })}
                        style={{
                          '--border-width': '1px'
                        }}>
                        <ZIonIcon
                          icon={linkOutline}
                          className='me-2'
                        />
                        Create invite link
                      </ZIonButton>
                    </div>
                  </ZIonCol>
                )}
              </ZIonRow>
            </ZIonGrid>

            {/* <ZIonRow
              className={classNames({
                'mt-3 px-3': true,
                'ion-align-items-center': isLgScale,
                'ion-align-items-start': !isLgScale
              })}></ZIonRow> */}
            <ZaionsSeparator
              sizeXl='11.5'
              sizeLg='11.5'
              sizeMd='11.5'
              sizeSm='11.5'
              sizeXs='11.5'
              text={
                <div className='flex px-2 mx-auto zaions__bg_white w-max ion-align-items-center ion-justify-content-center'>
                  <ZIonText className='me-2'>Invite link</ZIonText>

                  <ZRTooltip
                    anchorSelect='#wss-tsm-invite-link-help-btn-tt'
                    place='bottom'
                    variant='info'
                    className='z-10'>
                    <div className=''>
                      <p className='block text-lg font-bold'>
                        Invite collaborators via link
                      </p>
                      <p className='block mt-3'>
                        User will be able to join the company <br /> by creating
                        account and will be assigned <br /> selected permissions
                        and membership
                      </p>
                    </div>
                  </ZRTooltip>
                </div>
              }
            />

            {/* Invitation links */}

            {compState?.selectedItem?.shortUrlId !== undefined &&
            compState?.selectedItem?.shortUrlId !== null &&
            compState?.selectedItem?.shortUrlId?.trim()?.length > 0 ? (
              <ZIonRow
                className={classNames({
                  'ion-align-items-center': true,
                  'mx-2': isMdScale,
                  'ion-justify-content-center': !isMdScale
                })}>
                {/* Copy Invite link button (up sm scale) / Delete invite link button (below sm scale) */}
                <ZIonCol size='max-content'>
                  {/* Copy button up Sm scale */}
                  <ZIonButton
                    size='small'
                    height='2.3rem'
                    id={'wss-tsm-copy-invite-link-tt'}
                    className={classNames({
                      'm-0 w-[2.3rem] overflow-hidden rounded-full ion-no-padding ion-hide-sm-down':
                        true
                    })}
                    onClick={() => {
                      void navigator.clipboard.writeText(
                        `${ENVS.defaultShortUrlDomain}/${CONSTANTS.SHORT_LINK.invitationSLStaticPath}/${compState?.selectedItem?.shortUrlId}`
                      );

                      void presentZIonToast('✨ Copied', 'tertiary');
                    }}>
                    <ZIonIcon
                      icon={linkOutline}
                      className={classNames({
                        'w-6 h-6': true
                      })}
                    />
                  </ZIonButton>

                  {/* wss-tsm -> workspace-settings-team-settings-modal */}
                  <ZRTooltip
                    anchorSelect={'#wss-tsm-copy-invite-link-tt'}
                    place='top'
                    content='copy invite link'
                    variant='info'
                  />

                  {/* Delete button below Sm scale */}
                  <ZIonButton
                    fill='clear'
                    height='2.3rem'
                    // id={`wss-tsm-copy-invite-link-tt-${el}`}
                    className={classNames({
                      'ion-hide-sm-up ion-no-margin ion-no-padding': true
                    })}>
                    <ZIonIcon
                      icon={trashBin}
                      color='danger'
                      className={classNames({
                        'w-5 h-5': true
                      })}
                    />
                  </ZIonButton>
                </ZIonCol>

                {/* Invite link */}
                <ZIonCol
                  sizeXl='11'
                  sizeLg='11'
                  sizeMd='11'
                  sizeSm='10.5'
                  sizeXs='9.5'
                  className={classNames({
                    'border rounded ps-2 pe-0 h-[2.3rem] overflow-hidden': true,
                    'flex ion-align-items-center': true
                  })}>
                  <ZIonText className='pt-1 text-sm min-w-[8rem] text-ellipsis whitespace-nowrap overflow-hidden'>
                    {ENVS.defaultShortUrlDomain}/
                    {CONSTANTS.SHORT_LINK.invitationSLStaticPath}/
                    {compState?.selectedItem?.shortUrlId}
                  </ZIonText>

                  <div className='flex gap-2 ms-auto ion-align-items-center'>
                    <ZIonBadge
                      color={
                        compState?.selectedItem?.memberRole?.name ===
                        WSRolesNameEnum.Administrator
                          ? 'success'
                          : compState?.selectedItem?.memberRole?.name ===
                            WSRolesNameEnum.Manager
                          ? 'tertiary'
                          : compState?.selectedItem?.memberRole?.name ===
                            WSRolesNameEnum.Approver
                          ? 'secondary'
                          : compState?.selectedItem?.memberRole?.name ===
                            WSRolesNameEnum.Contributor
                          ? 'primary'
                          : compState?.selectedItem?.memberRole?.name ===
                            WSRolesNameEnum.Writer
                          ? 'warning'
                          : compState?.selectedItem?.memberRole?.name ===
                              WSRolesNameEnum.Guest ||
                            compState?.selectedItem?.memberRole?.name ===
                              WSRolesNameEnum.Commenter
                          ? 'medium'
                          : 'medium'
                      }
                      className={classNames({
                        'text-sm': true,
                        'me-1': !isMdScale
                      })}>
                      {compState?.selectedItem?.memberRole?.name}
                    </ZIonBadge>
                    {/* <ZIonBadge className='text-sm'>Team</ZIonBadge> */}
                  </div>

                  <ZIonButton
                    fill='clear'
                    expand='full'
                    height='100%'
                    id={'wss-tsm-delete-invite-link-tt'}
                    className='overflow-hidden rounded-r shadow-none ion-no-margin ms-2 ion-hide-sm-down'>
                    <ZIonIcon
                      color='danger'
                      icon={trashBin}
                    />
                  </ZIonButton>

                  {/* wss-tsm -> workspace-settings-team-settings-modal */}
                  <ZRTooltip
                    anchorSelect={'#wss-tsm-delete-invite-link-tt'}
                    place='top'
                    content='delete invite link'
                    variant='info'
                  />
                </ZIonCol>

                {/* Copy link button below Sm scale */}
                <ZIonCol size='max-content'>
                  <ZIonButton
                    fill='clear'
                    expand='full'
                    height='100%'
                    className='overflow-hidden rounded-r shadow-none ion-no-margin ion-hide-sm-up ion-no-padding'>
                    <ZIonIcon
                      color='primary'
                      className='w-6 h-6'
                      icon={linkOutline}
                    />
                  </ZIonButton>
                </ZIonCol>
              </ZIonRow>
            ) : (
              <div className='flex flex-col mt-3 ion-align-items-center ion-justify-content-center'>
                <ZIonText
                  className='block'
                  color='medium'>
                  Create invitation short link to share with invitee.
                </ZIonText>

                <ZIonButton
                  disabled={!values?.canCreateShortUrl}
                  fill='outline'
                  id='role-popover-index'
                  size='small'
                  color={values?.canCreateShortUrl ? 'primary' : 'medium'}
                  height='2.3rem'
                  onClick={() => {
                    if (
                      compState?.memberId !== undefined &&
                      compState?.memberId !== null
                    ) {
                      void addInvitationShortLink(compState?.memberId);
                    }
                  }}
                  className={classNames({
                    'm-0 flex h-full mt-3 ion-align-items-start': true
                  })}
                  style={{
                    '--border-width': '1px'
                  }}>
                  <ZIonIcon
                    icon={linkOutline}
                    className='me-2'
                  />
                  Create invite link
                </ZIonButton>
              </div>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default ZInviteTab;
