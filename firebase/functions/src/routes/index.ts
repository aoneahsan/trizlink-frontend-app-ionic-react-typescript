import { getAuthToken } from './../controllers/test';
import * as express from 'express';

const router = express.Router();

router.post('/test-authToken', getAuthToken);

export default router;
