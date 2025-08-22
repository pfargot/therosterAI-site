import { Router } from 'express';
import { createDate, findDatesByUserId, findDateById, updateDate, deleteDate, getStorageStats } from '../services/storageService';

const router = Router();

// Get all dates for current user
router.get('/', async (req: any, res: any) => {
  try {
    // For MVP, we'll use a simple user ID from the token or fallback
    const userId = req.user?.userId || req.headers['x-user-id'] || 'test-user-id';
    
    console.log('Getting dates for user:', userId);
    console.log('Storage stats:', getStorageStats());
    
    // Get dates for user
    const userDates = findDatesByUserId(userId);
    console.log('User dates found:', userDates.length);

    res.json({
      dates: userDates,
      pagination: {
        page: 1,
        limit: userDates.length,
        total: userDates.length,
        pages: 1
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
    const userId = req.user?.userId || req.headers['x-user-id'] || 'test-user-id';
    const dateData = req.body;

    console.log('Creating date for user:', userId);
    console.log('Date data:', dateData);

    const newDate = {
      id: Date.now().toString(),
      userId,
      ...dateData,
      createdAt: new Date().toISOString()
    };

    createDate(newDate);
    console.log('Date saved. Storage stats:', getStorageStats());

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
    const userId = req.user?.userId || req.headers['x-user-id'] || 'test-user-id';
    const { id } = req.params;

    const date = findDateById(id);
    if (!date || date.userId !== userId) {
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
    const userId = req.user?.userId || req.headers['x-user-id'] || 'test-user-id';
    const { id } = req.params;
    const updateData = req.body;

    const updatedDate = updateDate(id, userId, updateData);
    if (!updatedDate) {
      return res.status(404).json({
        error: 'Date not found',
        message: 'The specified date could not be found'
      });
    }

    res.json({
      message: 'Date updated successfully',
      date: updatedDate
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
    const userId = req.user?.userId || req.headers['x-user-id'] || 'test-user-id';
    const { id } = req.params;

    const success = deleteDate(id, userId);
    if (!success) {
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