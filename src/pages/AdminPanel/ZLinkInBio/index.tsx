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
import { useMediaQuery } from 'react-responsive';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */
import ZIonPage from '@/components/ZIonPage';
import ZLinkIonPanelSidebar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardSidePanel/index';
import ZLinkDashboardTopBar from '@/components/UserDashboard/ZLinkdashboard/ZLDashboardTopbar';
import {
  ZIonText,
  ZIonRow,
  ZIonGrid,
  ZIonContent,
  ZIonSplitPane,
  ZIonTitle,
  ZIonImg,
  ZIonButton
} from '@/components/ZIonComponents';

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */
import CONSTANTS, { BRACKPOINT_MD, BRACKPOINT_SM } from '@/utils/constants';
import { PAGE_MENU } from '@/utils/enums';

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */
import { ZLinkIonPanelSidebarActiveLinkType } from '@/types/AdminPanel/linksType';

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
import { Intro } from '@/assets/images';

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZLinkInBio: React.FC = () => {
  const isMdScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_MD})`
  });

  const isSmScale = useMediaQuery({
    query: `(min-width: ${BRACKPOINT_SM})`
  });

  return (
    <>
      <ZIonPage
        pageTitle='Dashboard'
        id={CONSTANTS.MENU_IDS.DASHBOARD_SM_MENU_CONTENT_ID}
        menu={PAGE_MENU.DASHBOARD_PAGE_MENU}>
        <ZIonSplitPane
          when='lg'
          contentId={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}>
          {/* Side Bar */}
          <ZLinkIonPanelSidebar
            activeLink={ZLinkIonPanelSidebarActiveLinkType.linksInBio}
          />

          <div
            className='overflow-y-scroll ion-page'
            id={CONSTANTS.DEFAULT_VALUES.ZAIONS_DASHBOARD_SPLIT_PANEL}>
            <ZLinkDashboardTopBar />
            <ZIonContent className='ion-padding'>
              <ZIonGrid>
                <ZIonRow className='flex-col mt-3 ion-align-items-center ion-justify-content-center'>
                  <ZIonImg
                    src={Intro}
                    alt='Link in bio Inactive state'
                    className={classNames({
                      'w-[35%]': isMdScale,
                      'w-[60%]': !isMdScale && isSmScale,
                      'w-full': !isSmScale
                    })}
                  />
                  <ZIonTitle className='mt-4 mb-2 text-3xl font-bold'>
                    Showcase your links
                  </ZIonTitle>
                  <ZIonText className='text-lg ion-text-center'>
                    Display your most important links on one simple page. Then
                    share <br /> one simple Link-in-bio to get people there.
                  </ZIonText>
                  <ZIonButton className='mt-4 ion-text-capitalize '>
                    <ZIonText className='px-4 font-bold'>
                      Create a Link-in-bio
                    </ZIonText>
                  </ZIonButton>
                  <ZIonButton
                    fill='clear'
                    className='mt-3 ion-text-capitalize'>
                    Learn more
                  </ZIonButton>
                </ZIonRow>
              </ZIonGrid>
            </ZIonContent>
          </div>
        </ZIonSplitPane>
      </ZIonPage>
    </>
  );
};

export default ZLinkInBio;
