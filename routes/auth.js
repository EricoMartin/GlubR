import AuthController from "../controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/signup", AuthController.createUser);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

module.exports = router;
