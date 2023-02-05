"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractById = exports.getAllContract = exports.CreateContract = void 0;
const uuid_1 = require("uuid");
const Contract_1 = require("../model/Contract");
const Utils_1 = require("../utils/Utils");
async function CreateContract(req, res, next) {
    try {
        const id = (0, uuid_1.v4)();
        const profileId = req.user;
        const validateTransaction = Utils_1.createContractSchema.validate(req.body, Utils_1.options);
        if (validateTransaction.error) {
            return res.status(400).json({
                error: validateTransaction.error.details[0].message,
            });
        }
        const duplicateTitle = await Contract_1.ContractInstance.findOne({ where: { title: req.body.title } });
        if (duplicateTitle) {
            return res.status(409).json({
                msg: "Title already exist, please change tilte"
            });
        }
        const contract = await Contract_1.ContractInstance.create({
            id,
            ...req.body,
            profileId,
            status: 'new',
        });
        res.status(201).json({
            message: 'You have successfully made a transaction. Admin has been notified',
            contract,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to add account',
            route: '/add-transaction',
        });
    }
}
exports.CreateContract = CreateContract;
async function getAllContract(req, res, next) {
    try {
        const profileId = req.user;
        const profile = req.body.type === 'client' ? { ClientId: profileId } : { ContractorId: profileId };
        const contracts = await Contract_1.ContractInstance.findAndCountAll({
            where: {
                ...profile,
                status: ['new', 'in_progress']
            }
        });
        return res.status(200).json({
            message: 'You have successfully retrieved all contracts',
            contracts
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get account',
            route: '/get-accounts',
        });
    }
}
exports.getAllContract = getAllContract;
async function getContractById(req, res, next) {
    try {
        const id = req.params.id;
        const profileId = req.user;
        const contract = await Contract_1.ContractInstance.findOne({ where: { contractId: id,
                // [Op.or]: [{ contractorId: profileId }, { clientId: profileId }],
            },
        });
        return res.status(200).json({
            message: 'You have successfully retrieved all contracts',
            contract
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to get account',
            route: '/get-accounts',
        });
    }
}
exports.getContractById = getContractById;
//# sourceMappingURL=ContractController.js.map