import CONSTANTS, { PRODUCT_NAME } from '@/utils/constants';

const workspaceIdParam = CONSTANTS.RouteParams.workspace.workspaceId;
const shareWSMemberId = CONSTANTS.RouteParams.workspace.shareWSMemberId;
const wsShareId = CONSTANTS.RouteParams.workspace.wsShareId;

export const ZPrivateRoutePath = '/app';

const loginRoute = '/sign-in';

const ZaionsRoutes = {
  Asterisk: '*',
  // ShortLink redirect route.
  ShortLinkRedirectRoute: `/${CONSTANTS.SHORT_LINK.urlStaticPath}/${CONSTANTS.RouteParams.urlPath}`,
  invitationSL: `/${CONSTANTS.SHORT_LINK.invitationSLStaticPath}/${CONSTANTS.RouteParams.urlPath}`,
  ValidateInvitationRoute: '/accept-invitation',

  // Main routes
  HomeRoute: '/',
  LoginRoute: loginRoute,
  SetPassword: '/set-password',
  SignUpRoute: '/sign-up',
  PasswordResetEmailForm: '/forgot-password',
  DiscoverEnterpriseRoute: '/pages/landing/discover-enterprise',

  // Redirecting All these pages to Dashboard page for now
  // Why Zaions Section
  WhyZaions: {
    Zaions101Route: `/pages/why-${PRODUCT_NAME}/${PRODUCT_NAME}-101`,
    ZaionsEnterpriseClassRoute: `/pages/why-${PRODUCT_NAME}/enterprise-class`,
    ZaionsIntegrationApiRoute: `/pages/why-${PRODUCT_NAME}/integrations-api`,
    ZaionsPricingRoute: '/pages/pricing/v1'
  },

  // Product Section
  Products: {
    ZaionsQRCodeRoute: '/pages/products/qr-codes',
    ZaionsLinkManagmentRoute: '/pages/products/link-management',
    ZaionsLinkInBioRoute: '/pages/products/link-in-bio'
  },

  // Solution Section
  Solution: {
    ZaionsSocialMediaRoute: '/pages/solutions/social-media',
    ZaionsDigitalMarketingRoute: '/pages/solutions/digital-marketing',
    ZaionsCustomerServiceRoute: '/pages/solutions/customer-services',
    ZaionsForDevelopersRoute: '/pages/solutions/for-developers'
  },

  // Feature Section
  Feature: {
    ZaionsBrandedLinksRoute: '/pages/features/branded-links',
    ZaionsMobileLinksRoute: '/pages/features/mobile-links',
    ZaionsCampaignManagementAnalyticsRoute:
      '/pages/features/campaign-management-analytics'
  },

  // Resources Section
  Resources: {
    ZaionsBlogsRoute: '/blog/',
    ZaionsResourceLibraryRoute: '/resources',
    ZaionsTrustCenterRoute: '/pages/trust',
    ZaionsBrowserExtensionsRoute: '/pages/browser-extension',
    ZaionsMobileAppsRoute: '/pages/mobile-app'
  },

  // Legal Section
  Legal: {
    ZaionsPrivacyPolicyRoute: '/pages/privacy',
    ZaionsAcceptableUsePolicyRoute: '/pages/acceptable-use',
    ZaionsCodeOfConductRoute: '/pages/code-of-conduct',
    ZaionsTermsOfService: '/pages/terms-of-service'
  },

  // Company Section
  Company: {
    ZaionsAboutRoute: '/pages/about',
    ZaionsContactRoute: '/pages/contact',
    ZaionsCareersRoute: '/pages/careers',
    ZaionsPartnersRoute: '/pages/partners',
    ZaionsPressRoute: '/pages/press',
    ZaionsReviewsRoute: '/pages/reviews'
  },

  // Please note the above pages are not available yet, so redirecting to the dashboard page for now, i have commented these in route file for now
  // Why Zaions Section
  // WhyZaions: {
  //   Zaions101Route: loginRoute,
  //   ZaionsEnterpriseClassRoute: loginRoute,
  //   ZaionsIntegrationApiRoute: loginRoute,
  //   ZaionsPricingRoute: loginRoute
  // },

  // // Product Section
  // Products: {
  //   ZaionsQRCodeRoute: loginRoute,
  //   ZaionsLinkManagmentRoute: loginRoute,
  //   ZaionsLinkInBioRoute: loginRoute
  // },

  // // Solution Section
  // Solution: {
  //   ZaionsSocialMediaRoute: loginRoute,
  //   ZaionsDigitalMarketingRoute: loginRoute,
  //   ZaionsCustomerServiceRoute: loginRoute,
  //   ZaionsForDevelopersRoute: loginRoute
  // },

  // // Feature Section
  // Feature: {
  //   ZaionsBrandedLinksRoute: loginRoute,
  //   ZaionsMobileLinksRoute: loginRoute,
  //   ZaionsCampaignManagementAnalyticsRoute: loginRoute
  // },

  // // Resources Section
  // Resources: {
  //   ZaionsBlogsRoute: loginRoute,
  //   ZaionsResourceLibraryRoute: loginRoute,
  //   ZaionsTrustCenterRoute: loginRoute,
  //   ZaionsBrowserExtensionsRoute: loginRoute,
  //   ZaionsMobileAppsRoute: loginRoute
  // },

  // // Company Section
  // Company: {
  //   ZaionsAboutRoute: loginRoute,
  //   ZaionsContactRoute: loginRoute,
  //   ZaionsCareersRoute: loginRoute,
  //   ZaionsPartnersRoute: loginRoute,
  //   ZaionsPressRoute: loginRoute,
  //   ZaionsReviewsRoute: loginRoute
  // },

  Error: {
    Z400: '/error/400-bad-request',
    Z401: '/error/401-unauthorized',
    Z403: '/error/403-access-forbidden',
    Z404: '/error/404-not-found',
    Z500: '/error/500-internal-server-error'
  },

  // Admin Panel
  AdminPanel: {
    AppStartupPage: `${ZPrivateRoutePath}/startup`,
    Setting: {
      Main: `${ZPrivateRoutePath}/settings`,
      ZaionsAdminPanelSettingsCustomDomain: `${ZPrivateRoutePath}/settings/custom-domain`,
      ZaionsAdminPanelSettingsPixels: `${ZPrivateRoutePath}/settings/pixels`,

      WSSettings: {
        Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/${CONSTANTS.RouteParams.settings.tab}`
      },

      AccountSettings: {
        Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings`,
        ViewTeam: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/team/${CONSTANTS.RouteParams.workspace.teamId}`,
        Members: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/members`,
        ReferralProgram: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/referral-program`,
        Billing: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/billing`,
        User: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/as/user`,
        Pixel: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/ws/pixel`,
        UTMTag: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/ws/utm-tag`,
        EmbedWidget: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/settings/ws/embed-widget`
      },

      UserAccount: {
        Main: `${ZPrivateRoutePath}/user-account`,
        ProfileSettings: `${ZPrivateRoutePath}/user-account/profile-settings`,
        NotificationSettings: `${ZPrivateRoutePath}/user-account/notification-settings`,
        WSNotificationSettings: `${ZPrivateRoutePath}/user-account/workspaces-notification-settings`,
        WorkspaceNotifications: `${ZPrivateRoutePath}/user-account/workspace/${workspaceIdParam}/notifications`
      }
    },

    ShortLinks: {
      Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/short-links/list/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
      Create: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/short-links/create`,
      Edit: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/short-links/edit/${CONSTANTS.RouteParams.editShortLinkIdParam}`,
      Analytic: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/short-links/analytics/${CONSTANTS.RouteParams.editShortLinkIdParam}`
    },

    LinkInBio: {
      Main: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/link-in-bio/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
      Create: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/link-in-bio/create`,
      Edit: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/link-in-bio/edit/${CONSTANTS.RouteParams.linkInBio.linkInBioId}`
    },

    Workspaces: {
      App: `${ZPrivateRoutePath}`,
      Main: `${ZPrivateRoutePath}/workspaces`,
      Create: `${ZPrivateRoutePath}/workspaces/create`,
      Edit: `${ZPrivateRoutePath}/workspaces/edit/${CONSTANTS.RouteParams.workspace.editWorkspaceIdParam}`,
      View: `${ZPrivateRoutePath}/workspaces/${workspaceIdParam}/view`
    },

    ShareWS: {
      Startup: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/startup`,
      Create: `${ZPrivateRoutePath}/workspaces/create`,
      Edit: `${ZPrivateRoutePath}/workspaces/edit/${CONSTANTS.RouteParams.workspace.editWorkspaceIdParam}`,
      View: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/view`,

      Short_link: {
        Main: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/short-links/list/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
        Create: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/short-links/create`,
        Edit: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/short-links/edit/${CONSTANTS.RouteParams.editShortLinkIdParam}`,
        Analytic: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/short-links/analytics/${CONSTANTS.RouteParams.editShortLinkIdParam}`
      },
      Link_in_bio: {
        Main: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/link-in-bio/list/${CONSTANTS.RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
        Edit: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/link-in-bio/edit/${CONSTANTS.RouteParams.linkInBio.linkInBioId}`
      },
      AccountSettings: {
        Main: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings`,
        ViewTeam: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/team/${CONSTANTS.RouteParams.workspace.teamId}`,
        Members: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings/as/members`,
        ReferralProgram: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings/as/referral-program`,
        Billing: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings/as/billing`,
        User: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings/as/user`,
        Pixel: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings/ws/pixel`,
        UTMTag: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings/ws/utm-tag`,
        EmbedWidget: `${ZPrivateRoutePath}/s/ws/${wsShareId}/member/${shareWSMemberId}/settings/ws/embed-widget`
      }
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
      ZIntegration: `${ZPrivateRoutePath}/settings/integrations/`
    }
  },

  Testing: {
    Page: '/testing/page',
    ReactDropzone: {
      Main: '/testing/react-dropzone'
    },
    ReactTable: {
      Main: '/testing/react-table'
    },
    ReactArea: {
      Main: '/testing/react-area'
    },
    ReactCharts: {
      Main: '/testing/charts'
    },
    GOOGLE_MAP: {
      Main: '/testing/google-map/map1'
    },
    TestingTabs: {
      Main: '/testing/testing-tabs-page'
    },
    IonComponents: {
      Main: '/testing/testing-ion-components'
    },
    DraftJs: {
      Main: '/testing/testing-draft-js'
    },
    FirebaseFeatures: {
      Main: '/testing/firebase-features'
    }
  }
} as const;

export const ZRoutesRedirects = {
  // Redirects
  // AUTHENTICATED_USER_REDIRECT
  AUTHENTICATED_USER_REDIRECT: ZaionsRoutes.AdminPanel.AppStartupPage,

  // UNAUTHENTICATED_USER_REDIRECT
  UNAUTHENTICATED_USER_REDIRECT: ZaionsRoutes.LoginRoute,

  // UNAUTHENTICATED_USER_REDIRECT
  LOGOUT_USER_REDIRECT: ZaionsRoutes.HomeRoute
};

export default ZaionsRoutes;
