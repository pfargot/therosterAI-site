import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all insights for current user
router.get('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, type, isRead } = req.query;

    const where: any = { userId };
    if (type) where.type = type;
    if (isRead !== undefined) where.isRead = isRead === 'true';

    const insights = await prisma.insight.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const total = await prisma.insight.count({ where });

    res.json({
      insights,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve insights'
    });
  }
});

// Mark insight as read
router.put('/:id/read', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const updatedInsight = await prisma.insight.updateMany({
      where: {
        id,
        userId
      },
      data: {
        isRead: true
      }
    });

    if (updatedInsight.count === 0) {
      return res.status(404).json({
        error: 'Insight not found',
        message: 'The specified insight could not be found'
      });
    }

    res.json({
      message: 'Insight marked as read'
    });
  } catch (error) {
    console.error('Mark insight read error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to mark insight as read'
    });
  }
});

export default router; 