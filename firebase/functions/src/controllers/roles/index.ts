import { type Request, type Response } from 'express';
import { firebaseServerFirestoreDB } from "../../config/firebase";
import ZTableNames from "../../utils/constants/databaseSchema/tableNames";
import { sendBackFailedResponse, sendBackNotFoundResponse, sendBackSuccessResponse } from "../../utils/helpers";
import messages from '../../utils/constants/messages';
import { ZRolesI } from '../../types/rolesPermissions';
import roleColumns from '../../utils/constants/databaseSchema/tableColumns/role';


/**
 * Get Roles
 */
export const rolesIndex = async (req: Request, res: Response) => {
    try {
        const roles = await firebaseServerFirestoreDB.collection(ZTableNames.roles).get();
        const formattedRoles: Array<ZRolesI> = [];

        roles?.forEach(async (doc) => {
            formattedRoles.push({ ...(doc.data() as ZRolesI), id: doc.id });
        });

        return sendBackSuccessResponse(res, {
            items: formattedRoles,
        });
    } catch (error) {
        if (error instanceof Error) {
            return sendBackFailedResponse(res, {
                messages: error.message,
            });
        }
        return sendBackFailedResponse(res, {
            messages: messages.general.fetchFailed,
        });
    }
}

/**
 * Create roles
 */
export const roleStore = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body as ZRolesI;

        const roleRes = firebaseServerFirestoreDB.collection(ZTableNames.roles).doc();

        const data = {
            [roleColumns.name]: reqBody.name ?? null,
            [roleColumns.identifier]: reqBody.identifier ?? null,
            [roleColumns.permissions]: reqBody.permissions ?? [],
        };

        await roleRes.set({ ...data });

        const getRole = await roleRes.get();

        if (getRole.exists) {
            return sendBackSuccessResponse(res, {
                item: { id: getRole.id, ...getRole.data() },
            });
        } else {
            return sendBackNotFoundResponse(res, {
                message: messages.role.notFound,
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            return sendBackFailedResponse(res, {
                messages: error.message,
            });
        }
        return sendBackFailedResponse(res, {
            messages: messages.role.createFailed,
        });
    }
}

/**
 * Get single roles
 */
