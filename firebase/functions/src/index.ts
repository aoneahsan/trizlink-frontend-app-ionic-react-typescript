import express from 'express';
import cors from 'cors';

import { onRequest } from 'firebase-functions/v2/https';
import router from './routes';
import ENVS, { checkZEnvMiddleware } from './utils/envKeys';

const app = express();

app.use(checkZEnvMiddleware); // To check environment variables

app.use(express.json()); // This allows to handle JSON POST requests.

app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// CORS middleware
app.use(cors());

// Routes
app.use(router);

// any other route, which is not defined in the router (or any other above middleware), will be redirected to the main website
app.get('*', (req, res) => {
  return res.status(200).redirect(ENVS.frontendUrl);
});

// Export the Express app as an HTTP function
export default onRequest(app);

export const login = onRequest(() => {});
