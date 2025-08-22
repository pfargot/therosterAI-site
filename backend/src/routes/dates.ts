import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all dates for current user
router.get('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, profileId } = req.query;

    const where: any = { userId };
    if (profileId) {
      where.profileId = profileId;
    }

    const dates = await prisma.date.findMany({
      where,
      include: {
        profile: true,
        evaluation: true
      },
      orderBy: { date: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const total = await prisma.date.count({ where });

    res.json({
      dates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get dates error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve dates'
    });
  }
});

// Create a new date
router.post('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { profileId, dateNumber, location, activity, duration, date } = req.body;

    const newDate = await prisma.date.create({
      data: {
        userId,
        profileId,
        dateNumber,
        location,
        activity,
        duration,
        date: new Date(date)
      },
      include: {
        profile: true
      }
    });

    res.status(201).json({
      message: 'Date created successfully',
      date: newDate
    });
  } catch (error) {
    console.error('Create date error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create date'
    });
  }
});

// Get a specific date
router.get('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const date = await prisma.date.findFirst({
      where: {
        id,
        userId
      },
      include: {
        profile: true,
        evaluation: true
      }
    });

    if (!date) {
      return res.status(404).json({
        error: 'Date not found',
        message: 'The specified date could not be found'
      });
    }

    res.json({ date });
  } catch (error) {
    console.error('Get date error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve date'
    });
  }
});

// Update a date
router.put('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { location, activity, duration, date, isCompleted } = req.body;

    const updatedDate = await prisma.date.updateMany({
      where: {
        id,
        userId
      },
      data: {
        location,
        activity,
        duration,
        date: date ? new Date(date) : undefined,
        isCompleted
      }
    });

    if (updatedDate.count === 0) {
      return res.status(404).json({
        error: 'Date not found',
        message: 'The specified date could not be found'
      });
    }

    res.json({
      message: 'Date updated successfully'
    });
  } catch (error) {
    console.error('Update date error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update date'
    });
  }
});

// Delete a date
router.delete('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deletedDate = await prisma.date.deleteMany({
      where: {
        id,
        userId
      }
    });

    if (deletedDate.count === 0) {
      return res.status(404).json({
        error: 'Date not found',
        message: 'The specified date could not be found'
      });
    }

    res.json({
      message: 'Date deleted successfully'
    });
  } catch (error) {
    console.error('Delete date error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete date'
    });
  }
});

export default router; 