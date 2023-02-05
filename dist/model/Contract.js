"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class ContractInstance extends sequelize_1.Model {
}
exports.ContractInstance = ContractInstance;
ContractInstance.init({
    contractId: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "new",
    },
    contractorId: {
        type: sequelize_1.DataTypes.STRING,
    },
    clientId: {
        type: sequelize_1.DataTypes.STRING,
    },
    deposit: {
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "contract",
});
//# sourceMappingURL=Contract.js.map