import express from 'express';
const router = express.Router();

// Example route
router.post('/login', (req, res) => {
  res.send('Login route');
});

// Ensure all routes are correctly defined and do not use strings where functions are expected.
export default router;
