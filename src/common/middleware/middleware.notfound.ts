import { Request, Response } from 'express';

export const  notFound404 = (req: Request, res: Response) => {
  return res.status(404).send({message: '🚨 Route does not exist 🛠'});
};