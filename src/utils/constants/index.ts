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
	vkSvgLogo,
} from '@/assets/images';
import { IonLoaderEnum } from '@/types/AdminPanel/linksType';
import { ENVS } from '@/utils/envKeys';

// Constant
// const ZLinkApiRootUrl = 'https://zlinkbackend.zaions.com/public/api/zlink/v1';
export const ZLinkApiRootUrl = ENVS.apiUrl;

const RouteParams = {
	editShortLinkIdParam: ':editLinkId',
	folderIdToGetShortLinks: ':folderId?',

	// workspace
	workspace: {
		workspaceId: ':workspaceId',
		editWorkspaceIdParam: ':editWorkspaceId',
	},

	shortLink: {
		shortLinkId: ':shortLinkId',
	},

	// folderIdToGetShortLinks: 'all',
};

// left here as it will mess up many imports, we can move this when we have some free time (i know that will add more imports to correct but we don't have time for it right now)
export const API_URLS = {
	login: '/login',
	logout: '/logout',
	verifyAuthenticationStatus: '/verify-authentication-status',
	register: '/register',
	getUserRolePermission: '/user/role/permissions',
	csrf: '/sanctum/csrf-cookie',
	delete: '/user/delete',

	userEmbedWidget_create_list: '/user/embedded-scripts',

	userAccountUtmTags_update_delete: '/user/utm-tag/:utmTagId',

	userEmbedWidget_update_delete: '/user/embedded-scripts/:embeddedId',

	ShortLink_folders_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/get/shortLink/folders`,

	ShortLinks_folders_reorder: '/user/shortLinks/folders/reorder',

	folders_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/folder/${RouteParams.folderIdToGetShortLinks}`,
	folders_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/folder`,

	// workspace
	workspace_create_list: '/user/workspaces',
	workspace_update_delete: '/user/workspaces/:workspaceId',

	// File
	getSingleFile: '/file-upload/getSingleFileUrl',
	uploadSingleFile: '/file-upload/uploadSingleFile',
	deleteSingleFile: '/file-upload/deleteSingleFile',
	checkIfSingleFileExists: '/file-upload/checkIfSingleFileExists',
	uploadFiles: '/file-upload/uploadFiles',

	// External Third Party API URLs (need to be complete url, as we will hit them without any modification (except for dynamic parts))
	// UI Avatars API
	uiAvatarAPI:
		'https://ui-avatars.com/api/?name=:name&rounded=:rounded&bold=:bold&size=:size&background=:background&color=:color&font-size=:fontSize&length=:length',
};

// Site
export const PRODUCT_NAME = 'ZLinks';
export const PRODUCT_DOMAIN = 'prettylinks.zaions.com';
export const CurrentProductDetails = {
	Name: '',
};

export const ExternalURL = {
	GenericExternalURL: 'https://prettylinks.zaions.com',
	FacebookUrl: 'https://www.facebook.com/',
};

export const ZaionsInfo = {
	name: 'Zaions',
};

// @Medias BrackPoint:
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
	ADMIN_LINK_PAGE_CONTENT_ID: 'zaions-link-page-menu',
	DASHBOARD_SM_MENU_CONTENT_ID: 'zaions-dashboard-responsive-menu-content-id',
	ADMIN_PAGE_SHORT_LINKS_FOLDERS_MENU_ID:
		'admin_page_short_links_folders_menu_id',
	ADMIN_PAGE_LINKS_IN_BIO_FOLDERS_MENU_ID:
		'admin_page_links_in_bio_folders_menu_id',
	ADMIN_PAGE_WORKSPACE_VIEW_FILTER_MENU_ID:
		'admin_page_workspace_view_filter_menu_id',
};

// Other
// branch = v1-frontend-dev;

// Pixels Account ID Validation Count
const PIXEL_ACCOUNTS = {
	FACEBOOK: {
		WORD_COUNT: 16,
		// WORD_COUNT: 2,
	},
	GOOGLE_ANALYTICS: {
		SHOULD_INCLUDE: 'ua', // should be in lower case all the time
		WORD_COUNT: 12,
		// WORD_COUNT: 3,
	},
	LINKEDINANDBING: {
		WORD_COUNT: 7,
		// WORD_COUNT: 3,
	},
	TWITTER: {
		WORD_COUNT: 5,
	},
	GOOGLE_ADS: {
		WORD_COUNT: 9,
		// WORD_COUNT: 3,
	},
	GOOGLE_TAG_MANAGER: {
		SHOULD_INCLUDE: 'gmt-', // should be in lower case all the time
		WORD_COUNT: 12,
		// WORD_COUNT: 6,
	},
	QUORA: {
		WORD_COUNT: 31,
		// WORD_COUNT: 6,
	},
	SNAPCHAT: {
		WORD_COUNT: 32,
		// WORD_COUNT: 6,
	},
	PINTEREST: {
		WORD_COUNT: 13,
		// WORD_COUNT: 6,
	},
	TIKTOK: {
		WORD_COUNT: 17,
		// WORD_COUNT: 6,
	},
	VK: {
		SHOULD_INCLUDE: 'vk-', // should be in lower case all the time
		WORD_COUNT: 17,
		// WORD_COUNT: 6,
	},
};

const ION_LOADER_DEFAULTS = {
	animated: true,
	spinner: IonLoaderEnum.circles, // convert to enum with all values
	duration: 1500,
};

const ION_TOAST = {
	TOAST_DURATION: 1500,
};
export const ZaionsBusinessDetails = {
	WebsiteUrl: 'https://zaions.com',
};

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
	roboto: 'index,follow',
	// ...
};

const SocialLinks = {
	twitter: `${ZaionsBusinessDetails.WebsiteUrl}/twitter`,
	instagram: `${ZaionsBusinessDetails.WebsiteUrl}/instagram`,
	linkdin: `${ZaionsBusinessDetails.WebsiteUrl}/linkdin`,
};

const DateTime = {
	iso8601DateTime: 'YYYY-MM-DDTHH:mm:ssZ',
};

// Default Values
const DEFAULT_VALUES = {
	DEFAULT_CUSTOM_DOMAIN: '1',
	DEFAULT_FOLDER: 1,
	ZAIONS_SETTING_SPLIT_PANEL: 'ZAIONS_SETTING_PAGE_PANEL',
	ZAIONS_SHORT_LINKS_LIST_SPLIT_PANEL: 'ZAIONS_SHORT_LINKS_LIST_SPLIT_PANEL',
	ZAIONS_DASHBOARD_SPLIT_PANEL: 'ZAIONS_DASHBOARD_PAGE_PANEL',
	API_TOKEN_PRIMARY_KEY: 'Bearer',
};
export const LOCALSTORAGE_KEYS = {
	USERDATA: 'udhsaf38h_3g-23g-c',
	AUTHTOKEN: 'cewiuh4ggb284ghg',
};

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
	vk: vkSvgLogo,
};

export const brandColors = {
	facebook: '#1877F2',
	twitter: '#1DA1F2',
	instagram: '#E1306C',
	tiktok: '#333333',
	google: '#4758B8',
	linkedin: '#0966C1',
	pinterest: '#cc0100',
	youtube: '#FF0000',
};

const ZTooltipIds = {
	ZUserAvatarButton_default_tooltip_id: 'z-workspace-ZUserAvatarButton-tooltip',
};

export const TIMEZONES = [
	{
		label: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
		value: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
	},
	{
		label: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
		value: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
	},
	{
		label: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
		value: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
	},
	{
		label: '(GMT +2:00) Kaliningrad, South Africa',
		value: '(GMT +2:00) Kaliningrad, South Africa',
	},
	{
		label: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
		value: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
	},
	{ label: '(GMT +3:30) Tehran', value: '(GMT +3:30) Tehran' },
	{
		label: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
		value: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
	},
	{ label: '(GMT +4:30) Kabul', value: '(GMT +4:30) Kabul' },
	{
		label: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
		value: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
	},
	{
		label: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
		value: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
	},
	{
		label: '(GMT +6:00) Almaty, Dhaka, Colombo',
		value: '(GMT +6:00) Almaty, Dhaka, Colombo',
	},
	{
		label: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
		value: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
	},
	{
		label: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
		value: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
	},
	{
		label: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
		value: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
	},
	{
		label: '(GMT +9:30) Adelaide, Darwin',
		value: '(GMT +9:30) Adelaide, Darwin',
	},
	{
		label: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
		value: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
	},
	{
		label: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
		value: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
	},
	{
		label: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
		value: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
	},
];

// Modal Id's
export const ZAIONS_MODALS_IDS = {
	ADD_NEW_EMBED_WIDGETS: 'add-new-embed-widget',
	ADD_NEW_UTM_TAG: 'add-new-utm-tag-template',
	ADD_NEW_PIXEL_ID: 'add-new-pixel-account',
	GENERATE_API_KEY: 'generate-api-key',
};

export const NOTIFICATIONS = {
	MODAL_FORM_ERROR_TOAST: {
		DURATION: 4000,
	},
	ReactToastify: {
		autoclose: 5000,
	},
	ZIonAlerts: {
		OKAY_BUTTON: {
			TEXT: 'Okay',
			ROLE: 'okay_dismiss',
		},
		CANCEL_BUTTON: {
			TEXT: 'Cancel',
			ROLE: 'cancel_dismiss',
		},
	},
};

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
		PIXEL_ACCOUNT: {
			MAIN: 'rq-pixel-account-list-key',
			CREATE: 'rq-pixel-account-create-key',
			UPDATE: 'rq-pixel-account-update-key',
			DELETE: 'rq-pixel-account-delete-key',
			GET: 'rq-pixel-account-get-key',
		},
		UTM_TAGS: {
			MAIN: 'rq-utm-tags-list-key',
		},
		EMBED_WIDGET: {
			MAIN: 'rq-embed-widget-list-key',
		},
		SHORT_LINKS: {
			MAIN: 'rq-short-links-list-key',
			GET: 'rq-short-link-get-key',
		},
		LINK_IN_BIO: {
			MAIN: 'rq-link-in-bio-links-list-key',
			GET: 'rq-link-in-bio-link-get-key',
			BLOCK: {
				MAIN: 'rq-link-in-bio-block-list-key',
			},
			SETTING_TAB: {
				MAIN: 'rq-link-in-bio-setting-tab-key',
			},
		},
		WORKSPACE: {
			MAIN: 'rq-workspace-list-key',
			GET: 'rq-workspace-get-key',
		},
		FOLDER: {
			MAIN: 'rq-folders-list-key',
			GET: 'rq-folder-get-key',
			FOLDER_SHORT_LINKS: 'rq-folder-short-links-key',
		},
		LINK_IN_BIO_FOLDER: {
			MAIN: 'rq-link-in-bio-folders-list-key',
			GET: 'rq-link-in-bio-folder-get-key',
			FOLDER_SHORT_LINKS: 'rq-link-in-bio-folder-short-links-key',
		},
		LINK_IN_BIO_PRE_DEFINED_THEMES: {
			MAIN: 'rq-link-in-bio-pre-defined-themes',
			GET: 'rq-link-in-bio-pre-defined-theme',
		},
		LINK_IN_BIO_PRE_DEFINED_BLOCKS: {
			MAIN: 'rq-link-in-bio-predefined-blocks',
			GET: 'rq-link-in-bio-predefined-blocks',
		},

		LINK_IN_BIO_PRE_DEFINED_MUSIC_PLATFORM: {
			MAIN: 'rq-link-in-bio-predefined-music-platform',
			GET: 'rq-link-in-bio-predefined-music-platform',
		},

		LINK_IN_BIO_PRE_DEFINED_MESSENGER_PLATFORM: {
			MAIN: 'rq-link-in-bio-predefined-messenger-platform',
			GET: 'rq-link-in-bio-predefined-messenger-platform',
		},

		LINK_IN_BIO_PRE_FORM_FIELDS: {
			MAIN: 'rq-link-in-bio-predefined-form-fields',
			GET: 'rq-link-in-bio-predefined-form-fields',
		},

		LINK_IN_BIO_PRE_DEFINED_SOCIAL_PLATFORM: {
			MAIN: 'rq-link-in-bio-predefined-social-platform',
			GET: 'rq-link-in-bio-predefined-social-platform',
		},

		LINK_IN_BIO_BLOCK: {
			MAIN: 'rq-link-in-bio-blocks',
			GET: 'rq-link-in-bio-block',
		},

		USER: {
			ROLE_PERMISSIONS: 'rq-user-roles-and-permissions',
		},
	},
};

const LINK_In_BIO = {
	FORM: {
		DIRECTION_PRE_CLICKED: 45,
	},
	INITIAL_VALUES: {
		BG_COLOR: '#4176f1',
		BUTTON_COLOR: '#11ee1f',
		BUTTON_SHADOW_COLOR: '#aab1c4',
	},
};

const CONSTANTS = {
	PIXEL_ACCOUNTS,
	ION_LOADER_DEFAULTS,
	ION_TOAST,
	NO_VALUE_FOUND: '-',
	ZaionsRHelmetDefaults,
	RouteParams,
	DEFAULT_VALUES,
	USER_ACCOUNT_DELETE_CONFIRM_KEY: 'DELETE ACCOUNT',
	SocialLinks,
	REACT_QUERY,
	LINK_In_BIO,
	DateTime,
	MENU_IDS,
	ExternalURL,
	ZTooltipIds,
};

export default CONSTANTS;
