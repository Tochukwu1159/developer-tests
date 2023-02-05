import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface JobAttribute {
  jobId: string;
  description: string;
  price: string;
  location: string;
  paymentStatus: boolean;
  contractId: string;
  contractorId:string;
  deposit:number;
  paid: boolean;
  
  
 
}

export class JobInstance extends Model<JobAttribute> {}
JobInstance.init(
  {
    jobId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    location: {
      type: DataTypes.STRING,
    },
    paymentStatus: {
        type: DataTypes.BOOLEAN,
      },
      contractId: {
        type: DataTypes.BOOLEAN,
      },
      contractorId: {
        type: DataTypes.BOOLEAN,
      },
      deposit: {
        type: DataTypes.NUMBER,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
  },
  {
    sequelize: db,
    tableName: "job",
  }
);
