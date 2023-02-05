import express from "express";

const router = express.Router();

import {
    RegisterProfile,
    LoginProfile,
    // getUsers,
} from "../controller/ProfileController";

router.post("/create", RegisterProfile);
router.get("/login", LoginProfile);
// router.get("/read", getUsers);
// router.post('/deposit/:userId', deposit);
export default router;
