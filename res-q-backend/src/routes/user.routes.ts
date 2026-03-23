import { Router } from "express";
import { createUser, getUserById } from "../controllers/user.controller";

const router= Router();

router.post("/register",createUser);
router.get("/:id", getUserById);

export default router;