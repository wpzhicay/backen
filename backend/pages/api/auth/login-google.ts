import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token de Google es requerido' });
    }

    // Verificar el token de Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const { email, name, sub } = payload;

    // Buscar o crear usuario
    let user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email as string,
          name: name || null,
          password: `google_${sub}`, // Pseudo-contraseña para Google
        },
      });
    }

    // Generar JWT
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const jwtToken = jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' });

    res.status(200).json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Error en Google login:', error);
    res.status(500).json({ error: 'Error al autenticar con Google' });
  }
}
