const express = require('express');
const router = express.Router();
const { getProfile } = require('../middleware/getProfile');

const jobRoutes = express.Router();
import {
    payForJob,
    getAllUnPaidJobs
} from "../controller/JobController";


jobRoutes.get('/jobs/:job_id/pay', getProfile, payForJob);
jobRoutes.post('/balances/deposit/:userId/pay', getProfile, getAllUnPaidJobs);

export default router;