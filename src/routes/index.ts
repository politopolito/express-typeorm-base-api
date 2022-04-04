import {
  Router,
} from "express";
import HomeRouter from "./HomeRouter";
import PhotoRouter from "./PhotoRouter";
import UserRouter from "./UserRouter";
import AuthRouter from "./AuthRouter";

/**
 * Main router for our express application
 */
const router = Router();

router.use((new UserRouter().router));
router.use((new PhotoRouter()).router);
router.use((new HomeRouter()).router);
router.use((new AuthRouter()).router);

export default router;
