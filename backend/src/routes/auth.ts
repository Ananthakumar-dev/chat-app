import express from "express";
import { signup, login, logout } from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.js";
import signupValidation from "../validations/auth/signup.validator.js";
import loginValidation from "../validations/auth/login.validator.js";
import { protectedRoute } from "../middleware/auth.js";

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.post('/logout', protectedRoute, logout);

export default router;