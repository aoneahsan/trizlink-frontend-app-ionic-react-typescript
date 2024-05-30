import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { sendBackFailedResponse } from '../helpers';

config();

const _env = process.env;

const ENVS = {
  // #region Frontend config
  frontendUrl: _env.Z_FRONTEND_URL ?? ''
  // #endregion
} as const;

/**
 * Middleware function to check if the required environment variables are present.
 * If any of the required variables are missing, it sends a failed response with the missing variables.
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The next middleware function
 * @returns The next middleware function or a failed response
 */
export const checkZEnvMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  // type added to remove the eslint error, as it was not able to infer the type of Object.keys
  const missingVariables: string[] = [];

  if (!ENVS.frontendUrl) {
    missingVariables.push('Frontend App URL is missing.');
  }

  if (missingVariables.length > 0) {
    return sendBackFailedResponse(res, {
      success: false,
      message: 'Required environment variables are missing',
      missingVariables
    });
  }

  return next();
};

export default ENVS;
