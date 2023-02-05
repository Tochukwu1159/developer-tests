"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginProfile = exports.RegisterProfile = void 0;
const uuid_1 = require("uuid");
const Utils_1 = require("../utils/Utils");
const Profile_1 = require("../model/Profile");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function RegisterProfile(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = Utils_1.createProfileSchema.validate(req.body, Utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const duplicatEmail = await Profile_1.ProfileInstance.findOne({ where: { email: req.body.email } });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email"
            });
        }
        const duplicatePhone = await Profile_1.ProfileInstance.findOne({ where: { phoneNumber: req.body.phonenumber } });
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used"
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await Profile_1.ProfileInstance.create({
            profileId: id,
            firstName: req.body.firstname,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
            phoneNumber: req.body.phonenumber,
            password: passwordHash,
            balance: req.body.balance
        });
        res.status(201).json({
            msg: "You have successfully created a profile",
            record
        });
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to register',
            route: '/register'
        });
    }
}
exports.RegisterProfile = RegisterProfile;
async function LoginProfile(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = Utils_1.loginProfileSchema.validate(req.body, Utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const User = await Profile_1.ProfileInstance.findOne({ where: { email: req.body.email } });
        const { id } = User;
        const token = (0, Utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.status(401).json({
                message: "Password do not match"
            });
        }
        if (validUser) {
            res.status(200).json({
                message: "Successfully logged in",
                token,
                User
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.LoginProfile = LoginProfile;
//# sourceMappingURL=ProfileController.js.map