import express,{Request,Response,NextFunction}
 from 'express'
 import {v4 as uuidv4} from 'uuid'
 import {createProfileSchema,options,loginProfileSchema,generateToken} from "../utils/Utils"
 import {ProfileInstance } from "../model/Profile"
 import bcrypt from 'bcryptjs'
import { ContractInstance } from "../model/Contract"

export async function RegisterProfile(req:Request, res:Response, next:NextFunction) {
    const id = uuidv4()
    try{ 
        const validationResult = createProfileSchema.validate(req.body,options)
        if( validationResult.error){
           return res.status(400).json({
              Error:validationResult.error.details[0].message
           })
        }
        const duplicatEmail = await ProfileInstance.findOne({where:{email:req.body.email}})
        if(duplicatEmail){
         return res.status(409).json({
            msg:"Email is used, please change email"
         })
        }

        const duplicatePhone = await ProfileInstance.findOne({where:{phoneNumber:req.body.phonenumber}})

        if(duplicatePhone){
         return res.status(409).json({
            msg:"Phone number is used"
         })
        }
        const passwordHash = await bcrypt.hash(req.body.password,8)
       const record = await ProfileInstance.create({ 
         profileId:id,
          firstName:req.body.firstname,
          lastName:req.body.lastName,
          email:req.body.email,
          role:req.body.role,
          phoneNumber:req.body.phonenumber,
          password:passwordHash,
          balance:req.body.balance
        })
       res.status(201).json({
           msg:"You have successfully created a profile",
           record
       })
    }catch(err){
       res.status(500).json({
        msg:'failed to register',
        route:'/register'
       })
    }
 
 }


 export async function LoginProfile(req:Request, res:Response, next:NextFunction) {
   const id = uuidv4()
   try{ 
       const validationResult = loginProfileSchema.validate(req.body,options)
       
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       }
       const User = await ProfileInstance.findOne({where:{email:req.body.email}}) as unknown as {[key:string]:string}
        
       const {id} =User
       const token = generateToken({id})
      const validUser = await bcrypt.compare(req.body.password, User.password);

      if(!validUser){
         res.status(401).json({
            message:"Password do not match"
        })
      }

      if(validUser){
         res.status(200).json({
             message:"Successfully logged in",
             token,
             User

         })
      }

}catch(err){
   res.status(500).json({
    msg:'failed to login',
    route:'/login'
   })
}

}

