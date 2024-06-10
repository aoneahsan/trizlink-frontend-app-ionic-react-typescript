export enum RoleEnum {
  superAdmin = 'superAdmin',
  admin = 'admin',
  editor = 'editor',
  creator = 'creator',
  viewer = 'viewer',
  user = 'user'
}

export enum PermissionEnum {
  view_adminPanel = 'view_adminPanel',

  view_users = 'view_users',
  view_user = 'view_user',
  create_user = 'create_user',
  update_user = 'update_user',
  delete_user = 'delete_user',
  forceDelete_user = 'forceDelete_user',

  view_roles = 'view_roles',
  view_role = 'view_role',
  create_role = 'create_role',
  update_role = 'update_role',
  delete_role = 'delete_role',
  forceDelete_role = 'forceDelete_role',

  view_permissions = 'view_permissions',
  view_permission = 'view_permission',
  create_permission = 'create_permission',
  update_permission = 'update_permission',
  delete_permission = 'delete_permission',
  forceDelete_permission = 'forceDelete_permission',

  view_workspaces = 'view_workspaces',
  view_workspace = 'view_workspace',
  create_workspace = 'create_workspace',
  update_workspace = 'update_workspace',
  delete_workspace = 'delete_workspace',
  forceDelete_workspace = 'forceDelete_workspace',

  view_shortLinks = 'view_shortLinks',
  view_shortLink = 'view_shortLink',
  create_shortLink = 'create_shortLink',
  update_shortLink = 'update_shortLink',
  delete_shortLink = 'delete_shortLink',
  forceDelete_shortLink = 'forceDelete_shortLink',

  view_linkInBios = 'view_linkInBios',
  view_linkInBio = 'view_linkInBio',
  create_linkInBio = 'create_linkInBio',
  update_linkInBio = 'update_linkInBio',
  delete_linkInBio = 'delete_linkInBio',
  forceDelete_linkInBio = 'forceDelete_linkInBio'
}
