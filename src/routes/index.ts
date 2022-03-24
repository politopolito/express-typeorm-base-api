import { Router } from "express";
import HomeRouter from "./HomeRouter";
import PhotoRouter from "./PhotoRouter";
import UserRouter from "./UserRouter";

/**
 * Main router for our express application
 */
const router = Router();

router.use((new PhotoRouter()).router);
router.use((new HomeRouter()).router);
router.use((new UserRouter()).router);

export default router;
