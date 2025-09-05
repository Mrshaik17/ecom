import { Router } from 'express';
import { loginAdmin, verifyToken } from '../controllers/adminController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// POST /api/admin/login
router.post('/login', loginAdmin);

// GET /api/admin/verify  (used by frontend to confirm token still valid)
router.get('/verify', requireAuth, verifyToken);

export default router;
