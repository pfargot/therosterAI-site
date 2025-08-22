import { Router } from 'express';

const router = Router();

// In-memory storage for MVP (replace with database later)
let datesStorage: any[] = [];

// Get all dates for current user
router.get('/', async (req: any, res: any) => {
  try {
    const userId = req.user?.userId || 'test-user-id';
    
    // Filter dates by user (for MVP, just return all)
    const userDates = datesStorage.filter(date => date.userId === userId);

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
    const userId = req.user?.userId || 'test-user-id';
    const dateData = req.body;

    const newDate = {
      id: Date.now().toString(),
      userId,
      ...dateData,
      createdAt: new Date().toISOString()
    };

    datesStorage.push(newDate);

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
    const userId = req.user?.userId || 'test-user-id';
    const { id } = req.params;

    const date = datesStorage.find(d => d.id === id && d.userId === userId);

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
    const userId = req.user?.userId || 'test-user-id';
    const { id } = req.params;
    const updateData = req.body;

    const dateIndex = datesStorage.findIndex(d => d.id === id && d.userId === userId);

    if (dateIndex === -1) {
      return res.status(404).json({
        error: 'Date not found',
        message: 'The specified date could not be found'
      });
    }

    datesStorage[dateIndex] = { ...datesStorage[dateIndex], ...updateData };

    res.json({
      message: 'Date updated successfully',
      date: datesStorage[dateIndex]
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
    const userId = req.user?.userId || 'test-user-id';
    const { id } = req.params;

    const dateIndex = datesStorage.findIndex(d => d.id === id && d.userId === userId);

    if (dateIndex === -1) {
      return res.status(404).json({
        error: 'Date not found',
        message: 'The specified date could not be found'
      });
    }

    datesStorage.splice(dateIndex, 1);

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