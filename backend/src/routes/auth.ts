import express from "express";
import { signup, login, logout, updateProfile } from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.js";
import signupValidation from "../validations/auth/signup.validator.js";
import loginValidation from "../validations/auth/login.validator.js";
import { protectedRoute } from "../middleware/auth.js";
import updateProfileValidation from "../validations/auth/update_profile.validator.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.post('/logout', protectedRoute, logout);
router.patch('/update-profile', protectedRoute, upload.single('avatar'), updateProfileValidation, validate, updateProfile);

export default router;