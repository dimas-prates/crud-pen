import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRoutes = Router()

userRoutes.get('/', new UserController().list)
userRoutes.get('/:id', new UserController().get)
userRoutes.post('/', new UserController().create)
userRoutes.put('/:id', new UserController().update)
userRoutes.delete('/:id', new UserController().remove)

export default userRoutes;