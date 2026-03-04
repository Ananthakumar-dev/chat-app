import { body, ValidationChain } from "express-validator";

const loginValidation: ValidationChain[] = [
     body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),
    
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
        .withMessage("Password must contain at least one letter and one number")
];

export default loginValidation;