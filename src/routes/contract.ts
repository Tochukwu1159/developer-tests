const express = require('express');
const router = express.Router();

// const { getContractById, getNonTerminatedUserContracts } = require('../controller/contract.controller');
const { getProfile } = require('../middleware/getProfile');

const contractRouter = express.Router();

import {
    CreateContract,
    getAllContract,
    getContractById
  
} from "../controller/ContractController";

contractRouter.get('/create', getProfile, CreateContract);
contractRouter.get('/getall', getProfile, getAllContract);
contractRouter.get('/contracts/:id', getProfile, getContractById);




export default router;