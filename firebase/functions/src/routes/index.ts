import API_URLS from '../utils/constants/routes';
import { getAuthToken } from './../controllers/test';
import * as express from 'express';

const router = express.Router();


// #region Roles
router.get(API_URLS.roles);
router.post(API_URLS.roles);
router.put(API_URLS.roleActions);
router.get(API_URLS.roleActions);
router.delete(API_URLS.roleActions);
// #endRegion

router.post('/setup-roles-and-permissions');

router.post('/test-authToken', getAuthToken);

export default router;
