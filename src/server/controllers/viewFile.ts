import { Request, Response } from 'express';

export default function viewFile(req: Request, res: Response) {
  const { filename } = req.params;
  return res.sendFile(filename);
}
