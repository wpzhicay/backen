import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const panels = await prisma.solarPanel.findMany();
      res.status(200).json(panels);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch solar panels' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, location, capacity } = req.body;
      const panel = await prisma.solarPanel.create({
        data: { name, location, capacity },
      });
      res.status(201).json(panel);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create solar panel' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
