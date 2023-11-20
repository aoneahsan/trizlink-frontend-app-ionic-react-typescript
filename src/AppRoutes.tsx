// Core Imports
import React, { lazy, Suspense } from 'react';

// Packages Imports
import { Redirect, Route } from 'react-router-dom';

// Custom
import ZaionsRoutes from './utils/constants/RoutesConstants';

// Commented Routes
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ZShareWSStartup from './pages/AdminPanel/ShareWS/Startup';
const ZInvitationSLRedirectPage = lazy(
  () => import('./pages/InvitationSLRedirect')
);

const ZShareWSView = lazy(() => import('./pages/AdminPanel/ShareWS/View'));
const TestingReactDropzone = lazy(() => import('./Testing/ReactDropZone'));
const Z400View = lazy(() => import('./components/Errors/400'));
const Z401View = lazy(() => import('./components/Errors/401'));
const Z403View = lazy(() => import('./components/Errors/403'));
const Z404View = lazy(() => import('./components/Errors/404'));
const Z500View = lazy(() => import('./components/Errors/500'));

const Zaions101 = lazy(() => import('@/pages/Zaions/Zaions101'));
const ZaionsEnterpriseClass = lazy(
  () => import('@/pages/Zaions/enterprise-class')
);
const ZaionsIntegrationApi = lazy(
  () => import('@/pages/Zaions/integration-api')
);
const ZaionsLinkManagment = lazy(
  () => import('@/pages/Products/link-management')
);
const ZaionsQRCode = lazy(() => import('@/pages/Products/qr-code'));
const ZaionsLinkInBio = lazy(() => import('@/pages/Products/link-in-bio'));
const ZaionsPricing = lazy(() => import('@/pages/Zaions/Pricing'));
const ZaionsSocialMedia = lazy(
  () => import('@/pages/Solutions/ZaionsSocialMedia')
);
const ZaionsDigitalMarketing = lazy(
  () => import('@/pages/Solutions/ZaionsDigitalMarketing')
);
const ZaionsForDevelopers = lazy(
  () => import('@/pages/Solutions/ZaionsForDevelopers')
);
const ZaionsCustomerService = lazy(
  () => import('@/pages/Solutions/ZaionsCustomerService')
);
const ZaionsBrandedLinks = lazy(() => import('@/pages/Features/BrandedLinks'));
const ZaionsMobileLinks = lazy(() => import('@/pages/Features/MobileLinks'));
const ZaionsCampaignManagementAnalytics = lazy(
  () => import('@/pages/Features/CampaignManagementAnalytics')
);
const ZaionsBlogs = lazy(() => import('@/pages/Resources/Blog'));
const ZaionsResourceLibrary = lazy(
  () => import('@/pages/Resources/ResourceLibrary')
);
const ZaionsTrustCenter = lazy(() => import('@/pages/Resources/TrustCenter'));
const ZaionsBrowserExtensions = lazy(
  () => import('@/pages/Resources/BrowserExtensions')
);
const ZaionsMobileApps = lazy(() => import('@/pages/Resources/MobileApp'));
const ZaionsPrivacyPolicy = lazy(() => import('@/pages/Legal/PrivacyPolicy'));
const ZaionsAcceptableUsePolicy = lazy(
  () => import('@/pages/Legal/AcceptableUsePolicy')
);
const ZaionsCodeOfConduct = lazy(() => import('@/pages/Legal/CodeOfConduct'));
const ZaionsAbout = lazy(() => import('@/pages/Company/AboutZaions'));
const ZaionsContact = lazy(() => import('@/pages/Company/Contact'));
const ZaionsCareers = lazy(() => import('@/pages/Company/Careers'));
const ZaionsPartners = lazy(() => import('@/pages/Company/Partners'));
const ZaionsPress = lazy(() => import('@/pages/Company/Press'));
const ZaionsReviews = lazy(() => import('@/pages/Company/Reviews'));
const ZaionsDiscoverEnterprise = lazy(
  () => import('@/pages/DiscoverEnterprise')
);
const TestingReactTable = lazy(() => import('@/Testing/ReactTable/index'));
const ZLinkInBio = lazy(() => import('@/pages/AdminPanel/ZLinkInBio'));
const ZLinkCampaigns = lazy(() => import('@/pages/AdminPanel/ZLCampaigns'));
const ZCustomLinks = lazy(() => import('@/pages/AdminPanel/ZLCustomLinks'));
const ZLinks = lazy(() => import('@/pages/AdminPanel/ZLinks'));
const ZProfile = lazy(() => import('@/pages/AdminPanel/ZProfile'));
const ZCustomDomain = lazy(() => import('@/pages/AdminPanel/ZCustomDomin'));
const ZGroups = lazy(() => import('@/pages/AdminPanel/ZGroups'));
const ZCSVBulkShortening = lazy(() => import('@/pages/AdminPanel/ZCSVBulk'));
const ZAccountDetails = lazy(
  () => import('@/pages/AdminPanel/ZAccountDetails')
);
const ZIntegration = lazy(() => import('@/pages/AdminPanel/ZIntegration'));
const GoogleMapsCapacitorPackageTest = lazy(
  () => import('@/Testing/GoogleMaps')
);
const TestingTabs = lazy(() => import('@/Testing/TestingTabs'));

// Routes

//
const Home = lazy(() => import('@/pages/Home'));

//
const Login = lazy(() => import('@/pages/Login'));
const SignUp = lazy(() => import('@/pages/SignUp'));

//
const ZWorkspaceListPage = lazy(() => import('@/pages/AdminPanel/Workspaces'));
const ViewSingleWorkspace = lazy(
  () => import('@/pages/AdminPanel/Workspaces/ViewSingle')
);
const ZWorkspaceForm = lazy(() => import('@/pages/AdminPanel/Workspaces/Form'));

//
const ZShortLinksListPage = lazy(() => import('@/pages/AdminPanel/links'));
const AdminCreateNewLinkPages = lazy(
  () => import('@/pages/AdminPanel/links/CreateNewLinks')
);

const ZaionsTermsOfService = lazy(() => import('@/pages/Legal/TermsOfService'));
const ZDashboard = lazy(() => import('@/pages/AdminPanel/ZDashboard'));
const ZaionsPasswordResetConfirm = lazy(
  () => import('@/pages/ResetPassword/PasswordResetConfirmForm')
);
const ZaionsAdminPanelSettings = lazy(
  () => import('@/pages/AdminPanel/settings')
);
const ZLinkInBioLinksSection = lazy(
  () => import('@/pages/AdminPanel/ZLinkInBio/parts/links')
);
const ZLinkInBiosListPage = lazy(() => import('@/pages/AdminPanel/LinkInBio'));
const ZaionsLinkInBioForm = lazy(
  () => import('@/pages/AdminPanel/LinkInBio/LinkInBioForm')
);
const TestingIonComponents = lazy(
  () => import('./Testing/TestingIonComponents/index')
);
const DraftJS = lazy(() => import('./Testing/DraftJs'));
const ZUserAccount = lazy(() => import('./pages/AdminPanel/UserAccount'));
const ZSetPasswordPage = lazy(() => import('./pages/SetPassword'));
const ZAppStartupPage = lazy(() => import('./pages/AdminPanel/StartUpPage'));
const ChartsExamples = lazy(() => import('./Testing/Charts'));
const ZFallbackIonSpinner = lazy(
  () => import('./components/CustomComponents/FallbackSpinner')
);
const ZShortLinkRedirectPage = lazy(
  () => import('./pages/ShortLinkRedirectPage')
);

const ZValidateInvitationPage = lazy(
  () => import('./pages/ValidateInvitation')
);

const ZaionsTestPage = lazy(() => import('./pages/TestPage'));
const ZWorkspaceSettings = lazy(() => import('./pages/AdminPanel/WSSettings'));
const ZWSSettingsTeamViewPage = lazy(
  () => import('./pages/AdminPanel/WSSettings/Team/View')
);

// Functional Component
const AppRoutes = (): JSX.Element => {
  return (
    // <IonReactRouter>
    // <IonRouterOutlet>
    <>
      <Suspense fallback={<ZFallbackIonSpinner />}>
        <Route
          exact
          path={ZaionsRoutes.ShortLinkRedirectRoute}
          component={ZShortLinkRedirectPage}
        />

        <Route
          exact
          path={ZaionsRoutes.invitationSL}
          component={ZInvitationSLRedirectPage}
        />

        <PublicRoute
          exact
          path={ZaionsRoutes.SetPassword}
          component={ZSetPasswordPage}
        />

        <Route
          exact
          path={ZaionsRoutes.ValidateInvitationRoute}
          component={ZValidateInvitationPage}
        />

        {/* Generic Routes */}
        <Route
          exact
          path={ZaionsRoutes.HomeRoute}
          component={Home}
        />

        <Route
          exact
          path={ZaionsRoutes.Legal.ZaionsTermsOfService}
          component={ZaionsTermsOfService}
        />

        <Route
          exact
          path={ZaionsRoutes.Testing.IonComponents.Main}
          component={TestingIonComponents}
        />

        <Route
          exact
          path={ZaionsRoutes.Testing.DraftJs.Main}
          component={DraftJS}
        />

        <Route
          exact
          path={ZaionsRoutes.Testing.ReactDropzone.Main}
          component={TestingReactDropzone}
        />

        <Route
          exact
          path={ZaionsRoutes.Testing.Page}
          component={ZaionsTestPage}
        />

        {/* Public Routes */}
        <PublicRoute
          exact
          path={ZaionsRoutes.LoginRoute}
          Component={Login}
        />

        {/* Errors */}
        <Route
          exact
          path={ZaionsRoutes.Error.Z400}
          component={Z400View}
        />
        <Route
          exact
          path={ZaionsRoutes.Error.Z401}
          component={Z401View}
        />
        <Route
          exact
          path={ZaionsRoutes.Error.Z403}
          component={Z403View}
        />
        <Route
          exact
          path={ZaionsRoutes.Error.Z404}
          component={Z404View}
        />
        <Route
          exact
          path={ZaionsRoutes.Error.Z500}
          component={Z500View}
        />

        <PublicRoute
          exact
          path={ZaionsRoutes.SignUpRoute}
          Component={SignUp}
        />

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
          exact
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
          path={ZaionsRoutes.AdminPanel.Setting.AccountSettings.Main}
          Component={ZWorkspaceSettings}
        />

        <PrivateRoute
          path={ZaionsRoutes.AdminPanel.ShareWS.AccountSettings.Main}
          Component={ZWorkspaceSettings}
        />

        <PrivateRoute
          path={ZaionsRoutes.AdminPanel.Setting.UserAccount.ProfileSettings}
          Component={ZUserAccount}
        />

        <PrivateRoute
          path={
            ZaionsRoutes.AdminPanel.Setting.UserAccount.WorkspaceNotifications
          }
          Component={ZUserAccount}
        />

        <PrivateRoute
          path={
            ZaionsRoutes.AdminPanel.Setting.UserAccount.WSNotificationSettings
          }
          Component={ZUserAccount}
        />

        <PrivateRoute
          path={
            ZaionsRoutes.AdminPanel.Setting.UserAccount.NotificationSettings
          }
          Component={ZUserAccount}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.Setting.AccountSettings.ViewTeam}
          Component={ZWSSettingsTeamViewPage}
        />

        {/* should not add exact  */}
        <PrivateRoute
          path={ZaionsRoutes.AdminPanel.Setting.Main}
          Component={ZaionsAdminPanelSettings}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.Workspaces.Main}
          Component={ZWorkspaceListPage}
        />

        {/* If user visit /app then redirect to /app/workspaces */}
        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.Workspaces.App}
          Component={() => (
            <Redirect
              exact
              to={ZaionsRoutes.AdminPanel.Workspaces.Main}
            />
          )}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.Workspaces.Create}
          Component={ZWorkspaceForm}
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
          exact
          path={ZaionsRoutes.AdminPanel.ShareWS.Startup}
          Component={ZShareWSStartup}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ShareWS.View}
          Component={ZShareWSView}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ShareWS.Short_link.Main}
          Component={ZShortLinksListPage}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ShareWS.Short_link.Create}
          Component={AdminCreateNewLinkPages}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ShareWS.Short_link.Edit}
          Component={AdminCreateNewLinkPages}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkCampaignsInactive}
          Component={ZLinkCampaigns}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.LinkInBioInactive}
          Component={ZLinkInBio}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.CustomlinksInactive}
          Component={ZCustomLinks}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZLinks}
          Component={ZLinks}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile}
          Component={ZProfile}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCustomDomain}
          Component={ZCustomDomain}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZGroup}
          Component={ZGroups}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZCSVBulk}
          Component={ZCSVBulkShortening}
        />

        <PrivateRoute
          exact
          path={ZaionsRoutes.AdminPanel.ZaionsDashboard.ZAccountDetails}
          Component={ZAccountDetails}
        />

        <PrivateRoute
          exact
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
          exact
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

        <Route
          path={ZaionsRoutes.Testing.TestingTabs.Main}
          component={TestingTabs}
        />

        {/* <Route
        path={ZaionsRoutes.Asterisk}
        component={() => (
          <Redirect
            exact
            to={ZaionsRoutes.Error.Z404}
          />
        )}
      /> */}
        {/* <Route
          path={ZaionsRoutes.Asterisk}
          component={Z404View}
        /> */}
      </Suspense>
    </>
    // </IonRouterOutlet>
    // </IonReactRouter>
  );
};

export default AppRoutes;
