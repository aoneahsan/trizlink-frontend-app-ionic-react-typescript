import CONSTANTS from '@/utils/constants';

const workspaceIdParam = CONSTANTS.RouteParams.workspace.workspaceId;

export const ZPrivateRoutePath = '/app';

const ZaionsRoutes = {
	// ShortLink redirect route.
	ShortLinkRedirectRoute: `/${CONSTANTS.SHORT_LINK.urlStaticPath}/${CONSTANTS.RouteParams.urlPath}`,

	// Main routes
	HomeRoute: '/',
	LoginRoute: '/sign-in',
	SignUpRoute: '/sign-up',
	PasswordResetEmailForm: '/forgot-password',
	DiscoverEnterpriseRoute: '/pages/landing/discover-enterprise',

	// Why Zaions Section
	WhyZaions: {
		Zaions101Route: '/pages/why-zlink/zlink-101',
		ZaionsEnterpriseClassRoute: '/pages/why-zlink/enterprise-class',
		ZaionsIntegrationApiRoute: '/pages/why-zlink/integrations-api',
		ZaionsPricingRoute: '/pages/pricing/v1',
	},

	// Product Section
	Products: {
		ZaionsQRCodeRoute: '/pages/products/qr-codes',
		ZaionsLinkManagmentRoute: '/pages/products/link-management',
		ZaionsLinkInBioRoute: '/pages/products/link-in-bio',
	},

	// Solution Section
	Solution: {
		ZaionsSocialMediaRoute: '/pages/solutions/social-media',
		ZaionsDigitalMarketingRoute: '/pages/solutions/digital-marketing',
		ZaionsCustomerServiceRoute: '/pages/solutions/customer-services',
		ZaionsForDevelopersRoute: '/pages/solutions/for-developers',
	},

	// Feature Section
	Feature: {
		ZaionsBrandedLinksRoute: '/pages/features/branded-links',
		ZaionsMobileLinksRoute: '/pages/features/mobile-links',
		ZaionsCampaignManagementAnalyticsRoute:
			'/pages/features/campaign-management-analytics',
	},

	// Resources Section
	Resources: {
		ZaionsBlogsRoute: '/blog/',
		ZaionsResourceLibraryRoute: '/resources',
		ZaionsTrustCenterRoute: '/pages/trust',
		ZaionsBrowserExtensionsRoute: '/pages/browser-extension',
		ZaionsMobileAppsRoute: '/pages/mobile-app',
	},

	// Legal Section
	Legal: {
		ZaionsPrivacyPolicyRoute: '/pages/privacy',
		ZaionsAcceptableUsePolicyRoute: '/pages/acceptable-use',
		ZaionsCodeOfConductRoute: '/pages/code-of-conduct',
		ZaionsTermsOfService: '/pages/terms-of-service',
	},

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
		AppStartupPage: `${ZPrivateRoutePath}/startup`,
		Setting: {
			Main: `${ZPrivateRoutePath}/settings`,
			ZaionsAdminPanelSettingsCustomDomain: `${ZPrivateRoutePath}/settings/custom-domain`,
			ZaionsAdminPanelSettingsPixels: `${ZPrivateRoutePath}/settings/pixels`,

			WSSettings: {
				Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/${CONSTANTS.RouteParams.settings.tab}`,
			},

			AccountSettings: {
				Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings`,
				Team: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/team`,
				ReferralProgram: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/referral-program`,
				Billing: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/billing`,
				User: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/user`,
			},
		},

		ShortLinks: {
			Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/short-links/list/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
			Create: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/short-links/create`,
			Edit: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/short-links/edit/${CONSTANTS.RouteParams.editShortLinkIdParam}`,
		},

		LinkInBio: {
			Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/link-in-bio/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
			Create: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/link-in-bio/create`,
			Edit: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/link-in-bio/edit/${CONSTANTS.RouteParams.linkInBio.linkInBioId}`,
		},

		Workspaces: {
			Main: `${ZPrivateRoutePath}/workspaces`,
			Create: `${ZPrivateRoutePath}/workspaces/create`,
			Edit: `${ZPrivateRoutePath}/workspaces/edit/${CONSTANTS.RouteParams.workspace.editWorkspaceIdParam}`,
			View: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/view`,
		},

		ZaionsDashboard: {
			DashboardInactive: `${ZPrivateRoutePath}/dashboard-upgrade/`,
			LinkInBioInactive: `${ZPrivateRoutePath}/launchpads/default/intro`,
			LinkCampaignsInactive: `${ZPrivateRoutePath}/campaigns-upgrade/`,
			CustomlinksInactive: `${ZPrivateRoutePath}/custom-links-upgrade/`,
			ZLinks: `${ZPrivateRoutePath}/links`,
			ZProfile: `${ZPrivateRoutePath}/settings/profile/`,
			ZCustomDomain: `${ZPrivateRoutePath}/settings/custom-domains/`,
			ZGroup: `${ZPrivateRoutePath}/settings/groups/`,
			ZCSVBulk: `${ZPrivateRoutePath}/settings/bulk-upload/`,
			ZAccountDetails: `${ZPrivateRoutePath}/settings/organization/details/`,
			ZIntegration: `${ZPrivateRoutePath}/settings/integrations/`,
		},
	},

	Testing: {
		Page: '/testing/page',
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
