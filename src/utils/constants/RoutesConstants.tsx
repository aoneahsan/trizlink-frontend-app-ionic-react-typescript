import CONSTANTS from '@/utils/constants';

const workspaceIdParam = CONSTANTS.RouteParams.workspace.workspaceId;

const ZaionsRoutes = {
	// Main routes
	HomeRoute: '/',
	LoginRoute: '/sign-in',
	SignUpRoute: '/sign-up',
	PasswordResetEmailForm: '/forgot-password',

	// Company Section
	Company: {
		ZaionsAboutRoute: '/pages/about',
		ZaionsContactRoute: '/pages/contact',
		ZaionsCareersRoute: '/pages/careers',
		ZaionsPartnersRoute: '/pages/partners',
		ZaionsPressRoute: '/pages/press',
		ZaionsReviewsRoute: '/pages/reviews',
	},

	// Admin Panel
	AdminPanel: {
		AppStartupPage: '/app/startup',
		Setting: {
			Main: '/settings',
			ZaionsAdminPanelSettingsCustomDomain: '/settings/custom-domain',
			ZaionsAdminPanelSettingsPixels: '/settings/pixels',
		},

		ShortLinks: {
			Main: `/workspaces/${workspaceIdParam}/short-links/list/${CONSTANTS.RouteParams.folderIdToGetShortLinks}`,
			Create: `/workspaces/${workspaceIdParam}/short-links/create`,
			Edit: `/workspaces/${workspaceIdParam}/short-links/edit/${CONSTANTS.RouteParams.editShortLinkIdParam}`,
		},

		Workspaces: {
			Main: '/workspaces',
			Create: '/workspaces/create',
			Edit: `/workspaces/edit/${CONSTANTS.RouteParams.workspace.editWorkspaceIdParam}`,
			View: `/workspaces/${workspaceIdParam}/view`,
		},

		ZaionsDashboard: {
			DashboardInactive: '/dashboard-upgrade/',
			LinkInBioInactive: '/launchpads/default/intro',
			LinkCampaignsInactive: '/campaigns-upgrade/',
			CustomlinksInactive: '/custom-links-upgrade/',
			ZLinks: '/links',
			ZProfile: '/settings/profile/',
			ZCustomDomain: '/settings/custom-domains/',
			ZGroup: '/settings/groups/',
			ZCSVBulk: '/settings/bulk-upload/',
			ZAccountDetails: '/settings/organization/details/',
			ZIntegration: '/settings/integrations/',
		},
	},

	Testing: {
		ReactTable: {
			Main: '/testing/react-table',
		},
		ReactArea: {
			Main: '/testing/react-area',
		},
		ReactCharts: {
			Main: '/testing/charts',
		},
		AWS_AMPLIFY: {
			Main: '/testing/aws-amplify/blog-project',
		},
		GOOGLE_MAP: {
			Main: '/testing/google-map/map1',
		},
		TestingTabs: {
			Main: '/testing/testing-tabs-page',
		},
		IonComponents: {
			Main: '/testing/testing-ion-components',
		},
	},
};

export const ZRoutesRedirects = {
	// Redirects
	// AUTHENTICATED_USER_REDIRECT
	AUTHENTICATED_USER_REDIRECT: ZaionsRoutes.AdminPanel.AppStartupPage,

	// UNAUTHENTICATED_USER_REDIRECT
	UNAUTHENTICATED_USER_REDIRECT: ZaionsRoutes.LoginRoute,

	// UNAUTHENTICATED_USER_REDIRECT
	LOGOUT_USER_REDIRECT: ZaionsRoutes.HomeRoute,
};

export default ZaionsRoutes;
