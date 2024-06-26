import AuthController from "../controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/auth/signup", AuthController.createUser);

module.exports = router;
