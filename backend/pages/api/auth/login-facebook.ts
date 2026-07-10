import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { enableCors } from '../../../lib/cors';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Habilitar CORS
  if (enableCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { accessToken, email, name, facebookId } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: 'Access token de Facebook es requerido' });
    }

    // Verificar el token de Facebook
    try {
      const response = await axios.get('https://graph.facebook.com/v18.0/me', {
        params: {
          access_token: accessToken,
          fields: 'id,name,email',
        },
      });

      const fbUser = response.data;
      const fbEmail = fbUser.email || email;
      const fbName = fbUser.name || name;
      const fbId = fbUser.id || facebookId;

      if (!fbEmail) {
        return res.status(400).json({ 
          error: 'No se pudo obtener el email de Facebook. Por favor, autoriza acceso al email.' 
        });
      }

      // Buscar o crear usuario
      let user = await prisma.user.findUnique({
        where: { email: fbEmail },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: fbEmail,
            name: fbName || null,
            password: `facebook_${fbId}`, // Pseudo-contraseña para Facebook
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
    } catch (fbError: any) {
      console.error('Error verificando Facebook token:', fbError);
      return res.status(401).json({ error: 'Token de Facebook inválido' });
    }
  } catch (error) {
    console.error('Error en Facebook login:', error);
    res.status(500).json({ error: 'Error al autenticar con Facebook' });
  }
}
