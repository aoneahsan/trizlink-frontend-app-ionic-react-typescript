export enum rolePermissions {
  superAdmin = 'superAdmin',
  admin = 'admin',
  user = 'user'
}

export enum permissionsTypeEnum {
  shareWSMemberPermissions = 'shareWSMemberPermissions',
  loggedInUserPermissions = 'loggedInUserPermissions'
}

export enum permissionCheckModeEnum {
  every = 'every', // user must have every permissions that have passed.
  any = 'any' // user must have any permissions that have passed.
}

export enum permissionsEnum {
  // Role
  viewAny_role = 'viewAny_role',
  view_role = 'view_role',
  create_role = 'create_role',
  update_role = 'update_role',
  delete_role = 'delete_role',
  replicate_role = 'replicate_role',
  restore_role = 'restore_role',
  forceDelete_role = 'forceDelete_role',
  // Emails
  viewAny_emails = 'viewAny_emails',
  view_email = 'view_email',
  add_email = 'add_email',
  email_opt_check = 'email_opt_check',
  update_email = 'update_email',
  delete_email = 'delete_email',
  restore_email = 'restore_email',
  forceDelete_email = 'forceDelete_email',

  // Permission
  viewAny_permission = 'viewAny_permission',
  view_permission = 'view_permission',
  create_permission = 'create_permission',
  update_permission = 'update_permission',
  delete_permission = 'delete_permission',
  replicate_permission = 'replicate_permission',
  restore_permission = 'restore_permission',
  forceDelete_permission = 'forceDelete_permission',

  // Dashboard
  view_dashboard = 'view_dashboard',

  // User
  viewAny_user = 'viewAny_user',
  view_user = 'view_user',
  create_user = 'create_user',
  update_user = 'update_user',
  delete_user = 'delete_user',
  replicate_user = 'replicate_user',
  restore_user = 'restore_user',
  forceDelete_user = 'forceDelete_user',

  // Task
  viewAny_task = 'viewAny_task',
  view_task = 'view_task',
  create_task = 'create_task',
  update_task = 'update_task',
  delete_task = 'delete_task',
  replicate_task = 'replicate_task',
  restore_task = 'restore_task',
  forceDelete_task = 'forceDelete_task',

  // History
  viewAny_history = 'viewAny_history',
  view_history = 'view_history',
  create_history = 'create_history',
  update_history = 'update_history',
  delete_history = 'delete_history',
  replicate_history = 'replicate_history',
  restore_history = 'restore_history',
  forceDelete_history = 'forceDelete_history',

  // Attachment
  viewAny_attachment = 'viewAny_attachment',
  view_attachment = 'view_attachment',
  create_attachment = 'create_attachment',
  update_attachment = 'update_attachment',
  delete_attachment = 'delete_attachment',
  replicate_attachment = 'replicate_attachment',
  restore_attachment = 'restore_attachment',
  forceDelete_attachment = 'forceDelete_attachment',

  // Comment
  viewAny_comment = 'viewAny_comment',
  view_comment = 'view_comment',
  create_comment = 'create_comment',
  update_comment = 'update_comment',
  delete_comment = 'delete_comment',
  replicate_comment = 'replicate_comment',
  restore_comment = 'restore_comment',
  forceDelete_comment = 'forceDelete_comment',

  // Reply
  viewAny_reply = 'viewAny_reply',
  view_reply = 'view_reply',
  create_reply = 'create_reply',
  update_reply = 'update_reply',
  delete_reply = 'delete_reply',
  replicate_reply = 'replicate_reply',
  restore_reply = 'restore_reply',
  forceDelete_reply = 'forceDelete_reply',

  // Impersonation
  can_impersonate = 'can_impersonate',
  canBe_impersonate = 'canBe_impersonate',

  // Workspace
  viewAny_workspace = 'viewAny_workspace',
  view_workspace = 'view_workspace',
  create_workspace = 'create_workspace',
  update_workspace = 'update_workspace',
  delete_workspace = 'delete_workspace',
  replicate_workspace = 'replicate_workspace',
  restore_workspace = 'restore_workspace',
  forceDelete_workspace = 'forceDelete_workspace',

  // Share WS
  viewAny_shareWS = 'viewAny_shareWS',
  view_shareWS = 'view_shareWS',
  create_shareWS = 'create_shareWS',
  update_shareWS = 'update_shareWS',
  delete_shareWS = 'delete_shareWS',
  replicate_shareWS = 'replicate_shareWS',
  restore_shareWS = 'restore_shareWS',
  forceDelete_shareWS = 'forceDelete_shareWS',

  // time slot
  viewAny_timeSlot = 'viewAny_timeSlot',
  view_timeSlot = 'view_timeSlot',
  create_timeSlot = 'create_timeSlot',
  update_timeSlot = 'update_timeSlot',
  delete_timeSlot = 'delete_timeSlot',
  replicate_timeSlot = 'replicate_timeSlot',
  restore_timeSlot = 'restore_timeSlot',
  forceDelete_timeSlot = 'forceDelete_timeSlot',

  // Labels
  viewAny_label = 'viewAny_label',
  view_label = 'view_label',
  create_label = 'create_label',
  update_label = 'update_label',
  delete_label = 'delete_label',
  replicate_label = 'replicate_label',
  restore_label = 'restore_label',
  forceDelete_label = 'forceDelete_label',

  // Workspace team
  viewAny_workspaceTeam = 'viewAny_workspaceTeam',
  view_workspaceTeam = 'view_workspaceTeam',
  create_workspaceTeam = 'create_workspaceTeam',
  update_workspaceTeam = 'update_workspaceTeam',
  delete_workspaceTeam = 'delete_workspaceTeam',
  replicate_workspaceTeam = 'replicate_workspaceTeam',
  restore_workspaceTeam = 'restore_workspaceTeam',
  forceDelete_workspaceTeam = 'forceDelete_workspaceTeam',

  // Workspace Members
  attach_workspace_members = 'attach_workspace_members',
  detach_workspace_members = 'view_workspace_members',
  update_workspace_members = 'create_workspace_members',
  viewAny_WSTeamMember = 'viewAny_WSTeamMember',
  view_WSTeamMember = 'view_WSTeamMember',
  create_WSTeamMember = 'create_WSTeamMember',
  update_WSTeamMember = 'update_WSTeamMember',
  delete_WSTeamMember = 'delete_WSTeamMember',
  replicate_WSTeamMember = 'replicate_WSTeamMember',
  restore_WSTeamMember = 'restore_WSTeamMember',
  forceDelete_WSTeamMember = 'forceDelete_WSTeamMember',
  invite_WSTeamMember = 'invite_WSTeamMember',

  // Workspace pixel connections
  attach_pixel_to_workspace = 'attach_pixel_to_workspace',
  detach_pixel_from_workspace = 'detach_pixel_from_workspace',
  update_workspace_pixel = 'update_workspace_pixel',

  // Workspace utm tags connections
  attach_utm_tag_to_workspace = 'attach_utm_tag_to_workspace',
  detach_utm_tag_from_workspace = 'detach_utm_tag_from_workspace',
  update_workspace_utm_tag = 'update_workspace_utm_tag',

  // Pixel
  viewAny_pixel = 'viewAny_pixel',
  view_pixel = 'view_pixel',
  create_pixel = 'create_pixel',
  update_pixel = 'update_pixel',
  delete_pixel = 'delete_pixel',
  replicate_pixel = 'replicate_pixel',
  restore_pixel = 'restore_pixel',
  forceDelete_pixel = 'forceDelete_pixel',

  // Utm Tag
  viewAny_utmTag = 'viewAny_utmTag',
  view_utmTag = 'view_utmTag',
  create_utmTag = 'create_utmTag',
  update_utmTag = 'update_utmTag',
  delete_utmTag = 'delete_utmTag',
  replicate_utmTag = 'replicate_utmTag',
  restore_utmTag = 'restore_utmTag',
  forceDelete_utmTag = 'forceDelete_utmTag',

  viewAny_USSettings = 'viewAny_USSettings',
  view_USSettings = 'view_USSettings',
  create_USSettings = 'create_USSettings',
  update_USSettings = 'update_USSettings',
  delete_USSettings = 'delete_USSettings',
  replicate_USSettings = 'replicate_USSettings',
  restore_USSettings = 'restore_USSettings',
  forceDelete_USSettings = 'forceDelete_USSettings',

  // short link
  viewAny_shortLink = 'viewAny_shortLink',
  view_shortLink = 'view_shortLink',
  create_shortLink = 'create_shortLink',
  update_shortLink = 'update_shortLink',
  delete_shortLink = 'delete_shortLink',
  replicate_shortLink = 'replicate_shortLink',
  restore_shortLink = 'restore_shortLink',
  forceDelete_shortLink = 'forceDelete_shortLink',

  // link in bio
  viewAny_linkInBio = 'viewAny_linkInBio',
  view_linkInBio = 'view_linkInBio',
  create_linkInBio = 'create_linkInBio',
  update_linkInBio = 'update_linkInBio',
  delete_linkInBio = 'delete_linkInBio',
  replicate_linkInBio = 'replicate_linkInBio',
  restore_linkInBio = 'restore_linkInBio',
  forceDelete_linkInBio = 'forceDelete_linkInBio',

  // lib Block
  viewAny_libBlock = 'viewAny_libBlock',
  view_libBlock = 'view_libBlock',
  create_libBlock = 'create_libBlock',
  update_libBlock = 'update_libBlock',
  delete_libBlock = 'delete_libBlock',
  replicate_libBlock = 'replicate_libBlock',
  restore_libBlock = 'restore_libBlock',
  forceDelete_libBlock = 'forceDelete_libBlock',

  // lib pre defined data
  viewAny_libPerDefinedData = 'viewAny_libPerDefinedData',
  view_libPerDefinedData = 'view_libPerDefinedData',
  create_libPerDefinedData = 'create_libPerDefinedData',
  update_libPerDefinedData = 'update_libPerDefinedData',
  delete_libPerDefinedData = 'delete_libPerDefinedData',
  replicate_libPerDefinedData = 'replicate_libPerDefinedData',
  restore_libPerDefinedData = 'restore_libPerDefinedData',
  forceDelete_libPerDefinedData = 'forceDelete_libPerDefinedData',

  // custom domain
  viewAny_customDomain = 'viewAny_customDomain',
  view_customDomain = 'view_customDomain',
  create_customDomain = 'create_customDomain',
  update_customDomain = 'update_customDomain',
  delete_customDomain = 'delete_customDomain',
  replicate_customDomain = 'replicate_customDomain',
  restore_customDomain = 'restore_customDomain',
  forceDelete_customDomain = 'forceDelete_customDomain',

  // api key
  viewAny_apiKey = 'viewAny_apiKey',
  view_apiKey = 'view_apiKey',
  create_apiKey = 'create_apiKey',
  update_apiKey = 'update_apiKey',
  delete_apiKey = 'delete_apiKey',
  replicate_apiKey = 'replicate_apiKey',
  restore_apiKey = 'restore_apiKey',
  forceDelete_apiKey = 'forceDelete_apiKey',

  // Folder
  viewAny_folder = 'viewAny_folder',
  view_folder = 'view_folder',
  create_folder = 'create_folder',
  update_folder = 'update_folder',
  delete_folder = 'delete_folder',
  replicate_folder = 'replicate_folder',
  restore_folder = 'restore_folder',
  forceDelete_folder = 'forceDelete_folder',

  // Embeded widgets
  viewAny_embededWidget = 'viewAny_embededWidget',
  view_embededWidget = 'view_embededWidget',
  create_embededWidget = 'create_embededWidget',
  update_embededWidget = 'update_embededWidget',
  delete_embededWidget = 'delete_embededWidget',
  replicate_embededWidget = 'replicate_embededWidget',
  restore_embededWidget = 'restore_embededWidget',
  forceDelete_embededWidget = 'forceDelete_embededWidget'
}

export enum shareWSPermissionEnum {
  // sws => ShareWorkspace.

  // member
  viewAny_sws_member = 'viewAny_sws_member',
  view_sws_member = 'view_sws_member',
  create_sws_member = 'create_sws_member',
  update_sws_member = 'update_sws_member',
  delete_sws_member = 'delete_sws_member',
  replicate_sws_member = 'replicate_sws_member',
  restore_sws_member = 'restore_sws_member',
  forceDelete_sws_member = 'forceDelete_sws_member',
  // Workspace
  viewAny_sws_workspace = 'viewAny_sws_workspace',
  view_sws_workspace = 'view_sws_workspace',
  create_sws_workspace = 'create_sws_workspace',
  update_sws_workspace = 'update_sws_workspace',
  delete_sws_workspace = 'delete_sws_workspace',
  replicate_sws_workspace = 'replicate_sws_workspace',
  restore_sws_workspace = 'restore_sws_workspace',
  forceDelete_sws_workspace = 'forceDelete_sws_workspace',
  // Pixel
  viewAny_sws_pixel = 'viewAny_sws_pixel',
  view_sws_pixel = 'view_sws_pixel',
  create_sws_pixel = 'create_sws_pixel',
  update_sws_pixel = 'update_sws_pixel',
  delete_sws_pixel = 'delete_sws_pixel',
  replicate_sws_pixel = 'replicate_sws_pixel',
  restore_sws_pixel = 'restore_sws_pixel',
  forceDelete_sws_pixel = 'forceDelete_sws_pixel',
  // Utm Tag
  viewAny_sws_utmTag = 'viewAny_sws_utmTag',
  view_sws_utmTag = 'view_sws_utmTag',
  create_sws_utmTag = 'create_sws_utmTag',
  update_sws_utmTag = 'update_sws_utmTag',
  delete_sws_utmTag = 'delete_sws_utmTag',
  replicate_sws_utmTag = 'replicate_sws_utmTag',
  restore_sws_utmTag = 'restore_sws_utmTag',
  forceDelete_sws_utmTag = 'forceDelete_sws_utmTag',
  // short link
  viewAny_sws_shortLink = 'viewAny_sws_shortLink',
  view_sws_shortLink = 'view_sws_shortLink',
  create_sws_shortLink = 'create_sws_shortLink',
  update_sws_shortLink = 'update_sws_shortLink',
  delete_sws_shortLink = 'delete_sws_shortLink',
  replicate_sws_shortLink = 'replicate_sws_shortLink',
  restore_sws_shortLink = 'restore_sws_shortLink',
  forceDelete_sws_shortLink = 'forceDelete_sws_shortLink',
  // link in bio
  viewAny_sws_linkInBio = 'viewAny_sws_linkInBio',
  view_sws_linkInBio = 'view_sws_linkInBio',
  create_sws_linkInBio = 'create_sws_linkInBio',
  update_sws_linkInBio = 'update_sws_linkInBio',
  delete_sws_linkInBio = 'delete_sws_linkInBio',
  replicate_sws_linkInBio = 'replicate_sws_linkInBio',
  restore_sws_linkInBio = 'restore_sws_linkInBio',
  forceDelete_sws_linkInBio = 'forceDelete_sws_linkInBio',
  // time slot
  viewAny_sws_timeSlot = 'viewAny_sws_timeSlot',
  view_sws_timeSlot = 'view_sws_timeSlot',
  create_sws_timeSlot = 'create_sws_timeSlot',
  update_sws_timeSlot = 'update_sws_timeSlot',
  delete_sws_timeSlot = 'delete_sws_timeSlot',
  replicate_sws_timeSlot = 'replicate_sws_timeSlot',
  restore_sws_timeSlot = 'restore_sws_timeSlot',
  forceDelete_sws_timeSlot = 'forceDelete_sws_timeSlot',
  // label
  viewAny_sws_label = 'viewAny_sws_label',
  view_sws_label = 'view_sws_label',
  create_sws_label = 'create_sws_label',
  update_sws_label = 'update_sws_label',
  delete_sws_label = 'delete_sws_label',
  replicate_sws_label = 'replicate_sws_label',
  restore_sws_label = 'restore_sws_label',
  forceDelete_sws_label = 'forceDelete_sws_label',
  // comment
  viewAny_sws_comment = 'viewAny_sws_comment',
  view_sws_comment = 'view_sws_comment',
  create_sws_comment = 'create_sws_comment',
  update_sws_comment = 'update_sws_comment',
  delete_sws_comment = 'delete_sws_comment',
  replicate_sws_comment = 'replicate_sws_comment',
  restore_sws_comment = 'restore_sws_comment',
  forceDelete_sws_comment = 'forceDelete_sws_comment'
}
