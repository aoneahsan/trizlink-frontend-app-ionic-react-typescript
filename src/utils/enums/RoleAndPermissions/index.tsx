export enum rolePermissions {
	superAdmin = 'superAdmin',
	admin = 'admin',
	user = 'user',
}

export enum permissionsTypeEnum {
	workspaceUserPermission = 'workspaceUserPermission',
	loggedInUserPermission = 'loggedInUserPermission',
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

	// Workspace Members
	attach_workspace_members = 'attach_workspace_members',
	detach_workspace_members = 'view_workspace_members',
	update_workspace_members = 'create_workspace_members',

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
	forceDelete_embededWidget = 'forceDelete_embededWidget',
}
