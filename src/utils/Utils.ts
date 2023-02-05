import Joi from "joi";
import jwt from "jsonwebtoken";

export const createProfileSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  role:Joi.string().required(),
  phoneNumber: Joi.number().required(),
  password:Joi.string().required(),
  
  
});

export const loginProfileSchema = Joi.object().keys({
  email: Joi.string().required(),
  password:Joi.string().required(),
 
});

export const createContractSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  status: Joi.string().required(),
  deposit: Joi.number().required(),

});

export const createJobSchema = Joi.object().keys({
  description: Joi.string().required(),
  price: Joi.string().required(),
  paymentStatus: Joi.string(),
  deposit: Joi.string().required(),
  location: Joi.string().required(),
  paid: Joi.boolean().required(),
});



//Generate Token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: "7d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
