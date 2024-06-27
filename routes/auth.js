import AuthController from "../controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/auth/signup", AuthController.createUser);
router.post("/auth/login", AuthController.login);

module.exports = router;
