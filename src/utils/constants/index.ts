import { PixelPlatformsEnum } from '@/types/AdminPanel/linksType/index';
import { type ZaionsRSelectOptions } from '@/types/components/CustomComponents/index.type';
// import { zConsoleError } from '@/utils/helpers';
// Custom Imports
import {
  adrollSvgLogo,
  adwordsSvgLogo,
  bingSvgLogo,
  facebookSvgLogo,
  googleAnalyticsSvgLogo,
  googleTagManagerSvgLogo,
  linkedinSvgLogo,
  nexusSvgLogo,
  pinterestSvgLogo,
  ProductLogo,
  productSmLogo,
  quoraSvgLogo,
  snapchatSvgLogo,
  tiktokSvgLogo,
  twitterSvgLogo,
  vkSvgLogo
} from '@/assets/images';
import { IonLoaderEnum, TimeFilterEnum } from '@/types/AdminPanel/linksType';
import { ENVS } from '@/utils/envKeys';
import { WSRolesNameEnum } from '@/types/AdminPanel/workspace';
import { ZTeamMemberInvitationEnum } from '@/types/AdminPanel/index.type';

// Constant
// const ZLinkApiRootUrl = 'https://zlinkbackend.zaions.com/public/api/zlink/v1';
export const ZLinkApiRootUrl = ENVS.apiUrl;

const testingSelectorsPrefix = 'ztes__';

const ZPasswordMinCharacter = 8;

const ZOtpLength = 6;

const ZOptResendAfter = 5;

// This minutes will added to time in every api request in time variable current time + ZRequestTimeAddM.
const ZRequestTimeAddM = 3;

// in user logged in then except showing login etc. btn's we are showing account btn and this is the text of that btn. in future if we went to change it.
const ZHomePageAccountBtnText = 'My Account';

// we are using this in "FetchRequiredAppDataHOCAsync" component, here 1 means 1s in time, and we are using this to call the user "updateUserStatus" api on interval, with interval set to run on this variable * with 1000 (as to convert millisecond to seconds)
const ZLastSeenInterval = 60;

const RouteParams = {
  editShortLinkIdParam: ':editLinkId',
  editLinkInBioIdParam: ':editLinkInBioId',
  editLinkInBioPageParam: ':editLinkInBioPage',
  editLinkInBioStepParam: ':editLinkInBioStep',
  folderIdToGetShortLinksOrLinkInBio: ':folderId?',

  // ShortLink redirect url path.
  urlPath: ':urlPath',

  //
  pageNumber: ':pageNumber',
  paginationLimit: ':paginationLimit',

  // workspace
  workspace: {
    workspaceId: ':workspaceId',
    shareWSId: ':shareWSId',
    shareWSMemberId: ':shareWSMemberId',
    wsShareId: ':wsShareId',
    editWorkspaceIdParam: ':editWorkspaceId',
    teamId: ':teamId',
    memberInviteId: ':memberInviteId',
    invitationId: ':invitationId',
    type: ':type',
    modal: ':modal'
  },

  settings: {
    tab: ':tab',
    sect: ':sect',
    type: ':swType'
  },

  user: {
    itemId: ':itemId',
    type: ':type',
    notification: {
      type: ':type',
      id: ':id'
    }
  },

  timeSlot: {
    timeSlotId: ':timeSlotId'
  },

  label: {
    labelId: ':labelId'
  },

  shortLink: {
    shortLinkId: ':shortLinkId',
    path: ':path',
    slAnalyticsId: ':slAnalyticsId'
  },

  linkInBio: {
    linkInBioId: ':linkInBioId',
    libPddId: ':libPddId',
    libBlockId: ':libBlockId'
  },

  utmTag: {
    utmTagId: ':utmTagId'
  },

  pixel: {
    pixelId: ':pixelId'
  }

  // folderIdToGetShortLinksOrLinkInBio: 'all',
} as const;

// left here as it will mess up many imports, we can move this when we have some free time (i know that will add more imports to correct but we don't have time for it right now)
export const API_URLS = {
  zPlans: '/plans',
  login: '/login',
  socialLogin: '/social-login',
  logout: '/logout',
  verifyAuthenticationStatus: '/verify-authentication-status',
  register: '/register',
  getUserRolePermission: '/user/role/permissions',
  updateUserAccountInfo: '/user/update-account-info',
  updatePassword: '/user/update-password',
  checkIfUsernameIsAvailable: '/user/username/check',
  validateCurrentPassword: '/user/validate-password',
  resendPasswordOtp: '/user/password-resend-otp',
  updateUserStatus: '/user/update-user-status',
  validateCurrentPasswordOtp: '/user/validate-password-otp',
  userEmailsList: '/user/list-emails',
  userEmailDelete: `/user/delete-email/${RouteParams.user.itemId}`,
  makeEmailPrimary: `/user/make-email-primary/${RouteParams.user.itemId}`,
  addEmail: '/user/add-email',
  confirmEmailOTP: `/user/confirm-email-otp/${RouteParams.user.itemId}`,
  resendEmailOTP: `/user/resend-email-otp/${RouteParams.user.itemId}`,
  csrf: '/sanctum/csrf-cookie',
  delete: '/user/delete',
  ws_roles_get: '/user/ws-roles',

  // Owned workspace members
  member_sendInvite_list: `/user/workspace/${RouteParams.workspace.workspaceId}/member/send-invitation`,
  member_getAllInvite_list: `/user/workspace/${RouteParams.workspace.workspaceId}/member`,
  member_resendInvite_list: `/user/workspace/${RouteParams.workspace.workspaceId}/member/resend-invitation/${RouteParams.workspace.invitationId}`,
  member_invite_delete: `/user/workspace/${RouteParams.workspace.workspaceId}/member/${RouteParams.workspace.memberInviteId}`,
  member_invite_get: `/user/workspace/${RouteParams.workspace.workspaceId}/member/${RouteParams.workspace.memberInviteId}`,
  member_role_update: `/user/workspace/${RouteParams.workspace.workspaceId}/update-role/${RouteParams.workspace.memberInviteId}`,
  member_update: `/user/workspace/${RouteParams.workspace.workspaceId}/update-invitation/${RouteParams.workspace.memberInviteId}`,
  member_create_short_url: `/user/workspace/${RouteParams.workspace.workspaceId}/create-short-url/${RouteParams.workspace.memberInviteId}`,
  member_check_short_url: `/user/ws-member/short-url/check/${RouteParams.workspace.invitationId}`,
  validate_invitation_status: '/user/validate-and-update-invitation',

  // Share workspace members
  sws_member_sendInvite_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/member/send-invitation`,
  sws_member_getAllInvite_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/member`,
  sws_member_create_short_url: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/create-short-url/${RouteParams.workspace.memberInviteId}`,
  sws_member_resendInvite_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/member/resend-invitation/${RouteParams.workspace.invitationId}`,
  sws_member_invite_delete: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/member/${RouteParams.workspace.memberInviteId}`,
  sws_member_invite_get: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/member/${RouteParams.workspace.memberInviteId}`,
  sws_member_role_update: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/update-role/${RouteParams.workspace.memberInviteId}`,
  sws_member_update: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/ws/update-invitation/${RouteParams.workspace.memberInviteId}`,

  // Pixels
  userPixelAccounts_create_list: `/user/workspace/${RouteParams.workspace.workspaceId}/pixel`,
  userPixelAccounts_update_delete: `/user/workspace/${RouteParams.workspace.workspaceId}/pixel/${RouteParams.pixel.pixelId}`,

  // Share workspace pixels
  sws_pixel_account_create_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/pixel`,
  sws_pixel_account_update_delete: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/pixel/${RouteParams.pixel.pixelId}`,

  // Utm tags
  userAccountUtmTags_create_list: `/user/workspace/${RouteParams.workspace.workspaceId}/utm-tag`,
  userAccountUtmTags_update_delete: `/user/workspace/${RouteParams.workspace.workspaceId}/utm-tag/${RouteParams.utmTag.utmTagId}`,

  // User notification settings
  us_notification_setting_get_create: '/user/us-notification-setting',
  us_notification_setting_update: `/user/us-notification-setting/${RouteParams.user.itemId}`,

  // Workspace notification settings
  ws_notification_setting_get_create: `/user/ws-notification-setting/${RouteParams.workspace.workspaceId}/${RouteParams.user.type}`,
  ws_notification_setting_update: `/user/ws-notification-setting/${RouteParams.workspace.workspaceId}/wsn/${RouteParams.user.itemId}`,

  // Share workspace Utm tags
  sws_utm_tag_create_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/utm-tag`,
  sws_utm_tag_update_delete: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/utm-tag/${RouteParams.utmTag.utmTagId}`,

  ShortLink_folders_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/get/shortLink/folders`,
  userEmbedWidget_create_list: '/user/embedded-scripts',
  userAccountFolders_update_delete: '/user/folders/:folderId',
  userEmbedWidget_update_delete: '/user/embedded-scripts/:embeddedId',
  send_otp: '/user/send-otp',
  send_signup_otp: '/user/send-signup-otp',
  resend_user_otp: '/user/resend-user-otp',
  send_forget_password_otp: '/user/send-forget-password-otp',
  confirm_otp: '/user/confirm-otp',
  set_password: '/user/set-password',
  set_username_password: '/user/set-username-password',

  user_unread_notifications_list: `/user/notification/type/${RouteParams.user.notification.type}`,
  user_notification_mark_as_read: `/user/notification/markAsRead/${RouteParams.user.notification.id}`,
  user_notification_mark_all_as_read: '/user/notification/markAllAsRead',

  // Short links
  shortLinks_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/short-links/page-number/${RouteParams.pageNumber}/limit/${RouteParams.paginationLimit}`,
  shortLinks_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/short-links`,
  shortLinks_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/short-links/${RouteParams.shortLink.shortLinkId}`,
  shortLinks_is_path_available: `/user/workspaces/${RouteParams.workspace.workspaceId}/sl/is-path-available/${RouteParams.shortLink.path}`,
  ShortLinks_folders_reorder: '/user/shortLinks/folders/reorder',
  shortLink_get_target_url_info: `/public/s/${RouteParams.urlPath}`,
  shortLink_check_target_password: `/public/s/${RouteParams.urlPath}/check-password`,

  // Short links Analytics
  sl_analytics_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/sl/${RouteParams.shortLink.shortLinkId}/analytics`,

  // Share workspace short links
  sws_sl_create_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/short-links`,
  sws_sl_get_update_delete: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/short-link/${RouteParams.shortLink.shortLinkId}`,

  FolderShortLinks: '/user/folders/:folderId/short-links',
  LinkInBio_folders_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/get/linkInBio/folders`,

  folders_get_update_delete: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/folder/${RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
  folders_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/folder/${RouteParams.workspace.modal}`,
  folders_create: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/folder`,

  user_setting_list_create: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/modal-settings`,
  user_setting_delete_update_get: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/modal-settings/${RouteParams.settings.type}`,

  userAccount_LinkInBio_folders_update_delete:
    '/user/link-in-bio-folders/:folderId',
  linkInBio_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/link-in-bio`,
  linkInBio_update_delete: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/link-in-bio/${RouteParams.linkInBio.linkInBioId}`,
  linkInBioPreDefinedThemes_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/themes`,
  linkInBioPreDefinedBlocks_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/blocks`,
  linkInBioPreDefinedBlocks_delete_update: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/blocks/:blockId`,
  linkInBioBlock_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib/${RouteParams.linkInBio.linkInBioId}/lib-block`,
  linkInBioBlock_delete_update_get: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib/${RouteParams.linkInBio.linkInBioId}/lib-block/${RouteParams.linkInBio.libBlockId}`,
  linkInBioBlocks_reorder: `/user/link-in-bio/${RouteParams.linkInBio.linkInBioId}/blocks/reorder`,
  linkInBioPreDefinedMusicPlatform_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/musicPlatform`,
  linkInBioPreDefinedMusicPlatform_delete_update: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/musicPlatform/:musicPlatformId`,

  linkInBioPreDefinedMessengerPlatform_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/messengerPlatform`,
  linkInBioPreDefinedMessengerPlatform_delete_update: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/messengerPlatform/:messengerPlatformId`,

  linkInBioPreData_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pdd`,
  linkInBioPreData_delete_update: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pdd/${RouteParams.linkInBio.libPddId}`,

  linkInBioPreDefinedSocialPlatform_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/socialPlatform`,
  linkInBioPreDefinedSocialPlatform_delete_update: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/socialPlatform/:socialPlatformId`,

  linkInBioPreDefinedFormFields_create_list: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/formField`,
  linkInBioPreDefinedFormFields_delete_update: `/user/${RouteParams.workspace.type}/${RouteParams.workspace.workspaceId}/lib-pre-dd/formField/:formFieldId`,

  // workspace
  workspace_create_list: '/user/workspaces',
  workspace_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}`,
  workspace_team_create_list: `/user/workspace/${RouteParams.workspace.workspaceId}/teams`,
  workspace_team_update_delete: `/user/workspace/${RouteParams.workspace.workspaceId}/team/${RouteParams.workspace.teamId}`,
  workspace_update_is_favorite: `/user/workspaces/update-is-favorite/${RouteParams.workspace.workspaceId}`,

  // Share workspace folder
  ws_share_folder_sl_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/get/shortLink/folders`,
  ws_share_folder_lib_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/get/linkInBio/folders`,
  ws_share_folder_create: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/folder`,
  ws_share_folder_get_update_delete: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/folder/${RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
  ws_share_folder_reorder: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/folder/reorder`,

  // share workspace
  ws_share_list: '/user/shared-ws',
  ws_share_member_role_permissions: `/user/shared-ws/get-member-role-permissions/${RouteParams.workspace.shareWSMemberId}`,
  ws_share_update_is_favorite: `/user/shared-ws/update-is-favorite/${RouteParams.workspace.shareWSMemberId}`,
  ws_share_info_data: `/user/shared-ws/get-share-ws-info-data/${RouteParams.workspace.shareWSMemberId}`,
  update_ws_share_info_data: `/user/shared-ws/${RouteParams.workspace.shareWSId}/member-id/${RouteParams.workspace.shareWSMemberId}`,
  leave_share_ws: `/user/shared-ws/${RouteParams.workspace.shareWSId}/leave-ws/member-id/${RouteParams.workspace.shareWSMemberId}`,

  // Time slot
  time_slot_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/time-slot`,
  time_slot_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/time-slot/${RouteParams.timeSlot.timeSlotId}`,

  // Share workspace time slot.
  time_slot_sws_create_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/time-slot`,
  time_slot_sws_update_delete_get: `/user/sws/${RouteParams.workspace.shareWSMemberId}/time-slot/${RouteParams.timeSlot.timeSlotId}`,

  // Label
  label_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/label`,
  label_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/label/${RouteParams.label.labelId}`,

  label_sws_create_list: `/user/sws/member/${RouteParams.workspace.shareWSMemberId}/label`,
  label_sws_update_delete_get: `/user/sws/${RouteParams.workspace.shareWSMemberId}/label/${RouteParams.label.labelId}`,

  // File
  getSingleFile: '/file-upload/getSingleFileUrl',
  uploadSingleFile: '/file-upload/uploadSingleFile',
  deleteSingleFile: '/file-upload/deleteSingleFile',
  checkIfSingleFileExists: '/file-upload/checkIfSingleFileExists',
  uploadFiles: '/file-upload/uploadFiles',

  // External Third Party API URLs (need to be complete url, as we will hit them without any modification (except for dynamic parts))
  // UI Avatars API
  uiAvatarAPI:
    'https://ui-avatars.com/api/?name=:name&rounded=:rounded&bold=:bold&size=:size&background=:background&color=:color&font-size=:fontSize&length=:length'
} as const;

// Site
export const PRODUCT_NAME = 'zaions_tappk';
export const PRODUCT_DOMAIN = 'prettylinks.zaions.com';
export const CurrentProductDetails = {
  Name: ''
} as const;

export const ExternalURL = {
  GenericExternalURL: 'https://prettylinks.zaions.com',
  FacebookUrl: 'https://www.facebook.com/'
} as const;

export const ZaionsInfo = {
  name: 'Zaions'
} as const;

// @Medias BrackPoint:
export const BRACKPOINT_2XL = '1400px';
export const BRACKPOINT_XL = '1200px';
export const BRACKPOINT_LG = '992px';
export const BRACKPOINT_MD = '768px';
// export const BRACKPOINT_SM = '540px'; old
export const BRACKPOINT_SM = '576px';
export const BRACKPOINT_XS = '100%';

// Side menus

export const CONTENT_ID = 'zaions_main-content';

const MENU_IDS = {
  CONTENT_ID: 'zaions_main-content',
  DASHBOARD_SM_MENU_CONTENT_ID: 'zaions-dashboard-responsive-menu-content-id',
  SL_FILTERS_MENU_ID: 'sl_filters_menu_id', // sl => shortLink
  LIB_FILTERS_MENU_ID: 'lib_filters_menu_id', // lib => linkInBio
  P_FILTERS_MENU_ID: 'p_filters_menu_id', // p => pixels
  MEMBER_FILTERS_MENU_ID: 'member_filters_menu_id',
  UTMTag_FILTERS_MENU_ID: 'utmTag_filters_menu_id',
  WS_SETTINGS_MENU_ID: 'ws-settings-menu-id',
  USER_SETTINGS_MENU_ID: 'user-settings-menu-id',
  ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID:
    'admin_page_short_links_folders_menu_id',
  ADMIN_PAGE_LINKS_IN_BIO_FOLDERS_MENU_ID:
    'admin_page_links_in_bio_folders_menu_id',
  ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID:
    'admin_page_workspace_view_filter_menu_id'
} as const;

const PAGE_IDS = {
  AD_SL_LIST_PAGE: 'ad_sl_list_page', // AD_SL => AdminPanel_shortLink
  AD_LIB_LIST_PAGE: 'ad_lib_list_page', // AD_LIB => AdminPanel_linkinbio
  ADMIN_PANEL_WS_SETTING_PAGE_ID: 'admin-panel-ws-settings-page-id',
  ADMIN_LINK_PAGE_CONTENT_ID: 'zaions-link-page-menu',
  USER_SETTINGS_PAGE_ID: 'user-settings-page-id'
} as const;

// Other
// branch = v1-frontend-dev;

// Pixels Account ID Validation Count
const PIXEL_ACCOUNTS = {
  FACEBOOK: {
    WORD_COUNT: 16
    // WORD_COUNT: 2,
  },
  GOOGLE_ANALYTICS: {
    SHOULD_INCLUDE: 'ua', // should be in lower case all the time
    WORD_COUNT: 12
    // WORD_COUNT: 3,
  },
  LINKEDINANDBING: {
    WORD_COUNT: 7
    // WORD_COUNT: 3,
  },
  TWITTER: {
    WORD_COUNT: 5
  },
  GOOGLE_ADS: {
    WORD_COUNT: 9
    // WORD_COUNT: 3,
  },
  GOOGLE_TAG_MANAGER: {
    SHOULD_INCLUDE: 'gmt-', // should be in lower case all the time
    WORD_COUNT: 12
    // WORD_COUNT: 6,
  },
  QUORA: {
    WORD_COUNT: 31
    // WORD_COUNT: 6,
  },
  SNAPCHAT: {
    WORD_COUNT: 32
    // WORD_COUNT: 6,
  },
  PINTEREST: {
    WORD_COUNT: 13
    // WORD_COUNT: 6,
  },
  TIKTOK: {
    WORD_COUNT: 17
    // WORD_COUNT: 6,
  },
  VK: {
    SHOULD_INCLUDE: 'vk-', // should be in lower case all the time
    WORD_COUNT: 17
    // WORD_COUNT: 6,
  }
} as const;

const ION_LOADER_DEFAULTS = {
  animated: true,
  spinner: IonLoaderEnum.circles, // convert to enum with all values
  duration: 1500
} as const;

const ION_TOAST = {
  TOAST_DURATION: 1500
} as const;

export const ZaionsBusinessDetails = {
  WebsiteUrl: 'https://zaions.com'
} as const;

const ZaionsRHelmetDefaults = {
  title: 'Zaions Url Shortener Web & Mobile App - Zaions',
  description: 'Zaions Url Shortener Web & Mobile App',
  keywords: 'zaions1, zaions2',
  author: 'Ahsan Mahmood',
  viewport: 'width=device-width, initial-scale=1.0',
  refresh: '8100',
  ogTitle: 'Zaions.com',
  ogType: 'website',
  ogUrl: ZaionsBusinessDetails.WebsiteUrl,
  ogImage: ProductLogo,
  ogDescription: 'Zaions The Group of Projects',
  ogLocale: 'en_US',
  ogSiteName: 'Zaions',
  twitterCard: 'zaions_logo',
  twitterSite: '@zaions',
  twitterCreator: '#aoneahsan',
  twitterTitle: 'Zaions',
  twitterDescription: ' The Group of Projects',
  twitterImage: ProductLogo,
  shortcutIcon: productSmLogo,
  contentSecurityPolicy:
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  XUACompatible: 'ie=edge',
  copyRight: 'Copyright 2021',
  roboto: 'index,follow'
  // ...
} as const;

const SocialLinks = {
  twitter: `${ZaionsBusinessDetails.WebsiteUrl}/twitter`,
  instagram: `${ZaionsBusinessDetails.WebsiteUrl}/instagram`,
  linkdin: `${ZaionsBusinessDetails.WebsiteUrl}/linkdin`
} as const;

const DateTime = {
  iso8601DateTime: 'YYYY-MM-DDTHH:mm:ssZ'
} as const;

// Default Values
const DEFAULT_VALUES = {
  Z_PERCENTAGE: 100,
  DEFAULT_COUNTRY: ENVS.country,
  DEFAULT_CUSTOM_DOMAIN: '1',
  TIMEZONE_DEFAULT: ENVS.timezone,
  DEFAULT_FOLDER: 'all',
  ZAIONS_SETTING_SPLIT_PANEL: 'ZAIONS_SETTING_PAGE_PANEL',
  ZAIONS_SHORT_LINKS_LIST_SPLIT_PANEL: 'ZAIONS_SHORT_LINKS_LIST_SPLIT_PANEL',
  ZAIONS_DASHBOARD_SPLIT_PANEL: 'ZAIONS_DASHBOARD_PAGE_PANEL',
  API_TOKEN_PRIMARY_KEY: 'Bearer',
  FOLDER_ROUTE: 'all'
} as const;

export const LOCALSTORAGE_KEYS = {
  USERDATA: 'udhsaf38h_3g-23g-c',
  AUTHTOKEN: 'cewiuh4ggb284ghg',
  INVITEE_USER_DATA: 'zoirjf_hflmn-e',
  SIGNUP_USER_DATA: 'zmkftr-lokgyr-d',
  FORGET_PASSWORD_USER_DATA: 'ziomkliy-rthng-r',
  SET_PASSWORD_DATA: 'zplkithfns-wolf-s',
  ERROR_DATA: 'asdgcvbv_cbert-k'
} as const;

export const encryptKeys = {
  encryptedEncodeData: 'zinrekg_mke_z',
  accessToken: 'acmkfdr_aset_k',
  time: 'tzasd_iasdm_e'
} as const;

export const Platforms = {
  facebook: facebookSvgLogo,
  linkedin: linkedinSvgLogo,
  twitter: twitterSvgLogo,
  google_analytics: googleAnalyticsSvgLogo,
  google_analytics_4: googleAnalyticsSvgLogo,
  google_ads: adwordsSvgLogo,
  google_tag_manager: googleTagManagerSvgLogo,
  quora: quoraSvgLogo,
  snapchat: snapchatSvgLogo,
  pinterest: pinterestSvgLogo,
  bing: bingSvgLogo,
  adroll: adrollSvgLogo,
  nexus: nexusSvgLogo,
  tiktok: tiktokSvgLogo,
  vk: vkSvgLogo
} as const;

export const brandColors = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  instagram: '#E1306C',
  tiktok: '#333333',
  google: '#4758B8',
  linkedin: '#0966C1',
  pinterest: '#cc0100',
  youtube: '#FF0000'
} as const;

const ZTooltipIds = {
  ZUserAvatarButton_default_tooltip_id: 'z-workspace-ZUserAvatarButton-tooltip'
} as const;

// abbrivations comment
/**
 * pw: password
 * hp: home-page
 */

const testingSelectors = {
  // #region home page
  homePage: {
    loginButton: 'hp-nav-login-btn',
    signupButton: 'hp-nav-signup-btn'
  },
  // #endregion

  // #region login page
  loginPage: {
    loginButton: 'lp-login-btn',
    forgetPasswordButton: 'lp-forget-pw-btn',
    canViewPasswordButton: 'lp-see-password-btn',
    googleLoginButton: 'lp-google-btn',
    twitterLoginButton: 'lp-twitter-btn',
    facebookLoginButton: 'lp-facebook-btn',
    appleLoginButton: 'lp-apple-btn',
    signupButton: 'lp-sign-in-btn',
    emailInput: 'lp-email-input',
    passwordInput: 'lp-password-input'
  },
  // #endregion

  // #region set password page
  setPasswordPage: {
    emailInput: 'spp-email-input',
    gotoWSBtn: 'spp-goto-ws-list-page-btn',
    otpBtn: 'spp-send-opt-btn',
    confirmOtpBtn: 'spp-confirm-opt-btn',
    resendOtpBtn: 'spp-resend-opt-btn'
  },
  // #endregion

  // #region sign up page
  signupPage: {
    loginButton: 'sp-login-btn',
    SSOLoginButton: 'sp-sso-btn',
    googleSignupButton: 'sp-google-btn',
    signupButton: 'sp-form-submit-btn',
    usernameInput: 'sp-username-input',
    emailInput: 'sp-email-input',
    passwordInput: 'sp-password-input',
    canViewPasswordButton: 'sp-see-password-btn',
    confirmPasswordInput: 'sp-confirm-password-input',
    canViewConfirmPasswordButton: 'sp-see-confirm-password-btn',
    checkDisplayNameAvailableBtn: 'sp-check-display-name-available-btn'
  },
  // #endregion

  // #region workspace
  workspace: {
    listPage: {
      page: 'workspace-list-page',
      favoriteWorkspaces: 'wlp-favorite-ws-section',
      favoriteCard: 'wlp-favorite-ws-card',
      refetchBtn: 'wlp-refetch-btn',
      fwEmpty: {
        col: 'wlp-fw-no-data-col',
        icon: 'wlp-fw-no-data-col-icon',
        text: 'wlp-fw-no-data-col-text'
      },
      ownedWorkspaces: 'wlp-owned-ws-section',
      ownedWsCard: 'wlp-owned-ws-card',
      owEmpty: {
        col: 'wlp-ow-no-data-col',
        btn: 'wlp-ow-no-data-col-btn',
        icon: 'wlp-ow-no-data-col-btn-icon',
        title: 'wlp-ow-no-data-col-title',
        text: 'wlp-ow-no-data-col-text'
      },
      shareWorkspaces: 'wlp-share-ws-section',
      shareWsCard: 'wlp-share-ws-card',
      swEmpty: {
        col: 'wlp-sw-no-data-col',
        icon: 'wlp-sw-no-data-col-icon',
        text: 'wlp-sw-no-data-col-text'
      },
      inviteButton: 'wlp-invite-btn',
      createWorkspaceButton: 'wlp-create-btn',
      createWorkspaceCardButton: 'wlp-create-card-btn',
      workspaceCard: 'wlp-card',
      viewWorkspaceButton: 'wlp-view-btn',
      leaveWorkspaceButton: 'wlp-leave-btn',
      acceptInvitationButton: 'wlp-accept-btn',
      rejectInvitationButton: 'wlp-reject-btn',
      workspaceCardImg: 'wlp-card-image',
      workspaceCardTitle: 'wlp-card-title',
      workspaceCardFavoritesButton: 'wlp-card-favorites-btn',
      workspaceCardUnFavoritesButton: 'wlp-card-unfavorites-btn',
      workspaceCardUserButton: 'wlp-card-user-btn',
      workspaceCardActionPopoverButton: 'wlp-card-action-btn',
      modals: {
        cancelBtn: 'wlp-m-cancel-btn',
        deleteBtn: 'wlp-m-delete-btn',
        leaveBtn: 'wlp-m-leave-btn'
      }
    },

    createModal: {
      nameInput: 'wcm-name-input',
      timezoneInput: 'wcm-timezone-input',
      createButton: 'wcm-create-btn',
      closeButton: 'wcm-close-btn'
    },

    actionsPopover: {
      // wap: workspace action popover
      manageUsers: 'wap-manage-user-btn',
      configureTimetable: 'wap-configure-timetable-btn',
      manageLabels: 'wap-manage-labels-btn',
      settings: 'wap-settings-btn',
      approvalSettings: 'wap-approval-settings-btn',
      edit: 'wap-edit-btn',
      delete: 'wap-delete-btn',
      inviteMember: 'wap-invite-member-btn'
    },

    userPopover: {
      userAvatar: 'ws-up-user-avatar',
      displayName: 'ws-up-user-display-name',
      userEmail: 'ws-up-user-email'
    },

    settingsModal: {
      tabs: {
        timetable: 'wsm-timetable-tab',
        labels: 'wsm-labels-tab',
        settings: 'wsm-settings-tab',
        approvals: 'wsm-approvals-tab'
      },

      timetable: {
        addTimeButton: 'wsm-tt-add-time-btn',
        timeActionButton: 'wsm-tt-time-actions-btn',
        timeEditButton: 'wsm-tt-time-edit-btn',
        timeDeleteButton: 'wsm-tt-time-delete-btn',

        formModal: {
          timeInput: 'wsm-tfm-time-input',
          daySelector: 'wsm-tfm-day-selector',
          colorInput: 'wsm-tfm-color-input',
          colorBtn: 'wsm-tfm-color-btn',
          closeBtn: 'wsm-tfm-close-modal-btn',
          submitBtn: 'wsm-tfm-form-submit-btn'
        }
      },

      labels: {
        addNewLabelButton: 'wsm-lt-add-btn',
        addNewLabelInfoButton: 'wsm-lt-add-info-btn',
        labelNameInput: 'wsm-lt-name-input',
        closedCreateModeButton: 'wsm-lt-close-create-form-btn',
        createLabelButton: 'wsm-lt-create-label-btn',
        editLabelButton: 'wsm-lt-edit-label-btn',
        deleteLabelButton: 'wsm-lt-delete-label-btn'
      },

      settings: {
        //
        workspaceNameInput: 'wsm-st-name-input',
        workspaceTimezoneInput: 'wsm-st-timezone-input',
        internalPostInfoButton: 'wsm-st-internal-post-info-btn',
        internalPostToggler: 'wsm-st-internal-post-toggler',
        updateButton: 'wsm-st-update-btn',
        deleteButton: 'wsm-st-delete-btn'
      },

      approvals: {
        card: 'wsm-at-card',
        schedulePostToggler: 'wsm-at-schedule-post-toggler',
        lockContent: 'wsm-at-lock-content'
      }
    }
  },
  // #endregion

  // #region user
  user: {
    userProfilePopoverButton: 'user-profile-popover-btn',

    profilePopover: {
      avatar: 'pp-user-avatar',
      displayName: 'pp-display-name',
      email: 'pp-user-email',
      profileSettings: 'pp-profile-settings-btn',
      notificationSettings: 'pp-notification-settings-btn',
      logout: 'pp-logout-btn',
      addNewCompanyAccount: 'pp-add-company-account-btn'
    }
  },
  // #endregion

  // #region short links
  shortLink: {
    listPage: {
      switchItInput: 'slp-switch-input',
      switchItBtn: 'slp-switch-btn',
      switchItInputError: 'slp-search-input-error',
      searchInput: 'slp-search-input',
      searchBtn: 'slp-search-btn',
      filterBtn: 'slp-filter-btn',
      exportDataBtn: 'slp-export-data-btn',
      bulkImportBtn: 'slp-bulk-import-btn',
      createBtn: 'slp-create-btn',
      timeFilterBtn: 'slp-time-filter-btn',
      tagsFilterBtn: 'slp-tags-filter-btn',
      domainFilterBtn: 'slp-domain-filter-btn',
      refetchBtn: 'slp-refetch-btn',

      table: {
        url: 'slp-t-url',
        linkToShare: 'slp-t-link-to-share',
        pixel: 'slp-t-pixel',
        notes: 'slp-t-notes',
        actionPopoverBtn: 'slp-t-ap-btn',
        editBtn: 'slp-t-edit-btn',
        deleteBtn: 'slp-t-delete-btn',
        analyticBtn: 'slp-t-analytic-btn',
        previousButton: 'slp-t-previous-page-btn',
        getFirstPageButton: 'slp-t-first-page-btn',
        nextButton: 'slp-t-next-page-btn',
        getLastPageButton: 'slp-t-last-page-btn',
        pageSizeInput: 'slp-t-page-size-input'
      }
    },

    formPage: {
      advanceOptionsBtn: 'sl-fp-advance-options-btn',
      advanceOptionsContent: 'sl-fp-advance-options-content',

      notesTextarea: 'sl-fp-note-textarea',

      favicon: 'sl-fp-favicon',

      tag: {
        tagInput: 'sl-fp-tag-input',
        singleTag: 'sl-fp-single-tag'
      },

      rotatorABTesting: {
        // sl-fp-rabt -> shortlink-form-page-rotator-ab-testing
        redirectionLinkInput: 'sl-fp-rabt-link-input',
        percentageInput: 'sl-fp-rabt-percentage-input',
        deleteSingleRotatorBtn: 'sl-fp-rabt-delete-btn',
        addSingleRotatorBtn: 'sl-fp-rabt-add-btn',
        disabledAddSingleRotatorBtn: 'sl-fp-rabt-disabled-add-btn',
        container: 'sl-fp-rabt-container'
      },

      geoLocation: {
        // sl-fp-gl -> shortlink-form-page-geo-location
        redirectionLinkInput: 'sl-fp-gl-link-input',
        countrySelector: 'sl-fp-gl-country-selector',
        conditionSelector: 'sl-fp-gl-condition-selector',
        countrySelectorError: 'sl-fp-gl-country-selector-error',
        deleteSingleGeoLocationBtn: 'sl-fp-gl-delete-btn',
        addSingleGeoLocationBtn: 'sl-fp-gl-add-btn',
        disabledAddSingleGeoLocationBtn: 'sl-fp-gl-disabled-add-btn',
        container: 'sl-fp-gl-container'
      },

      linkExpiration: {
        // sl-fp-el -> shortlink-form-page-link-expiration
        enableBtn: 'sl-fp-le-enable-toggler',
        expirationDateInput: 'sl-fp-le-expiration-date-input',
        timezoneSelector: 'sl-fp-le-timezone-input-selector',
        redirectionLinkInput: 'sl-fp-le-redirection-link-input',
        container: 'sl-fp-le-container',
        disabledLEText: 'sl-fp-le-disabled-text'
      },

      password: {
        // sl-fp -> shortlink-form
        enableBtn: 'sl-fp-password-enable-toggler',
        container: 'sl-fp-password-container',
        input: 'sl-fp-password-input',
        disabledPasswordText: 'sl-fp-password-disabled-text'
      },

      ShortUrlOptionFields: {
        // sl-fp-suof-tp -> shortlink-form-page-short-url-option-fields-type-popover
        typeBtn: 'sl-fp-suof-type-btn',
        typePopover: {
          typeBtn: 'sl-fp-suof-tp'
        },
        linkInput: 'sl-fp-suof-link-input',
        emailInput: 'sl-fp-suof-email-input',
        numberInput: 'sl-fp-suof-number-input',
        usernameInput: 'sl-fp-suof-username-input',
        accountIdInput: 'sl-fp-suof-account-id-input',
        subjectInput: 'sl-fp-suof-subject-input',
        messageTextarea: 'sl-fp-suof-message-textarea',

        refreshThePreviewBtn: 'sl-fp-refresh-the-preview-btn'
      },

      customYourLink: {
        // sl-fp-cyl-tp -> shortlink-form-page-custom-your-link
        imageCol: 'sl-fp-cyl-image-col',
        image: 'sl-fp-cyl-image',
        titleInput: 'sl-fp-cyl-title-input',
        descriptionTextarea: 'sl-fp-cyl-description-textarea'
      },

      pixelAccount: {
        // sl-fp-pa -> shortlink-form-page-pixel-account
        pixelsSelector: 'sl-fp-pa-pixels-selector',
        createBtn: 'sl-fp-pa-create-btn'
      },

      utmTags: {
        // sl-fp-ut -> shortlink-form-page-utm-tag
        campaignInput: 'sl-fp-ut-campaign-input',
        mediumInput: 'sl-fp-ut-medium input',
        sourceInput: 'sl-fp-ut-source-input',
        termInput: 'sl-fp-ut-term-input',
        contentInput: 'sl-fp-ut-content-input',
        addTemplateBtn: 'sl-fp-ut-add-template-btn',
        selectTemplateSelector: 'sl-fp-ut-select-template-selector'
      },

      customDomain: {
        // sl-fp-cd -> shortlink-form-page-custom-domain
        domainSelector: 'sl-fp-cd-domain-selector',
        customizeInput: 'sl-fp-cd-customize-input',
        customizeCheckBtn: 'sl-fp-cd-customize-checker-btn'
      },

      folder: {
        // sl-fp -> shortlink-form-page
        createBtn: 'sl-fp-folder-create-btn',
        selector: 'sl-fp-folder-selector'
      }
    }
  },
  // #endregion

  // #region link-in-bio
  linkInBio: {
    listPage: {
      // lib-lp -> link-in-bio-list-page
      searchInput: 'lib-lp-search-input',
      searchBtn: 'lib-lp-search-btn',
      filterBtn: 'lib-lp-filter-btn',
      exportDataBtn: 'lib-lp-export-data-btn',
      bulkImportBtn: 'lib-lp-bulk-import-btn',
      createBtn: 'lib-lp-create-btn',
      timeFilterBtn: 'lib-lp-time-filter-btn',
      tagsFilterBtn: 'lib-lp-tags-filter-btn',
      refetchBtn: 'lib-lp-refetch-btn',

      table: {
        // lib-t -> link-in-bio-table
        url: 'lib-t-url',
        linkToShare: 'lib-t-link-to-share',
        pixel: 'lib-t-pixel',
        notes: 'lib-t-notes',
        actionPopoverBtn: 'lib-t-ap-btn',
        editBtn: 'lib-t-edit-btn',
        deleteBtn: 'lib-t-delete-btn',
        previousButton: 'lib-t-previous-page-btn',
        getFirstPageButton: 'lib-t-first-page-btn',
        nextButton: 'lib-t-next-page-btn',
        getLastPageButton: 'lib-t-last-page-btn',
        pageSizeInput: 'lib-t-page-size-input'
      }
    },

    formModal: {
      // lib-fm -> link-in-bio-form-modal
      closeBtn: 'lib-fm-close-btn',
      submitFormBtn: 'lib-fm-submit-form-btn',
      titleInput: 'lib-fm-title-input'
    },

    formPage: {
      topBar: {
        // lib-fp-tb -> link-in-bio-form-page-topBar
        homeBtn: 'lib-fp-tb-home-btn',
        titleContainer: 'lib-fp-tb-title-container',
        titleTextContainer: 'lib-fp-tb-title-text-container',
        titleText: 'lib-fp-tb-title',
        titleInput: 'lib-fp-tb-title-input',
        titleSaveBtn: 'lib-fp-tb-title-save-btn',
        titleIonItem: 'lib-fp-tb-title-item',

        tab: {
          design: 'lib-fp-tb-design',
          shareSettings: 'lib-fp-tb-share-settings',
          pageAnalytics: 'lib-fp-tb-page-analytics',
          lead: 'lib-fp-tb-lead',
          blockAnalytics: 'lib-fp-tb-block-analytics'
        },

        errorsBtn: 'lib-fp-tb-errors-btn',
        upgradeBtn: 'lib-fp-tb-upgrade-btn'
      },

      design: {
        TopTitleBar: {
          container: 'lib-fp-dt-title-container',
          titleCol: 'lib-fp-dt-title-col',
          title: 'lib-fp-dt-title',
          saveBtn: 'lib-fp-dt-save-btn',
          saveBtnCol: 'lib-fp-dt-save-btn-col'
        },

        bottomTabs: {
          // lib-fp-dt-bt -> link-in-bio-form-page-design-tab-bottom-tab
          theme: 'lib-fp-dt-bt-theme',
          blocks: 'lib-fp-dt-bt-blocks',
          settings: 'lib-fp-dt-bt-settings',
          poweredBy: 'lib-fp-dt-bt-powered-by'
        },

        // lib-fp-dt-pdt-b -> link-in-bio-form-page-design-tab-pre-defined-theme-block
        theme: {
          preDefinedThemeBlock: 'lib-fp-dt-pdt-b',

          fontSelector: 'lib-fp-dt-font-selector',

          bg: {
            // lib-fp-dt-bg -> link-in-bio-form-page-design-tab-background
            bgSolidColorInput: 'lib-fp-dt-bg-sc-input', // sc -> solid color
            addGradientBtn: 'lib-fp-dt-bg-add-gradient-btn',
            container: 'lib-fp-dt-bg-container',
            gColors: {
              // gColors/gc -> gradientColors
              startColorInput: 'lib-fp-dt-bg-gc-sci',
              endColorInput: 'lib-fp-dt-bg-gc-eci',
              directionBtn: 'lib-fp-dt-bg-gc-d-btn'
            }
          },

          button: {
            // lib-fp-dt-btn -> link-in-bio-form-page-design-tab-button
            bgSolidColorInput: 'lib-fp-dt-btn-sc-input', // sc -> solid color
            addGradientBtn: 'lib-fp-dt-btn-add-gradient-btn',
            container: 'lib-fp-dt-btn-container',
            gColors: {
              // lib-fp-dt-btn-gc -> link-in-bio-form-page-design-tab-button-background-color
              // gColors/gc -> gradientColors
              startColorInput: 'lib-fp-dt-btn-gc-sci', // sci -> startColorInput
              endColorInput: 'lib-fp-dt-btn-gc-eci', // eci -> endColorInput
              directionBtn: 'lib-fp-dt-btn-gc-d-btn' // d-btn -> directionBtn
            },

            btnType: {
              // lib-fp-dt-btn-gc -> link-in-bio-form-page-design-tab-button
              inlineSquare: 'lib-fp-dt-btn-type-is', // is -> inlineSquare
              inlineRound: 'lib-fp-dt-btn-type-ir', // ir -> inlineRound
              inlineCircle: 'lib-fp-dt-btn-type-ic', // ic -> inlineCircle

              inlineSquareOutline: 'lib-fp-dt-btn-type-iso', // iso -> inlineSquareOutline
              inlineRoundOutline: 'lib-fp-dt-btn-type-iro', // iro -> inlineRoundOutline
              inlineCircleOutline: 'lib-fp-dt-btn-type-ico', // ico -> inlineCircleOutline

              inlineSquareShadow: 'lib-fp-dt-btn-type-iss', // iss -> inlineSquareShadow
              inlineRoundShadow: 'lib-fp-dt-btn-type-irs', // irs -> inlineRoundShadow
              inlineCircleShadow: 'lib-fp-dt-btn-type-ics', // ics -> inlineCircleShadow

              shadowColorInput: 'lib-fp-dt-btn-type-sci', // sci -> shadowColorInput
              shadowColorInputContainer: 'lib-fp-dt-btn-type-sci-container' // sci -> shadowColorInput
            }
          },

          bgImage: {
            // lib-fp-dt-bgi -> link-in-bio-form-page-design-tab-background-image
            toggler: 'lib-fp-dt-bgi-toggler',
            upload: 'lib-fp-dt-bgi-upload',
            container: 'lib-fp-dt-bgi-container'
          }
        },

        blocks: {
          container: 'lib-fp-dt-blocks-container',
          btnCol: 'lib-fp-dt-blocks-btnCol',
          btn: 'lib-fp-dt-blocks-btn',

          addModal: {
            // lib-fp-dt-bam -> link-in-bio-form-page-design-tab-block-add-modal
            topBtn: 'lib-fp-dt-bam-top-btn',
            bottomBtn: 'lib-fp-dt-bam-bottom-btn',
            text: 'lib-fp-dt-bam-text',
            closeModalBtn: 'lib-fp-dt-bam-close-modal-btn'
          }
        },

        blockForm: {
          // lib-fp-dt-bf -> link-in-bio-form-page-design-tab-block-form
          goToBlockPageBtn: 'lib-fp-dt-bf-chevron-btn',
          title: 'lib-fp-dt-bf-title',
          titleCol: 'lib-fp-dt-bf-title-col',
          actionsCol: 'lib-fp-dt-bf-actions-col',
          saveBtn: 'lib-fp-dt-bf-save-btn',
          isActiveBtn: 'lib-fp-dt-bf-is-active-btn',
          duplicateBtn: 'lib-fp-dt-bf-is-duplicate-btn',
          deleteBtn: 'lib-fp-dt-bf-is-delete-btn',

          fields: {
            // lib-fp-dt-bf-f -> link-in-bio-form-page-design-tab-block-form-fields
            container: 'lib-fp-dt-bf-f-container',
            title: 'lib-fp-dt-bf-f-title',

            //
            linkInput: 'lib-fp-dt-bf-f-link',
            iFrameInput: 'lib-fp-dt-bf-f-iFrame',
            iconInput: 'lib-fp-dt-bf-f-icon',
            descriptionInput: 'lib-fp-dt-bf-f-description',
            textEditor: 'lib-fp-dt-bf-f-text-editor',
            upload: 'lib-fp-dt-bf-f-upload',
            submitButtonText: 'lib-fp-dt-bf-f-submit-button-text',
            dateTimeInput: 'lib-fp-dt-bf-f-datetime-input',
            timezoneInput: 'lib-fp-dt-bf-f-timezone-input',
            rssInput: 'lib-fp-dt-bf-f-rss',
            shopifyInput: 'lib-fp-dt-bf-f-shopify',
            magnetoInput: 'lib-fp-dt-bf-f-magneto',
            wordpressInput: 'lib-fp-dt-bf-f-wordpress',
            map: 'lib-fp-dt-bf-f-map',
            titleEnable: 'lib-fp-dt-bf-f-title-enable',
            descriptionEnable: 'lib-fp-dt-bf-f-description-enable',
            pictureEnable: 'lib-fp-dt-bf-f-picture-enable',
            cardEnable: 'lib-fp-dt-bf-f-card-enable',
            priceEnable: 'lib-fp-dt-bf-f-price-enable',

            spacing: 'lib-fp-dt-bf-f-spacing-range',

            term: {
              toggler: 'lib-fp-dt-bf-f-term-toggler',
              text: 'lib-fp-dt-bf-f-term-text',
              link: 'lib-fp-dt-bf-f-term-link'
            },

            separatorType: {
              button: 'lib-fp-dt-bf-f-st-btn',
              colorInput: 'lib-fp-dt-bf-f-st-color-input'
            },

            form: {
              addNewFieldBtn: 'lib-fp-dt-bf-f-form-anf-btn',
              cardItem: 'lib-fp-dt-bf-f-form-card-item',
              titleInput: 'lib-fp-dt-bf-f-form-title',
              textarea: 'lib-fp-dt-bf-f-form-textarea',
              requiredSwitcher: 'lib-fp-dt-bf-f-form-is-required',
              activeSwitcher: 'lib-fp-dt-bf-f-form-is-active',
              deleteBtn: 'lib-fp-dt-bf-f-form-delete-btn'
            },

            carouselCard: {
              addCardBtn: 'lib-fp-dt-bf-cc-add-card-btn',
              cardItem: 'lib-fp-dt-bf-cc-card-item',
              linkInput: 'lib-fp-dt-bf-cc-link',
              uploadField: 'lib-fp-dt-bf-cc-upload',
              titleInput: 'lib-fp-dt-bf-cc-title',
              description: 'lib-fp-dt-bf-cc-description',
              deleteBtn: 'lib-fp-dt-bf-cc-delete-btn'
            },

            QAndA: {
              addCardBtn: 'lib-fp-dt-bf-qaa-add-card-btn',
              cardItem: 'lib-fp-dt-bf-qaa-card-item',
              titleInput: 'lib-fp-dt-bf-qaa-title',
              textEditor: 'lib-fp-dt-bf-qaa-text-editor',
              deleteBtn: 'lib-fp-dt-bf-qaa-delete-btn'
            },

            music: {
              // lib-fp-dt-bf-mu-pdb -> link-in-bio-form-page-design-tab-music-pre-defined-block
              block: 'lib-fp-dt-bf-mu-pdb',
              blocksContainer: 'lib-fp-dt-bf-mu-pdb-container',
              addBlockBtn: 'lib-fp-dt-bf-mu-add-block-btn',
              cardItem: 'lib-fp-dt-bf-mu-card-item',
              titleInput: 'lib-fp-dt-bf-mu-title',
              linkInput: 'lib-fp-dt-bf-mu-link',
              iconInput: 'lib-fp-dt-bf-mu-icon',
              deleteBtn: 'lib-fp-dt-bf-mu-delete-btn'
            },

            messenger: {
              // lib-fp-dt-bf-me-pdb -> link-in-bio-form-page-design-tab-messenger-pre-defined-block
              block: 'lib-fp-dt-bf-me-pdb',
              addBlockBtn: 'lib-fp-dt-bf-me-add-block-btn',
              cardItem: 'lib-fp-dt-bf-me-card-item',
              titleInput: 'lib-fp-dt-bf-me-title',
              linkInput: 'lib-fp-dt-bf-me-link',
              iconInput: 'lib-fp-dt-bf-me-icon',
              emailInput: 'lib-fp-dt-bf-me-email',
              pNumberInput: 'lib-fp-dt-bf-me-pNumber',
              usernameInput: 'lib-fp-dt-bf-me-username',
              objectInput: 'lib-fp-dt-bf-me-object',
              textInput: 'lib-fp-dt-bf-me-text',
              deleteBtn: 'lib-fp-dt-bf-me-delete-btn'
            },

            socialPlatform: {
              // lib-fp-dt-bf-sp-pdb -> link-in-bio-form-page-design-tab-social-platform-pre-defined-block
              block: 'lib-fp-dt-bf-sp-pdb',
              addBlockBtn: 'lib-fp-dt-bf-sp-add-block-btn',
              cardItem: 'lib-fp-dt-bf-sp-card-item',
              linkInput: 'lib-fp-dt-bf-sp-link',
              iconInput: 'lib-fp-dt-bf-sp-icon',
              deleteBtn: 'lib-fp-dt-bf-sp-delete-btn'
            }
          }
        }
      },

      shareSettings: {
        // lib-fp -> link-in-bio-form-page
        advanceOptionsBtn: 'lib-fp-advance-options-btn',
        advanceOptionsContent: 'lib-fp-advance-options-content',

        notesTextarea: 'lib-fp-note-textarea',

        favicon: 'lib-fp-favicon',

        tag: {
          tagInput: 'lib-fp-tag-input',
          singleTag: 'lib-fp-single-tag'
        }
      }
    }
  },
  // #endregion

  // #region pixels
  pixels: {
    formModal: {
      // p-fm -> pixel-form-modal
      closeBtn: 'p-fm-close-btn',
      submitFormBtn: 'p-fm-submit-form-btn',
      platformSelector: 'p-fm-platform-selector',
      pixelIdInput: 'p-fm-pixelId-input',
      pixelNameInput: 'p-fm-pixel-name-input'
    },

    listPage: {
      // p-lp -> pixel-list-page
      filterBtn: 'p-lp-filter-btn',
      refreshBtn: 'p-lp-refresh-btn',
      createBtn: 'p-lp-create-btn',

      table: {
        // p-lp-t -> pixel-list-page-table
        select: 'p-lp-t-select',
        createBtn: 'p-lp-t-create-btn',
        title: 'p-lp-t-title',
        pixelId: 'p-lp-t-pixel-id',
        platform: 'p-lp-t-platform',
        createAt: 'p-lp-t-create-at',
        actionBtn: 'p-lp-t-action-btn',
        editBtn: 'p-lp-t-edit-btn',
        deleteBtn: 'p-lp-t-delete-btn',
        previousButton: 'p-lp-t-previous-button',
        getFirstPageButton: 'p-lp-t-get-first-page-btn',
        nextButton: 'p-lp-t-next-button',
        getLastPageButton: 'p-lp-t-get-last-page-button',
        pageSizeInput: 'p-lp-t-page-size-input',
        itemsCount: 'p-lp-t-items-count',
        itemsCountText: 'p-lp-t-items-count-text'
      },

      filterSidebar: {
        // p-lp-fsb -> pixel-list-page-filter-side-bar
        closeMenuBtn: 'p-lp-fsb-close-menu-btn',
        timeFilterInput: 'p-lp-fsb-time-filter-input',
        startInput: 'p-lp-fsb-start-input',
        endInput: 'p-lp-fsb-end-input',
        saveBtn1: 'p-lp-fsb-save-btn-1',
        platformSelect: 'p-lp-fsb-platform-select',
        columnAccordionHead: 'p-lp-fsb-column-accordion-head',
        columnAccordionBody: 'p-lp-fsb-column-accordion-body',
        reorderItem: 'p-lp-fsb-reorder-item',
        reorderTitle: 'p-lp-fsb-reorder-title',
        reorderToggler: 'p-lp-fsb-reorder-toggler',
        saveBtn2: 'p-lp-fsb-save-btn-2'
      }
    }
  },
  // #endregion

  // #region utm tag
  utmTags: {
    // ut-fm -> utmTags-form-modal
    formModal: {
      closeModalBtn: 'ut-fm-close-btn',
      submitFormBtn: 'ut-fm-utm-tag-submit-form-btn',
      name: 'ut-fm-name-input',
      campaign: 'ut-fm-campaign-input',
      medium: 'ut-fm-medium-input',
      source: 'ut-fm-source-input',
      term: 'ut-fm-term-input',
      content: 'ut-fm-content-input'
    },

    listPage: {
      // ut-lp -> utmTags-list-page
      filterBtn: 'ut-lp-filter-btn',
      refetchBtn: 'ut-lp-refetch-btn',
      createBtn: 'ut-lp-create-btn',

      table: {
        // ut-lp-t -> pixel-list-page-table
        select: 'ut-lp-t-select',
        createBtn: 'ut-lp-t-create-btn',
        templateName: 'ut-lp-t-template',
        campaign: 'ut-lp-t-campaign',
        medium: 'ut-lp-t-medium',
        content: 'ut-lp-t-content',
        source: 'ut-lp-t-source',
        team: 'ut-lp-t-team',
        createAt: 'ut-lp-t-create-at',
        actionBtn: 'ut-lp-t-action-btn',
        editBtn: 'ut-lp-t-edit-btn',
        deleteBtn: 'ut-lp-t-delete-btn',
        previousButton: 'ut-lp-t-previous-button',
        getFirstPageButton: 'ut-lp-t-get-first-page-btn',
        nextButton: 'ut-lp-t-next-button',
        getLastPageButton: 'ut-lp-t-get-last-page-button',
        pageSizeInput: 'ut-lp-t-page-size-input',
        itemsCount: 'ut-lp-t-items-count',
        itemsCountText: 'ut-lp-t-items-count-text'
      },

      filterSidebar: {
        // ut-lp-fsb -> pixel-list-page-filter-side-bar
        closeMenuBtn: 'ut-lp-fsb-close-menu-btn',
        timeFilterInput: 'ut-lp-fsb-time-filter-input',
        startInput: 'ut-lp-fsb-start-input',
        endInput: 'ut-lp-fsb-end-input',
        saveBtn1: 'ut-lp-fsb-save-btn-1',
        columnAccordionHead: 'ut-lp-fsb-column-accordion-head',
        columnAccordionBody: 'ut-lp-fsb-column-accordion-body',
        reorderItem: 'ut-lp-fsb-reorder-item',
        reorderTitle: 'ut-lp-fsb-reorder-title',
        reorderToggler: 'ut-lp-fsb-reorder-toggler',
        saveBtn2: 'ut-lp-fsb-save-btn-2'
      }
    }
  },
  // #endregion

  // #region folder
  folder: {
    create: 'f-create-btn',
    actionPopoverBtn: 'fap-btn',
    editBtn: 'f-edit-btn',
    deleteBtn: 'f-delete-btn',
    reorderBtn: 'f-reorder-btn',
    singleFolder: 'single-folder',
    formModal: {
      closeModalBtn: 'folder-fm-close-btn',
      submitFormBtn: 'folder-fm-submit-form-btn',
      nameInput: 'folder-fm-name-input'
    }
  },
  // #endregion

  // #region top bar
  topBar: {
    goToWorkspacesBtn: 'tb-go-to-workspaces-btn',
    openInpageMenuBtn: 'tb-open-page-menu-btn',
    workspaceSwitcherBtn: 'tb-ws-btn', // top-bar-workspace-switcher-btn.
    workspaceSwitcherPopover: {
      singleWorkspace: 'tb-wsp-single-workspace', // top-bar-workspace-switcher-popover-...
      wsCreateBtn: 'tb-wsp-create-workspace-btn',
      noData: {
        ownedWS: {
          item: 'tb-wsp-owned-ws-no-data-item',
          text: 'tb-wsp-owned-ws-no-data-text'
        },
        shareWS: {
          item: 'tb-wsp-share-ws-no-data-item',
          text: 'tb-wsp-share-ws-no-data-text'
        }
      },
      actionPopover: {
        // top-bar-workspace-switcher-popover-action-popover-...
        editWorkspace: 'tb-wsp-ap-edit-btn',
        deleteWorkspace: 'tb-wsp-ap-delete-btn'
      }
    },
    teamInviteBtn: 'tb-invite-member-btn', // top-bar-.
    teamInviteModal: {
      closeModalBtn: 'tb-ti-modal-close-btn'
    },
    upgradeBtn: 'tb-upgrade-btn',
    helpBtn: 'tb-help-btn',
    helpPopover: {
      allSystemsOperations: 'tb-hcp-aso-btn',
      whatsNew: 'tb-hcp-whats-new-btn',
      suggestAnIdea: 'tb-hcp-suggest-idea-btn',
      helpCenter: 'tb-hcp-help-center-btn',
      price: 'tb-hcp-price-btn',
      contactSupport: 'tb-hcp-cs-btn',
      iSOAppBtn: 'tb-hcp-iSO-app-btn',
      androidAppBtn: 'tb-hcp-android-app-btn'
    },
    notificationBtn: 'tb-notification-btn',
    notificationPopover: {
      tabs: {
        approvalRequests: 'tb-np-approval-requests-btn',
        updates: 'tb-np-updates-btn',
        personal: 'tb-np-personal-btn'
      },
      markAllAsReadBtn: 'tb-np-masr-btn',
      settingsBtn: 'tb-np-settings-btn',
      refetchBtn: 'tb-np-refetch-btn',

      singleNotification: 'tb-np-single-notification',
      notificationUpdateTabText: 'tb-np-updates-message-text',
      notificationUpdateTabViewBtn: 'tb-np-updates-view-btn',
      dateText: 'tb-np-updates-date-text'
    }
  },
  // #endregion

  // #region Invitation.
  invitation: {
    viewModal: {
      closeBtn: 'invitation-vm-close-btn',
      acceptedBtn: 'invitation-vm-accepted-btn',
      rejectedBtn: 'invitation-vm-rejected-btn',
      actionBtnContainer: 'invitation-vm-action-btn-container',
      messageContainer: 'invitation-vm-message-container',
      acceptedText: 'invitation-vm-accepted-text',
      rejectedText: 'invitation-vm-rejected-text'
    }
  },
  // #endregion

  // #region settings
  WSSettings: {
    menuBar: {
      accordionGroup: {
        value: 'accordion-group',
        asAccordion: 'account-settings-accordion',
        wsAccordion: 'workspace-settings-accordion'
      },
      // wss-mb-as -> workspace-setting-menubar-accountSettings
      as: {
        teamBtn: 'wss-mb-as-team-btn',
        referralBtn: 'wss-mb-as-referral-btn',
        billingBtn: 'wss-mb-as-billing-btn',
        userBtn: 'wss-mb-as-user-btn'
      },
      ws: {
        pixelBtn: 'wss-mb-ws-pixel-btn',
        utmBtn: 'wss-mb-ws-utm-btn',
        embedWidgetBtn: 'wss-mb-ws-embed-widget-btn',
        customDomainBtn: 'wss-mb-ws-custom-domain-btn',
        privacyPopoverBtn: 'wss-mb-ws-privacy-popover-btn',
        passwordBtn: 'wss-mb-ws-password-btn',
        apiKeyBtn: 'wss-mb-ws-api-key-btn'
      }
    },

    teamListPage: {
      // wss-tlp-t -> workspace-setting-team-list-page-table
      createTeamBtn: 'wss-tlp-create-team-btn',
      timeFilterBtn: 'wss-tlp-time-filter-btn',
      tagsFilterBtn: 'wss-tlp-tags-filter-btn',
      refetchBtn: 'wss-tlp-refetch-btn',
      addMemberBtn: 'wss-tlp-add-member-btn',
      teamsCount: 'wss-tlp-teams-counts',
      table: {
        description: 'wss-tlp-t-description-rm', // rm -> read more
        actionPopoverBtn: 'wss-tlp-t-ap-btn',
        editBtn: 'wss-tlp-t-edit-btn',
        resendInvitation: 'wss-tlp-t-resend-invitation-btn',
        deleteBtn: 'wss-tlp-t-delete-btn',
        cancelBtn: 'wss-tlp-t-cancel-btn',
        previousButton: 'wss-tlp-t-previous-page-btn',
        getFirstPageButton: 'wss-tlp-t-first-page-btn',
        nextButton: 'wss-tlp-t-next-page-btn',
        getLastPageButton: 'wss-tlp-t-last-page-btn',
        pageSizeInput: 'wss-tlp-t-page-size-input'
      }
    },

    teamViewPage: {
      titleText: 'wss-tvp-title-text',
      descriptionText: 'wss-tvp-description-text',
      unableEditModeBtn: 'wss-tvp-unable-edit-mode-btn',

      // wss-tvp-f -> workspace-setting-team-view-page-form
      form: {
        submitFormBtn: 'wss-tvp-f-submit-form-btn',
        closeButton: 'wss-tvp-f-close-btn',
        titleInput: 'wss-tvp-f-title-input',
        descriptionTextarea: 'wss-tvp-f-description-textarea'
      }
    },

    createModal: {
      submitFormBtn: 'wcm-submit-form-btn',
      closeButton: 'wcm-close-btn',
      titleInput: 'wcm-title-input',
      descriptionTextarea: 'wcm-description-textarea'
    }
  },
  // #endregion

  // #region User account
  userAccount: {
    // us => userAccount
    mainContainer: 'ua-main-container',
    ionMenu: {
      // us-im => userAccount-ionMenu
      closeMenuBtn: 'ua-im-close-btn',
      notificationSettings: 'ua-im-ns-btn', // us-im-ns => userAccount-ionMenu-notificationSettings
      profileSettings: 'ua-im-ps-btn' // us-im-ns => userAccount-ionMenu-profileSettings
    },
    menuBar: {
      notificationSettings: 'ua-mb-ns-btn', // us-mb-ns => userAccount-menuBar-notificationSettings
      profileSettings: 'ua-mb-ps-btn' // us-mb-ns => userAccount-menuBar-profileSettings
    },
    notificationSettingsTab: {
      // nst => notificationSettingsTab
      WSNotificationsAccordion: {
        header: 'nst-ws-na-header', // nst-ws-ns => notificationSettingsTab-workspace-notificationAccordion
        ownedWSItem: 'nst-owned-ws-item',
        shareWSItem: 'nst-share-ws-item'
      },
      otherNotificationAccordion: {
        header: 'nst-ona-header', // nst-ona => notificationSettingsTab-otherNotificationsAccordion
        allowNotificationItem: 'nst-ona-allow-notification-item',
        allowNotificationToggler: 'nst-ona-allow-notification-toggler',

        pushItem: 'nst-ona-push-item',
        pushToggler: 'nst-ona-push-toggler',

        emailItem: 'nst-ona-email-item',
        emailToggler: 'nst-ona-email-toggler',

        smsItem: 'nst-ona-sms-item',
        smsToggler: 'nst-ona-sms-toggler'
      },
      invitationNotificationAccordion: {
        header: 'nst-ina-header', // nst-ina => notificationSettingsTab-invitationNotificationAccordion
        allowNotificationItem: 'nst-ina-allow-notification-item',
        allowNotificationToggler: 'nst-ina-allow-notification-toggler',

        pushItem: 'nst-ina-push-item',
        pushToggler: 'nst-ina-push-toggler',

        emailItem: 'nst-ina-email-item',
        emailToggler: 'nst-ina-email-toggler',

        smsItem: 'nst-ina-sms-item',
        smsToggler: 'nst-ina-sms-toggler'
      },
      browserNotificationAccordion: {
        header: 'nst-bna-header', // nst-bna => notificationSettingsTab-browserNotificationAccordion

        chromeNotificationItem: 'nst-bna-cn-item',
        chromeNotificationToggler: 'nst-bna-cn-toggler',

        notificationSoundItem: 'nst-bna-ns-item',
        notificationSoundToggler: 'nst-bna-ns-toggler',

        messageSoundItem: 'nst-bna-ms-item',
        messageSoundToggler: 'nst-bna-ms-toggler'
      },
      emailNotificationAccording: {
        header: 'nst-ena-header', // nst-ena => notificationSettingsTab-emailNotificationAccordion
        primaryEmail: 'nst-ena-primary-email',

        allItem: 'nst-bna-all-item',
        allToggler: 'nst-bna-all-toggler',

        suggestedItem: 'nst-bna-suggested-item',
        suggestedToggler: 'nst-bna-suggested-toggler',

        requestedItem: 'nst-bna-requested-item',
        requestedToggler: 'nst-bna-requested-toggler'
      }
    },
    profileSettingsTab: {
      // pst => profileSettingsTab
      usernameInput: 'ua-pst-username-input',
      updateProfileBtn: 'ua-pst-update-profile-btn',
      addNewEmailBtn: 'ua-pst-add-new-email-btn',
      updatePrimaryEmailBtn: 'ua-pst-update-primary-email-btn',
      currentPasswordInput: 'ua-pst-current-password-input',
      currentPasswordSeeBtn: 'ua-pst-current-password-see-btn',

      newPasswordInput: 'ua-pst-new-password-input',
      newPasswordSeeBtn: 'ua-pst-new-password-see-btn',

      confirmPasswordInput: 'ua-pst-confirm-password-input',
      confirmPasswordSeeBtn: 'ua-pst-confirm-see-btn',

      changePasswordBtn: 'ua-pst-change-password-btn',
      twoAuthenticationPhoneInput: 'ua-pst-ta-phone-input',
      twoAuthenticationBtn: 'ua-pst-ta-sv-input',
      logoutAllSession: 'ua-pst-logout-all-session'
    }
  }
  // #endregion
} as const;

export const TIMEZONES = [
  { label: '(UTC-12:00) International Date Line West', value: 'Etc/GMT+12' },
  { label: '(UTC-11:00) Midway Island, Samoa', value: 'Pacific/Midway' },
  { label: '(UTC-10:00) Hawaii', value: 'Pacific/Honolulu' },
  { label: '(UTC-09:00) Alaska', value: 'America/Anchorage' },
  {
    label: '(UTC-08:00) Pacific Time (US & Canada)',
    value: 'America/Los_Angeles'
  },
  { label: '(UTC-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
  { label: '(UTC-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
  {
    label: '(UTC-05:00) Eastern Time (US & Canada)',
    value: 'America/New_York'
  },
  { label: '(UTC-04:00) Atlantic Time (Canada)', value: 'America/Halifax' },
  {
    label: '(UTC-03:00) Buenos Aires, Georgetown',
    value: 'America/Argentina/Buenos_Aires'
  },
  { label: '(UTC-02:00) Mid-Atlantic', value: 'Etc/GMT+2' },
  { label: '(UTC-01:00) Azores', value: 'Atlantic/Azores' },
  { label: '(UTC+00:00) London, UTC/GMT', value: 'UTC' },
  { label: '(UTC+01:00) Berlin, Rome, Paris', value: 'Europe/Berlin' },
  { label: '(UTC+02:00) Athens, Jerusalem', value: 'Europe/Athens' },
  { label: '(UTC+03:00) Moscow, St. Petersburg', value: 'Europe/Moscow' },
  { label: '(UTC+04:00) Abu Dhabi, Dubai', value: 'Asia/Dubai' },
  { label: '(UTC+05:00) Islamabad, Karachi', value: 'Asia/Karachi' },
  { label: '(UTC+06:00) Almaty, Dhaka', value: 'Asia/Almaty' },
  { label: '(UTC+07:00) Bangkok, Jakarta', value: 'Asia/Bangkok' },
  { label: '(UTC+08:00) Beijing, Hong Kong', value: 'Asia/Hong_Kong' },
  { label: '(UTC+09:00) Tokyo, Seoul', value: 'Asia/Tokyo' },
  { label: '(UTC+10:00) Brisbane, Sydney', value: 'Australia/Brisbane' },
  { label: '(UTC+11:00) Solomon Islands', value: 'Pacific/Guadalcanal' },
  { label: '(UTC+12:00) Auckland, Wellington', value: 'Pacific/Auckland' }
] as const;

// Modal Id's
export const ZAIONS_MODALS_IDS = {
  ADD_NEW_EMBED_WIDGETS: 'add-new-embed-widget',
  ADD_NEW_UTM_TAG: 'add-new-utm-tag-template',
  ADD_NEW_PIXEL_ID: 'add-new-pixel-account',
  GENERATE_API_KEY: 'generate-api-key'
} as const;

export const NOTIFICATIONS = {
  MODAL_FORM_ERROR_TOAST: {
    DURATION: 4000
  },
  ReactToastify: {
    autoclose: 5000
  },
  ZIonAlerts: {
    OKAY_BUTTON: {
      TEXT: 'Okay',
      ROLE: 'okay_dismiss'
    },
    CANCEL_BUTTON: {
      TEXT: 'Cancel',
      ROLE: 'cancel_dismiss'
    }
  }
} as const;

/**
 * ------  REACT_QUERY -------
 * QUERIES_KEYS:
 *** MAIN: Key to pass to get the complete list of data.
 *** CREATE: Key to pass to create a new recode.
 *** UPDATE: Key to pass to update a existing recode.
 *** DELETE: Key to pass to Delete a existing recode.
 *
 */
const REACT_QUERY = {
  QUERIES_KEYS: {
    PLANS: {
      MAIN: 'rq-plans-list-key'
    },
    PIXEL_ACCOUNT: {
      MAIN: 'rq-pixel-account-list-key',
      CREATE: 'rq-pixel-account-create-key',
      UPDATE: 'rq-pixel-account-update-key',
      DELETE: 'rq-pixel-account-delete-key',
      GET: 'rq-pixel-account-get-key',

      SWS_MAIN: 'rq-sws-pixel-account-list-key',
      SWS_GET: 'rq-sws-pixel-account-get-key'
    },
    UTM_TAGS: {
      MAIN: 'rq-utm-tags-list-key',
      SWS_MAIN: 'rq-sws-utm-tags-list-key',
      SWS_GET: 'rq-sws-utm-tags-get-key'
    },
    EMBED_WIDGET: {
      MAIN: 'rq-embed-widget-list-key'
    },
    SHORT_LINKS: {
      MAIN: 'rq-short-links-list-key',
      GET: 'rq-short-link-get-key',
      ANALYTICS: 'rq-short-link-analytics-get-key',
      IS_PATH_AVAILABLE: 'rq-short-link-is-path-available-key',

      SWS_MAIN: 'rq-sws-short-link-list-key',
      SWS_GET: 'rq-sws-short-link-get-key'
    },
    LINK_IN_BIO: {
      MAIN: 'rq-link-in-bio-links-list-key',
      GET: 'rq-link-in-bio-link-get-key',
      BLOCK: {
        MAIN: 'rq-link-in-bio-block-list-key'
      },
      SETTING_TAB: {
        MAIN: 'rq-link-in-bio-setting-tab-key'
      }
    },
    TIME_SLOT: {
      MAIN: 'rq-time-slot-list-key',
      GET: 'rq-time-slot-get-key',

      SWS_MAIN: 'rq-sws-time-slot-list-key',
      SWS_GET: 'rq-sws-time-slot-get-key'
    },
    LABEL: {
      MAIN: 'rq-label-list-key',
      GET: 'rq-label-get-key',

      SWS_MAIN: 'rq-sws-label-list-key',
      SWS_GET: 'rq-sws-label-get-key'
    },
    WORKSPACE: {
      MAIN: 'rq-workspace-list-key',
      GET: 'rq-workspace-get-key',
      TEAM: 'rq-workspace-team-list-key',
      TEAM_GET: 'rq-workspace-team-get-key',
      MEMBERS: 'rq-ws-team-members-main-key',
      MEMBER_GET: 'rq-ws-team-member-get-key',
      INVITATION_GET: 'rq-ws-team-member-invitation-get-key',

      SWS_MEMBERS_MAIN: 'rq-sws-team-members-main-key',
      SWS_MEMBER_GET: 'rq-sws-team-member-get-key'
    },
    SHARE_WS: {
      MAIN: 'rq-ws-share-list-key',
      MEMBER_ROLE_AND_PERMISSIONS: 'rq-ws-share-member-role-and-permission-key',
      SHARE_WS_INFO: 'rq-share-ws-info-data-key'
    },
    FOLDER: {
      MAIN: 'rq-folders-list-key',
      GET: 'rq-folder-get-key',
      FOLDER_SHORT_LINKS: 'rq-folder-short-links-key',

      SWS_MAIN: 'rq-sws-folder-list-key',
      SWS_GET: 'rq-sws-folder-get-key'
    },
    LINK_IN_BIO_FOLDER: {
      MAIN: 'rq-link-in-bio-folders-list-key',
      GET: 'rq-link-in-bio-folder-get-key',
      FOLDER_SHORT_LINKS: 'rq-link-in-bio-folder-short-links-key'
    },
    LINK_IN_BIO_PRE_DEFINED_THEMES: {
      MAIN: 'rq-link-in-bio-pre-defined-themes',
      GET: 'rq-link-in-bio-pre-defined-theme'
    },
    LINK_IN_BIO_PRE_DEFINED_BLOCKS: {
      MAIN: 'rq-link-in-bio-predefined-blocks',
      GET: 'rq-link-in-bio-predefined-blocks'
    },

    LINK_IN_BIO_PRE_DEFINED_MUSIC_PLATFORM: {
      MAIN: 'rq-link-in-bio-predefined-music-platform',
      GET: 'rq-link-in-bio-predefined-music-platform'
    },

    LINK_IN_BIO_PRE_DEFINED_MESSENGER_PLATFORM: {
      MAIN: 'rq-link-in-bio-predefined-messenger-platform',
      GET: 'rq-link-in-bio-predefined-messenger-platform'
    },

    LINK_IN_BIO_PRE_FORM_FIELDS: {
      MAIN: 'rq-link-in-bio-predefined-form-fields',
      GET: 'rq-link-in-bio-predefined-form-fields'
    },

    LINK_IN_BIO_PRE_DEFINED_SOCIAL_PLATFORM: {
      MAIN: 'rq-link-in-bio-predefined-social-platform',
      GET: 'rq-link-in-bio-predefined-social-platform'
    },

    LINK_IN_BIO_BLOCK: {
      MAIN: 'rq-link-in-bio-blocks',
      GET: 'rq-link-in-bio-block'
    },

    USER: {
      EMAILS: 'rq-user-emails-key',
      ROLE_PERMISSIONS: 'rq-user-roles-and-permissions-key',
      WS_ROLES: 'rq-user-ws-roles-key',
      NOTIFICATION: {
        MAIN: 'rq-user-notification-main-key'
      },
      SETTING: {
        MAIN: 'rq-user-setting-main-key',
        GET: 're-user-setting-get-key',

        SWS_MAIN: 'rq-sws-user-setting-main-key',
        SWS_GET: 'rq-sws-user-setting-get-key'
      },
      NOTIFICATION_SETTING: {
        GET: 'rq-user-notification-setting-get-key'
      },
      WORKSPACE_NOTIFICATION_SETTING: {
        GET: 'rq-workspace-notification-setting-get-key'
      }
    }
  }
} as const;

// eslint-disable-next-line @typescript-eslint/naming-convention
const LINK_In_BIO = {
  FORM: {
    DIRECTION_PRE_CLICKED: 45
  },
  INITIAL_VALUES: {
    BG_COLOR: '#4176f1',
    BUTTON_COLOR: '#11ee1f',
    BUTTON_SHADOW_COLOR: '#aab1c4'
  }
} as const;

const SHORT_LINK = {
  urlPathLength: 6,
  urlStaticPath: 's',
  invitationSLStaticPath: 'sws'
} as const;

const toLocaleStringOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric'
} as const;

const ZTimeSelectData: ZaionsRSelectOptions[] = [
  {
    label: 'All Time',
    value: TimeFilterEnum.allTime
  },
  {
    label: 'Today',
    value: TimeFilterEnum.today
  },
  {
    label: 'Last 7 days',
    value: TimeFilterEnum.lastSevenDays
  },
  {
    label: 'Last 30 days',
    value: TimeFilterEnum.last30days
  },
  {
    label: 'Last month',
    value: TimeFilterEnum.lastMonth
  },
  {
    label: 'Custom range',
    value: TimeFilterEnum.customRange
  }
] as const;

const ZRolesOptions: ZaionsRSelectOptions[] = [
  { label: 'Administrator', value: WSRolesNameEnum.Administrator },
  { label: 'Manager', value: WSRolesNameEnum.Manager },
  { label: 'Contributor', value: WSRolesNameEnum.Contributor },
  { label: 'Writer', value: WSRolesNameEnum.Writer },
  { label: 'Approver', value: WSRolesNameEnum.Approver },
  { label: 'Commenter', value: WSRolesNameEnum.Commenter },
  { label: 'Guest', value: WSRolesNameEnum.Guest }
] as const;

const ZPlatformOptions: ZaionsRSelectOptions[] = [
  { label: 'facebook', value: PixelPlatformsEnum.facebook },
  { label: 'linkedin', value: PixelPlatformsEnum.linkedin },
  { label: 'adroll', value: PixelPlatformsEnum.adroll },
  { label: 'google ads', value: PixelPlatformsEnum.google_ads },
  { label: 'bing', value: PixelPlatformsEnum.bing },
  { label: 'google analytics', value: PixelPlatformsEnum.google_analytics },
  { label: 'google analytics 4', value: PixelPlatformsEnum.google_analytics_4 },
  { label: 'nexus', value: PixelPlatformsEnum.nexus },
  { label: 'pinterest', value: PixelPlatformsEnum.pinterest },
  { label: 'quora', value: PixelPlatformsEnum.quora },
  { label: 'snapchat', value: PixelPlatformsEnum.snapchat },
  { label: 'tiktok', value: PixelPlatformsEnum.tiktok },
  { label: 'twitter', value: PixelPlatformsEnum.twitter },
  { label: 'VK', value: PixelPlatformsEnum.vk },
  { label: 'google tag manager', value: PixelPlatformsEnum.google_tag_manager }
] as const;

const ZStatesOptions: ZaionsRSelectOptions[] = [
  { label: 'Accepted', value: ZTeamMemberInvitationEnum.accepted },
  { label: 'Active', value: ZTeamMemberInvitationEnum.active },
  { label: 'Blocked', value: ZTeamMemberInvitationEnum.blocked },
  { label: 'Pending', value: ZTeamMemberInvitationEnum.pending },
  { label: 'Rejected', value: ZTeamMemberInvitationEnum.rejected },
  { label: 'Resend', value: ZTeamMemberInvitationEnum.resend },
  { label: 'Suspended', value: ZTeamMemberInvitationEnum.suspended }
] as const;

const CONSTANTS = {
  ZHomePageAccountBtnText,
  ZOptResendAfter,
  ZRequestTimeAddM,
  ZLastSeenInterval,
  ZRolesOptions,
  ZOtpLength,
  ZPasswordMinCharacter,
  ZPlatformOptions,
  PIXEL_ACCOUNTS,
  ZStatesOptions,
  ZTimeSelectData,
  toLocaleStringOptions,
  ION_LOADER_DEFAULTS,
  ION_TOAST,
  NO_VALUE_FOUND: '---',
  ZaionsRHelmetDefaults,
  RouteParams,
  DEFAULT_VALUES,
  USER_ACCOUNT_DELETE_CONFIRM_KEY: 'DELETE ACCOUNT',
  SocialLinks,
  REACT_QUERY,
  SHORT_LINK,
  LINK_In_BIO,
  DateTime,
  MENU_IDS,
  PAGE_IDS,
  ExternalURL,
  ZTooltipIds,
  testingSelectors,
  testingSelectorsPrefix
} as const;

export default CONSTANTS;
