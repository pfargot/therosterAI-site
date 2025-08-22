import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all profiles for current user
router.get('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, isActive } = req.query;

    const where: any = { userId };
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const profiles = await prisma.profile.findMany({
      where,
      include: {
        dates: {
          include: {
            evaluation: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const total = await prisma.profile.count({ where });

    res.json({
      profiles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get profiles error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve profiles'
    });
  }
});

// Create a new profile
router.post('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { name, age, photos, bio, interests, location, datingApp, externalId } = req.body;

    const profile = await prisma.profile.create({
      data: {
        userId,
        name,
        age,
        photos,
        bio,
        interests,
        location,
        datingApp,
        externalId
      }
    });

    res.status(201).json({
      message: 'Profile created successfully',
      profile
    });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create profile'
    });
  }
});

// Get a specific profile
router.get('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const profile = await prisma.profile.findFirst({
      where: {
        id,
        userId
      },
      include: {
        dates: {
          include: {
            evaluation: true
          },
          orderBy: { date: 'desc' }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'The specified profile could not be found'
      });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve profile'
    });
  }
});

// Update a profile
router.put('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { name, age, photos, bio, interests, location, isActive } = req.body;

    const updatedProfile = await prisma.profile.updateMany({
      where: {
        id,
        userId
      },
      data: {
        name,
        age,
        photos,
        bio,
        interests,
        location,
        isActive
      }
    });

    if (updatedProfile.count === 0) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'The specified profile could not be found'
      });
    }

    res.json({
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update profile'
    });
  }
});

// Delete a profile
router.delete('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deletedProfile = await prisma.profile.deleteMany({
      where: {
        id,
        userId
      }
    });

    if (deletedProfile.count === 0) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'The specified profile could not be found'
      });
    }

    res.json({
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete profile'
    });
  }
});

export default router; 