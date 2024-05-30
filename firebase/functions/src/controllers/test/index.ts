import { firebaseAuth } from './../../config/firebase';
import { Request, Response } from 'express';

export const getAuthToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    return res.status(200).json(decodedToken);
  } catch (e) {
    console.error(e);
    return res.status(403).json({ error: 'Unauthorized' });
  }
};
