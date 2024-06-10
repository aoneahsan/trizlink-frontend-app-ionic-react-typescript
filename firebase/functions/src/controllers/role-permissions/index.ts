import { Request, Response } from 'express';
import { PermissionEnum, RoleEnum } from '../../enums/role-permissions';
import { firebaseServerFirestoreDB } from '../../config/firebase';

export const setupRolesAndPermissions = async (req: Request, res: Response) => {
  try {
    // as this is the first time i'm creating a role and permission system in firebase so i will optimize this code later once it starts working

    // create roles
    await firebaseServerFirestoreDB.collection('collectionPath').add({
      name: RoleEnum.superAdmin,
      permissions: [
        PermissionEnum.view_adminPanel,
        PermissionEnum.view_users,
        PermissionEnum.view_user,
        PermissionEnum.create_user,
        PermissionEnum.update_user,
        PermissionEnum.delete_user,
        PermissionEnum.forceDelete_user,

        PermissionEnum.view_roles,
        PermissionEnum.view_role,
        PermissionEnum.create_role,
        PermissionEnum.update_role,
        PermissionEnum.delete_role,
        PermissionEnum.forceDelete_role,

        PermissionEnum.view_permissions,
        PermissionEnum.view_permission,
        PermissionEnum.create_permission,
        PermissionEnum.update_permission,
        PermissionEnum.delete_permission,
        PermissionEnum.forceDelete_permission,

        PermissionEnum.view_workspaces,
        PermissionEnum.view_workspace,
        PermissionEnum.create_workspace,
        PermissionEnum.update_workspace,
        PermissionEnum.delete_workspace,
        PermissionEnum.forceDelete_workspace,

        PermissionEnum.view_shortLinks,
        PermissionEnum.view_shortLink,
        PermissionEnum.create_shortLink,
        PermissionEnum.update_shortLink,
        PermissionEnum.delete_shortLink,
        PermissionEnum.forceDelete_shortLink,

        PermissionEnum.view_linkInBios,
        PermissionEnum.view_linkInBio,
        PermissionEnum.create_linkInBio,
        PermissionEnum.update_linkInBio,
        PermissionEnum.delete_linkInBio,
        PermissionEnum.forceDelete_linkInBio
      ]
    });

    await firebaseServerFirestoreDB.collection('collectionPath').add({
      name: RoleEnum.admin,
      permissions: [
        PermissionEnum.view_adminPanel,
        PermissionEnum.view_users,
        PermissionEnum.view_user,
        PermissionEnum.create_user,
        PermissionEnum.update_user,
        PermissionEnum.delete_user,

        PermissionEnum.view_roles,
        PermissionEnum.view_role,
        PermissionEnum.create_role,
        PermissionEnum.update_role,
        PermissionEnum.delete_role,

        PermissionEnum.view_permissions,
        PermissionEnum.view_permission,
        PermissionEnum.create_permission,
        PermissionEnum.update_permission,
        PermissionEnum.delete_permission,

        PermissionEnum.view_workspaces,
        PermissionEnum.view_workspace,
        PermissionEnum.create_workspace,
        PermissionEnum.update_workspace,
        PermissionEnum.delete_workspace,

        PermissionEnum.view_shortLinks,
        PermissionEnum.view_shortLink,
        PermissionEnum.create_shortLink,
        PermissionEnum.update_shortLink,
        PermissionEnum.delete_shortLink,

        PermissionEnum.view_linkInBios,
        PermissionEnum.view_linkInBio,
        PermissionEnum.create_linkInBio,
        PermissionEnum.update_linkInBio,
        PermissionEnum.delete_linkInBio
      ]
    });

    await firebaseServerFirestoreDB.collection('collectionPath').add({
      name: RoleEnum.editor,
      permissions: [
        PermissionEnum.view_adminPanel,
        PermissionEnum.view_users,
        PermissionEnum.view_user,
        PermissionEnum.create_user,
        PermissionEnum.update_user,

        PermissionEnum.view_roles,
        PermissionEnum.view_role,
        PermissionEnum.create_role,
        PermissionEnum.update_role,

        PermissionEnum.view_permissions,
        PermissionEnum.view_permission,
        PermissionEnum.create_permission,
        PermissionEnum.update_permission,

        PermissionEnum.view_workspaces,
        PermissionEnum.view_workspace,
        PermissionEnum.create_workspace,
        PermissionEnum.update_workspace,

        PermissionEnum.view_shortLinks,
        PermissionEnum.view_shortLink,
        PermissionEnum.create_shortLink,
        PermissionEnum.update_shortLink,

        PermissionEnum.view_linkInBios,
        PermissionEnum.view_linkInBio,
        PermissionEnum.create_linkInBio,
        PermissionEnum.update_linkInBio
      ]
    });

    await firebaseServerFirestoreDB.collection('collectionPath').add({
      name: RoleEnum.creator,
      permissions: [
        PermissionEnum.view_adminPanel,
        PermissionEnum.view_users,
        PermissionEnum.view_user,
        PermissionEnum.create_user,

        PermissionEnum.view_roles,
        PermissionEnum.view_role,
        PermissionEnum.create_role,

        PermissionEnum.view_permissions,
        PermissionEnum.view_permission,
        PermissionEnum.create_permission,

        PermissionEnum.view_workspaces,
        PermissionEnum.view_workspace,
        PermissionEnum.create_workspace,

        PermissionEnum.view_shortLinks,
        PermissionEnum.view_shortLink,
        PermissionEnum.create_shortLink,

        PermissionEnum.view_linkInBios,
        PermissionEnum.view_linkInBio,
        PermissionEnum.create_linkInBio
      ]
    });

    await firebaseServerFirestoreDB.collection('collectionPath').add({
      name: RoleEnum.viewer,
      permissions: [
        PermissionEnum.view_adminPanel,
        PermissionEnum.view_users,
        PermissionEnum.view_user,

        PermissionEnum.view_roles,
        PermissionEnum.view_role,

        PermissionEnum.view_permissions,
        PermissionEnum.view_permission,

        PermissionEnum.view_workspaces,
        PermissionEnum.view_workspace,

        PermissionEnum.view_shortLinks,
        PermissionEnum.view_shortLink,

        PermissionEnum.view_linkInBios,
        PermissionEnum.view_linkInBio
      ]
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
