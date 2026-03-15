import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { send, update, destroy } from "../controller/chat.controller.js";

const router = express.Router();
router.use(protectedRoute);

router.post('/send', send);
router.put('/update/:id', update);
router.delete('/destroy/:id', destroy);

export default router;