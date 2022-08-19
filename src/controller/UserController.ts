import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { User } from '../entity/User'
import { userRepository } from '../repository/userRepository'

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and Email are required.' })
        }
        try {
            let id = randomUUID()
            while (await userRepository.countBy({ id }) == 1) {
                id = randomUUID()
            }
            const newUser = userRepository.create({ id, name, email })
            await userRepository.save(newUser)
            return res.status(200).json({ message: `Created user: ${newUser.name}, ID: ${newUser.id}` })
        } catch (err) {
            return console.log(err)
        }
    }

    async list(req: Request, res: Response) {
        try {
            const allUsers = await userRepository.find({ relations: {} })
            return res.status(200).json(allUsers)
        } catch (err) {
            return console.log(err)
        }
    }

    async get(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({ message: 'ID is required' })
        }
        try {
            if (await userRepository.countBy({ id }) == 0) {
                return res.status(404).json({ message: `User doesn't exist` })
            }
            const user = await userRepository.findOne({ where: { id }, relations: {} })
            return res.status(200).json(user)
        } catch (err) {
            return console.log(err)
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, email } = req.body
        const user = new User(name, email)

        if (!name && !email) {
            return res.status(400).json({ message: 'Must inform name or email to update' })
        }

        // if (!userRepository.hasId(user)) {
        if (!id) {
            return res.status(404).json({ message: 'ID is required' })
        }

        try {

            if (await userRepository.countBy({ id }) == 0) {
                return res.status(404).json({ message: `User doesn't exist` })
            }

            // const outdatedUser = await userRepository.findOneBy({id})
            const outdatedUser = await userRepository.findOne({
                where: { id: id },
                relations: {}
            })

            const updatedUser = {
                ...outdatedUser,
                ...user
            }

            if (JSON.stringify(outdatedUser) == JSON.stringify(updatedUser)) {
                return res.status(400).json({ message: `Nothing to update` })
            }

            await userRepository.save(updatedUser)
            return res.status(200).json({ message: `User updated with ID:${updatedUser.id}` })
        } catch (err) { console.log(err) }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(404).json({ message: 'ID is required' })
        }
        try {

            if (await userRepository.countBy({ id }) == 0) {
                return res.status(404).json({ message: `User doesn't exist` })
            }

            await userRepository.delete(id)
            return res.status(200).json({ message: `User deleted with ID:${id}` })
        } catch (err) { console.log(err) }

    }

    async checkUser(id: string) {
        try {
            if (await userRepository.countBy({ id }) == 0) {
                return false;
            }
            return await userRepository.findOne({ where: { id }, relations: { balances: true } })
        } catch (err) { console.log(err) }
    }
    async getBalance(req: Request, res: Response) {
        const { id } = req.params
        try {
            if (await userRepository.countBy({ id }) == 0) {
                return res.send(400).json({ message: 'User not found' });
            }
            const user = await userRepository.findOne({ where: { id }, relations: { balances: true } })
            return res.status(200).json(user?.balances)
        } catch (err) { console.log(err) }
    }
}