import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all evaluations for current user
router.get('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, dateId } = req.query;

    const where: any = { userId };
    if (dateId) {
      where.dateId = dateId;
    }

    const evaluations = await prisma.dateEvaluation.findMany({
      where,
      include: {
        date: {
          include: {
            profile: true
          }
        },
        tags: true
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const total = await prisma.dateEvaluation.count({ where });

    res.json({
      evaluations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get evaluations error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve evaluations'
    });
  }
});

// Create a new evaluation
router.post('/', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const {
      dateId,
      vibeCheck,
      chemistryRating,
      attractionRating,
      greenFlags,
      redFlags,
      emotionalImpact,
      conversationQuality,
      effortLevel,
      bodyLanguage,
      consistencyCheck,
      powerDynamics,
      wouldIntroduceToFriends,
      remindedOf,
      songMovieFit,
      emojiSummary,
      customTags,
      tagIds
    } = req.body;

    const evaluation = await prisma.dateEvaluation.create({
      data: {
        dateId,
        userId,
        vibeCheck,
        chemistryRating,
        attractionRating,
        greenFlags,
        redFlags,
        emotionalImpact,
        conversationQuality,
        effortLevel,
        bodyLanguage,
        consistencyCheck,
        powerDynamics,
        wouldIntroduceToFriends,
        remindedOf,
        songMovieFit,
        emojiSummary,
        customTags,
        tags: {
          connect: tagIds?.map((id: string) => ({ id })) || []
        }
      },
      include: {
        date: {
          include: {
            profile: true
          }
        },
        tags: true
      }
    });

    res.status(201).json({
      message: 'Evaluation created successfully',
      evaluation
    });
  } catch (error) {
    console.error('Create evaluation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create evaluation'
    });
  }
});

// Get a specific evaluation
router.get('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const evaluation = await prisma.dateEvaluation.findFirst({
      where: {
        id,
        userId
      },
      include: {
        date: {
          include: {
            profile: true
          }
        },
        tags: true
      }
    });

    if (!evaluation) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: 'The specified evaluation could not be found'
      });
    }

    res.json({ evaluation });
  } catch (error) {
    console.error('Get evaluation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve evaluation'
    });
  }
});

// Update an evaluation
router.put('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const {
      vibeCheck,
      chemistryRating,
      attractionRating,
      greenFlags,
      redFlags,
      emotionalImpact,
      conversationQuality,
      effortLevel,
      bodyLanguage,
      consistencyCheck,
      powerDynamics,
      wouldIntroduceToFriends,
      remindedOf,
      songMovieFit,
      emojiSummary,
      customTags,
      tagIds
    } = req.body;

    const updatedEvaluation = await prisma.dateEvaluation.updateMany({
      where: {
        id,
        userId
      },
      data: {
        vibeCheck,
        chemistryRating,
        attractionRating,
        greenFlags,
        redFlags,
        emotionalImpact,
        conversationQuality,
        effortLevel,
        bodyLanguage,
        consistencyCheck,
        powerDynamics,
        wouldIntroduceToFriends,
        remindedOf,
        songMovieFit,
        emojiSummary,
        customTags
      }
    });

    if (updatedEvaluation.count === 0) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: 'The specified evaluation could not be found'
      });
    }

    // Update tags if provided
    if (tagIds) {
      await prisma.dateEvaluation.update({
        where: { id },
        data: {
          tags: {
            set: tagIds.map((tagId: string) => ({ id: tagId }))
          }
        }
      });
    }

    res.json({
      message: 'Evaluation updated successfully'
    });
  } catch (error) {
    console.error('Update evaluation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update evaluation'
    });
  }
});

// Delete an evaluation
router.delete('/:id', async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deletedEvaluation = await prisma.dateEvaluation.deleteMany({
      where: {
        id,
        userId
      }
    });

    if (deletedEvaluation.count === 0) {
      return res.status(404).json({
        error: 'Evaluation not found',
        message: 'The specified evaluation could not be found'
      });
    }

    res.json({
      message: 'Evaluation deleted successfully'
    });
  } catch (error) {
    console.error('Delete evaluation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete evaluation'
    });
  }
});

export default router; 