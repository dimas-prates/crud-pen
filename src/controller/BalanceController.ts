import { Request, Response } from 'express'
import { UserController } from './UserController'
import { balanceRepository } from '../repository/balanceRepository'
import { Balance } from '../entity/Balance'

export class BalanceController {
    async create(req: Request, res: Response) {
        const { user_id, value, description, date } = req.body
        if (!user_id || !value || !date) {
            return res.status(400).json({ message: 'User id, value and date are required' })
        }
        const checkUser = new UserController().checkUser

        try {
            const user = await checkUser(user_id)
            console.log(user, user_id)
            if (!user) {
                return res.status(404).json({ message: "User fot found" })
            }
            const newBalance = balanceRepository.create({ value, description, date, user })
            await balanceRepository.save(newBalance)
            return res.status(200).json(newBalance)
        } catch (err) { console.log(err) }
    }

    async get(req: Request, res: Response) {
        const idBalance = req.params

        try {
            if (await balanceRepository.countBy(idBalance) == 0) {
                return res.status(400).json({ message: 'Balance id invalid' })
            }
            const balance = await balanceRepository.findOneBy(idBalance)

            return res.status(200).json(balance)
        } catch (err) { console.log(err) }
    }

    async update(req: Request, res: Response) {
        const { user_id, value, description, date } = req.body
        const { id } = req.params
        if (!user_id || !value || !date) {
            return res.status(400).json({ message: 'User id, value and date are required' })
        }
        const checkUser = new UserController().checkUser
        try {
            const user = await checkUser(user_id)
            if (!user) {
                return res.status(404).json({ message: "User fot found" })
            }
            if (await balanceRepository.countBy({ id }) == 0) {
                return res.status(400).json({ message: 'Balance id invalid' })
            }
            const newBalance = new Balance(id, value, description, date, user)

            await balanceRepository.save(newBalance)
            res.status(200).json(newBalance)
        } catch (err) { console.log(err) }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            if (await balanceRepository.countBy({ id }) == 0) {
                return res.status(400).json({ message: 'Balance id invalid' })
            }
            await balanceRepository.delete(id)
            return res.status(200).json({ message: `Deleted balance with ID: ${id}` })
        } catch (err) { console.log(err) }
    }
}