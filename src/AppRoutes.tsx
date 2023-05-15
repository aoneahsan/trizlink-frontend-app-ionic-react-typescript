// Core Imports
import React from 'react';

// Packages Imports
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

// Commented Routes
// import ZaionsReactArea from '@/Testing/ReactArea';
// import Zaions101 from '@/pages/Zaions/Zaions101';
// import ZaionsEnterpriseClass from '@/pages/Zaions/enterprise-class';
// import ZaionsIntegrationApi from '@/pages/Zaions/integration-api';
// import ZaionsLinkManagment from '@/pages/Products/link-management';
// import ZaionsQRCode from '@/pages/Products/qr-code';
// import ZaionsLinkInBio from '@/pages/Products/link-in-bio';
// import ZaionsPricing from '@/pages/Zaions/Pricing';
// import ZaionsSocialMedia from '@/pages/Solutions/ZaionsSocialMedia';
// import ZaionsDigitalMarketing from '@/pages/Solutions/ZaionsDigitalMarketing';
// import ZaionsForDevelopers from '@/pages/Solutions/ZaionsForDevelopers';
// import ZaionsCustomerService from '@/pages/Solutions/ZaionsCustomerService';
// import ZaionsBrandedLinks from '@/pages/Features/BrandedLinks';
// import ZaionsMobileLinks from '@/pages/Features/MobileLinks';
// import ZaionsCampaignManagementAnalytics from '@/pages/Features/CampaignManagementAnalytics';
// import ZaionsBlogs from '@/pages/Resources/Blog';
// import ZaionsResourceLibrary from '@/pages/Resources/ResourceLibrary';
// import ZaionsTrustCenter from '@/pages/Resources/TrustCenter';
// import ZaionsBrowserExtensions from '@/pages/Resources/BrowserExtensions';
// import ZaionsMobileApps from '@/pages/Resources/MobileApp';
// import ZaionsPrivacyPolicy from '@/pages/Legal/PrivacyPolicy';
// import ZaionsAcceptableUsePolicy from '@/pages/Legal/AcceptableUsePolicy';
// import ZaionsCodeOfConduct from '@/pages/Legal/CodeOfConduct';
// import ZaionsAbout from '@/pages/Company/AboutZaions';
// import ZaionsContact from '@/pages/Company/Contact';
// import ZaionsCareers from '@/pages/Company/Careers';
// import ZaionsPartners from '@/pages/Company/Partners';
// import ZaionsPress from '@/pages/Company/Press';
// import ZaionsReviews from '@/pages/Company/Reviews';
// import ZaionsDiscoverEnterprise from '@/pages/DiscoverEnterprise';
// import TestingReactTable from '@/Testing/ReactTable';
// import ZLinkInBio from '@/pages/AdminPanel/ZLinkInBio';
// import ZLinkCampaigns from '@/pages/AdminPanel/ZLCampaigns';
// import ZCustomLinks from '@/pages/AdminPanel/ZLCustomLinks';
// import ZLinks from '@/pages/AdminPanel/ZLinks';
// import ChartsExamples from '@/Testing/Charts';
// import ZProfile from '@/pages/AdminPanel/ZProfile';
// import ZCustomDomain from '@/pages/AdminPanel/ZCustomDomin';
// import ZGroups from '@/pages/AdminPanel/ZGroups';
// import ZCSVBulkShortening from '@/pages/AdminPanel/ZCSVBulk';
// import ZAccountDetails from '@/pages/AdminPanel/ZAccountDetails';
// import ZIntegration from '@/pages/AdminPanel/ZIntegration';
// import GoogleMapsCapacitorPackageTest from '@/Testing/GoogleMaps';
// import TestingTabs from '@/Testing/TestingTabs';
// import { ENVS } from '@/utils/envKeys';

// Routes
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ZaionsTermsOfService from '@/pages/Legal/TermsOfService';
import ZShortLinksListPage from '@/pages/AdminPanel/links';
import AdminCreateNewLinkPages from '@/pages/AdminPanel/links/CreateNewLinks';
import ZaionsRoutes from './utils/constants/RoutesConstants';
import ZDashboard from '@/pages/AdminPanel/ZDashboard';
import SignUp from '@/pages/SignUp';
import ZaionsPasswordResetConfirm from '@/pages/ResetPassword/PasswordResetConfirmForm';
import ZaionsAdminPanelSettings from '@/pages/AdminPanel/settings';
import ZLinkInBioLinksSection from '@/pages/AdminPanel/ZLinkInBio/parts/links';
import ZLinkInBiosListPage from '@/pages/AdminPanel/LinkInBio';
import ZaionsLinkInBioForm from '@/pages/AdminPanel/LinkInBio/LinkInBioForm';
import TestingIonComponents from './Testing/TestingIonComponents';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ZWorkspaceListPage from './pages/AdminPanel/Workspaces';
import ZWorkspaceForm from './pages/AdminPanel/Workspaces/Form';
import ViewSingleWorkspace from './pages/AdminPanel/Workspaces/ViewSingle';

// Functional Component
const AppRoutes: React.FC = () => {
	return (
		<IonReactRouter>
			<IonRouterOutlet>
				{/* Generic Routes */}
				<Route exact path={ZaionsRoutes.HomeRoute} component={Home} />

				<Route
					exact
					path={ZaionsRoutes.Legal.ZaionsTermsOfService}
					component={ZaionsTermsOfService}
				/>

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

				{/* Private Routes */}
				{/* Admin Panel Pages */}
				<PrivateRoute
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
					path={ZaionsRoutes.AdminPanel.ShortLinks.Create}
					Component={AdminCreateNewLinkPages}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.ShortLinks.Edit}
					Component={AdminCreateNewLinkPages}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.LinkInBio.Main}
					Component={ZLinkInBiosListPage}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.LinkInBio.Create}
					Component={ZaionsLinkInBioForm}
				/>

				<PrivateRoute
					exact
					path={ZaionsRoutes.AdminPanel.LinkInBio.Edit}
					Component={ZaionsLinkInBioForm}
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

				{/* <PrivateRoute
					path={ZaionsRoutes.AdminPanel.Workspaces.Create}
					Component={ZWorkspaceForm}
				/> */}

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

				{/* {ENVS.isProduction && (
          <>
            <PrivateRoute
              path={
                ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkCampaignsInactive
              }
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
              exact
              path={ZaionsRoutes.DiscoverEnterpriseRoute}
              component={ZaionsDiscoverEnterprise}
            />

            <Route
              exact
              path={ZaionsRoutes.WhyZaions.Zaions101Route}
              component={Zaions101}
            />
            <Route
              exact
              path={ZaionsRoutes.WhyZaions.ZaionsEnterpriseClassRoute}
              component={ZaionsEnterpriseClass}
            />
            <Route
              exact
              path={ZaionsRoutes.WhyZaions.ZaionsIntegrationApiRoute}
              component={ZaionsIntegrationApi}
            />

            <Route
              exact
              path={ZaionsRoutes.Products.ZaionsQRCodeRoute}
              component={ZaionsQRCode}
            />
            <Route
              exact
              path={ZaionsRoutes.Products.ZaionsLinkManagmentRoute}
              component={ZaionsLinkManagment}
            />
            <Route
              exact
              path={ZaionsRoutes.Products.ZaionsLinkInBioRoute}
              component={ZaionsLinkInBio}
            />
            <Route
              exact
              path={ZaionsRoutes.WhyZaions.ZaionsPricingRoute}
              component={ZaionsPricing}
            />

            <Route
              exact
              path={ZaionsRoutes.Solution.ZaionsSocialMediaRoute}
              component={ZaionsSocialMedia}
            />
            <Route
              exact
              path={ZaionsRoutes.Solution.ZaionsDigitalMarketingRoute}
              component={ZaionsDigitalMarketing}
            />
            <Route
              exact
              path={ZaionsRoutes.Solution.ZaionsCustomerServiceRoute}
              component={ZaionsCustomerService}
            />
            <Route
              exact
              path={ZaionsRoutes.Solution.ZaionsForDevelopersRoute}
              component={ZaionsForDevelopers}
            />

            <Route
              exact
              path={ZaionsRoutes.Feature.ZaionsBrandedLinksRoute}
              component={ZaionsBrandedLinks}
            />

            <Route
              exact
              path={ZaionsRoutes.Feature.ZaionsMobileLinksRoute}
              component={ZaionsMobileLinks}
            />
            <Route
              exact
              path={ZaionsRoutes.Feature.ZaionsCampaignManagementAnalyticsRoute}
              component={ZaionsCampaignManagementAnalytics}
            />

            <Route
              exact
              path={ZaionsRoutes.Resources.ZaionsBlogsRoute}
              component={ZaionsBlogs}
            />
            <Route
              exact
              path={ZaionsRoutes.Resources.ZaionsResourceLibraryRoute}
              component={ZaionsResourceLibrary}
            />
            <Route
              exact
              path={ZaionsRoutes.Resources.ZaionsTrustCenterRoute}
              component={ZaionsTrustCenter}
            />
            <Route
              exact
              path={ZaionsRoutes.Resources.ZaionsBrowserExtensionsRoute}
              component={ZaionsBrowserExtensions}
            />
            <Route
              exact
              path={ZaionsRoutes.Resources.ZaionsMobileAppsRoute}
              component={ZaionsMobileApps}
            />

            <Route
              exact
              path={ZaionsRoutes.Legal.ZaionsPrivacyPolicyRoute}
              component={ZaionsPrivacyPolicy}
            />
            <Route
              exact
              path={ZaionsRoutes.Legal.ZaionsAcceptableUsePolicyRoute}
              component={ZaionsAcceptableUsePolicy}
            />
            <Route
              exact
              path={ZaionsRoutes.Legal.ZaionsCodeOfConductRoute}
              component={ZaionsCodeOfConduct}
            />
            <Route
              exact
              path={ZaionsRoutes.Legal.ZaionsTermsOfService}
              component={ZaionsTermsOfService}
            />

            <Route
              exact
              path={ZaionsRoutes.Company.ZaionsAboutRoute}
              component={ZaionsAbout}
            />
            <Route
              exact
              path={ZaionsRoutes.Company.ZaionsContactRoute}
              component={ZaionsContact}
            />
            <Route
              exact
              path={ZaionsRoutes.Company.ZaionsCareersRoute}
              component={ZaionsCareers}
            />
            <Route
              exact
              path={ZaionsRoutes.Company.ZaionsPartnersRoute}
              component={ZaionsPartners}
            />
            <Route
              exact
              path={ZaionsRoutes.Company.ZaionsPressRoute}
              component={ZaionsPress}
            />
            <Route
              exact
              path={ZaionsRoutes.Company.ZaionsReviewsRoute}
              component={ZaionsReviews}
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
          </>
        )} */}
			</IonRouterOutlet>
		</IonReactRouter>
	);
};

export default AppRoutes;
