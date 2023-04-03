import CONSTANTS from '@/utils/constants';

const ZaionsRoutes = {
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
		ZaionsAdminLinkIndexPageRoute: `/short-links/list/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
		ZaionsAdminShortLinksInFolder: `/short-links/folder/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}/list`,
		ZaionsAdminCreateNewLinkPageRoute: '/short-links/create',
		ZaionsAdminCreateNewLinkInBioRoute: '/link-in-bio/create',
		ZaionsAdminEditLinkInBioRoute: `/link-in-bio/edit/${CONSTANTS.RouteParams.editLinkInBioIdParam}`,

		ZaionsAdminEditLinkPageRoute: `/short-links/edit/${CONSTANTS.RouteParams.editShortLinkIdParam}`,
		Setting: {
			Main: '/settings',
			ZaionsAdminPanelSettingsCustomDomain: '/settings/custom-domain',
			ZaionsAdminPanelSettingsPixels: '/settings/pixels',
		},
		ZaionsDashboard: {
			DashboardInactive: '/short-links/dashboard-upgrade/',
			LinkInBioInactive: '/short-links/launchpads/default/intro',
			LinkCampaignsInactive: '/short-links/campaigns-upgrade/',
			CustomlinksInactive: '/short-links/customlinks-upgrade/',
			ZLinks: '/short-links/links',
			ZLinkInBio: `/link-in-bio/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
			ZProfile: '/short-links/settings/profile/',
			ZCustomDomain: '/short-links/settings/custom-domains/',
			ZGroup: '/short-links/settings/groups/',
			ZCSVBulk: '/short-links/settings/bulk-upload/',
			ZAccountDetails: '/short-links/settings/organization/details/',
			ZIntegration: '/short-links/settings/integrations/',
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
	AUTHENTICATED_USER_REDIRECT: ZaionsRoutes.AdminPanel.ZaionsDashboard.ZProfile,

	// UNAUTHENTICATED_USER_REDIRECT
	UNAUTHENTICATED_USER_REDIRECT: ZaionsRoutes.LoginRoute,

	// UNAUTHENTICATED_USER_REDIRECT
	LOGOUT_USER_REDIRECT: ZaionsRoutes.HomeRoute,
};

export default ZaionsRoutes;
