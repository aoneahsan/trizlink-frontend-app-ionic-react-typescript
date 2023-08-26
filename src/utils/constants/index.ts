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
import {
	IonLoaderEnum,
	ZShortLinkListPageTableColumnsEnum,
	ZShortLinkListPageTableColumnsIds,
} from '@/types/AdminPanel/linksType';
import { ENVS } from '@/utils/envKeys';

// Constant
// const ZLinkApiRootUrl = 'https://zlinkbackend.zaions.com/public/api/zlink/v1';
export const ZLinkApiRootUrl = ENVS.apiUrl;

const testingSelectorsPrefix = 'ztes__';

const RouteParams = {
	editShortLinkIdParam: ':editLinkId',
	editLinkInBioIdParam: ':editLinkInBioId',
	editLinkInBioPageParam: ':editLinkInBioPage',
	editLinkInBioStepParam: ':editLinkInBioStep',
	folderIdToGetShortLinksOrLinkInBio: ':folderId?',

	// ShortLink redirect url path.
	urlPath: ':urlPath',

	// workspace
	workspace: {
		workspaceId: ':workspaceId',
		editWorkspaceIdParam: ':editWorkspaceId',
		teamId: ':teamId',
	},

	settings: {
		tab: ':tab',
		sect: ':sect',
		type: ':type',
	},

	user: {
		notification: {
			type: ':type',
			id: ':id',
		},
	},

	timeSlot: {
		timeSlotId: ':timeSlotId',
	},

	label: {
		labelId: ':labelId',
	},

	shortLink: {
		shortLinkId: ':shortLinkId',
		path: ':path',
	},

	linkInBio: {
		linkInBioId: ':linkInBioId',
		libPddId: ':libPddId',
		libBlockId: ':libBlockId',
	},

	utmTag: {
		utmTagId: ':utmTagId',
	},

	pixel: {
		pixelId: ':pixelId',
	},

	// folderIdToGetShortLinksOrLinkInBio: 'all',
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
	ws_roles_get: '/user/ws-roles',
	ws_team_member_invite_list: `/user/workspace/${RouteParams.workspace.workspaceId}/team/${RouteParams.workspace.teamId}/member`,
	validate_invitation_status: `/user/validate-and-update-invitation`,
	userPixelAccounts_create_list: '/user/pixel',
	userAccountUtmTags_create_list: '/user/utm-tag',
	ShortLink_folders_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/get/shortLink/folders`,
	userEmbedWidget_create_list: '/user/embedded-scripts',
	userPixelAccounts_update_delete: `/user/pixel/${RouteParams.pixel.pixelId}`,
	userAccountUtmTags_update_delete: `/user/utm-tag/${RouteParams.utmTag.utmTagId}`,
	userAccountFolders_update_delete: '/user/folders/:folderId',
	userEmbedWidget_update_delete: '/user/embedded-scripts/:embeddedId',

	user_unread_notifications_list: `/user/notification/type/${RouteParams.user.notification.type}`,
	user_notification_mark_as_read: `/user/notification/type/${RouteParams.user.notification.type}/markAsRead/${RouteParams.user.notification.id}`,
	user_notification_mark_all_as_read: `/user/notification/type/${RouteParams.user.notification.type}/markAllAsRead`,

	shortLinks_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/short-links`,
	shortLinks_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/short-links/${RouteParams.shortLink.shortLinkId}`,
	shortLinks_is_path_available: `/user/workspaces/${RouteParams.workspace.workspaceId}/sl/is-path-available/${RouteParams.shortLink.path}`,
	ShortLinks_folders_reorder: '/user/shortLinks/folders/reorder',
	shortLink_get_target_url_info: `/public/s/${RouteParams.urlPath}`,

	FolderShortLinks: '/user/folders/:folderId/short-links',
	LinkInBio_folders_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/get/linkInBio/folders`,

	folders_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/folder/${RouteParams.folderIdToGetShortLinksOrLinkInBio}`,
	folders_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/folder`,

	user_setting_list_create: `/user/settings`,
	user_setting_delete_update: `/user/settings/${RouteParams.settings.type}/${RouteParams.workspace.workspaceId}`,

	userAccount_LinkInBio_folders_update_delete:
		'/user/link-in-bio-folders/:folderId',
	linkInBio_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/link-in-bio`,
	linkInBio_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/link-in-bio/${RouteParams.linkInBio.linkInBioId}`,
	linkInBioPreDefinedThemes_create_list: '/user/lib-pre-dd/themes',
	linkInBioPreDefinedBlocks_create_list: '/user/lib-pre-dd/blocks',
	linkInBioPreDefinedBlocks_delete_update: '/user/lib-pre-dd/blocks/:blockId',
	linkInBioBlock_create_list: `/user/ws/${RouteParams.workspace.workspaceId}/lib/${RouteParams.linkInBio.linkInBioId}/lib-block`,
	linkInBioBlock_delete_update_get: `/user/ws/${RouteParams.workspace.workspaceId}/lib/${RouteParams.linkInBio.linkInBioId}/lib-block/${RouteParams.linkInBio.libBlockId}`,
	linkInBioBlocks_reorder: `/user/link-in-bio/${RouteParams.linkInBio.linkInBioId}/blocks/reorder`,
	linkInBioPreDefinedMusicPlatform_create_list:
		'/user/lib-pre-dd/musicPlatform',
	linkInBioPreDefinedMusicPlatform_delete_update:
		'/user/lib-pre-dd/musicPlatform/:musicPlatformId',

	linkInBioPreDefinedMessengerPlatform_create_list:
		'/user/lib-pre-dd/messengerPlatform',
	linkInBioPreDefinedMessengerPlatform_delete_update:
		'/user/lib-pre-dd/messengerPlatform/:messengerPlatformId',

	linkInBioPreData_create_list: `/user/lib-pdd`,
	linkInBioPreData_delete_update: `/user/lib-pdd/${RouteParams.linkInBio.libPddId}`,

	linkInBioPreDefinedSocialPlatform_create_list:
		'/user/lib-pre-dd/socialPlatform',
	linkInBioPreDefinedSocialPlatform_delete_update:
		'/user/lib-pre-dd/socialPlatform/:socialPlatformId',

	linkInBioPreDefinedFormFields_create_list: '/user/lib-pre-dd/formField',
	linkInBioPreDefinedFormFields_delete_update:
		'/user/lib-pre-dd/formField/:formFieldId',

	// workspace
	workspace_create_list: '/user/workspaces',
	workspace_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}`,
	workspace_team_create_list: `/user/workspace/${RouteParams.workspace.workspaceId}/teams`,
	workspace_team_update_delete: `/user/workspace/${RouteParams.workspace.workspaceId}/team/${RouteParams.workspace.teamId}`,

	// Time slot
	time_slot_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/time-slot`,
	time_slot_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/time-slot/${RouteParams.timeSlot.timeSlotId}`,

	// Label
	label_create_list: `/user/workspaces/${RouteParams.workspace.workspaceId}/label`,
	label_update_delete: `/user/workspaces/${RouteParams.workspace.workspaceId}/label/${RouteParams.label.labelId}`,

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
	ADMIN_PANEL_CONTENT_ID: 'admin-panel-content-id',
	ADMIN_LINK_PAGE_CONTENT_ID: 'zaions-link-page-menu',
	DASHBOARD_SM_MENU_CONTENT_ID: 'zaions-dashboard-responsive-menu-content-id',
	USER_SETTINGS_MENU_ID: 'user-settings-menu-id',
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
	TIMEZONE_DEFAULT: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
	DEFAULT_FOLDER: 'all',
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

// abbrivations comment
/**
 * pw: password
 * hp: home-page
 */

const testingSelectors = {
	// #region home page
	homePage: {
		loginButton: 'hp-nav-login-btn',
		signupButton: 'hp-nav-signup-btn',
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
		passwordInput: 'lp-password-input',
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
	},
	// #endregion

	// #region workspace
	workspace: {
		listPage: {
			inviteButton: 'wlp-invite-btn',
			createWorkspaceButton: 'wlp-create-btn',
			createWorkspaceCardButton: 'wlp-create-card-btn',
			viewWorkspaceButton: 'wlp-view-btn',
			workspaceCardImg: 'wlp-card-image',
			workspaceCardTitle: 'wlp-card-title',
			workspaceCardFavoritesButton: 'wlp-card-favorites-btn',
			workspaceCardUserButton: 'wlp-card-user-btn',
			workspaceCardActionPopoverButton: 'wlp-card-action-btn',
		},

		createModal: {
			nameInput: 'wcm-name-input',
			timezoneInput: 'wcm-timezone-input',
			createButton: 'wcm-create-btn',
			closeButton: 'wcm-close-btn',
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
		},

		settingsModal: {
			tabs: {
				timetable: 'wsm-timetable-tab',
				labels: 'wsm-labels-tab',
				settings: 'wsm-settings-tab',
				approvals: 'wsm-approvals-tab',
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
					submitBtn: 'wsm-tfm-form-submit-btn',
				},
			},

			labels: {
				addNewLabelButton: 'wsm-lt-add-btn',
				addNewLabelInfoButton: 'wsm-lt-add-info-btn',
				labelNameInput: 'wsm-lt-name-input',
				closedCreateModeButton: 'wsm-lt-close-create-form-btn',
				createLabelButton: 'wsm-lt-create-label-btn',
				editLabelButton: 'wsm-lt-edit-label-btn',
				deleteLabelButton: 'wsm-lt-delete-label-btn',
			},

			settings: {
				//
				workspaceNameInput: 'wsm-st-name-input',
				workspaceTimezoneInput: 'wsm-st-timezone-input',
				internalPostInfoButton: 'wsm-st-internal-post-info-btn',
				internalPostToggler: 'wsm-st-internal-post-toggler',
				updateButton: 'wsm-st-update-btn',
				deleteButton: 'wsm-st-delete-btn',
			},

			approvals: {
				card: 'wsm-at-card',
				schedulePostToggler: 'wsm-at-schedule-post-toggler',
				lockContent: 'wsm-at-lock-content',
			},
		},
	},
	// #endregion

	// #region user
	user: {
		userProfilePopoverButton: 'user-profile-popover-btn',

		profilePopover: {
			profileSettings: 'profile-popover-profile-settings-btn',
			notificationSettings: 'profile-popover-profile-settings-btn',
			logout: 'profile-popover-logout-btn',
			addNewCompanyAccount: 'profile-popover-add-company-account-btn',
		},
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
				previousButton: 'slp-t-previous-page-btn',
				getFirstPageButton: 'slp-t-first-page-btn',
				nextButton: 'slp-t-next-page-btn',
				getLastPageButton: 'slp-t-last-page-btn',
				pageSizeInput: 'slp-t-page-size-input',
			},
		},

		formPage: {
			advanceOptionsBtn: 'sl-fp-advance-options-btn',
			advanceOptionsContent: 'sl-fp-advance-options-content',

			notesTextarea: 'sl-fp-note-textarea',

			favicon: 'sl-fp-favicon',

			tag: {
				tagInput: 'sl-fp-tag-input',
				singleTag: 'sl-fp-single-tag',
			},

			rotatorABTesting: {
				// sl-fp-rabt -> shortlink-form-page-rotator-ab-testing
				redirectionLinkInput: 'sl-fp-rabt-link-input',
				percentageInput: 'sl-fp-rabt-percentage-input',
				deleteSingleRotatorBtn: 'sl-fp-rabt-delete-btn',
				addSingleRotatorBtn: 'sl-fp-rabt-add-btn',
				disabledAddSingleRotatorBtn: 'sl-fp-rabt-disabled-add-btn',
				container: 'sl-fp-rabt-container',
			},

			geoLocation: {
				// sl-fp-gl -> shortlink-form-page-geo-location
				redirectionLinkInput: 'sl-fp-gl-link-input',
				countrySelector: 'sl-fp-gl-country-selector',
				countrySelectorError: 'sl-fp-gl-country-selector-error',
				deleteSingleGeoLocationBtn: 'sl-fp-gl-delete-btn',
				addSingleGeoLocationBtn: 'sl-fp-gl-add-btn',
				disabledAddSingleGeoLocationBtn: 'sl-fp-gl-disabled-add-btn',
				container: 'sl-fp-gl-container',
			},

			linkExpiration: {
				// sl-fp-el -> shortlink-form-page-link-expiration
				enableBtn: 'sl-fp-le-enable-toggler',
				expirationDateInput: 'sl-fp-le-expiration-date-input',
				timezoneSelector: 'sl-fp-le-timezone-input-selector',
				redirectionLinkInput: 'sl-fp-le-redirection-link-input',
				container: 'sl-fp-le-container',
				disabledLEText: 'sl-fp-le-disabled-text',
			},

			password: {
				// sl-fp -> shortlink-form
				enableBtn: 'sl-fp-password-enable-toggler',
				container: 'sl-fp-password-container',
				input: 'sl-fp-password-input',
				disabledPasswordText: 'sl-fp-password-disabled-text',
			},

			ShortUrlOptionFields: {
				// sl-fp-suof-tp -> shortlink-form-page-short-url-option-fields-type-popover
				typeBtn: 'sl-fp-suof-type-btn',
				typePopover: {
					typeBtn: 'sl-fp-suof-tp',
				},
				linkInput: 'sl-fp-suof-link-input',
				emailInput: 'sl-fp-suof-email-input',
				numberInput: 'sl-fp-suof-number-input',
				usernameInput: 'sl-fp-suof-username-input',
				accountIdInput: 'sl-fp-suof-account-id-input',
				subjectInput: 'sl-fp-suof-subject-input',
				messageTextarea: 'sl-fp-suof-message-textarea',

				refreshThePreviewBtn: 'sl-fp-refresh-the-preview-btn',
			},

			customYourLink: {
				// sl-fp-cyl-tp -> shortlink-form-page-custom-your-link
				imageCol: 'sl-fp-cyl-image-col',
				image: 'sl-fp-cyl-image',
				titleInput: 'sl-fp-cyl-title-input',
				descriptionTextarea: 'sl-fp-cyl-description-textarea',
			},

			pixelAccount: {
				// sl-fp-pa -> shortlink-form-page-pixel-account
				pixelsSelector: 'sl-fp-pa-pixels-selector',
				createBtn: 'sl-fp-pa-create-btn',
			},

			utmTags: {
				// sl-fp-ut -> shortlink-form-page-utm-tag
				campaignInput: 'sl-fp-ut-campaign-input',
				mediumInput: 'sl-fp-ut-medium input',
				sourceInput: 'sl-fp-ut-source-input',
				termInput: 'sl-fp-ut-term-input',
				contentInput: 'sl-fp-ut-content-input',
				addTemplateBtn: 'sl-fp-ut-add-template-btn',
				selectTemplateSelector: 'sl-fp-ut-select-template-selector',
			},

			customDomain: {
				// sl-fp-cd -> shortlink-form-page-custom-domain
				domainSelector: 'sl-fp-cd-domain-selector',
				customizeInput: 'sl-fp-cd-customize-input',
				customizeCheckBtn: 'sl-fp-cd-customize-checker-btn',
			},

			folder: {
				// sl-fp -> shortlink-form-page
				createBtn: 'sl-fp-folder-create-btn',
				selector: 'sl-fp-folder-selector',
			},
		},
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
				pageSizeInput: 'lib-t-page-size-input',
			},
		},

		formModal: {
			// lib-fm -> link-in-bio-form-modal
			closeBtn: 'lib-fm-close-btn',
			submitFormBtn: 'lib-fm-submit-form-btn',
			titleInput: 'lib-fm-title-input',
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
					blockAnalytics: 'lib-fp-tb-block-analytics',
				},

				errorsBtn: 'lib-fp-tb-errors-btn',
				upgradeBtn: 'lib-fp-tb-upgrade-btn',
			},

			design: {
				TopTitleBar: {
					container: 'lib-fp-dt-title-container',
					titleCol: 'lib-fp-dt-title-col',
					title: 'lib-fp-dt-title',
					saveBtn: 'lib-fp-dt-save-btn',
					saveBtnCol: 'lib-fp-dt-save-btn-col',
				},

				bottomTabs: {
					// lib-fp-dt-bt -> link-in-bio-form-page-design-tab-bottom-tab
					theme: 'lib-fp-dt-bt-theme',
					blocks: 'lib-fp-dt-bt-blocks',
					settings: 'lib-fp-dt-bt-settings',
					poweredBy: 'lib-fp-dt-bt-powered-by',
				},

				// lib-fp-dt-pdt-b -> link-in-bio-form-page-design-tab-pre-defined-theme-block
				theme: {
					preDefinedThemeBlock: 'lib-fp-dt-pdt-b',

					fontSelector: 'lib-fp-dt-font-selector',

					bg: {
						// lib-fp-dt-bg -> link-in-bio-form-page-design-tab-background
						bgSolidColorInput: 'lib-fp-dt-bg-sc-input', //sc -> solid color
						addGradientBtn: 'lib-fp-dt-bg-add-gradient-btn',
						container: 'lib-fp-dt-bg-container',
						gColors: {
							// gColors/gc -> gradientColors
							startColorInput: 'lib-fp-dt-bg-gc-sci',
							endColorInput: 'lib-fp-dt-bg-gc-eci',
							directionBtn: 'lib-fp-dt-bg-gc-d-btn',
						},
					},

					button: {
						// lib-fp-dt-btn -> link-in-bio-form-page-design-tab-button
						bgSolidColorInput: 'lib-fp-dt-btn-sc-input', //sc -> solid color
						addGradientBtn: 'lib-fp-dt-btn-add-gradient-btn',
						container: 'lib-fp-dt-btn-container',
						gColors: {
							// lib-fp-dt-btn-gc -> link-in-bio-form-page-design-tab-button-background-color
							// gColors/gc -> gradientColors
							startColorInput: 'lib-fp-dt-btn-gc-sci', // sci -> startColorInput
							endColorInput: 'lib-fp-dt-btn-gc-eci', // eci -> endColorInput
							directionBtn: 'lib-fp-dt-btn-gc-d-btn', // d-btn -> directionBtn
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
							shadowColorInputContainer: 'lib-fp-dt-btn-type-sci-container', // sci -> shadowColorInput
						},
					},

					bgImage: {
						// lib-fp-dt-bgi -> link-in-bio-form-page-design-tab-background-image
						toggler: 'lib-fp-dt-bgi-toggler',
						upload: 'lib-fp-dt-bgi-upload',
						container: 'lib-fp-dt-bgi-container',
					},
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
						closeModalBtn: 'lib-fp-dt-bam-close-modal-btn',
					},
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
							link: 'lib-fp-dt-bf-f-term-link',
						},

						separatorType: {
							button: 'lib-fp-dt-bf-f-st-btn',
							colorInput: 'lib-fp-dt-bf-f-st-color-input',
						},

						form: {
							addNewFieldBtn: 'lib-fp-dt-bf-f-form-anf-btn',
							cardItem: 'lib-fp-dt-bf-f-form-card-item',
							titleInput: 'lib-fp-dt-bf-f-form-title',
							textarea: 'lib-fp-dt-bf-f-form-textarea',
							requiredSwitcher: 'lib-fp-dt-bf-f-form-is-required',
							activeSwitcher: 'lib-fp-dt-bf-f-form-is-active',
							deleteBtn: 'lib-fp-dt-bf-f-form-delete-btn',
						},

						carouselCard: {
							addCardBtn: 'lib-fp-dt-bf-cc-add-card-btn',
							cardItem: 'lib-fp-dt-bf-cc-card-item',
							linkInput: 'lib-fp-dt-bf-cc-link',
							uploadField: 'lib-fp-dt-bf-cc-upload',
							titleInput: 'lib-fp-dt-bf-cc-title',
							description: 'lib-fp-dt-bf-cc-description',
							deleteBtn: 'lib-fp-dt-bf-cc-delete-btn',
						},

						QAndA: {
							addCardBtn: 'lib-fp-dt-bf-qaa-add-card-btn',
							cardItem: 'lib-fp-dt-bf-qaa-card-item',
							titleInput: 'lib-fp-dt-bf-qaa-title',
							textEditor: 'lib-fp-dt-bf-qaa-text-editor',
							deleteBtn: 'lib-fp-dt-bf-qaa-delete-btn',
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
							deleteBtn: 'lib-fp-dt-bf-mu-delete-btn',
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
							deleteBtn: 'lib-fp-dt-bf-me-delete-btn',
						},

						socialPlatform: {
							// lib-fp-dt-bf-sp-pdb -> link-in-bio-form-page-design-tab-social-platform-pre-defined-block
							block: 'lib-fp-dt-bf-sp-pdb',
							addBlockBtn: 'lib-fp-dt-bf-sp-add-block-btn',
							cardItem: 'lib-fp-dt-bf-sp-card-item',
							linkInput: 'lib-fp-dt-bf-sp-link',
							iconInput: 'lib-fp-dt-bf-sp-icon',
							deleteBtn: 'lib-fp-dt-bf-sp-delete-btn',
						},
					},
				},
			},

			shareSettings: {
				// lib-fp -> link-in-bio-form-page
				advanceOptionsBtn: 'lib-fp-advance-options-btn',
				advanceOptionsContent: 'lib-fp-advance-options-content',

				notesTextarea: 'lib-fp-note-textarea',

				favicon: 'lib-fp-favicon',

				tag: {
					tagInput: 'lib-fp-tag-input',
					singleTag: 'lib-fp-single-tag',
				},
			},
		},
	},
	// #endregion

	// #region pixels
	pixels: {
		formModal: {
			closeModalBtn: 'p-fm-close-btn',
			pixelSelector: 'p-fm-pixel-selector',
			pixelNameInput: 'p-fm-pixel-name-input',
			pixelIdInput: 'p-fm-pixel-id-input',
			submitFormBtn: 'p-fm-pixel-submit-form-btn',
		},
	},
	// #endregion

	// #region utm tag
	utmTags: {
		formModal: {
			closeModalBtn: 'ut-fm-close-btn',
			submitFormBtn: 'ut-fm-utm-tag-submit-form-btn',
			name: 'ut-fm-name-input',
			campaign: 'ut-fm-campaign-input',
			medium: 'ut-fm-medium-input',
			source: 'ut-fm-source-input',
			term: 'ut-fm-term-input',
			content: 'ut-fm-content-input',
		},
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
			nameInput: 'folder-fm-name-input',
		},
	},
	// #endregion

	// #region top bar
	topBar: {
		workspaceSwitcherBtn: 'tb-ws-btn', // top-bar-workspace-switcher-btn.
		workspaceSwitcherPopover: {
			singleWorkspace: 'tb-wsp-single-workspace', // top-bar-workspace-switcher-popover-...
			actionPopover: {
				// top-bar-workspace-switcher-popover-action-popover-...
				editWorkspace: 'tb-wsp-ap-edit-btn',
				deleteWorkspace: 'tb-wsp-ap-delete-btn',
			},
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
			androidAppBtn: 'tb-hcp-android-app-btn',
		},
		notificationBtn: 'tb-notification-btn',
		notificationPopover: {
			tabs: {
				approvalRequests: 'tb-np-approval-requests-btn',
				updates: 'tb-np-updates-btn',
			},
			markAllAsReadBtn: 'tb-np-masr-btn',
			settingsBtn: 'tb-np-settings-btn',

			singleNotification: 'tb-np-single-notification',
		},
	},
	// #endregion

	// #region settings
	WSSettings: {
		menuBar: {
			accordionGroup: {
				value: 'accordion-group',
				asAccordion: 'account-settings-accordion',
				wsAccordion: 'workspace-settings-accordion',
			},
			// wss-mb-as -> workspace-setting-menubar-accountSettings
			as: {
				teamBtn: 'wss-mb-as-team-btn',
				referralBtn: 'wss-mb-as-referral-btn',
				billingBtn: 'wss-mb-as-billing-btn',
				userBtn: 'wss-mb-as-user-btn',
			},
			ws: {
				pixelBtn: 'wss-mb-ws-pixel-btn',
				utmBtn: 'wss-mb-ws-utm-btn',
				embedWidgetBtn: 'wss-mb-ws-embed-widget-btn',
				customDomainBtn: 'wss-mb-ws-custom-domain-btn',
				privacyPopoverBtn: 'wss-mb-ws-privacy-popover-btn',
				passwordBtn: 'wss-mb-ws-password-btn',
				apiKeyBtn: 'wss-mb-ws-api-key-btn',
			},
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
				deleteBtn: 'wss-tlp-t-delete-btn',
				previousButton: 'wss-tlp-t-previous-page-btn',
				getFirstPageButton: 'wss-tlp-t-first-page-btn',
				nextButton: 'wss-tlp-t-next-page-btn',
				getLastPageButton: 'wss-tlp-t-last-page-btn',
				pageSizeInput: 'wss-tlp-t-page-size-input',
			},
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
				descriptionTextarea: 'wss-tvp-f-description-textarea',
			},
		},

		createModal: {
			submitFormBtn: 'wcm-submit-form-btn',
			closeButton: 'wcm-close-btn',
			titleInput: 'wcm-title-input',
			descriptionTextarea: 'wcm-description-textarea',
		},
	},
	// #endregion
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
			IS_PATH_AVAILABLE: 'rq-short-link-is-path-available-key',
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
		TIME_SLOT: {
			MAIN: 'rq-time-slot-list-key',
			GET: 'rq-time-slot-get-key',
		},
		LABEL: {
			MAIN: 'rq-label-list-key',
			GET: 'rq-label-get-key',
		},
		WORKSPACE: {
			MAIN: 'rq-workspace-list-key',
			GET: 'rq-workspace-get-key',
			TEAM: 'rq-workspace-team-list-key',
			TEAM_GET: 'rq-workspace-team-get-key',
			MEMBERS: 'rq-ws-team-members-main-key',
			MEMBER_GET: 'rq-ws-team-member-get-key',
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
			WS_ROLES: 'rq-user-ws-roles',
			NOTIFICATION: {
				MAIN: 'rq-user-notification-main-key',
			},
			SETTING: {
				MAIN: 'rq-user-setting-main-key',
				GET: 're-user-setting-get-key',
			},
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

const SHORT_LINK = {
	urlPathLength: 6,
	urlStaticPath: 's',
};

export const ShortLinksTableColumns = [
	{
		id: ZShortLinkListPageTableColumnsIds.title,
		name: ZShortLinkListPageTableColumnsEnum.title,
		isVisible: true,
	},
	// {
	// 	id: ZShortLinkListPageTableColumnsIds.click,
	// 	name: ZShortLinkListPageTableColumnsEnum.clicks,
	// 	isVisible: true,
	// },
	{
		id: ZShortLinkListPageTableColumnsIds.date,
		name: ZShortLinkListPageTableColumnsEnum.date,
		isVisible: true,
	},
	{
		id: ZShortLinkListPageTableColumnsIds.pixel,
		name: ZShortLinkListPageTableColumnsEnum.pixels,
		isVisible: true,
	},
	{
		id: ZShortLinkListPageTableColumnsIds.notes,
		name: ZShortLinkListPageTableColumnsEnum.notes,
		isVisible: true,
	},
	{
		id: ZShortLinkListPageTableColumnsIds.url,
		name: ZShortLinkListPageTableColumnsEnum.url,
		isVisible: true,
	},
	{
		id: ZShortLinkListPageTableColumnsIds.linkToShare,
		name: ZShortLinkListPageTableColumnsEnum.linkToShare,
		isVisible: true,
	},
];

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
	SHORT_LINK,
	LINK_In_BIO,
	DateTime,
	MENU_IDS,
	ExternalURL,
	ZTooltipIds,
	testingSelectors,
	testingSelectorsPrefix,
};

export default CONSTANTS;
