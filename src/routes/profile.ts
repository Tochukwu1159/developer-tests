import express from "express";

const router = express.Router();

import {
    RegisterProfile,
    LoginProfile,
} from "../controller/ProfileController";

router.post("/create", RegisterProfile);
router.get("/login", LoginProfile);
export default router;
