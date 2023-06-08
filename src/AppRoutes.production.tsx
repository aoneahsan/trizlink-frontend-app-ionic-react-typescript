// Core Imports
import React from 'react';

// Packages Imports
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

// Custom Imports
import Home from '@/pages/Home';
import ZaionsReactArea from '@/Testing/ReactArea';
import Login from '@/pages/Login';
import ZShortLinksListPage from '@/pages/AdminPanel/links';
import TestingReactTable from '@/Testing/ReactTable';

// Routes
import ZaionsRoutes from './utils/constants/RoutesConstants';
import ZDashboard from '@/pages/AdminPanel/ZDashboard';
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
import SignUp from '@/pages/SignUp';
import ZaionsPasswordResetConfirm from '@/pages/ResetPassword/PasswordResetConfirmForm';
import ZaionsAdminPanelSettings from '@/pages/AdminPanel/settings';
import ZLinkInBioLinksSection from '@/pages/AdminPanel/ZLinkInBio/parts/links';
import GoogleMapsCapacitorPackageTest from '@/Testing/GoogleMaps';
import TestingTabs from '@/Testing/TestingTabs';
import { ENVS } from '@/utils/envKeys';

// Functional Component
const ProductionAppRoutes: React.FC = () => {
	return (
		<IonReactRouter>
			<IonRouterOutlet>
				{/* Generic Routes */}
				<Route exact path={ZaionsRoutes.HomeRoute} component={Home} />

				<Route exact path={ZaionsRoutes.LoginRoute} component={Login} />
				<Route exact path={ZaionsRoutes.SignUpRoute} component={SignUp} />
				<Route
					exact
					path={ZaionsRoutes.PasswordResetEmailForm}
					component={ZaionsPasswordResetConfirm}
				/>

				<Route
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.DashboardInactive}
					component={ZDashboard}
				/>
				<Route
					path={ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive}
					component={ZLinkInBioLinksSection}
				/>

				{/* Admin Panel Pages */}

				<Route
					exact
					path={ZaionsRoutes.AdminPanel.ShortLinks.Main}
					component={ZShortLinksListPage}
				/>

				<Route
					path={ZaionsRoutes.AdminPanel.Setting.Main}
					component={ZaionsAdminPanelSettings}
				/>

				{ENVS.isProduction && (
					<>
						<Route
							path={
								ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkCampaignsInactive
							}
							component={ZLinkCampaigns}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive}
							component={ZLinkInBio}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.CustomlinksInactive}
							component={ZCustomLinks}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinks}
							component={ZLinks}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
							component={ZProfile}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCustomDomain}
							component={ZCustomDomain}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZGroup}
							component={ZGroups}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCSVBulk}
							component={ZCSVBulkShortening}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZAccountDetails}
							component={ZAccountDetails}
						/>

						<Route
							path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZIntegration}
							component={ZIntegration}
						/>

						<Route
							path={ZaionsRoutes.Testing.ReactTable.Main}
							component={TestingReactTable}
						/>
						{/* Testing React area packages */}
						<Route
							path={ZaionsRoutes.Testing.ReactArea.Main}
							component={ZaionsReactArea}
						/>
						{/* Testing React area packages */}
						<Route
							path={ZaionsRoutes.Testing.ReactCharts.Main}
							component={ChartsExamples}
						/>
						{/* Testing Google Maps */}
						<Route
							path={ZaionsRoutes.Testing.GOOGLE_MAP.Main}
							component={GoogleMapsCapacitorPackageTest}
						/>
						{/* Testing Tabs - From now on, we will add all testing pages in this one page so disabling all testing pages will be easy and more manageable. */}
						<Route
							path={ZaionsRoutes.Testing.TestingTabs.Main}
							component={TestingTabs}
						/>
					</>
				)}
			</IonRouterOutlet>
		</IonReactRouter>
	);
};

export default ProductionAppRoutes;
