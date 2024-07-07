import GlubController from "../controllers/GlubController";
import { Router } from "express";
import refreshToken from "../middlewares/verifyAuth";

const router = Router();

router.post("/post", refreshToken, GlubController.glubPost);
router.get("/:glubId", refreshToken, GlubController.getGlubById);
router.put("/update/:glubId", refreshToken, GlubController.updateGlub);
router.delete("/:glubId", refreshToken, GlubController.deleteGlub);
router.get("/", GlubController.getAllPublishedPosts);
router.post("/:glubId/like", refreshToken, GlubController.postLike);
router.post("/:glubId/dislike", refreshToken, GlubController.postDislike);

module.exports = router;
