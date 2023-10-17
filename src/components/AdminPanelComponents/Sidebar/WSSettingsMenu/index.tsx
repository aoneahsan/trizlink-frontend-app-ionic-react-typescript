/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import { useParams, useRouteMatch } from 'react-router';
import classNames from 'classnames';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import {
  ZIonAccordion,
  ZIonAccordionGroup,
  ZIonCol,
  ZIonItem,
  ZIonLabel
} from '@/components/ZIonComponents';
import ZCustomScrollable from '@/components/CustomComponents/ZScrollable';

/**
 * Custom Hooks Imports go down
 * ? Like import of custom Hook is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import { replaceRouteParams } from '@/utils/helpers';
import ZaionsRoutes from '@/utils/constants/RoutesConstants';
import CONSTANTS from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { WSSettingsPageSect } from '@/types/AdminPanel/workspace';
import { useZMediaQueryScale } from '@/ZaionsHooks/ZGenericHooks';
import ZCan from '@/components/Can';
import {
  permissionCheckModeEnum,
  permissionsEnum,
  permissionsTypeEnum,
  shareWSPermissionEnum
} from '@/utils/enums/RoleAndPermissions';

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
 * About: (workspace settings left menu.)
 * @type {*}
 * */

const ZWSSettingsMenu: React.FC = () => {
  const { workspaceId, shareWSMemberId, wsShareId } = useParams<{
    workspaceId: string;
    shareWSMemberId: string;
    wsShareId: string;
  }>();

  const { isLgScale } = useZMediaQueryScale();

  // #region checking the route.
  let isMembersPage: boolean | undefined;
  if (workspaceId) {
    isMembersPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.Members
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isMembersPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Members
    )?.isExact;
  }

  let isReferralProgramPage: boolean | undefined;
  if (workspaceId) {
    isReferralProgramPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isReferralProgramPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.ReferralProgram
    )?.isExact;
  }

  let isBillingPage: boolean | undefined;
  if (workspaceId) {
    isBillingPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isBillingPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Billing
    )?.isExact;
  }

  let isUserPage: boolean | undefined;
  if (workspaceId) {
    isUserPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.User
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isUserPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.User
    )?.isExact;
  }

  let isPixelPage: boolean | undefined;
  if (workspaceId) {
    isPixelPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isPixelPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Pixel
    )?.isExact;
  }

  let isUTMTagPage: boolean | undefined;
  if (workspaceId) {
    isUTMTagPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.UTMTag
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isUTMTagPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.UTMTag
    )?.isExact;
  }

  let isEmbedWidgetPage: boolean | undefined;
  if (workspaceId) {
    isEmbedWidgetPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.Setting.AccountSettings.EmbedWidget
    )?.isExact;
  } else if (wsShareId && shareWSMemberId) {
    isEmbedWidgetPage = useRouteMatch(
      ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.EmbedWidget
    )?.isExact;
  }
  // #endregion

  return (
    <ZIonCol
      sizeXl='2.8'
      sizeLg='3'
      sizeMd='3'
      sizeSm='2.8'
      sizeXs='2.8'
      className='border-e-[1px] zaions-transition h-full shadow-[0_3px_6px_#00000029]'>
      <ZCustomScrollable
        className={classNames({
          'w-full h-full ion-padding-top': true,
          'ion-padding': isLgScale,
          'px-2': !isLgScale
        })}
        scrollY={true}>
        <ZIonAccordionGroup
          testingselector={
            CONSTANTS.testingSelectors.WSSettings.menuBar.accordionGroup.value
          }
          value={
            isBillingPage ||
            isMembersPage ||
            isReferralProgramPage ||
            isUserPage
              ? WSSettingsPageSect.accountSetting
              : WSSettingsPageSect.workspaceSettings
          }>
          {/* Account settings */}
          <ZIonAccordion
            value={WSSettingsPageSect.accountSetting}
            testingselector={
              CONSTANTS.testingSelectors.WSSettings.menuBar.accordionGroup
                .asAccordion
            }>
            <ZIonItem
              slot='header'
              minHeight='25px'
              color='light'>
              <ZIonLabel>Account settings</ZIonLabel>
            </ZIonItem>

            <div
              className='px-1 py-1'
              slot='content'>
              {/* Members */}
              <ZCan
                shareWSId={wsShareId}
                permissionType={
                  wsShareId && shareWSMemberId
                    ? permissionsTypeEnum.shareWSMemberPermissions
                    : permissionsTypeEnum.loggedInUserPermissions
                }
                havePermissions={
                  workspaceId
                    ? [permissionsEnum.viewAny_ws_member]
                    : wsShareId && shareWSMemberId
                    ? [shareWSPermissionEnum.viewAny_sws_member]
                    : []
                }>
                <ZIonItem
                  lines='none'
                  minHeight='2rem'
                  className={classNames({
                    'mt-1 cursor-pointer': true,
                    zaions__light_bg: isMembersPage
                  })}
                  testingselector={
                    CONSTANTS.testingSelectors.WSSettings.menuBar.as.teamBtn
                  }
                  routerLink={
                    workspaceId
                      ? replaceRouteParams(
                          ZaionsRoutes.AdminPanel.Setting.AccountSettings
                            .Members,
                          [CONSTANTS.RouteParams.workspace.workspaceId],
                          [workspaceId]
                        )
                      : wsShareId && shareWSMemberId
                      ? replaceRouteParams(
                          ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                            .Members,
                          [
                            CONSTANTS.RouteParams.workspace.wsShareId,
                            CONSTANTS.RouteParams.workspace.shareWSMemberId
                          ],
                          [wsShareId, shareWSMemberId]
                        )
                      : ''
                  }>
                  Members
                </ZIonItem>
              </ZCan>

              {/* Referral Program */}
              <ZIonItem
                lines='none'
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true,
                  zaions__light_bg: isReferralProgramPage
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.as.referralBtn
                }
                routerLink={
                  workspaceId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.Setting.AccountSettings
                          .ReferralProgram,
                        [CONSTANTS.RouteParams.workspace.workspaceId],
                        [workspaceId]
                      )
                    : wsShareId && shareWSMemberId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                          .ReferralProgram,
                        [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        [wsShareId, shareWSMemberId]
                      )
                    : ''
                }>
                Referral program
              </ZIonItem>

              {/* Billing */}
              <ZIonItem
                lines='none'
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true,
                  zaions__light_bg: isBillingPage
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.as.billingBtn
                }
                routerLink={
                  workspaceId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing,
                        [CONSTANTS.RouteParams.workspace.workspaceId],
                        [workspaceId]
                      )
                    : wsShareId && shareWSMemberId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Billing,
                        [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        [wsShareId, shareWSMemberId]
                      )
                    : ''
                }>
                Billing
              </ZIonItem>

              {/* User */}
              <ZIonItem
                lines='none'
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true,
                  zaions__light_bg: isUserPage
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.as.userBtn
                }
                routerLink={
                  workspaceId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.Setting.AccountSettings.User,
                        [CONSTANTS.RouteParams.workspace.workspaceId],
                        [workspaceId]
                      )
                    : wsShareId && shareWSMemberId
                    ? replaceRouteParams(
                        ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.User,
                        [
                          CONSTANTS.RouteParams.workspace.wsShareId,
                          CONSTANTS.RouteParams.workspace.shareWSMemberId
                        ],
                        [wsShareId, shareWSMemberId]
                      )
                    : ''
                }>
                User
              </ZIonItem>
            </div>
          </ZIonAccordion>

          {/* Workspace settings */}
          <ZCan
            shareWSId={wsShareId}
            checkMode={permissionCheckModeEnum.any}
            permissionType={
              wsShareId && shareWSMemberId
                ? permissionsTypeEnum.shareWSMemberPermissions
                : permissionsTypeEnum.loggedInUserPermissions
            }
            havePermissions={
              workspaceId
                ? [
                    permissionsEnum.viewAny_pixel,
                    permissionsEnum.viewAny_utmTag,
                    permissionsEnum.viewAny_embededWidget
                  ]
                : wsShareId && shareWSMemberId
                ? [
                    shareWSPermissionEnum.viewAny_sws_pixel,
                    shareWSPermissionEnum.viewAny_sws_utmTag,
                    shareWSPermissionEnum.viewAny_sws_embededWidget
                  ]
                : []
            }>
            <ZIonAccordion
              value={WSSettingsPageSect.workspaceSettings}
              testingselector={
                CONSTANTS.testingSelectors.WSSettings.menuBar.accordionGroup
                  .wsAccordion
              }>
              <ZIonItem
                slot='header'
                minHeight='25px'
                color='light'>
                <ZIonLabel>Workspace settings</ZIonLabel>
              </ZIonItem>

              <div
                className='px-1 py-1'
                slot='content'>
                {/* Pixels */}
                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId && shareWSMemberId
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId
                      ? [permissionsEnum.viewAny_pixel]
                      : wsShareId && shareWSMemberId
                      ? [shareWSPermissionEnum.viewAny_sws_pixel]
                      : []
                  }>
                  <ZIonItem
                    lines='none'
                    minHeight='2rem'
                    className={classNames({
                      'mt-1 cursor-pointer': true,
                      zaions__light_bg: isPixelPage
                    })}
                    testingselector={
                      CONSTANTS.testingSelectors.WSSettings.menuBar.ws.pixelBtn
                    }
                    routerLink={
                      workspaceId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.Setting.AccountSettings
                              .Pixel,
                            [CONSTANTS.RouteParams.workspace.workspaceId],
                            [workspaceId]
                          )
                        : wsShareId && shareWSMemberId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                              .Pixel,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId
                            ],
                            [wsShareId, shareWSMemberId]
                          )
                        : ''
                    }>
                    Pixels
                  </ZIonItem>
                </ZCan>

                {/* UTM tags */}
                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId && shareWSMemberId
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId
                      ? [permissionsEnum.viewAny_utmTag]
                      : wsShareId && shareWSMemberId
                      ? [shareWSPermissionEnum.viewAny_sws_utmTag]
                      : []
                  }>
                  <ZIonItem
                    lines='none'
                    minHeight='2rem'
                    className={classNames({
                      'mt-1 cursor-pointer': true,
                      zaions__light_bg: isUTMTagPage
                    })}
                    testingselector={
                      CONSTANTS.testingSelectors.WSSettings.menuBar.ws.utmBtn
                    }
                    routerLink={
                      workspaceId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.Setting.AccountSettings
                              .UTMTag,
                            [CONSTANTS.RouteParams.workspace.workspaceId],
                            [workspaceId]
                          )
                        : wsShareId && shareWSMemberId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                              .UTMTag,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId
                            ],
                            [wsShareId, shareWSMemberId]
                          )
                        : ''
                    }>
                    UTM tags
                  </ZIonItem>
                </ZCan>

                {/* Embed widgets */}
                <ZCan
                  shareWSId={wsShareId}
                  permissionType={
                    wsShareId && shareWSMemberId
                      ? permissionsTypeEnum.shareWSMemberPermissions
                      : permissionsTypeEnum.loggedInUserPermissions
                  }
                  havePermissions={
                    workspaceId
                      ? [permissionsEnum.viewAny_embededWidget]
                      : wsShareId && shareWSMemberId
                      ? [shareWSPermissionEnum.viewAny_sws_embededWidget]
                      : []
                  }>
                  <ZIonItem
                    lines='none'
                    minHeight='2rem'
                    className={classNames({
                      'mt-1 cursor-pointer': true,
                      zaions__light_bg: isEmbedWidgetPage
                    })}
                    testingselector={
                      CONSTANTS.testingSelectors.WSSettings.menuBar.ws
                        .embedWidgetBtn
                    }
                    routerLink={
                      workspaceId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.Setting.AccountSettings
                              .EmbedWidget,
                            [CONSTANTS.RouteParams.workspace.workspaceId],
                            [workspaceId]
                          )
                        : wsShareId && shareWSMemberId
                        ? replaceRouteParams(
                            ZaionsRoutes.AdminPanel.ShareWS.AccountSettings
                              .EmbedWidget,
                            [
                              CONSTANTS.RouteParams.workspace.wsShareId,
                              CONSTANTS.RouteParams.workspace.shareWSMemberId
                            ],
                            [wsShareId, shareWSMemberId]
                          )
                        : ''
                    }>
                    Embed widgets
                  </ZIonItem>
                </ZCan>
              </div>
            </ZIonAccordion>
          </ZCan>
        </ZIonAccordionGroup>
      </ZCustomScrollable>
    </ZIonCol>
  );
};

export default ZWSSettingsMenu;
