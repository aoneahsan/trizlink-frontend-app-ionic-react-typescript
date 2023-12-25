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

export enum ZWSTypeEum {
  personalWorkspace = 'personalWorkspace',
  shareWorkspace = 'shareWorkspace'
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
  socialLogin = 'socialLogin',
  logout = 'logout',
  verifyAuthenticationStatus = 'verifyAuthenticationStatus',
  delete = 'delete',
  register = 'register',
  getUserRolePermission = 'getUserRolePermission',
  checkIfUsernameIsAvailable = 'checkIfUsernameIsAvailable',
  updateUserAccountInfo = 'updateUserAccountInfo',
  updatePassword = 'updatePassword',
  validateCurrentPassword = 'validateCurrentPassword',
  resendPasswordOtp = 'resendPasswordOtp',
  updateUserStatus = 'updateUserStatus',
  validateCurrentPasswordOtp = 'validateCurrentPasswordOtp',
  userEmailsList = 'userEmailsList',
  userEmailDelete = 'userEmailDelete',
  makeEmailPrimary = 'makeEmailPrimary',
  addEmail = 'addEmail',
  confirmEmailOTP = 'confirmEmailOTP',
  resendEmailOTP = 'resendEmailOTP',
  csrf = 'csrf',
  userPixelAccounts_create_list = 'userPixelAccounts_create_list',
  userPixelAccounts_update_delete = 'userPixelAccounts_update_delete',

  // Share ws pixel
  sws_pixel_account_create_list = 'sws_pixel_account_create_list',
  sws_pixel_account_update_delete = 'sws_pixel_account_update_delete',

  // Utm tags
  userAccountUtmTags_create_list = 'userAccountUtmTags_create_list',
  userAccountUtmTags_update_delete = 'userAccountUtmTags_update_delete',

  // User notification settings
  us_notification_setting_get_create = 'us_notification_setting_get_create',
  us_notification_setting_update = 'us_notification_setting_update',

  // Workspace notification settings
  ws_notification_setting_get_create = 'ws_notification_setting_get_create',
  ws_notification_setting_update = 'ws_notification_setting_update',

  // Share workspace Utm tags
  sws_utm_tag_create_list = 'sws_utm_tag_create_list',
  sws_utm_tag_update_delete = 'sws_utm_tag_update_delete',

  userAccountFolders_update_delete = 'userAccountFolders_update_delete',
  userAccount_LinkInBio_folders_update_delete = 'userAccount_LinkInBio_folders_update_delete',
  userEmbedWidget_create_list = 'userEmbedWidget_create_list',
  userEmbedWidget_update_delete = 'userEmbedWidget_update_delete',
  send_otp = 'send_otp',
  send_signup_otp = 'send_signup_otp',
  resend_user_otp = 'resend_user_otp',
  send_forget_password_otp = 'send_forget_password_otp',
  confirm_otp = 'confirm_otp',
  set_password = 'set_password',
  set_username_password = 'set_username_password',
  ws_roles_get = 'ws_roles_get',
  LinkInBio_folders_create_list = 'LinkInBio_folders_create_list',

  // Owned workspace members
  member_sendInvite_list = 'member_sendInvite_list',
  member_getAllInvite_list = 'member_getAllInvite_list',
  member_resendInvite_list = 'member_resendInvite_list',
  member_invite_delete = 'member_invite_delete',
  member_invite_get = 'member_invite_get',
  member_update = 'member_update',
  member_create_short_url = 'member_create_short_url',
  member_role_update = 'member_role_update',
  validate_invitation_status = 'validate_invitation_status',
  member_check_short_url = 'member_check_short_url',

  // Share workspace members
  sws_member_sendInvite_list = 'sws_member_sendInvite_list',
  sws_member_getAllInvite_list = 'sws_member_getAllInvite_list',
  sws_member_create_short_url = 'sws_member_create_short_url',
  sws_member_resendInvite_list = 'sws_member_resendInvite_list',
  sws_member_invite_delete = 'sws_member_invite_delete',
  sws_member_invite_get = 'sws_member_invite_get',
  sws_member_role_update = 'sws_member_role_update',
  sws_member_update = 'sws_member_update',

  //
  user_unread_notifications_list = 'user_unread_notifications_list',
  user_notification_mark_as_read = 'user_notification_mark_as_read',
  user_notification_mark_all_as_read = 'user_notification_mark_all_as_read',

  // Short links
  shortLinks_create_list = 'shortLinks_create_list',
  shortLinks_list = 'shortLinks_list',
  shortLinks_update_delete = 'shortLinks_update_delete',
  shortLinks_is_path_available = 'shortLinks_is_path_available',
  ShortLink_folders_create_list = 'ShortLink_folders_create_list',
  shortLink_get_target_url_info = 'shortLink_get_target_url_info',
  shortLink_check_target_password = 'shortLink_check_target_password',
  FolderShortLinks = 'FolderShortLinks',
  ShortLinks_folders_reorder = 'ShortLinks_folders_reorder',

  // Short links Analytics
  // /user/{type}/{wsUniqueId}/sl/{slUniqueId}/analytics/{itemId}
  sl_analytics_get = 'sl_analytics_get',

  // Share workspace short links
  sws_sl_create_list = 'sws_sl_create_list',
  sws_sl_get_update_delete = 'sws_sl_get_update_delete',

  linkInBio_update_delete = 'linkInBio_update_delete',
  linkInBio_create_list = 'linkInBio_create_list',

  folders_get_update_delete = 'folders_get_update_delete',
  folders_list = 'folders_list',
  folders_create = 'folders_create',

  user_setting_list_create = 'user_setting_list_create',
  user_setting_delete_update_get = 'user_setting_delete_update_get',

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

  // Share workspace folder.
  ws_share_folder_sl_list = 'ws_share_folder_sl_list',
  ws_share_folder_lib_list = 'ws_share_folder_lib_list',
  ws_share_folder_create = 'ws_share_folder_create',
  ws_share_folder_get_update_delete = 'ws_share_folder_get_update_delete',
  ws_share_folder_reorder = 'ws_share_folder_reorder',

  // WS team
  workspace_team_create_list = 'workspace_team_create_list',
  workspace_team_update_delete = 'workspace_team_update_delete',

  // share workspace
  ws_share_list = 'ws_share_list',
  ws_share_member_role_permissions = 'ws_share_member_role_permissions',
  ws_share_update_is_favorite = 'ws_share_update_is_favorite',
  ws_share_info_data = 'ws_share_info_data',
  update_ws_share_info_data = 'update_ws_share_info_data',
  leave_share_ws = 'leave_share_ws',

  // Time slot
  time_slot_create_list = 'time_slot_create_list',
  time_slot_update_delete = 'time_slot_update_delete',

  // Share workspace time slot.
  time_slot_sws_create_list = 'time_slot_sws_create_list',
  time_slot_sws_update_delete_get = 'time_slot_sws_update_delete_get',

  // Label
  label_create_list = 'label_create_list',
  label_update_delete = 'label_update_delete',

  // Share workspace Label.
  label_sws_create_list = 'label_sws_create_list',
  label_sws_update_delete_get = 'label_sws_update_delete_get',

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

export enum TypeEnum {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  null = 'null',
  undefined = 'undefined'
}
