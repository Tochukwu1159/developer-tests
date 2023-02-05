"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.createJobSchema = exports.createContractSchema = exports.loginProfileSchema = exports.createProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createProfileSchema = joi_1.default.object().keys({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
    phoneNumber: joi_1.default.number().required(),
    password: joi_1.default.string().required(),
});
exports.loginProfileSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.createContractSchema = joi_1.default.object().keys({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    deposit: joi_1.default.number().required(),
});
exports.createJobSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required(),
    price: joi_1.default.string().required(),
    paymentStatus: joi_1.default.string(),
    deposit: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    paid: joi_1.default.boolean().required(),
});
//Generate Token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
//# sourceMappingURL=Utils.js.map