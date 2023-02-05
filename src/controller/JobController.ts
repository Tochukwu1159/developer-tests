
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid';
import { ContractInstance } from "../model/Contract";
import { JobInstance } from "../model/Job";
import { ProfileInstance } from "../model/Profile";
import { createJobSchema, options } from '../utils/Utils';
import { Op } from "sequelize";



export async function CreateJob(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const id = uuidv4();
    const profileId = req.user;

    const { contractorId, contractId } = req.param
    const validUser: any = await ProfileInstance.findOne({ where: { profileId: contractorId } })
    const validContract = await ContractInstance.findOne({ where: { contractId: contractId } })
    if (validContract && validUser.role === "contractor") {
      const createJob = createJobSchema.validate(req.body, options);
      if (createJob.error) {
        return res.status(400).json({
          error: createJob.error.details[0].message,
        });
      }
      const job = await JobInstance.create({ id, ...req.body, profileId, contractId });
      res.status(201).json({
        message: 'You have successfully added a job',
        job,
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({   //getAllUnPaidJobs
      error: 'Failed to add job',
      route: '/add-job',
    });
  }
}

export async function getAllUnPaidJobs(req: Request | any, res: Response, next: NextFunction) {
  try {
    const profileId = req.user;
    const unpaidJobs: any = await JobInstance.findAll({
      where: {
        [Op.or]: [
          { paid: false },
        ],
      },
      include: [{
        attributes: [],
        model: ContractInstance,
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
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch job',
      route: '/add-job',
    });
  }
}



export async function payForJob(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { jobId } = req.param
    const profileId = req.user;
    const validJob: any = await JobInstance.findOne({ where: { jobId: jobId } })
    const validUser: any = await ProfileInstance.findOne({ where: { profileId: profileId } })
    let { balance } = validUser;
    const { amount } = req.body
    if (balance <= amount) {
      return res.status(400).json({
        message: 'insufficient fund',
      });
    }
    if(validJob.role == true){
      return res.status(400).json({
        message: 'already paid for the job',
      });

    }
    const newbalance = balance - amount;
    await ProfileInstance.update({ balance: newbalance },
      { where: { profileId } })

    await JobInstance.update({ paid: true },
      { where: { jobId } })

    res.status(201).json({
      message: 'You have successfully added a job',
    });

  }
  catch (error) {
    // console.log(error);
    return res.status(500).json({   //getAllUnPaidJobs
      error: 'Failed to add job',
      route: '/add-job',
    });
  }
}


//`/balances/deposit/:userId`
export async function clientDeposit(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { userId } = req.param;
    const validJob: any = await ProfileInstance.findOne({ where: { profileId: userId } })
    const { balance } = validJob
    const { amount } = req.body;
    if (!validJob) {
      return res.status(400).json({
        message: 'user do not exist',
      });
    }

      const newBalance = balance + amount;

      await ProfileInstance.update({
        balance: newBalance
      }, { where:{profileId: userId}})

      return res.status(200).json({
        message: 'deposited successful',
        balance,
      
      });


  } catch (error) {
    // console.log(error);
    return res.status(500).json({   //getAllUnPaidJobs
      error: 'Failed to add job',
      route: '/add-job',
    });
  }
}


