import AuthController from "../controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/auth/signup", AuthController.createUser);
router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.logout);

module.exports = router;
