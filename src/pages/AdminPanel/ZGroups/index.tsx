/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';
import {
  ZTable,
  ZTableTHead,
  ZTableTBody,
  ZTableRow,
  ZTableHeadCol,
  ZTableRowCol
} from '@/components/InPageComponents/ZaionsTable/table-styled-components.sc';

import {
  ZIonCol,
  ZIonText,
  ZIonRouterLink,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonSplitPane,
  ZIonButton
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { BRACKPOINT_MD } from '@/utils/constants';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any extarnal type import is a Type import
 * */
import {
  ZLinkIonPanelSettingsSidebarActiveLinkType,
  ZLinkIonPanelSidebarActiveLinkType
} from '@/types/AdminPanel/linksType';

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
import classNames from 'classnames';
import ZaionsLinkSettingPanel from '@/components/UserDashboard/ZLinkdashboard/ZLinksSettingPanel';
import { PAGE_MENU } from '@/utils/enums';
import { useMediaQuery } from 'react-responsive';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be pleace Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZGroups: React.FC = () => {
  // const isLgScale = useMediaQuery({
  // query: `(min-width: ${BRACKPOINT_LG})`,
  // });

  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`
  });
  return (
    <>
      <ZIonPage
        pageTitle='Setting'
        id={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
        menu={PAGE_MENU.DASHBOARD_PAGE_MENU}>
        <ZIonSplitPane
          when='lg'
          contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}>
          {/* Side Bar */}
          <ZLinkIonPanelSidebar
            activeLink={ZLinkIonPanelSidebarActiveLinkType.settings}
          />

          <div
            className='overflow-y-scroll ion-page'
            id={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}>
            <ZLinkDashboardTopBar />
            <ZIonContent className='ion-padding'>
              <ZIonGrid>
                <ZIonRow>
                  {/* If it is in md then the setting side panel will be visiable */}
                  {isMdScale && (
                    <ZaionsLinkSettingPanel
                      activeLink={
                        ZLinkIonPanelSettingsSidebarActiveLinkType.groups
                      }
                    />
                  )}
                  <ZIonCol>
                    <ZIonRow>
                      <ZIonCol
                        size='12'
                        className='flex io-align-items-center ion-justify-content-between'>
                        <ZIonText>
                          <h2 className='inline-block font-black'>Groups</h2>
                        </ZIonText>
                        <div
                          className={classNames({
                            'cursor-no-drop': true
                          })}>
                          <ZIonButton
                            className='ion-text-capitalize'
                            disabled
                            color='medium'>
                            Add new group
                          </ZIonButton>
                        </div>
                      </ZIonCol>

                      <ZIonCol
                        size='12'
                        className='mt-3'>
                        <ZIonText color='medium'>Using 1 of 1 groups</ZIonText>
                      </ZIonCol>

                      <ZIonCol size='12'>
                        <ZTable>
                          <ZTableTHead>
                            <ZTableRow>
                              <ZTableHeadCol>Name</ZTableHeadCol>
                              <ZTableHeadCol>Created</ZTableHeadCol>
                              <ZTableHeadCol>Last modified</ZTableHeadCol>
                            </ZTableRow>
                          </ZTableTHead>
                          <ZTableTBody>
                            <ZTableRow>
                              <ZTableRowCol>
                                <ZIonRouterLink>trizlink-user</ZIonRouterLink>
                              </ZTableRowCol>
                              <ZTableRowCol>
                                Sep 18, 2022, 2:42 PM GMT+5
                              </ZTableRowCol>
                              <ZTableRowCol>
                                Sep 18, 2022, 2:42 PM GMT+5
                              </ZTableRowCol>
                            </ZTableRow>
                          </ZTableTBody>
                        </ZTable>
                      </ZIonCol>
                    </ZIonRow>
                  </ZIonCol>
                </ZIonRow>
              </ZIonGrid>
            </ZIonContent>
          </div>
        </ZIonSplitPane>
      </ZIonPage>
    </>
  );
};

export default ZGroups;
