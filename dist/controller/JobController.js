"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUnPaidJobs = exports.CreateJob = void 0;
const uuid_1 = require("uuid");
const Contract_1 = require("../model/Contract");
const Job_1 = require("../model/Job");
const Profile_1 = require("../model/Profile");
const Utils_1 = require("../utils/Utils");
const sequelize_1 = require("sequelize");
async function CreateJob(req, res, next) {
    try {
        const id = (0, uuid_1.v4)();
        const profileId = req.user;
        const { contractorId, contractId } = req.param;
        const validUser = await Profile_1.ProfileInstance.findOne({ where: { profileId: contractorId } });
        const validContract = await Contract_1.ContractInstance.findOne({ where: { contractId: contractId } });
        if (validContract && validUser.role === "contractor") {
            const createJob = Utils_1.createJobSchema.validate(req.body, Utils_1.options);
            if (createJob.error) {
                return res.status(400).json({
                    error: createJob.error.details[0].message,
                });
            }
            const job = await Job_1.JobInstance.create({ id, ...req.body, profileId, contractId });
            res.status(201).json({
                message: 'You have successfully added a job',
                job,
            });
        }
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({
            error: 'Failed to add job',
            route: '/add-job',
        });
    }
}
exports.CreateJob = CreateJob;
async function getAllUnPaidJobs(req, res, next) {
    try {
        const profileId = req.user;
        const unpaidJobs = await Job_1.JobInstance.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { paid: false },
                ],
            },
            include: [{
                    attributes: [],
                    model: Contract_1.ContractInstance,
                    required: true,
                    where: {
                        status: 'in_progress'
                    },
                },
            ],
        });
        res.status(201).json({
            message: 'You have successfully fetched all unpaid  job',
            unpaidJobs,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch job',
            route: '/add-job',
        });
    }
}
exports.getAllUnPaidJobs = getAllUnPaidJobs;
// export async function payForJob(req: Request | any,res: Response,next: NextFunction) {
//   try {
//     const {jobId} = req.param
//     const profileId = req.user;
//     const validJob: any = await JobInstance.findOne({ where: { jobId: jobId } })
//     const validUser: any = await ProfileInstance.findOne({ where: { profileId: profileId } })
//     let {balance} = validUser;
//     const {amount} = req.body
//     if(balance <= amount){
//       return res.status(400).json({
//         message: 'insufficient fund',  
//       });
//     }
//    const newbalance = balance - amount;
//     }
//       res.status(201).json({
//         message: 'You have successfully added a job',
//         ,
//       });
//     }
//   } catch (error) {
//     // console.log(error);
//     return res.status(500).json({   //getAllUnPaidJobs
//       error: 'Failed to add job',
//       route: '/add-job',
//     });
//   }
//# sourceMappingURL=JobController.js.map