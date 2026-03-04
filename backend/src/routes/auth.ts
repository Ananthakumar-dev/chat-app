import express from "express";
import { signup, login, logout } from "../controller/auth.controller";
import { validate } from "../middleware/validate";
import signupValidation from "../validations/auth/signup.validator";
import loginValidation from "../validations/auth/login.validator";
import { protectedRoute } from "../middleware/auth";

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.post('/logout', protectedRoute, logout);

export default router;