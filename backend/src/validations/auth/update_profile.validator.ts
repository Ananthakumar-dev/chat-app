import { body, ValidationChain } from "express-validator";

const updateProfileValidation: ValidationChain[] = [
    body('name')
        .optional()
        .isString()
        .withMessage("Name must be string")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("avatar")
        .optional()
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Avatar file is required");
            }
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error("Only JPEG, PNG, and GIF files are allowed");
            }
            return true;
        }),
];

export default updateProfileValidation;