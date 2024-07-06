import GlubController from "../controllers/GlubController";
import { Router } from "express";
import refreshToken from "../middlewares/verifyAuth";

const router = Router();

router.post("/post", refreshToken, GlubController.glubPost);
router.get("/:glubId", refreshToken, GlubController.getGlubById);
router.put("/update/:glubId", refreshToken, GlubController.updateGlub);
router.delete("/:glubId", refreshToken, GlubController.deleteGlub);
router.get("/", GlubController.getAllPublishedPosts);

module.exports = router;
