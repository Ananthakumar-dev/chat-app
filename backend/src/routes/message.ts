import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { getAllContacts, getChatPartners, getMessageByUserId } from "../controller/message.controller.js";

const router = express.Router();
router.use(protectedRoute);

router.get('/contacts', getAllContacts);
router.get('/chat-partners', getChatPartners);
router.get('/:userId', getMessageByUserId);

export default router;