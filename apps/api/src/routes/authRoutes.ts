import { Router } from "express";
import {
  signIn,
  signOut,
  refresh,
  signUp,
} from "../controllers/authController.js";

const router: Router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/refresh", refresh);

export default router;
