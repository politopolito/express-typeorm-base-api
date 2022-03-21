import { Router } from "express";
import HomeRouter from "./HomeRouter";
import PhotoRouter from "./PhotoRouter";

const router = Router();

router.use((new PhotoRouter()).router);
router.use((new HomeRouter()).router);

export default router;
