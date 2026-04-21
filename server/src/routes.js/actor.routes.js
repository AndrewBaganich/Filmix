import { Router } from "express";
import { getAllActors,getActorById,createActor, deleteActor, updateActor} from "../controllers/actor.controller.js";
import { uploadToMemoryAvatar } from "../middlewares/uploadMemory.js";
import { validateAvatarActor } from "../middlewares/middleware.js";

const router = Router()

router.get("/", getAllActors)
router.get("/:id", getActorById)
router.post("/",uploadToMemoryAvatar, validateAvatarActor, createActor)
router.delete("/:id", deleteActor)
router.patch("/:id", updateActor)

export default router