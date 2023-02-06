import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { ContractInstance } from "../model/Contract"
import { JobInstance } from "../model/Job"

interface UserAttributes {
  profileId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: number;
  password: string;
  balance: number;
  
  
}

export class ProfileInstance extends Model<UserAttributes> {}

ProfileInstance.init(
  {
    profileId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

   firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "idle",
    },
    balance: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

  },
  {
    sequelize: db,
    tableName: "profile",
  }
);

ProfileInstance.hasMany(ContractInstance, {foreignKey:"ContractorId", as:"contractor"});
ContractInstance.belongsTo(ProfileInstance, {foreignKey:"ContractorId", as:"contractor"});
 ProfileInstance.hasMany(ContractInstance, {foreignKey:"ClientId", as:"client"});
 ContractInstance.belongsTo(ProfileInstance, {foreignKey:"ContractorId", as:"client"});
ContractInstance.hasMany(JobInstance, {foreignKey:"ContractorId", as:"client"});
JobInstance.hasMany(ContractInstance, {foreignKey:"ContractorId", as:"client"});



