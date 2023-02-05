import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ProfileInstance } from "../model/Profile"
import { ContractInstance } from "../model/Contract"
import { createContractSchema, options } from "../utils/Utils";
import{Op} from "sequelize";


export async function CreateContract(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try{
  const id = uuidv4();
  const profileId = req.user;

  const validateTransaction = createContractSchema.validate(req.body, options);

  if (validateTransaction.error) {
    return res.status(400).json({
      error: validateTransaction.error.details[0].message,
    });
  }

  const duplicateTitle = await ContractInstance.findOne({where:{title:req.body.title}})
  if(duplicateTitle){
   return res.status(409).json({
      msg:"Title already exist, please change tilte"
   })
  }
    // const { contractorId, contractId } = req.param
    const validUser: any = await ProfileInstance.findOne({ where: { profileId: profileId } })
    if (validUser.role === "contractor") {

  const contract = await ContractInstance.create({
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
} catch (error) {
  return res.status(500).json({
    error: 'Failed to add account',
    route: '/add-transaction',
  });
}
}

export async function getAllContract(req: Request | any,res: Response,next: NextFunction) {
  try{
  const profileId = req.user;
      const profile = req.body.type === 'client' ? { ClientId: profileId } : { ContractorId: profileId };
      const contracts = await ContractInstance.findAndCountAll({
        where: {
            ...profile,
            status: ['new', 'in_progress']
        }
    });

      return res.status(200).json({
        message: 'You have successfully retrieved all contracts',
       contracts
      });
    }catch (error) {
      return res.status(500).json({
        error: 'Failed to get account',
        route: '/get-accounts',
      });
    }
    }



    export async function getContractById(req: Request | any,res: Response,next: NextFunction) {
      try{
      const id = req.params.id;
      const profileId = req.user;
      const contract:any = await ContractInstance.findOne({ where: {contractId: id,
        // [Op.or]: [{ contractorId: profileId }, { clientId: profileId }],
      },
    });

      return res.status(200).json({
        message: 'You have successfully retrieved all contracts',
       contract
      });

  }catch (error) {
    return res.status(500).json({
      error: 'Failed to get account',
      route: '/get-accounts',
    });
  }
  }
  
  
    