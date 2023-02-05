import { DataTypes, Model } from "sequelize";
  import db from "../config/database.config";

interface ContractAttribute {
  contractId: string;
  title: string;
  description: string;
  status:string;
  contractorId: string;
  clientId: string;
  deposit: Number;
  

}

export class ContractInstance extends Model<ContractAttribute> {}
ContractInstance.init(
  {
    contractId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "new",
    },
    contractorId: {
      type: DataTypes.STRING,
    },

    clientId: {
      type: DataTypes.STRING,
    },

    deposit: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },


  },
  {
    sequelize: db,
    tableName: "contract",
  }
);
