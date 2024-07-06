import { Router } from "express";
import glubRoute from "./glub";
import authRoute from "./auth";
const router = Router();

router.use("/auth", authRoute);
router.use("/glub", glubRoute);

module.exports = router;
