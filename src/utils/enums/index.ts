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
  linkTitle = 'linkTitle'
}

export enum PAGE_MENU {
  UNAUTHENTICATED_PAGE_MENU = 'UNAUTHENTICATED_PAGE_MENU',
  DASHBOARD_PAGE_MENU = 'DASHBOARD_PAGE_MENU',
  ADMIN_PANEL_SHORT_LINKS_FOLDERS_MENU = 'ADMIN_PANEL_SHORT_LINKS_FOLDERS_MENU',
  ADMIN_PANEL_LINK_IN_BIO_FOLDERS_MENU = 'ADMIN_PANEL_LINK_IN_BIO_FOLDERS_MENU',
  ADMIN_PANEL_WORKSPACE_VIEW_FILTER_MENU = 'ADMIN_PANEL_WORKSPACE_VIEW_FILTER_MENU'
}

export enum PAGE_MENU_SIDE {
  START = 'start',
  END = 'end'
}
export enum CONTAINS {
  number = 'number',
  letter = 'letter',
  specialSymbol = 'specialSymbol',
  minCharacter = 'minCharacter'
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
  userAccountFolders_update_delete = 'userAccountFolders_update_delete',
  userAccount_LinkInBio_folders_update_delete = 'userAccount_LinkInBio_folders_update_delete',
  userEmbedWidget_create_list = 'userEmbedWidget_create_list',
  userEmbedWidget_update_delete = 'userEmbedWidget_update_delete',
  send_otp = 'send_otp',
  send_signup_otp = 'send_signup_otp',
  send_forget_password_otp = 'send_forget_password_otp',
  confirm_otp = 'confirm_otp',
  set_password = 'set_password',
  set_username_password = 'set_username_password',
  ws_roles_get = 'ws_roles_get',
  LinkInBio_folders_create_list = 'LinkInBio_folders_create_list',
  ws_team_member_sendInvite_list = 'ws_team_member_sendInvite_list',
  ws_team_member_getAllInvite_list = 'ws_team_member_getAllInvite_list',
  ws_team_member_resendInvite_list = 'ws_team_member_resendInvite_list',
  ws_team_member_invite_get_delete = 'ws_team_member_invite_get_delete',
  ws_team_member_update = 'ws_team_member_update',
  validate_invitation_status = 'validate_invitation_status',

  //

  user_unread_notifications_list = 'user_unread_notifications_list',
  user_notification_mark_as_read = 'user_notification_mark_as_read',
  user_notification_mark_all_as_read = 'user_notification_mark_all_as_read',

  shortLinks_create_list = 'shortLinks_create_list',
  shortLinks_update_delete = 'shortLinks_update_delete',
  shortLinks_is_path_available = 'shortLinks_is_path_available',
  ShortLink_folders_create_list = 'ShortLink_folders_create_list',
  shortLink_get_target_url_info = 'shortLink_get_target_url_info',
  shortLink_check_target_password = 'shortLink_check_target_password',
  FolderShortLinks = 'FolderShortLinks',
  ShortLinks_folders_reorder = 'ShortLinks_folders_reorder',

  linkInBio_update_delete = 'linkInBio_update_delete',
  linkInBio_create_list = 'linkInBio_create_list',

  folders_update_delete = 'folders_update_delete',
  folders_create_list = 'folders_create_list',

  user_setting_list_create = 'user_setting_list_create',
  user_setting_delete_update_get = 'user_setting_delete_update',
  user_setting_get = 'user_setting_get',

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
  workspace_update_is_favorite = 'workspace_update_is_favorite',

  // WS team
  workspace_team_create_list = 'workspace_team_create_list',
  workspace_team_update_delete = 'workspace_team_update_delete',

  // share workspace
  ws_share_list = 'ws_share_list',
  ws_share_update_is_favorite = 'ws_share_update_is_favorite',

  // Time slot
  time_slot_create_list = 'time_slot_create_list',
  time_slot_update_delete = 'time_slot_update_delete',

  // Label
  label_create_list = 'label_create_list',
  label_update_delete = 'label_update_delete',

  // File Upload Routes
  getSingleFile = 'getSingleFile',
  uploadSingleFile = 'uploadSingleFile',
  deleteSingleFile = 'deleteSingleFile',
  checkIfSingleFileExists = 'checkIfSingleFileExists',
  uploadFiles = 'uploadFiles',

  // External Third Party API URLs (need to be complete url, as we will hit them without any modification (except for dynamic parts))
  // UI Avatars API
  uiAvatarAPI = 'uiAvatarAPI'
}
export enum CSS_BACKGROUND_OPTION {
  cover = 'cover'
}

export enum extractInnerDataOptionsEnum {
  createRequestResponseItem = 'createRequestResponseItem',
  createRequestResponseItems = 'createRequestResponseItems'
}

// notificationTypeEnum of notification
export enum notificationTypeEnum {
  toast = 'toast',
  sideNotification = 'sideNotification',
  alert = 'alert'
}

export enum apiTypeToValidateEnum {
  ZlinkMutationApi = 'ZlinkMutationApi'
}

export enum zCreateElementTestingSelectorKeyEnum {
  selector = 'selector',
  listSelector = 'listSelector'
}

export enum ZSetPasswordTabEnum {
  sendOptTab = 'sendOptTab',
  confirmOptTab = 'confirmOptTab',
  newPasswordTab = 'newPasswordTab'
}
