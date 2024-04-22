// Core Imports
import React, { type ReactNode } from 'react';

// Packages Imports
import { IonPage } from '@ionic/react';
import classNames from 'classnames';
import { useParams } from 'react-router';

// Custom Imports
import ZaionsRHelmet from '@/components/CustomComponents/ZaionsRHelmet';
import SideBarMenu from '@/navigation/SideBarMenu';

// Global Constants
import { CONTENT_ID } from '@/utils/constants';
import ZaionsDashboardResponsiveMenu from '@/navigation/AdminPanel/DashboardResponsiveMenu';
import { PAGE_MENU, type PAGE_MENU_SIDE } from '@/utils/enums';
import AdminPanelShortLinksFolderSideMenu from '@/navigation/AdminPanel/ShortLinks/FolderSideMenu';
import AdminPanelLinkInBioFolderSideMenu from '@/navigation/AdminPanel/LinkInBio/FolderSideMenu';
import ZWorkspaceViewPageFilterMenu from '@/navigation/AdminPanel/WorkspaceViewPageFilterMenu';
import { zCreateElementTestingSelector } from '@/utils/helpers';
import { zCreateElementTestingSelectorKeyEnum } from '@/utils/enums';

// Types
interface ZaionsIonPageType {
  children: ReactNode | ReactNode[];
  className?: string;
  id?: string;
  pageTitle?: string;
  menu?: PAGE_MENU | undefined;
  menuSide?: PAGE_MENU_SIDE;

  //
  testingselector?: string;
  testinglistselector?: string;
}

// Functional Component
const ZIonPage: React.FC<ZaionsIonPageType> = ({
  menu,
  id,
  children,
  className,
  menuSide,
  pageTitle,
  testingselector,
  testinglistselector
}) => {
  const { workspaceId } = useParams<{
    workspaceId?: string;
  }>();
  const _testinglistselector =
    testinglistselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: testinglistselector,
            _key: zCreateElementTestingSelectorKeyEnum.listSelector
          })
        }
      : {};

  const _testingSelector =
    testingselector !== undefined
      ? {
          ...zCreateElementTestingSelector({
            _value: testingselector
          })
        }
      : {};
  return (
    <>
      {menu === PAGE_MENU.UNAUTHENTICATED_PAGE_MENU ? (
        <SideBarMenu menuSide={menuSide} />
      ) : menu === PAGE_MENU.DASHBOARD_PAGE_MENU ? (
        <ZaionsDashboardResponsiveMenu menuSide={menuSide} />
      ) : menu === PAGE_MENU.ADMIN_PANEL_SHORT_LINKS_FOLDERS_MENU ? (
        <AdminPanelShortLinksFolderSideMenu />
      ) : menu === PAGE_MENU.ADMIN_PANEL_LINK_IN_BIO_FOLDERS_MENU ? (
        <AdminPanelLinkInBioFolderSideMenu />
      ) : menu === PAGE_MENU.ADMIN_PANEL_WORKSPACE_VIEW_FILTER_MENU ? (
        <ZWorkspaceViewPageFilterMenu />
      ) : (
        ''
      )}

      <IonPage
        id={id ?? CONTENT_ID}
        // className={`${className}`}
        className={classNames(className)}
        {..._testingSelector}
        {..._testinglistselector}>
        <ZaionsRHelmet title={pageTitle} />
        {children}
      </IonPage>
    </>
  );
};

export default ZIonPage;
