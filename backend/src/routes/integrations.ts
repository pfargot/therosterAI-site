import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all integrations for current user
router.get('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const integrations = await prisma.datingAppIntegration.findMany({
      where: { userId }
    });

    res.json({ integrations });
  } catch (error) {
    console.error('Get integrations error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve integrations'
    });
  }
});

// Connect a dating app
router.post('/connect', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { appName, accessToken, refreshToken, expiresAt } = req.body;

    const integration = await prisma.datingAppIntegration.upsert({
      where: {
        userId_appName: {
          userId,
          appName
        }
      },
      update: {
        accessToken,
        refreshToken,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: true
      },
      create: {
        userId,
        appName,
        accessToken,
        refreshToken,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    });

    res.json({
      message: `${appName} connected successfully`,
      integration
    });
  } catch (error) {
    console.error('Connect app error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to connect dating app'
    });
  }
});

// Disconnect a dating app
router.delete('/:appName', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { appName } = req.params;

    const deletedIntegration = await prisma.datingAppIntegration.deleteMany({
      where: {
        userId,
        appName
      }
    });

    if (deletedIntegration.count === 0) {
      return res.status(404).json({
        error: 'Integration not found',
        message: 'The specified integration could not be found'
      });
    }

    res.json({
      message: `${appName} disconnected successfully`
    });
  } catch (error) {
    console.error('Disconnect app error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to disconnect dating app'
    });
  }
});

export default router; 