import CommentController from "../controllers/CommentController";
import { Router } from "express";
import refreshToken from "../middlewares/verifyAuth";

const router = Router();

router.post("/", refreshToken, CommentController.createComment);

module.exports = router;
