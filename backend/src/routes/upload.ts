import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    console.log('Accepting file:', file.originalname, 'Type:', file.mimetype);
    cb(null, true);
  } else {
    console.log('Rejecting file:', file.originalname, 'Type:', file.mimetype);
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Increased to 10MB limit
  }
});

// Upload profile image
router.post('/profile-image', upload.single('image'), async (req: any, res: any) => {
  try {
    console.log('Upload request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please select an image to upload'
      });
    }

    console.log('File uploaded successfully:', req.file.filename);

    // Create a URL for the uploaded file
    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to upload image',
      details: error.message
    });
  }
});

// Error handling middleware for multer
router.use((error: any, req: any, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    console.error('Multer error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'Image file must be less than 10MB'
      });
    }
    return res.status(400).json({
      error: 'Upload error',
      message: error.message
    });
  }
  next(error);
});

// Serve uploaded images
router.get('/uploads/:filename', (req: any, res: any) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadsDir, filename);
  
  console.log('Serving file:', filename);
  console.log('File path:', filePath);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.log('File not found:', filePath);
    res.status(404).json({
      error: 'File not found',
      message: 'Image not found'
    });
  }
});

export default router; 