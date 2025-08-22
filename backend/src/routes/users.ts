import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get current user profile
router.get('/me', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profiles: true,
        tags: true
      }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile could not be retrieved'
      });
    }

    res.json({
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve user profile'
    });
  }
});

// Update user profile
router.put('/me', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, bio, preferences, profileImage } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        bio,
        preferences,
        profileImage
      }
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update user profile'
    });
  }
});

// Get user statistics
router.get('/me/stats', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const [totalDates, totalEvaluations, totalProfiles] = await Promise.all([
      prisma.date.count({ where: { userId } }),
      prisma.dateEvaluation.count({ where: { userId } }),
      prisma.profile.count({ where: { userId } })
    ]);

    res.json({
      stats: {
        totalDates,
        totalEvaluations,
        totalProfiles
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve user statistics'
    });
  }
});

export default router; 