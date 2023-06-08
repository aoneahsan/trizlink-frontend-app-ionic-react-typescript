// Add Generic Enums here
export enum VALIDATION_RULE {
	string = 'string',
	// Login and sign-up fields start
	username = 'username',
	email = 'email',
	password = 'password',
	confirm_password = 'confirm_password',
	// Login and sign-up fields end

	// Short link Form Fields start
	url = 'url',
	phoneNumber = 'phoneNumber',
	accountId = 'accountId',
	subject = 'subject',
	message = 'message',
	linkTitle = 'linkTitle',
}

export enum PAGE_MENU {
	UNAUTHENTICATED_PAGE_MENU = 'UNAUTHENTICATED_PAGE_MENU',
	DASHBOARD_PAGE_MENU = 'DASHBOARD_PAGE_MENU',
	ADMIN_PANEL_SHORT_LINKS_FOLDERS_MENU = 'ADMIN_PANEL_SHORT_LINKS_FOLDERS_MENU',
	ADMIN_PANEL_WORKSPACE_VIEW_FILTER_MENU = 'ADMIN_PANEL_WORKSPACE_VIEW_FILTER_MENU',
}

export enum PAGE_MENU_SIDE {
	START = 'start',
	END = 'end',
}
export enum CONTAINS {
	number = 'number',
	letter = 'letter',
	specialSymbol = 'specialSymbol',
	minCharacter = 'minCharacter',
}
export enum API_URL_ENUM {
	login = 'login',
	logout = 'logout',
	verifyAuthenticationStatus = 'verifyAuthenticationStatus',
	delete = 'delete',
	register = 'register',
	getUserRolePermission = 'getUserRolePermission',
	csrf = 'csrf',
	userPixelAccounts_create_list = 'userPixelAccounts_create_list',
	userPixelAccounts_update_delete = 'userPixelAccounts_update_delete',
	userAccountUtmTags_create_list = 'userAccountUtmTags_create_list',
	userAccountUtmTags_update_delete = 'userAccountUtmTags_update_delete',
	ShortLink_folders_create_list = 'ShortLink_folders_create_list',
	LinkInBio_folders_create_list = 'LinkInBio_folders_create_list',
	userAccountFolders_update_delete = 'userAccountFolders_update_delete',
	userAccount_LinkInBio_folders_update_delete = 'userAccount_LinkInBio_folders_update_delete',
	userEmbedWidget_create_list = 'userEmbedWidget_create_list',
	userEmbedWidget_update_delete = 'userEmbedWidget_update_delete',
	shortLinks_create_list = 'shortLinks_create_list',
	shortLinks_update_delete = 'shortLinks_update_delete',
	linkInBio_update_delete = 'linkInBio_update_delete',
	linkInBio_create_list = 'linkInBio_create_list',
	FolderShortLinks = 'FolderShortLinks',
	ShortLinks_folders_reorder = 'ShortLinks_folders_reorder',

	folders_update_delete = 'folders_update_delete',
	folders_create_list = 'folders_create_list',

	linkInBioPreData_create_list = 'linkInBioPreData_create_list',
	linkInBioPreData_delete_update = 'linkInBioPreData_delete_update',

	linkInBioPreDefinedThemes_create_list = 'linkInBioPreDefinedThemes_create_list',
	linkInBioPreDefinedBlocks_create_list = 'linkInBioPreDefinedBlocks_create_list',
	linkInBioPreDefinedBlocks_delete_update = 'linkInBioPreDefinedBlocks_delete_update',

	linkInBioPreDefinedMusicPlatform_create_list = 'linkInBioPreDefinedMusicPlatform_create_list',
	linkInBioPreDefinedMusicPlatform_delete_update = 'linkInBioPreDefinedMusicPlatform_delete_update',

	linkInBioBlock_create_list = 'linkInBioBlock_create_list',
	linkInBioBlock_delete_update_get = 'linkInBioBlock_delete_update_get',

	linkInBioPreDefinedMessengerPlatform_create_list = 'linkInBioPreDefinedMessengerPlatform_create_list',
	linkInBioPreDefinedMessengerPlatform_delete_update = 'linkInBioPreDefinedMessengerPlatform_delete_update',

	linkInBioPreDefinedSocialPlatform_create_list = 'linkInBioPreDefinedSocialPlatform_create_list',
	linkInBioPreDefinedSocialPlatform_delete_update = 'linkInBioPreDefinedSocialPlatform_delete_update',

	linkInBioPreDefinedFormFields_create_list = 'linkInBioPreDefinedFormFields_create_list',
	linkInBioPreDefinedFormFields_delete_update = 'linkInBioPreDefinedFormFields_delete_update',

	linkInBioBlocks_reorder = 'linkInBioBlocks_reorder',

	// Workspace
	workspace_create_list = 'workspace_create_list',
	workspace_update_delete = 'workspace_update_delete',

	// File Upload Routes
	getSingleFile = 'getSingleFile',
	uploadSingleFile = 'uploadSingleFile',
	deleteSingleFile = 'deleteSingleFile',
	checkIfSingleFileExists = 'checkIfSingleFileExists',
	uploadFiles = 'uploadFiles',

	// External Third Party API URLs (need to be complete url, as we will hit them without any modification (except for dynamic parts))
	// UI Avatars API
	uiAvatarAPI = 'uiAvatarAPI',
}
export enum CSS_BACKGROUND_OPTION {
	cover = 'cover',
}

export enum extractInnerDataOptionsEnum {
	createRequestResponseItem = 'createRequestResponseItem',
}

// notificationTypeEnum of notification
export enum notificationTypeEnum {
	toast = 'toast',
	sideNotification = 'sideNotification',
	alert = 'alert',
}

export enum apiTypeToValidateEnum {
	ZlinkMutationApi = 'ZlinkMutationApi',
}
