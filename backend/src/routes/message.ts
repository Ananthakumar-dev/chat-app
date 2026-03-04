import express from "express";
import { protectedRoute } from "../middleware/auth";
import { getAllContacts, getChatPartners, getMessageById } from "../controller/message.controller";

const router = express.Router();
router.use(protectedRoute);

router.get('/contacts', getAllContacts);
router.get('/chat', getChatPartners);
router.get('/:id', getMessageById);

export default router;