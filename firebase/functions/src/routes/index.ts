import { getAuthToken } from './../controllers/test';
import * as express from 'express';

const router = express.Router();

router.post('/setup-roles-and-permissions');

router.post('/test-authToken', getAuthToken);

export default router;
