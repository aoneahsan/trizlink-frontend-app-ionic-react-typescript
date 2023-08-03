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
import Zaions101 from '@/pages/Zaions/Zaions101';
import ZaionsEnterpriseClass from '@/pages/Zaions/enterprise-class';
import ZaionsIntegrationApi from '@/pages/Zaions/integration-api';
import ZaionsLinkManagment from '@/pages/Products/link-management';
import ZaionsQRCode from '@/pages/Products/qr-code';
import ZaionsLinkInBio from '@/pages/Products/link-in-bio';
import ZaionsPricing from '@/pages/Zaions/Pricing';
import ZaionsSocialMedia from '@/pages/Solutions/ZaionsSocialMedia';
import ZaionsDigitalMarketing from '@/pages/Solutions/ZaionsDigitalMarketing';
import ZaionsForDevelopers from '@/pages/Solutions/ZaionsForDevelopers';
import ZaionsCustomerService from '@/pages/Solutions/ZaionsCustomerService';
import ZaionsBrandedLinks from '@/pages/Features/BrandedLinks';
import ZaionsMobileLinks from '@/pages/Features/MobileLinks';
import ZaionsCampaignManagementAnalytics from '@/pages/Features/CampaignManagementAnalytics';
import ZaionsBlogs from '@/pages/Resources/Blog';
import ZaionsResourceLibrary from '@/pages/Resources/ResourceLibrary';
import ZaionsTrustCenter from '@/pages/Resources/TrustCenter';
import ZaionsBrowserExtensions from '@/pages/Resources/BrowserExtensions';
import ZaionsMobileApps from '@/pages/Resources/MobileApp';
import ZaionsPrivacyPolicy from '@/pages/Legal/PrivacyPolicy';
import ZaionsAcceptableUsePolicy from '@/pages/Legal/AcceptableUsePolicy';
import ZaionsCodeOfConduct from '@/pages/Legal/CodeOfConduct';
import ZaionsTermsOfService from '@/pages/Legal/TermsOfService';
import ZaionsAbout from '@/pages/Company/AboutZaions';
import ZaionsContact from '@/pages/Company/Contact';
import ZaionsCareers from '@/pages/Company/Careers';
import ZaionsPartners from '@/pages/Company/Partners';
import ZaionsPress from '@/pages/Company/Press';
import ZaionsReviews from '@/pages/Company/Reviews';
import ZaionsDiscoverEnterprise from '@/pages/DiscoverEnterprise';
import ZShortLinksListPage from '@/pages/AdminPanel/links';
import AdminCreateNewLinkPages from '@/pages/AdminPanel/links/CreateNewLinks';
import TestingReactTable from '@/Testing/ReactTable/index';

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
import ZLinkInBiosListPage from '@/pages/AdminPanel/LinkInBio';
import ZaionsLinkInBioForm from '@/pages/AdminPanel/LinkInBio/LinkInBioForm';
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
					path={ZaionsRoutes.Legal.ZaionsTermsOfService}
					component={ZaionsTermsOfService}
				/>
				<Route
					exact
					path={ZaionsRoutes.AdminPanel.ShortLinks.Main}
					component={ZShortLinksListPage}
				/>

				<Route
					exact
					path={ZaionsRoutes.AdminPanel.ShortLinks.Create}
					component={AdminCreateNewLinkPages}
				/>
				<Route
					exact
					path={ZaionsRoutes.AdminPanel.ShortLinks.Edit}
					component={AdminCreateNewLinkPages}
				/>

				<Route
					exact
					path={ZaionsRoutes.AdminPanel.LinkInBio.Main}
					component={ZLinkInBiosListPage}
				/>
				<Route
					exact
					path={ZaionsRoutes.AdminPanel.LinkInBio.Create}
					component={ZaionsLinkInBioForm}
				/>

				<Route
					exact
					path={ZaionsRoutes.AdminPanel.LinkInBio.Edit}
					component={ZaionsLinkInBioForm}
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
							exact
							path={ZaionsRoutes.DiscoverEnterpriseRoute}
							component={ZaionsDiscoverEnterprise}
						/>

						{/* Why zlink */}
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

						{/* Producs */}
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

						{/* All Solutions Routes */}
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

						{/* All Feature Routes */}
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

						{/* All Resources Routes */}
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

						{/* All Legal Routes */}
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

						{/* All Company Routes */}
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
