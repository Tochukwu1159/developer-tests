"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class JobInstance extends sequelize_1.Model {
}
exports.JobInstance = JobInstance;
JobInstance.init({
    jobId: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    contractId: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    contractorId: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    deposit: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    paid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize: database_config_1.default,
    tableName: "job",
});
//# sourceMappingURL=Job.js.map