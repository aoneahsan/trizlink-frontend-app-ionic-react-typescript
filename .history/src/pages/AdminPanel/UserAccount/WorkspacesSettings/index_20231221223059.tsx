/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React, { useEffect, useState } from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonButton,
  ZIonCol,
  ZIonIcon,
  ZIonItem,
  ZIonLabel,
  ZIonList,
  ZIonRow,
  ZIonSkeletonText,
  ZIonSpinner,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZUserAvatarButton from '@/components/WorkspacesComponents/userButton';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import {
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZaionsHooks/zreactquery-hooks';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS from '@/utils/constants';
import {
  API_URL_ENUM,
  ZWSTypeEum,
  extractInnerDataOptionsEnum
} from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import {
  type workspaceInterface,
  type wsShareInterface
} from '@/types/AdminPanel/workspace';
import ZaionsRSelect from '@/components/CustomComponents/ZaionsRSelect';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
import {
  type SingleValue,
  type GroupBase,
  type OptionsOrGroups
} from 'react-select';
import { notificationsOutline } from 'ionicons/icons';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import { type IWSNotificationSetting } from '@/types/UserAccount/index.type';
import { Formik } from 'formik';
import { reportCustomError } from '@/utils/customErrorType';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { useZIonToastSuccess } from '@/ZaionsHooks/zionic-hooks';
import MESSAGES from '@/utils/messages';

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

const WorkspacesSettings: React.FC = () => {
  // #region Component States.
  const [compState, setCompState] = useState<{
    isProcessingWorkspace: boolean;
    disabledWSSelector: boolean;
    ZWSType?: ZWSTypeEum;
    isError: boolean;
    selectedWS: wsShareInterface | workspaceInterface | null;
    WSId?: string;
    errorMessage?: string;
  }>({
    isProcessingWorkspace: false,
    disabledWSSelector: false,
    isError: false,
    selectedWS: null
  });
  // #endregion

  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  // #endregion

  // #region APIs.
  const { data: WorkspacesData, isFetching: isWorkspacesDataFetching } =
    useZRQGetRequest<workspaceInterface[]>({
      _url: API_URL_ENUM.workspace_create_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.WORKSPACE.MAIN],
      _showLoader: false
    });

  // Get workspaces data from backend.
  const { data: WSShareData, isFetching: isWSShareDataFetching } =
    useZRQGetRequest<wsShareInterface[]>({
      _url: API_URL_ENUM.ws_share_list,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.SHARE_WS.MAIN]
    });

  const {
    data: WSNotificationSettingsData,
    isFetching: isWSNotificationSettingsDataFetching
  } = useZRQGetRequest<IWSNotificationSetting>({
    _url: API_URL_ENUM.ws_notification_setting_get_create,
    _key: [
      CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.WORKSPACE_NOTIFICATION_SETTING
        .GET,
      compState?.selectedWS?.id ?? '',
      compState?.ZWSType ?? ''
    ],
    _urlDynamicParts: [
      CONSTANTS.RouteParams.workspace.workspaceId,
      CONSTANTS.RouteParams.user.type
    ],
    _itemsIds: [compState?.WSId ?? '', compState?.ZWSType ?? ''],
    _extractType: ZRQGetRequestExtractEnum.extractItem,
    _shouldFetchWhenIdPassed: !(
      (compState?.selectedWS?.id?.trim()?.length ?? 0) > 0
    ),
    _showLoader: false
  });

  const { mutateAsync: updateWSNotificationSettingsAsyncMutate } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.ws_notification_setting_update
    });
  // #endregion

  // #region Functions
  const SelectWSHandler = (option: SingleValue<ZaionsRSelectOptions>): void => {
    if (option?.value !== undefined && option?.value !== null) {
      setCompState(oldValues => ({
        ...oldValues,
        ZWSType: option?.extraData as ZWSTypeEum,
        isProcessingWorkspace: true
      }));

      if (option?.extraData === ZWSTypeEum.personalWorkspace) {
        //
        const selectedPersonalWS = WorkspacesData?.filter(
          el => el.id === option.value
        )[0];

        //
        if (selectedPersonalWS !== undefined && selectedPersonalWS !== null) {
          setCompState(oldValues => ({
            ...oldValues,
            selectedWS: selectedPersonalWS,
            WSId: selectedPersonalWS.id
          }));
        }
      } else if (option?.extraData === ZWSTypeEum.shareWorkspace) {
        //
        const selectedShareWS = WSShareData?.filter(
          el => el.workspaceId === option.value
        )[0];

        //
        if (selectedShareWS !== undefined && selectedShareWS !== null) {
          setCompState(oldValues => ({
            ...oldValues,
            selectedWS: selectedShareWS,
            WSId: selectedShareWS.workspaceId
          }));
        }
      }

      setCompState(oldValues => ({
        ...oldValues,
        isProcessingWorkspace: false
      }));
    }
  };

  const formikDirtyHandler = (dirty: boolean): void => {
    setCompState(oldValues => ({
      ...oldValues,
      disabledWSSelector: dirty
    }));
  };

  const formikSubmitHandler = async (value: string): Promise<void> => {
    try {
      const _response = await updateWSNotificationSettingsAsyncMutate({
        itemIds: [compState?.WSId ?? '', WSNotificationSettingsData?.id ?? ''],
        urlDynamicParts: [
          CONSTANTS.RouteParams.workspace.workspaceId,
          CONSTANTS.RouteParams.user.itemId
        ],
        requestData: value
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data !== undefined && _data !== null) {
          updateRQCDataHandler({
            key: [
              CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER
                .WORKSPACE_NOTIFICATION_SETTING.GET,
              compState?.selectedWS?.id ?? '',
              compState?.ZWSType ?? ''
            ],
            data: _data,
            extractType: ZRQGetRequestExtractEnum.extractItem,
            updateHoleData: true,
            id: ''
          });

          setCompState(oldValues => ({
            ...oldValues,
            disabledWSSelector: false
          }));

          void presentZIonToastSuccess(MESSAGES.WORKSPACE.WS_SETTINGS_UPDATED);
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const zSelectOptions: OptionsOrGroups<
    ZaionsRSelectOptions,
    GroupBase<ZaionsRSelectOptions>
  > = [
    {
      label: 'Personal workspaces',
      options:
        WorkspacesData?.map(el => {
          return {
            value: el.id,
            label: el.workspaceName,
            extraData: ZWSTypeEum.personalWorkspace
          };
        }) ?? []
    },
    {
      label: 'Share workspaces',
      options:
        WSShareData?.map(el => {
          return {
            value: el.workspaceId,
            label: el.workspaceName,
            extraData: ZWSTypeEum.shareWorkspace
          };
        }) ?? []
    }
  ];

  const formikInitialValues = {
    notificationOnProfile:
      Boolean(WSNotificationSettingsData?.notificationOnProfile) ?? false,
    allowPushNotification:
      Boolean(WSNotificationSettingsData?.allowPushNotification) ?? false
  };

  const _userAvatarUi = { name: compState?.selectedWS?.workspaceName };

  return (
    <ZIonRow
      className={classNames({
        'ion-align-items-center': true,
        'ion-padding': isLgScale,
        'p-2': !isMdScale
      })}>
      <ZIonCol
        sizeXl='12'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className={classNames({
          'mb-2': !isSmScale
        })}>
        <ZIonTitle
          className={classNames({
            'block font-bold ion-no-padding': true,
            'text-2xl': isLgScale,
            'text-xl': !isLgScale,
            'ion-text-center': !isSmScale
          })}>
          Workspaces notifications settings
        </ZIonTitle>
      </ZIonCol>

      <ZIonCol
        sizeXl='12'
        sizeLg='12'
        sizeMd='12'
        sizeSm='12'
        sizeXs='12'
        className='mt-4'>
        {!isWSShareDataFetching && !isWorkspacesDataFetching && (
          <div>
            <ZIonLabel>Select a workspace</ZIonLabel>
            <div
              className={classNames({
                'cursor-not-allowed': compState?.disabledWSSelector
              })}>
              <ZaionsRSelect
                options={zSelectOptions}
                disabled={compState?.disabledWSSelector}
                isDisabled={compState?.disabledWSSelector}
                onChange={option => {
                  if (!compState?.disabledWSSelector) {
                    SelectWSHandler(
                      option as SingleValue<ZaionsRSelectOptions>
                    );
                  }
                }}
              />
            </div>
          </div>
        )}

        {isWSShareDataFetching && isWorkspacesDataFetching && (
          <div className=''>
            <ZIonSkeletonText
              width='9rem'
              height='.9rem'
            />
            <ZIonSkeletonText
              className='mt-1 overflow-hidden rounded-sm'
              width='100%'
              height='2rem'
            />
          </div>
        )}
      </ZIonCol>

      {compState?.isProcessingWorkspace ||
      isWSNotificationSettingsDataFetching ? (
        <div className='flex w-full pt-4 mt-5 ion-align-items-center ion-justify-content-center'>
          <ZIonSpinner className='w-9 h-9' />
        </div>
      ) : null}

      {!compState?.isProcessingWorkspace &&
      !isWSNotificationSettingsDataFetching &&
      !compState?.isError &&
      compState?.selectedWS !== null &&
      compState?.selectedWS !== undefined &&
      (compState?.selectedWS?.id?.trim()?.length ?? 0) > 0 ? (
        <ZIonCol
          sizeXl='12'
          sizeLg='12'
          sizeMd='12'
          sizeSm='12'
          sizeXs='12'
          className={classNames({
            'mt-5': true,
            'mb-2': !isSmScale
          })}>
          <Formik
            initialValues={formikInitialValues}
            enableReinitialize={true}
            onSubmit={values => {
              const zStringifyData = zStringify(values);

              void formikSubmitHandler(zStringifyData);
            }}>
            {({ values, setFieldValue, dirty, handleSubmit }) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useEffect(() => {
                console.log({ dirty });
                formikDirtyHandler(dirty);
              }, [dirty]);

              return (
                <>
                  <ZIonItem
                    className='mt-2'
                    lines='none'>
                    <ZUserAvatarButton
                      userAvatar={compState?.selectedWS?.workspaceImage}
                      userAvatarUi={_userAvatarUi}
                      className={classNames({
                        'w-[2.5rem] h-[2.5rem]': isMdScale,
                        'w-[2rem] h-[2rem]': !isMdScale
                      })}
                    />
                    <ZIonLabel className='ms-2'>
                      <ZIonText
                        className={classNames({
                          'block font-semibold': true,
                          'text-md': isLgScale,
                          'text-sm': !isLgScale
                        })}>
                        {compState?.selectedWS?.workspaceName}
                      </ZIonText>
                      <ZIonText
                        className='block text-xs'
                        color='medium'>
                        Owner by:
                        <ZIonText
                          className='font-semibold ms-1'
                          color='dark'>
                          {compState?.selectedWS?.user?.username}
                        </ZIonText>
                      </ZIonText>
                    </ZIonLabel>

                    <div
                      className={classNames({
                        'w-max h-max': true,
                        'cursor-not-allowed': !dirty
                      })}>
                      <ZIonButton
                        className='ion-no-margin'
                        size='default'
                        disabled={!dirty}
                        onClick={() => {
                          if (dirty) {
                            handleSubmit();
                          }
                        }}>
                        Save
                      </ZIonButton>
                    </div>
                  </ZIonItem>

                  {/*  */}
                  <ZIonList
                    className='mt-2 border rounded-lg'
                    lines='full'>
                    <ZIonItem className='mx-2 ion-padding-start-1rem ion-padding-end-0'>
                      <ZIonIcon
                        icon={notificationsOutline}
                        className='me-3 w-7 h-7'
                      />

                      <ZIonLabel>
                        <ZIonText className='block'>
                          Workspace notification on your profile
                        </ZIonText>
                        <ZIonText className='block'>
                          Don&apos;t miss updates about your workspace
                          <ZIonText className='font-semibold ms-1'>
                            {compState?.selectedWS?.workspaceName}
                          </ZIonText>
                        </ZIonText>
                      </ZIonLabel>

                      <ZIonText slot='end'>
                        <ZRCSwitch
                          checked={values?.notificationOnProfile}
                          onChange={checked => {
                            void setFieldValue(
                              'notificationOnProfile',
                              checked,
                              false
                            );
                          }}
                        />
                      </ZIonText>
                    </ZIonItem>

                    <ZIonItem
                      lines='none'
                      className='mx-2 ion-padding-start-1rem ion-padding-end-0'>
                      <ZIonText>Allow push notification</ZIonText>

                      <ZIonText slot='end'>
                        <ZRCSwitch
                          checked={values?.allowPushNotification}
                          onChange={checked => {
                            void setFieldValue(
                              'allowPushNotification',
                              checked,
                              false
                            );
                          }}
                        />
                      </ZIonText>
                    </ZIonItem>
                  </ZIonList>
                </>
              );
            }}
          </Formik>
        </ZIonCol>
      ) : null}

      {!compState?.isProcessingWorkspace &&
      !isWSNotificationSettingsDataFetching &&
      !compState?.isError &&
      ((compState?.selectedWS?.id?.trim()?.length ?? 0) === 0 ||
        compState?.selectedWS === null ||
        compState?.selectedWS === undefined) ? (
        <div className='flex flex-col w-full pt-4 mt-5 ion-align-items-center ion-justify-content-center'>
          <ZIonText
            className='text-lg'
            color='medium'>
            No workspace selected. Click here to choose a workspace and manage
            notifications.
          </ZIonText>
        </div>
      ) : (
        ''
      )}
    </ZIonRow>
  );
};

export default WorkspacesSettings;
