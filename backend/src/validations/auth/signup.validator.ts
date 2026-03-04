import { body, ValidationChain } from "express-validator";

const signupValidation: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be string")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

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

export default signupValidation;