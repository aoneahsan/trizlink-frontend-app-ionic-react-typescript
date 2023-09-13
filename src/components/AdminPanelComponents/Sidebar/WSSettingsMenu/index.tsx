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
  ZIonLabel,
  ZIonList
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
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  // #region checking the route.
  const isTeamPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team
  )?.isExact;

  const isReferralProgramPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.ReferralProgram
  )?.isExact;

  const isBillingPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing
  )?.isExact;

  const isUserPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.User
  )?.isExact;

  const isPixelPage = useRouteMatch(
    ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel
  )?.isExact;
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
        className='w-full h-full ion-padding-top ion-padding'
        scrollY={true}>
        <ZIonAccordionGroup
          testingselector={
            CONSTANTS.testingSelectors.WSSettings.menuBar.accordionGroup.value
          }
          value={
            isBillingPage || isTeamPage || isReferralProgramPage || isUserPage
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
              {/* Team */}
              <ZIonItem
                lines='none'
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true,
                  zaions__light_bg: isTeamPage
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.as.teamBtn
                }
                routerLink={replaceRouteParams(
                  ZaionsRoutes.AdminPanel.Setting.AccountSettings.Team,
                  [CONSTANTS.RouteParams.workspace.workspaceId],
                  [workspaceId]
                )}>
                Team
              </ZIonItem>

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
                routerLink={replaceRouteParams(
                  ZaionsRoutes.AdminPanel.Setting.AccountSettings
                    .ReferralProgram,
                  [CONSTANTS.RouteParams.workspace.workspaceId],
                  [workspaceId]
                )}>
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
                routerLink={replaceRouteParams(
                  ZaionsRoutes.AdminPanel.Setting.AccountSettings.Billing,
                  [CONSTANTS.RouteParams.workspace.workspaceId],
                  [workspaceId]
                )}>
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
                routerLink={replaceRouteParams(
                  ZaionsRoutes.AdminPanel.Setting.AccountSettings.User,
                  [CONSTANTS.RouteParams.workspace.workspaceId],
                  [workspaceId]
                )}>
                User
              </ZIonItem>
            </div>
          </ZIonAccordion>

          {/* Workspace settings */}
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
                routerLink={replaceRouteParams(
                  ZaionsRoutes.AdminPanel.Setting.AccountSettings.Pixel,
                  [CONSTANTS.RouteParams.workspace.workspaceId],
                  [workspaceId]
                )}>
                Pixels
              </ZIonItem>

              <ZIonItem
                lines='none'
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true
                  // zaions__light_bg: false,
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.ws.utmBtn
                }
                // routerLink={replaceRouteParams(
                // 	ZaionsRoutes.AdminPanel.Setting.AccountSettings.Main,
                // 	[
                // 		CONSTANTS.RouteParams.workspace.workspaceId,
                // 		CONSTANTS.RouteParams.settings.tab,
                // 	],
                // 	[workspaceId, WSSettingsPageSectTab.billing]
                // )}
              >
                Utm tags
              </ZIonItem>

              <ZIonItem
                lines='none'
                minHeight='2rem'
                className={classNames({
                  'mt-1 cursor-pointer': true
                  // zaions__light_bg: false,
                })}
                testingselector={
                  CONSTANTS.testingSelectors.WSSettings.menuBar.ws
                    .embedWidgetBtn
                }
                // routerLink={replaceRouteParams(
                // 	ZaionsRoutes.AdminPanel.Setting.AccountSettings.Main,
                // 	[
                // 		CONSTANTS.RouteParams.workspace.workspaceId,
                // 		CONSTANTS.RouteParams.settings.tab,
                // 	],
                // 	[workspaceId, WSSettingsPageSectTab.billing]
                // )}
              >
                Embed widgets
              </ZIonItem>
            </div>
          </ZIonAccordion>
        </ZIonAccordionGroup>
      </ZCustomScrollable>
    </ZIonCol>
  );
};

export default ZWSSettingsMenu;
