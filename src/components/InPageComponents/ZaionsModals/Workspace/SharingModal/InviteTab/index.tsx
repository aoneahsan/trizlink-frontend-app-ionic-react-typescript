/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import {
  checkmarkCircleOutline,
  chevronDownOutline,
  closeCircleOutline,
  closeOutline,
  helpCircleOutline,
  linkOutline,
  sendOutline,
  trashBin,
  trashBinOutline
} from 'ionicons/icons';
import classNames from 'classnames';
import { Formik } from 'formik';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZWorkspaceFormRoleSelectorPopover from '@/components/InPageComponents/ZaionsPopovers/Workspace/RoleSelectorPopover';
import {
  ZIonAvatar,
  ZIonBadge,
  ZIonButton,
  ZIonCol,
  ZIonGrid,
  ZIonIcon,
  ZIonImg,
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
import { useZIonPopover, useZIonToast } from '@/ZaionsHooks/zionic-hooks';
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

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  WSRolesNameEnum,
  WSTeamMembersInterface
} from '@/types/AdminPanel/workspace';
import { ZLinkMutateApiType } from '@/types/ZaionsApis.type';
import {
  FormikSetErrorsType,
  FormikSetFieldValueEventType
} from '@/types/ZaionsFormik.type';
import { AxiosError } from 'axios';
import { ZGenericObject } from '@/types/zaionsAppSettings.type';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
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
  workspaceId: string;
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
  memberId
}) => {
  const [compState, setCompState] = useState<{
    _role?: WSRolesNameEnum;
  }>();

  // #region Custom hooks
  const { isLgScale, isMdScale, isSmScale } = useZMediaQueryScale();
  const { presentZIonToast } = useZIonToast();
  const { getRQCDataHandler } = useZGetRQCacheData();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  // #endregion

  // #region APIS.
  const { mutateAsync: inviteTeamMemberAsyncMutate } = useZRQCreateRequest({
    _url: API_URL_ENUM.ws_team_member_sendInvite_list,
    _itemsIds: [workspaceId],
    _urlDynamicParts: [CONSTANTS.RouteParams.workspace.workspaceId],
    _showAlertOnError: false
  });

  const { mutateAsync: updateRoleAsyncMutate } = useZRQUpdateRequest({
    _url: API_URL_ENUM.ws_team_member_role_update
  });

  // #endregion

  // #region modal & popover.
  const { presentZIonPopover: presentZWorkspaceFormRoleSelectorPopover } =
    useZIonPopover(ZWorkspaceFormRoleSelectorPopover, {
      selectedRole: compState?._role
    });
  // #endregion

  // #region Functions.
  const formikSubmitHandler = async (
    _data: string,
    setErrors: FormikSetErrorsType,
    setFieldValue: FormikSetFieldValueEventType
  ) => {
    try {
      if (_data) {
        let __response;
        if (formMode === FormMode.ADD) {
          __response = await inviteTeamMemberAsyncMutate(_data);
        } else if (formMode === FormMode.EDIT) {
          __response = await updateRoleAsyncMutate({
            itemIds: [workspaceId, memberId!],
            urlDynamicParts: [
              CONSTANTS.RouteParams.workspace.workspaceId,
              CONSTANTS.RouteParams.workspace.memberInviteId
            ],
            requestData: _data
          });
        }

        if (
          (__response as ZLinkMutateApiType<WSTeamMembersInterface>).success
        ) {
          const __data = extractInnerData<WSTeamMembersInterface>(
            __response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (__data && __data?.id) {
            const __wsTeamMembersRQData = getRQCDataHandler({
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                workspaceId
              ]
            });

            if (__wsTeamMembersRQData) {
              const _oldTeamsMemberData =
                extractInnerData<WSTeamMembersInterface[]>(
                  __wsTeamMembersRQData,
                  extractInnerDataOptionsEnum.createRequestResponseItems
                ) || [];

              if (formMode === FormMode.ADD) {
                const __updatedMembersData = [..._oldTeamsMemberData, __data];

                await updateRQCDataHandler({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                    workspaceId
                  ],
                  data: __updatedMembersData,
                  id: '',
                  updateHoleData: true,
                  extractType: ZRQGetRequestExtractEnum.extractItems
                });
                showSuccessNotification(MESSAGES.MEMBER.INVITE_SEND);
              } else if (formMode === FormMode.EDIT) {
                await updateRQCDataHandler({
                  key: [
                    CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MEMBERS,
                    workspaceId
                  ],
                  data: __data,
                  id: __data?.id
                });
                showSuccessNotification(MESSAGES.MEMBER.ROLE_UPDATED);
              }
            }

            dismissZIonModal();
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const __apiErrors = (error.response?.data as { errors: ZGenericObject })
          ?.errors;
        const __errors = formatApiRequestErrorForFormikFormField(
          ['email', 'role'],
          ['email', 'role'],
          __apiErrors
        );
        if ((__errors as { email: string })?.email) {
          setFieldValue('isApiEmailError', true, false);
          setFieldValue(
            'apiEmailErrorText',
            (__errors as { email: string })?.email,
            false
          );
        }

        setErrors(__errors);
      }
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <Formik
      initialValues={{
        role: role || WSRolesNameEnum.Approver,
        email: email || '',

        isApiEmailError: false,
        apiEmailErrorText: ''
      }}
      validate={values => {
        const errors: { email?: string } = {};

        validateField('email', values, errors, VALIDATION_RULE.email);

        return errors;
      }}
      onSubmit={async (values, { setErrors, setFieldValue }) => {
        let _zStringifyData = zStringify({
          email: values.email,
          role: values.role
        });

        if (formMode === FormMode.EDIT) {
          _zStringifyData = zStringify({
            role: values.role
          });
        }

        if (formMode === FormMode.EDIT && role !== values.role) {
          await formikSubmitHandler(_zStringifyData, setErrors, setFieldValue);
        } else if (formMode === FormMode.ADD) {
          await formikSubmitHandler(_zStringifyData, setErrors, setFieldValue);
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
        console.log({ values });
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
                    disabled={formMode === FormMode.EDIT}
                    readonly={formMode === FormMode.EDIT}
                    placeholder='Type email'
                    type='email'
                    minHeight='2.3rem'
                    onIonChange={e => {
                      handleChange(e);
                      if (values.isApiEmailError) {
                        setFieldValue('isApiEmailError', false);
                      }
                    }}
                    onIonBlur={handleBlur}
                    value={values.email}
                    errorText={
                      touched.email
                        ? errors.email?.trim()
                          ? errors.email
                          : values.isApiEmailError
                          ? values?.apiEmailErrorText
                          : undefined
                        : undefined
                    }
                    className={classNames({
                      'ion-touched': touched.email,
                      'ion-invalid':
                        (touched.email && errors.email) ||
                        values.isApiEmailError,
                      'ion-valid': touched.email && !errors.email
                    })}
                  />
                </ZIonCol>

                {/* <ZIonCol
										sizeXl='6'
										size='6'
										sizeMd='12'
										sizeSm='12'
										sizeXs='12'
									>
										<ZIonInput
											// name='pageName'
											label=''
											// labelPlacement='floating'
											// errorText={errors.pageName}
											placeholder='Name (Optional)'
											// onIonChange={handleChange}
											// onIonBlur={handleBlur}
											// value={values.pageName}
											// className={classNames({
											// 	'ion-touched ion-invalid': touched.pageName && errors.pageName,
											// 	'ion-touched ion-valid': touched.pageName && !errors.pageName,
											// })}
											className=''
											style={{
												minHeight: '30px',
												'--padding-start': '7px',
												'--padding-end': '7px',
											}}
										/>
									</ZIonCol> */}

                {/* role fields */}
                <ZIonCol
                  sizeXl='6'
                  size='6'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'>
                  {/* <ZIonButton
										fill='outline'
										size='small'
										color='medium'
										height='2.3rem'
										className={classNames({
											'm-0 flex h-full normal-case ion-align-items-start': true,
										})}
										style={{
											'--border-width': '1px',
										}}
										onClick={(event: unknown) => {
											presentZWorkspaceFormRoleSelectorPopover({
												_event: event as Event,
												_cssClass: 'workspace_form_role_popover_size',
												_dismissOnSelect: false,
												_onDidDismiss: ({ detail }) => {
													if (detail.data) {
														setCompState((oldValues) => ({
															...oldValues,
															_role: detail.data as WSRolesNameEnum,
														}));
														setFieldValue(
															'role',
															WSRolesNameEnum[
																detail.data as WSRolesNameEnum
															] !== undefined
																? WSRolesNameEnum[
																		detail.data as WSRolesNameEnum
																  ]
																: values.role,
															false
														);
													}
												},
											});
										}}
									>
										<ZIonText className='flex me-auto'>{values.role}</ZIonText>
										<ZIonIcon
											icon={chevronDownOutline}
											className='flex ms-auto'
										/>
									</ZIonButton> */}
                  <ZaionsRSelect
                    name='role'
                    testingselector={
                      CONSTANTS.testingSelectors.shortLink.formPage.geoLocation
                        .countrySelector
                    }
                    onChange={_value => {
                      setFieldValue(
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
                      formMode === FormMode.EDIT && role === values.role
                  })}>
                  <ZIonButton
                    size='small'
                    color='primary'
                    fill='solid'
                    id='role-popover-index'
                    height='2.3rem'
                    disabled={
                      !isValid ||
                      (formMode === FormMode.EDIT && role === values.role)
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
                      icon={sendOutline}
                      className='me-2'
                    />
                    {formMode === FormMode.ADD
                      ? 'Send invite'
                      : formMode === FormMode.EDIT
                      ? 'Update role'
                      : null}
                  </ZIonButton>
                </ZIonCol>

                {/* Create invite link btn */}
                <ZIonCol
                  sizeXl='6'
                  size='6'
                  sizeMd='12'
                  sizeSm='12'
                  sizeXs='12'>
                  <ZIonButton
                    fill='outline'
                    id='role-popover-index'
                    size='small'
                    color='medium'
                    height='2.3rem'
                    className={classNames({
                      'm-0 flex h-full normal-case ion-align-items-start': true
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
                </ZIonCol>
              </ZIonRow>
            </ZIonGrid>

            <ZIonRow
              className={classNames({
                'mt-3 px-3': true,
                'ion-align-items-center': isLgScale,
                'ion-align-items-start': !isLgScale
              })}>
              {/*  */}
              {/* <ZIonCol
								size='12'
								className='flex my-1 ion-align-items-center ion-justify-content-center'
							>
								
							</ZIonCol> */}
            </ZIonRow>
            <ZaionsSeparator
              sizeXl='11.5'
              sizeLg='11.5'
              sizeMd='11.5'
              sizeSm='11.5'
              sizeXs='11.5'
              text={
                <div className='flex px-2 mx-auto zaions__bg_white w-max ion-align-items-center ion-justify-content-center'>
                  <ZIonText className='me-2'>Invite links</ZIonText>
                  <ZIonIcon
                    icon={helpCircleOutline}
                    id='wss-tsm-invite-link-help-btn-tt'
                    className='w-5 h-5 cursor-pointer'
                  />
                  <ZRTooltip
                    anchorSelect='#wss-tsm-invite-link-help-btn-tt'
                    place='bottom'
                    variant='info'
                    className='z-10'>
                    <div className=''>
                      <ZIonText className='block text-lg font-bold'>
                        Invite collaborators via link
                      </ZIonText>
                      <ZIonText className='block mt-3 '>
                        User will be able to join the company <br /> by creating
                        account and will be assigned <br /> selected permissions
                        and membership
                      </ZIonText>
                    </div>
                  </ZRTooltip>
                </div>
              }
            />

            {/* Invitation links */}
            {[...Array(1)].map((el, index) => (
              <ZIonRow
                className={classNames({
                  'ion-align-items-center': true,
                  'mx-2': isMdScale,
                  'ion-justify-content-center': !isMdScale
                })}
                key={index}>
                {/* Copy Invite link button (up sm scale) / Delete invite link button (below sm scale) */}
                <ZIonCol size='max-content'>
                  {/* Copy button up Sm scale */}
                  <ZIonButton
                    size='small'
                    height='2.3rem'
                    id={`wss-tsm-copy-invite-link-tt-${el}`}
                    className={classNames({
                      'm-0 w-[2.3rem] overflow-hidden rounded-full ion-no-padding ion-hide-sm-down':
                        true
                    })}
                    onClick={() => {
                      navigator.clipboard.writeText('https://linkhere.com');

                      presentZIonToast('✨ Copied', 'tertiary');
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
                    anchorSelect={`#wss-tsm-copy-invite-link-tt-${el}`}
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
                    http://plnbl.io/ws/Yxugg59eLfj5
                  </ZIonText>

                  <div className='flex gap-2 ms-auto ion-align-items-center'>
                    <ZIonBadge
                      className={classNames({
                        'text-sm': true,
                        'me-1': !isMdScale
                      })}
                      color='medium'>
                      Contributor
                    </ZIonBadge>
                    {/* <ZIonBadge className='text-sm'>Team</ZIonBadge> */}
                  </div>

                  <ZIonButton
                    fill='clear'
                    expand='full'
                    height='100%'
                    id={`wss-tsm-delete-invite-link-tt-${el}`}
                    className='overflow-hidden rounded-r shadow-none ion-no-margin ms-2 ion-hide-sm-down'>
                    <ZIonIcon
                      color='danger'
                      icon={trashBin}
                    />
                  </ZIonButton>

                  {/* wss-tsm -> workspace-settings-team-settings-modal */}
                  <ZRTooltip
                    anchorSelect={`#wss-tsm-delete-invite-link-tt-${el}`}
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
            ))}
          </>
        );
      }}
    </Formik>
  );
};

export default ZInviteTab;
