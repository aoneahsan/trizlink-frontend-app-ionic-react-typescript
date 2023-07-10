// Core Imports
import React from 'react';

// Packages Imports
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

// Commented Routes
import ZaionsReactArea from '@/Testing/ReactArea';
import TestingReactTable from '@/Testing/ReactTable';
import ZLinkInBio from '@/pages/AdminPanel/ZLinkInBio';
import ZLinkCampaigns from '@/pages/AdminPanel/ZLCampaigns';
import ZCustomLinks from '@/pages/AdminPanel/ZLCustomLinks';
import ZLinks from '@/pages/AdminPanel/ZLinks';
import ChartsExamples from '@/Testing/Charts';
import ZProfile from '@/pages/AdminPanel/ZProfile';
import ZCustomDomain from '@/pages/AdminPanel/ZCustomDomin';
import ZGroups from '@/pages/AdminPanel/ZGroups';
import ZCSVBulkShortening from '@/pages/AdminPanel/ZCSVBulk';
import ZAccountDetails from '@/pages/AdminPanel/ZAccountDetails';
import ZIntegration from '@/pages/AdminPanel/ZIntegration';
import GoogleMapsCapacitorPackageTest from '@/Testing/GoogleMaps';
import TestingTabs from '@/Testing/TestingTabs';

// Routes
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ZShortLinksListPage from '@/pages/AdminPanel/links';
import ZaionsRoutes from './utils/constants/RoutesConstants';
import ZDashboard from '@/pages/AdminPanel/ZDashboard';
import SignUp from '@/pages/SignUp';
import ZaionsPasswordResetConfirm from '@/pages/ResetPassword/PasswordResetConfirmForm';
import ZaionsAdminPanelSettings from '@/pages/AdminPanel/settings';
import ZLinkInBioLinksSection from '@/pages/AdminPanel/ZLinkInBio/parts/links';
import TestingIonComponents from './Testing/TestingIonComponents';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ZWorkspaceListPage from './pages/AdminPanel/Workspaces';
import ZWorkspaceForm from './pages/AdminPanel/Workspaces/Form';
import ViewSingleWorkspace from './pages/AdminPanel/Workspaces/ViewSingle';
import ZAppStartupPage from './pages/AdminPanel/StartUpPage';
import ZProjects from './pages/AdminPanel/Projects';
import ZProjectCreatePage from './pages/AdminPanel/Projects/Create';
import ZProjectViewPage from './pages/AdminPanel/Projects/View';
import ZProjectSinglePost from './pages/AdminPanel/Projects/Post';

// Functional Component
const AppRoutes: React.FC = () => {
	return (
		<IonReactRouter>
			<IonRouterOutlet>
				{/* Generic Routes */}
				<Route exact path={ZaionsRoutes.HomeRoute} component={Home} />

				<Route
					path={ZaionsRoutes.Testing.IonComponents.Main}
					component={TestingIonComponents}
				/>

				{/* Public Routes */}
				<PublicRoute exact path={ZaionsRoutes.LoginRoute} Component={Login} />

				<PublicRoute exact path={ZaionsRoutes.SignUpRoute} Component={SignUp} />

				<PublicRoute
					exact
					path={ZaionsRoutes.PasswordResetEmailForm}
					Component={ZaionsPasswordResetConfirm}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.AppStartupPage}
					Component={ZAppStartupPage}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.DashboardInactive}
					Component={ZDashboard}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive}
					Component={ZLinkInBioLinksSection}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.ShortLinks.Main}
					Component={ZShortLinksListPage}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Setting.Main}
					Component={ZaionsAdminPanelSettings}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Workspaces.Main}
					Component={ZWorkspaceListPage}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Workspaces.Create}
					Component={ZWorkspaceForm}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Projects.Main}
					Component={ZProjects}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Projects.Create}
					Component={ZProjectCreatePage}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Projects.View}
					Component={ZProjectViewPage}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Projects.Post}
					Component={ZProjectSinglePost}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Workspaces.Edit}
					Component={ZWorkspaceForm}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.Workspaces.View}
					Component={ViewSingleWorkspace}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkCampaignsInactive}
					Component={ZLinkCampaigns}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive}
					Component={ZLinkInBio}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.CustomlinksInactive}
					Component={ZCustomLinks}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinks}
					Component={ZLinks}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
					Component={ZProfile}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCustomDomain}
					Component={ZCustomDomain}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZGroup}
					Component={ZGroups}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCSVBulk}
					Component={ZCSVBulkShortening}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZAccountDetails}
					Component={ZAccountDetails}
				/>

				<PrivateRoute
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZIntegration}
					Component={ZIntegration}
				/>

				<Route
					path={ZaionsRoutes.Testing.ReactTable.Main}
					component={TestingReactTable}
				/>

				<Route
					path={ZaionsRoutes.Testing.ReactArea.Main}
					component={ZaionsReactArea}
				/>
				<Route
					path={ZaionsRoutes.Testing.ReactCharts.Main}
					component={ChartsExamples}
				/>
				<Route
					path={ZaionsRoutes.Testing.GOOGLE_MAP.Main}
					component={GoogleMapsCapacitorPackageTest}
				/>
				<Route
					path={ZaionsRoutes.Testing.TestingTabs.Main}
					component={TestingTabs}
				/>
			</IonRouterOutlet>
		</IonReactRouter>
	);
};

export default AppRoutes;
