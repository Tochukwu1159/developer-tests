"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const Contract_1 = require("../model/Contract");
class ProfileInstance extends sequelize_1.Model {
}
exports.ProfileInstance = ProfileInstance;
ProfileInstance.init({
    profileId: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "idle",
    },
    balance: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "profile",
});
// ProfileInstance.hasMany(ContractInstance, {foreignKey:"ContractorId", as:"contractor"});
// ContractInstance.belongsTo(ProfileInstance, {foreignKey:"ContractorId", as:"contractor"});
// // ProfileInstance.hasMany(ContractInstance, {foreignKey:"ClientId", as:"client"});
// // ContractInstance.belongsTo(ProfileInstance, {foreignKey:"ContractorId", as:"client"});
// ContractInstance.hasMany(JobInstance, {foreignKey:"ContractorId", as:"client"});
// JobInstance.hasMany(JobInstance, {foreignKey:"ContractorId", as:"client"});
ProfileInstance.hasMany(Contract_1.ContractInstance, { foreignKey: "ContractorId", as: "contractor" });
//# sourceMappingURL=Profile.js.map