// Core Imports
import React, { ReactNode } from 'react';

// Packages Imports
import { IonPage } from '@ionic/react';
import classNames from 'classnames';

// Custom Imports
import ZaionsRHelmet from '@/components/CustomComponents/ZaionsRHelmet';
import SideBarMenu from '@/navigation/SideBarMenu';

// Global Constants
import { CONTENT_ID } from '@/utils/constants';
import ZaionsDashboardResponsiveMenu from '@/navigation/AdminPanel/DashboardResponsiveMenu';
import { PAGE_MENU, PAGE_MENU_SIDE } from '@/utils/enums';
import AdminPanelFoldersSidebarMenu from '@/navigation/AdminPanel/FolderSideMenu';
import AdminPanelShortLinksFolderSideMenu from '@/navigation/AdminPanel/ShortLinksFolderSideMenu';
import ZWorkspaceViewPageFilterMenu from '@/navigation/AdminPanel/WorkspaceViewPageFilterMenu';
import { useParams } from 'react-router';
import ZProjectBoardStatusMenu from '@/navigation/AdminPanel/ProjectBoardStatusMenu';

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
	const { workspaceId } = useParams<{
		workspaceId: string;
	}>();
	return (
		<>
			{menu === PAGE_MENU.UNAUTHENTICATED_PAGE_MENU ? (
				<SideBarMenu menuSide={menuSide} />
			) : menu === PAGE_MENU.DASHBOARD_PAGE_MENU ? (
				<ZaionsDashboardResponsiveMenu menuSide={menuSide} />
			) : menu === PAGE_MENU.ADMIN_PANEL_SHORT_LINKS_FOLDERS_MENU ? (
				<AdminPanelShortLinksFolderSideMenu workspaceId={workspaceId} />
			) : menu === PAGE_MENU.ADMIN_PANEL_WORKSPACE_VIEW_FILTER_MENU ? (
				<ZWorkspaceViewPageFilterMenu />
			) : menu === PAGE_MENU.ADMIN_PROJECT_BOARD_STATUS_MENU ? (
				<ZProjectBoardStatusMenu />
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
