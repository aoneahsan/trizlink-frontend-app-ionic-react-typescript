import { Request, Response } from 'express';

export const setupRolesAndPermissions = async (req: Request, res: Response) => {
  const { roles, permissions } = req.body;
  try {
    const result = await rolePermissionsService.setupRolesAndPermissions(
      roles,
      permissions
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
