import { Router } from "express";
import glubRoute from "./glub";
import authRoute from "./auth";
import commentRoute from "./comment";
const router = Router();

router.use("/auth", authRoute);
router.use("/glub", glubRoute);
router.use("/comment", commentRoute);

module.exports = router;
