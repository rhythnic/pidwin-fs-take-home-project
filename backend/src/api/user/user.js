import express from "express";
import auth from "../../utils/auth.js";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import getAuthenticatedUser from "./get-authenticated-user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.get("/me", auth, getAuthenticatedUser);

export default router;
