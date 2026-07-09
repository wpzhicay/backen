import type { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, withAuth } from '../middleware/auth';

const prisma = new PrismaClient();

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

export default withAuth(handler);
