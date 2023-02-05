const express = require('express');
const router = express.Router();
const { getProfile } = require('../middleware/getProfile');

const jobRoutes = express.Router();

// jobRoutes.get('/unpaid', getProfile, getUnpaidJobs);
// jobRoutes.post('/:id/pay', getProfile, payJob);

export default router;