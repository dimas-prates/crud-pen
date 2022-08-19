import { Router } from "express";
import { BalanceController } from '../controller/BalanceController'

const balanceRoutes = Router()

balanceRoutes.get('/:id', new BalanceController().get)
balanceRoutes.post('/', new BalanceController().create)
balanceRoutes.put('/:id', new BalanceController().update)
balanceRoutes.delete('/:id', new BalanceController().delete)

export default balanceRoutes