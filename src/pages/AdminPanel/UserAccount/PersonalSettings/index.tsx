/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import classNames from 'classnames';
import {
  browsersOutline,
  chatbubbleEllipsesOutline,
  ellipsisHorizontalOutline,
  mailOutline,
  notificationsCircleOutline,
  notificationsOutline
} from 'ionicons/icons';
import { useRecoilValue } from 'recoil';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonAccordion,
  ZIonAccordionGroup,
  ZIonButton,
  ZIonCheckbox,
  ZIonCol,
  ZIonIcon,
  ZIonImg,
  ZIonItem,
  ZIonLabel,
  ZIonRow,
  ZIonText,
  ZIonTitle
} from '@/components/ZIonComponents';
import ZRCSwitch from '@/components/CustomComponents/ZRCSwitch';

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
import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';
import { API_URL_ENUM, extractInnerDataOptionsEnum } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZRQGetRequestExtractEnum } from '@/types/ZReactQuery/index.type';
import {
  USNotificationSettingFrequencyEnum,
  type IUSNotificationSetting
} from '@/types/UserAccount/index.type';

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */
import { ZaionsUserAccountRStateAtom } from '@/ZaionsStore/UserAccount/index.recoil';

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */
import { emailLogo } from '@/assets/images';
import { Formik } from 'formik';
import { reportCustomError } from '@/utils/customErrorType';
import { extractInnerData, zStringify } from '@/utils/helpers';
import { useZIonToastSuccess } from '@/ZaionsHooks/zionic-hooks';
import MESSAGES from '@/utils/messages';
import SupportOnPatreon from '@/components/SupportOnPatreon';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZPersonalSettings: React.FC = () => {
  // #region Custom hooks.
  const { isSmScale, isLgScale, isMdScale } = useZMediaQueryScale();
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  // #endregion

  // #region Recoil states.
  const UserAccountRStateAtom = useRecoilValue(ZaionsUserAccountRStateAtom);
  // #endregion

  // #region APIs.
  const { data: USNotificationSettingsData } =
    useZRQGetRequest<IUSNotificationSetting>({
      _url: API_URL_ENUM.us_notification_setting_get_create,
      _key: [CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION_SETTING.GET],
      _extractType: ZRQGetRequestExtractEnum.extractItem
    });

  //
  const { mutateAsync: UpdateUSNotificationSettingsMutateAsync } =
    useZRQUpdateRequest({
      _url: API_URL_ENUM.us_notification_setting_update
    });
  // #endregion

  // #region Functions.
  const formikSubmitHandler = async (_value: string): Promise<void> => {
    try {
      if (
        USNotificationSettingsData?.id !== undefined &&
        USNotificationSettingsData?.id !== null
      ) {
        const _response = await UpdateUSNotificationSettingsMutateAsync({
          itemIds: [USNotificationSettingsData?.id ?? ''],
          urlDynamicParts: [CONSTANTS.RouteParams.user.itemId],
          requestData: _value
        });

        if (_response !== null && _response !== undefined) {
          const _data = extractInnerData(
            _response,
            extractInnerDataOptionsEnum.createRequestResponseItem
          );

          if (_data !== undefined && _data !== null) {
            updateRQCDataHandler({
              id: '',
              key: [
                CONSTANTS.REACT_QUERY.QUERIES_KEYS.USER.NOTIFICATION_SETTING.GET
              ],
              data: _data,
              updateHoleData: true,
              extractType: ZRQGetRequestExtractEnum.extractItem
            });

            void presentZIonToastSuccess(
              MESSAGES.USER.USER_NOTIFICATION_SETTING_SAVE
            );
          }
        }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  const formikInitialValues = {
    invitationNotification: {
      inApp: USNotificationSettingsData?.invitationNotification?.inApp ?? false,
      push: USNotificationSettingsData?.invitationNotification?.push ?? false,
      email: USNotificationSettingsData?.invitationNotification?.email ?? false,
      sms: USNotificationSettingsData?.invitationNotification?.sms ?? false
    },
    otherNotification: {
      inApp: USNotificationSettingsData?.otherNotification?.inApp ?? false,
      push: USNotificationSettingsData?.otherNotification?.push ?? false,
      email: USNotificationSettingsData?.otherNotification?.email ?? false,
      sms: USNotificationSettingsData?.otherNotification?.sms ?? false
    },
    browser: {
      push: USNotificationSettingsData?.browser?.push ?? false,
      playSoundInNotification:
        USNotificationSettingsData?.browser?.playSoundInNotification ?? false,
      playSoundInMessage:
        USNotificationSettingsData?.browser?.playSoundInMessage ?? false
    },
    email: {
      frequency:
        USNotificationSettingsData?.email?.frequency ??
        USNotificationSettingFrequencyEnum.all,
      notifications: {
        otherNotifications:
          USNotificationSettingsData?.email?.notifications
            ?.otherNotifications ?? false
      }
    }
  };

  const zIonItemStyle = {
    '--padding-start': '4px'
  };

  return (
    <>
      <SupportOnPatreon />
      <Formik
        initialValues={formikInitialValues}
        enableReinitialize={true}
        onSubmit={values => {
          const zStringifyData = zStringify({
            invitationNotification: zStringify(values.invitationNotification),
            otherNotification: zStringify(values.otherNotification),
            browser: zStringify(values.browser),
            email: zStringify(values.email)
          });

          void formikSubmitHandler(zStringifyData);
        }}>
        {({ values, setFieldValue, dirty, submitForm }) => {
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
                  'flex ion-align-items-center ion-justify-content-between':
                    true,
                  'mb-2': !isSmScale
                })}>
                <div className=''>
                  <ZIonTitle
                    className={classNames({
                      'block font-bold ion-no-padding': true,
                      'text-2xl': isLgScale,
                      'text-xl': !isLgScale,
                      'ion-text-center': !isSmScale
                    })}>
                    Notifications settings
                  </ZIonTitle>

                  <ZIonText
                    className={classNames({
                      'block mt-2 font-normal': true,
                      'text-md': isLgScale,
                      'text-sm': !isLgScale,
                      'ion-text-center': !isSmScale
                    })}>
                    {PRODUCT_NAME} may still send you important notifications
                    about your account and content outside of your preferred
                    notification settings.
                  </ZIonText>
                </div>

                <div className=''>
                  <div
                    className={classNames({
                      'flex w-max ion-align-items-center h-max': true,
                      'cursor-not-allowed': !dirty
                    })}>
                    <ZIonButton
                      disabled={!dirty}
                      onClick={() => {
                        if (dirty) {
                          void submitForm();
                        }
                      }}>
                      Save
                    </ZIonButton>
                  </div>
                </div>
              </ZIonCol>

              <ZIonCol
                sizeXl='12'
                sizeLg='12'
                sizeMd='12'
                sizeSm='12'
                sizeXs='12'
                className='mt-4'>
                <ZIonTitle
                  className={classNames({
                    'block font-semibold ion-no-padding': true,
                    'text-xl': isLgScale,
                    'text-lg': !isLgScale,
                    'ion-text-center': !isSmScale
                  })}>
                  What Notifications You Receive
                </ZIonTitle>
                <ZIonAccordionGroup className='mt-2'>
                  {/* Workspaces notifications */}
                  {/* <ZIonAccordion className='mb-2 overflow-hidden rounded-lg'>
                  <ZIonItem
                    slot='header'
                    lines='none'
                    minHeight='25px'
                    color='light'
                    testingselector={
                      CONSTANTS.testingSelectors.userAccount
                        .notificationSettingsTab.WSNotificationsAccordion.header
                    }
                    className={classNames({
                      'h-[2.9rem]': !isMdScale
                    })}>
                    <ZIonIcon
                      icon={albumsOutline}
                      className={classNames({
                        'w-7 h-7': isMdScale,
                        'w-6 h-6': !isMdScale
                      })}
                    />
                    <ZIonLabel
                      className={classNames({
                        'ms-2': true,
                        'my-0': !isMdScale
                      })}>
                      <ZIonText
                        className={classNames({
                          'block font-semibold': true,
                          'text-md': isMdScale,
                          'text-sm': !isMdScale
                        })}>
                        Workspaces notifications
                      </ZIonText>
                      <ZIonText className='block text-xs'>
                        Push, Email, SMS
                      </ZIonText>
                    </ZIonLabel>
                  </ZIonItem>
                  <div
                    className='p-2 border border-t-0 rounded-b-lg'
                    slot='content'>
                    <ZIonText
                      color='medium'
                      className={classNames({
                        'block ms-2': true,
                        'text-lg my-2': isLgScale,
                        'text-md my-1': !isLgScale && isSmScale,
                        'text-sm': !isSmScale
                      })}>
                      Owned workspaces
                    </ZIonText>
                    {isWorkspacesDataFetching &&
                      isWSShareDataFetching &&
                      [...Array(3)].map((_, index) => {
                        return (
                          <ZIonItem
                            lines='none'
                            key={index}
                            className={classNames({
                              'h-[2.9rem]': !isMdScale
                            })}>
                            <ZIonSkeletonText
                              className='overflow-hidden rounded-full'
                              width={isMdScale ? '2.5rem' : '2rem'}
                              height={isMdScale ? '2.5rem' : '2rem'}
                            />
                            <ZIonLabel className='ms-3'>
                              <ZIonText className='block font-semibold text-md'>
                                <ZIonSkeletonText
                                  width='12rem'
                                  height='.8rem'
                                />
                              </ZIonText>
                              <ZIonText className='block text-xs'>
                                <ZIonSkeletonText
                                  width='12rem'
                                  height='.8rem'
                                />
                              </ZIonText>
                            </ZIonLabel>
                          </ZIonItem>
                        );
                      })}

                    {!isWorkspacesDataFetching &&
                      WorkspacesData?.map((el, index) => {
                        return (
                          <ZIonItem
                            lines='none'
                            key={index}
                            testinglistselector={`${CONSTANTS.testingSelectors.userAccount.notificationSettingsTab.WSNotificationsAccordion.ownedWSItem}-${index}`}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .WSNotificationsAccordion.ownedWSItem
                            }
                            routerLink={createRedirectRoute({
                              url: ZaionsRoutes.AdminPanel.Setting.UserAccount
                                .WorkspaceNotifications,
                              params: [
                                CONSTANTS.RouteParams.workspace.workspaceId
                              ],
                              values: [el.id ?? '']
                            })}
                            className={classNames({
                              'mb-0 ion-activatable ripple-parent cursor-pointer rounded-lg':
                                true,
                              'h-[2.9rem] mb-1': !isMdScale
                            })}>
                            <ZUserAvatarButton
                              userAvatar={el?.workspaceImage}
                            />
                            <ZIonLabel className='ms-2'>
                              <ZIonText
                                className={classNames({
                                  'block font-semibold': true,
                                  'text-md': isLgScale,
                                  'text-sm': !isLgScale
                                })}>
                                {el?.workspaceName}
                              </ZIonText>
                              {/* <ZIonText className='block text-xs'>
                            Primary email
                          </ZIonText> * /}
                            </ZIonLabel>
                          </ZIonItem>
                        );
                      })}

                    {(WSShareData?.length ?? 0) > 0 && (
                      <ZIonText
                        className={classNames({
                          'block ms-2': true,
                          'text-lg my-2': isLgScale,
                          'text-md my-1': !isLgScale && isSmScale,
                          'text-sm': !isSmScale
                        })}
                        color='medium'>
                        Share workspaces
                      </ZIonText>
                    )}

                    {!isWSShareDataFetching &&
                      (WSShareData?.length ?? 0) > 0 &&
                      WSShareData?.map((el, index) => {
                        return (
                          <ZIonItem
                            key={index}
                            lines='none'
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .WSNotificationsAccordion.shareWSItem
                            }
                            testinglistselector={`${CONSTANTS.testingSelectors.userAccount.notificationSettingsTab.WSNotificationsAccordion.shareWSItem}-${index}`}
                            className={classNames({
                              'mb-0 ion-activatable ripple-parent cursor-pointer rounded-lg':
                                true,
                              'h-[2.9rem] mb-1': !isMdScale
                            })}>
                            <ZUserAvatarButton
                              userAvatar={el?.workspaceImage}
                            />
                            <ZIonLabel className='ms-2'>
                              <ZIonText
                                className={classNames({
                                  'block font-semibold': true,
                                  'text-md': isLgScale,
                                  'text-sm': !isLgScale
                                })}>
                                {el?.workspaceName}
                              </ZIonText>
                              {/* <ZIonText className='block text-xs'>
                            Primary email
                          </ZIonText> * /}
                            </ZIonLabel>
                          </ZIonItem>
                        );
                      })}
                  </div>
                </ZIonAccordion> */}

                  {/* Invitation notifications */}
                  <ZIonAccordion className='mb-2 overflow-hidden rounded-lg'>
                    <ZIonItem
                      slot='header'
                      lines='none'
                      minHeight='25px'
                      color='light'
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .notificationSettingsTab
                          .invitationNotificationAccordion.header
                      }
                      className={classNames({
                        'h-[2.9rem]': !isMdScale
                      })}>
                      <ZIonIcon
                        icon={notificationsCircleOutline}
                        className={classNames({
                          'w-7 h-7': isMdScale,
                          'w-6 h-6': !isMdScale
                        })}
                      />
                      <ZIonLabel
                        className={classNames({
                          'ms-2': true,
                          'my-0': !isMdScale
                        })}>
                        <ZIonText
                          className={classNames({
                            'block font-semibold': true,
                            'text-md': isMdScale,
                            'text-sm': !isMdScale
                          })}>
                          Invitation notification
                        </ZIonText>
                        <ZIonText className='block text-xs'>
                          Push, Email
                        </ZIonText>
                      </ZIonLabel>
                    </ZIonItem>
                    <div
                      className='p-2 border border-t-0 rounded-b-lg'
                      slot='content'>
                      <ZIonText
                        className={classNames({
                          'px-3 mb-1 block font-semibold': true,
                          'text-md': isLgScale,
                          'text-sm': !isLgScale,
                          'ion-text-center': !isMdScale
                        })}>
                        These are notifications for workspaces invitations.
                      </ZIonText>
                      {/* allow notification */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab
                            .invitationNotificationAccordion
                            .allowNotificationItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={notificationsOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          In-App Notifications
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.invitationNotification?.inApp}
                            onChange={checked => {
                              void setFieldValue(
                                'invitationNotification.inApp',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .invitationNotificationAccordion
                                .allowNotificationToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>

                      {/* receive notifications */}
                      <ZIonText
                        className={classNames({
                          'px-3 mb-1 block font-semibold': true,
                          'text-md': isLgScale,
                          'text-sm': !isLgScale,
                          'ion-text-center': !isMdScale
                        })}>
                        Where you receive these notifications
                      </ZIonText>

                      {/* Push */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab
                            .invitationNotificationAccordion.pushItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={browsersOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          Push
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.invitationNotification?.push}
                            onChange={checked => {
                              void setFieldValue(
                                'invitationNotification.push',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .invitationNotificationAccordion.pushToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>

                      {/* Email */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab
                            .invitationNotificationAccordion.emailItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={mailOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          Email
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.invitationNotification?.email}
                            onChange={checked => {
                              void setFieldValue(
                                'invitationNotification.email',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .invitationNotificationAccordion.emailToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>

                      {/* SMS */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab
                            .invitationNotificationAccordion.smsItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={chatbubbleEllipsesOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          SMS
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.invitationNotification?.sms}
                            onChange={checked => {
                              void setFieldValue(
                                'invitationNotification.sms',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .invitationNotificationAccordion.smsToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>
                    </div>
                  </ZIonAccordion>

                  {/* Other notifications */}
                  <ZIonAccordion className='overflow-hidden rounded-lg'>
                    <ZIonItem
                      slot='header'
                      lines='none'
                      minHeight='25px'
                      color='light'
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .notificationSettingsTab.otherNotificationAccordion
                          .header
                      }
                      className={classNames({
                        'h-[2.9rem]': !isMdScale
                      })}>
                      <ZIonIcon
                        icon={ellipsisHorizontalOutline}
                        className={classNames({
                          'w-7 h-7': isMdScale,
                          'w-6 h-6': !isMdScale
                        })}
                      />
                      <ZIonLabel
                        className={classNames({
                          'ms-2': true,
                          'my-0': !isMdScale
                        })}>
                        <ZIonText
                          className={classNames({
                            'block font-semibold': true,
                            'text-md': isMdScale,
                            'text-sm': !isMdScale
                          })}>
                          Other notifications
                        </ZIonText>
                        <ZIonText className='block text-xs'>
                          Push, Email, SMS
                        </ZIonText>
                      </ZIonLabel>
                    </ZIonItem>
                    <div
                      className='p-2 border border-t-0 rounded-b-lg'
                      slot='content'>
                      <ZIonText
                        className={classNames({
                          'px-3 mb-1 block font-semibold': true,
                          'text-md': isLgScale,
                          'text-sm': !isLgScale,
                          'ion-text-center': !isMdScale
                        })}>
                        These are notifications for app expiring offers and
                        more.
                      </ZIonText>
                      {/* allow notification */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab.otherNotificationAccordion
                            .allowNotificationItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={notificationsOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          In-App Notifications
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.otherNotification?.inApp}
                            onChange={checked => {
                              void setFieldValue(
                                'otherNotification.inApp',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .otherNotificationAccordion
                                .allowNotificationToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>

                      {/* receive notifications */}
                      <ZIonText
                        className={classNames({
                          'px-3 mb-1 block font-semibold': true,
                          'text-md': isLgScale,
                          'text-sm': !isLgScale,
                          'ion-text-center': !isMdScale
                        })}>
                        Where you receive these notifications
                      </ZIonText>
                      {/* Push */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab.otherNotificationAccordion
                            .pushItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={browsersOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          Push
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.otherNotification?.push}
                            onChange={checked => {
                              void setFieldValue(
                                'otherNotification.push',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .otherNotificationAccordion.pushToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>

                      {/* Email */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab.otherNotificationAccordion
                            .emailItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={mailOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          Email
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.otherNotification?.email}
                            onChange={checked => {
                              void setFieldValue(
                                'otherNotification.email',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .otherNotificationAccordion.emailToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>

                      {/* SMS */}
                      <ZIonItem
                        lines='none'
                        testingselector={
                          CONSTANTS.testingSelectors.userAccount
                            .notificationSettingsTab.otherNotificationAccordion
                            .smsItem
                        }
                        className={classNames({
                          'rounded-lg overflow-hidden ion-activatable mb-1 ripple-parent cursor-pointer':
                            true,
                          'text-sm': !isLgScale
                        })}>
                        <ZIonIcon
                          icon={chatbubbleEllipsesOutline}
                          color='dark'
                          className={classNames({
                            'w-6 h-6': isLgScale,
                            'w-5 h-5': !isLgScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'block ms-2 font-normal ion-text-wrap': true,
                            'text-md': isLgScale,
                            'text-sm': !isLgScale,
                            'my-0': !isMdScale
                          })}>
                          SMS
                        </ZIonLabel>

                        <ZIonText slot='end'>
                          <ZRCSwitch
                            checked={values?.otherNotification?.sms}
                            onChange={checked => {
                              void setFieldValue(
                                'otherNotification.sms',
                                checked,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .otherNotificationAccordion.smsToggler
                            }
                          />
                        </ZIonText>
                      </ZIonItem>
                    </div>
                  </ZIonAccordion>
                </ZIonAccordionGroup>

                {/* How You Get Notifications */}
                <ZIonTitle
                  className={classNames({
                    'block font-semibold ion-no-padding mt-5': true,
                    'text-xl': isLgScale,
                    'text-lg': !isLgScale,
                    'ion-text-center': !isSmScale
                  })}>
                  How You Get Notifications
                </ZIonTitle>
                <ZIonAccordionGroup className='mt-2'>
                  {/* Browser */}
                  <ZIonAccordion className='mb-2 overflow-hidden rounded-lg'>
                    <ZIonItem
                      slot='header'
                      lines='none'
                      minHeight='25px'
                      color='light'
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .notificationSettingsTab.browserNotificationAccordion
                          .header
                      }
                      className={classNames({
                        'h-[2.9rem]': !isMdScale
                      })}>
                      <ZIonIcon
                        icon={browsersOutline}
                        className={classNames({
                          'w-7 h-7': isMdScale,
                          'w-6 h-6': !isMdScale
                        })}
                      />
                      <ZIonLabel
                        className={classNames({
                          'ms-2': true,
                          'my-0': !isMdScale
                        })}>
                        <ZIonText
                          className={classNames({
                            'block font-semibold': true,
                            'text-md': isMdScale,
                            'text-sm': !isMdScale
                          })}>
                          Browser
                        </ZIonText>
                        {/* <ZIonText className='block text-xs'>On, Suggested</ZIonText> */}
                      </ZIonLabel>
                    </ZIonItem>
                    <div
                      className='p-2 border border-t-0 rounded-b-lg'
                      slot='content'>
                      {/* Email Frequency */}
                      <div className='mt-2'>
                        {/* <ZIonText
                        className={classNames({
                          'px-3 mb-1 block': true,
                          'text-md': isLgScale,
                          'text-sm': !isLgScale
                        })}>
                        Push Notifications
                      </ZIonText> */}

                        {/* Chrome */}
                        <ZIonItem
                          lines='none'
                          testingselector={
                            CONSTANTS.testingSelectors.userAccount
                              .notificationSettingsTab
                              .browserNotificationAccordion
                              .chromeNotificationItem
                          }
                          className={classNames({
                            'rounded-lg overflow-hidden ion-activatable ripple-parent cursor-pointer':
                              true,
                            'text-sm': !isMdScale
                          })}>
                          {/* <ZIonImg
                          src={chromeLogo}
                          className={classNames({
                            'w-7 h-7': isMdScale,
                            'w-6 h-6': !isMdScale && isSmScale,
                            'w-5 h-5': !isSmScale
                          })}
                        /> */}
                          <ZIonLabel
                            className={classNames({
                              'block font-semibold ion-text-wrap': true,
                              'text-md': isMdScale,
                              'text-sm my-0': !isMdScale
                            })}>
                            push notifications
                          </ZIonLabel>

                          <ZIonText slot='end'>
                            <ZRCSwitch
                              checked={values?.browser?.push}
                              onChange={checked => {
                                void setFieldValue(
                                  'browser.push',
                                  checked,
                                  false
                                );
                              }}
                              testingselector={
                                CONSTANTS.testingSelectors.userAccount
                                  .notificationSettingsTab
                                  .browserNotificationAccordion
                                  .chromeNotificationToggler
                              }
                            />
                          </ZIonText>
                        </ZIonItem>

                        {/* Sounds */}
                        <div className=''>
                          <ZIonText
                            className={classNames({
                              'px-3 mb-1 mt-2 block': true,
                              'text-md': isLgScale,
                              'text-sm': !isLgScale
                            })}>
                            Sounds
                          </ZIonText>

                          <ZIonItem
                            lines='none'
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .browserNotificationAccordion
                                .notificationSoundItem
                            }
                            className={classNames({
                              'rounded-lg overflow-hidden ion-activatable ripple-parent cursor-pointer':
                                true,
                              'text-sm': !isMdScale
                            })}>
                            <ZIonLabel
                              className={classNames({
                                'block font-semibold ion-text-wrap': true,
                                'text-md': isMdScale
                              })}>
                              Play a sound when each new notification is
                              received
                            </ZIonLabel>

                            <ZIonText slot='end'>
                              <ZRCSwitch
                                checked={
                                  values?.browser?.playSoundInNotification
                                }
                                onChange={checked => {
                                  void setFieldValue(
                                    'browser.playSoundInNotification',
                                    checked,
                                    false
                                  );
                                }}
                                testingselector={
                                  CONSTANTS.testingSelectors.userAccount
                                    .notificationSettingsTab
                                    .browserNotificationAccordion
                                    .notificationSoundToggler
                                }
                              />
                            </ZIonText>
                          </ZIonItem>

                          <ZIonItem
                            lines='none'
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .browserNotificationAccordion.messageSoundItem
                            }
                            className={classNames({
                              'rounded-lg overflow-hidden ion-activatable ripple-parent cursor-pointer':
                                true,
                              'text-sm': !isMdScale
                            })}>
                            <ZIonLabel
                              className={classNames({
                                'block font-semibold ion-text-wrap': true,
                                'text-md': isMdScale
                              })}>
                              Play a sound when a message is received
                            </ZIonLabel>

                            <ZIonText slot='end'>
                              <ZRCSwitch
                                checked={values?.browser?.playSoundInMessage}
                                onChange={checked => {
                                  void setFieldValue(
                                    'browser.playSoundInMessage',
                                    checked,
                                    false
                                  );
                                }}
                                testingselector={
                                  CONSTANTS.testingSelectors.userAccount
                                    .notificationSettingsTab
                                    .browserNotificationAccordion
                                    .messageSoundToggler
                                }
                              />
                            </ZIonText>
                          </ZIonItem>
                        </div>
                      </div>
                    </div>
                  </ZIonAccordion>

                  {/* Email */}
                  <ZIonAccordion className='mb-2 overflow-hidden rounded-lg'>
                    <ZIonItem
                      slot='header'
                      minHeight='25px'
                      lines='none'
                      color='light'
                      testingselector={
                        CONSTANTS.testingSelectors.userAccount
                          .notificationSettingsTab.emailNotificationAccording
                          .header
                      }
                      className={classNames({
                        'h-[2.9rem]': !isMdScale
                      })}>
                      <ZIonIcon
                        icon={mailOutline}
                        className={classNames({
                          'w-7 h-7': isMdScale,
                          'w-6 h-6': !isMdScale
                        })}
                      />
                      <ZIonLabel
                        className={classNames({
                          'ms-2': true,
                          'my-0': !isMdScale
                        })}>
                        <ZIonText
                          className={classNames({
                            'block font-semibold': true,
                            'text-md': isMdScale,
                            'text-sm': !isMdScale
                          })}>
                          Email
                        </ZIonText>
                        <ZIonText className='block text-xs'>
                          On, Suggested
                        </ZIonText>
                      </ZIonLabel>
                    </ZIonItem>
                    <div
                      className='p-2 border border-t-0 rounded-b-lg'
                      slot='content'>
                      <ZIonItem
                        lines='none'
                        className={classNames({
                          'h-[2.7rem]': !isMdScale
                        })}>
                        <ZIonImg
                          src={emailLogo}
                          className={classNames({
                            'w-7 h-7': isMdScale,
                            'w-6 h-6': !isMdScale
                          })}
                        />
                        <ZIonLabel
                          className={classNames({
                            'ms-3': true,
                            'my-0': !isMdScale
                          })}>
                          <ZIonText
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .emailNotificationAccording.primaryEmail
                            }
                            className={classNames({
                              'block font-semibold': true,
                              'text-md': isMdScale,
                              'text-sm': !isMdScale
                            })}>
                            {UserAccountRStateAtom?.email}
                          </ZIonText>
                          <ZIonText className='block text-xs'>
                            Primary email
                          </ZIonText>
                        </ZIonLabel>
                      </ZIonItem>

                      {/* Email Frequency */}
                      <div className='mt-2'>
                        <ZIonText
                          className={classNames({
                            'px-3 my-2 block text-md': true,
                            'my-2': isMdScale,
                            'mb-0 mt-2': !isMdScale
                          })}>
                          Email Frequency
                        </ZIonText>

                        {/* All */}
                        <ZIonItem
                          lines='none'
                          testingselector={
                            CONSTANTS.testingSelectors.userAccount
                              .notificationSettingsTab
                              .emailNotificationAccording.allItem
                          }
                          className={classNames({
                            'rounded-lg overflow-hidden mt-2': true
                          })}
                          style={zIonItemStyle}>
                          <ZIonCheckbox
                            mode='ios'
                            onIonChange={() => {
                              void setFieldValue(
                                'email.frequency',
                                USNotificationSettingFrequencyEnum.all,
                                false
                              );
                            }}
                            checked={
                              values?.email?.frequency ===
                              USNotificationSettingFrequencyEnum.all
                            }
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .emailNotificationAccording.allToggler
                            }>
                            <ZIonLabel className='my-0 ms-3 ion-text-wrap'>
                              <ZIonText
                                className={classNames({
                                  'block font-semibold': true,
                                  'text-md': isMdScale,
                                  'text-sm': !isMdScale
                                })}>
                                All
                              </ZIonText>
                              <ZIonText className='block text-xs'>
                                All notification, except the once you turn off
                              </ZIonText>
                            </ZIonLabel>
                          </ZIonCheckbox>
                        </ZIonItem>

                        {/* Suggested */}
                        <ZIonItem
                          lines='none'
                          testingselector={
                            CONSTANTS.testingSelectors.userAccount
                              .notificationSettingsTab
                              .emailNotificationAccording.suggestedItem
                          }
                          className={classNames({
                            'rounded-lg overflow-hidden mt-2': true
                          })}
                          style={zIonItemStyle}>
                          <ZIonCheckbox
                            mode='ios'
                            checked={
                              values?.email?.frequency ===
                              USNotificationSettingFrequencyEnum.suggested
                            }
                            onIonChange={() => {
                              void setFieldValue(
                                'email.frequency',
                                USNotificationSettingFrequencyEnum.suggested,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .emailNotificationAccording.suggestedToggler
                            }>
                            <ZIonLabel className='my-0 ms-3 ion-text-wrap'>
                              <ZIonText
                                className={classNames({
                                  'block font-semibold': true,
                                  'text-md': isMdScale,
                                  'text-sm': !isMdScale
                                })}>
                                Suggested
                              </ZIonText>
                              <ZIonText className='block text-xs'>
                                Notifications we think you may be interested in,
                                except the ones you turn off
                              </ZIonText>
                            </ZIonLabel>
                          </ZIonCheckbox>
                        </ZIonItem>

                        {/* Required notification */}
                        <ZIonItem
                          lines='none'
                          testingselector={
                            CONSTANTS.testingSelectors.userAccount
                              .notificationSettingsTab
                              .emailNotificationAccording.requestedItem
                          }
                          className={classNames({
                            'rounded-lg overflow-hidden mt-2': true
                          })}
                          style={zIonItemStyle}>
                          <ZIonCheckbox
                            mode='ios'
                            checked={
                              values?.email?.frequency ===
                              USNotificationSettingFrequencyEnum.required
                            }
                            onIonChange={() => {
                              void setFieldValue(
                                'email.frequency',
                                USNotificationSettingFrequencyEnum.required,
                                false
                              );
                            }}
                            testingselector={
                              CONSTANTS.testingSelectors.userAccount
                                .notificationSettingsTab
                                .emailNotificationAccording.requestedToggler
                            }>
                            <ZIonLabel className='my-0 ms-3 ion-text-wrap'>
                              <ZIonText
                                className={classNames({
                                  'block font-semibold': true,
                                  'text-md': isMdScale,
                                  'text-sm': !isMdScale
                                })}>
                                Required notification
                              </ZIonText>
                              <ZIonText className='block text-xs'>
                                Only notifications about your account, security,
                                privacy and Pages you manage
                              </ZIonText>
                            </ZIonLabel>
                          </ZIonCheckbox>
                        </ZIonItem>

                        {/*  */}
                        <div className=''>
                          <ZIonText
                            className={classNames({
                              'px-3 my-2 block text-md': true,
                              'my-2': isMdScale,
                              'mb-0 mt-2': !isMdScale
                            })}>
                            Your Email Notifications
                          </ZIonText>

                          <ZIonItem
                            lines='none'
                            className={classNames({
                              'rounded-lg overflow-hidden ion-activatable ripple-parent cursor-pointer':
                                true,
                              'h-[2.5rem]': !isMdScale
                            })}>
                            <ZIonLabel
                              className={classNames({
                                'block text-md font-semibold': true,
                                'text-md': isMdScale,
                                'text-sm my-0 pb-[7px]': !isMdScale
                              })}>
                              Other notification
                            </ZIonLabel>

                            <ZIonText
                              slot='end'
                              className={classNames({
                                'pb-[7px]': !isMdScale
                              })}>
                              <ZRCSwitch
                                checked={
                                  values?.email?.notifications
                                    ?.otherNotifications
                                }
                                onChange={checked => {
                                  void setFieldValue(
                                    'email.notifications.otherNotifications',
                                    checked,
                                    false
                                  );
                                }}
                              />
                            </ZIonText>
                          </ZIonItem>
                        </div>
                      </div>
                    </div>
                  </ZIonAccordion>

                  {/* SMS */}
                  <ZIonAccordion className='overflow-hidden rounded-lg'>
                    <ZIonItem
                      slot='header'
                      lines='none'
                      minHeight='25px'
                      color='light'
                      className={classNames({
                        'h-[2.9rem]': !isMdScale
                      })}>
                      <ZIonIcon
                        icon={chatbubbleEllipsesOutline}
                        className={classNames({
                          'w-7 h-7': isMdScale,
                          'w-6 h-6': !isMdScale
                        })}
                      />
                      <ZIonLabel
                        className={classNames({
                          'ms-2': true,
                          'my-0': !isMdScale
                        })}>
                        <ZIonText
                          className={classNames({
                            'block font-semibold': true,
                            'text-md': isMdScale,
                            'text-sm': !isMdScale
                          })}>
                          SMS
                        </ZIonText>
                        <ZIonText className='block text-xs'>
                          On, Suggested
                        </ZIonText>
                      </ZIonLabel>
                    </ZIonItem>
                    <div
                      className='p-2 border border-t-0 rounded-b-lg'
                      slot='content'>
                      {/* SMS Frequency */}
                      <div className='mt-2'>
                        <ZIonText className='block px-3 text-md'>
                          SMS Frequency
                        </ZIonText>
                      </div>
                    </div>
                  </ZIonAccordion>
                </ZIonAccordionGroup>
              </ZIonCol>
            </ZIonRow>
          );
        }}
      </Formik>
    </>
  );
};

export default ZPersonalSettings;
