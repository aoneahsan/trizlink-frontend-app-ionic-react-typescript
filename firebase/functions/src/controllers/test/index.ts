import { firebaseServerAuth } from './../../config/firebase';
import { Request, Response } from 'express';

export const getAuthToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  let userData = null;
  try {
    userData = await firebaseServerAuth.listProviderConfigs({
      maxResults: 100,
      type: 'oidc'
    });
  } catch (error) {
    userData = 'No user found';
  }

  try {
    const decodedToken = await firebaseServerAuth.verifyIdToken(token);

    return res.status(200).json({ decodedToken, userData });
  } catch (e) {
    console.error(e);
    return res.status(403).json({ error: 'Unauthorized', token, userData });
  }
};
