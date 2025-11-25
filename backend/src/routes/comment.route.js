import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {addComment, updateComment, deleteComment} from "../controllers/comment.controller.js";


const router = Router();

router.route("/add_comment").post(verifyJWT, addComment);
router.route("/update_comment").patch(verifyJWT, updateComment);
router.route("/delete_comment/:commentId").delete(verifyJWT, deleteComment);




export default router;