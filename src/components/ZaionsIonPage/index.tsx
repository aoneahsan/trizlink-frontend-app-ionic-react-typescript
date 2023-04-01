// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { IonPage } from '@ionic/react';
import classNames from 'classnames';

// Custom Imports
import ZaionsRHelmet from 'components/CustomComponents/ZaionsRHelmet';
import SideBarMenu from 'navigation/SideBarMenu';

// Global Constants
import { CONTENT_ID } from 'utils/constants';
import ZaionsDashboardResonsiveMenu from 'navigation/DashboardResponsiveMenu';
import { PAGE_MENU, PAGE_MENU_SIDE } from 'utils/enums';

// Types
type ZaionsIonPageType = {
  children: ReactNode | ReactNode[];
  className?: string;
  id?: string;
  pageTitle?: string;
  menu?: PAGE_MENU | undefined;
  menuSide?: PAGE_MENU_SIDE;
};

// Functional Component
const ZaionsIonPage: React.FC<ZaionsIonPageType> = ({
  menu,
  id,
  children,
  className,
  menuSide,
  pageTitle,
}) => {
  return (
    <>
      {menu === PAGE_MENU.UNAUTHENTICATED_PAGE_MENU ? (
        <SideBarMenu menuSide={menuSide} />
      ) : menu === PAGE_MENU.DASHBOARD_PAGE_MENU ? (
        <ZaionsDashboardResonsiveMenu menuSide={menuSide} />
      ) : (
        ''
      )}

      <IonPage
        id={id ? id : CONTENT_ID}
        // className={`${className}`}
        className={classNames(className)}
      >
        <ZaionsRHelmet title={pageTitle} />
        {children}
      </IonPage>
    </>
  );
};

export default ZaionsIonPage;
