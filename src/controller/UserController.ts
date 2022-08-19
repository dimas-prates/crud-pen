import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { User } from '../entity/User'
import { userRepository } from '../repository/userRepository'

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body
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
            const user = await userRepository.findOneBy({ id })
            return res.status(200).json(user)
        } catch (err) {
            return console.log(err)
        }
    }
    async update(req: Request, res: Response) {
        const { id } = req.params
        // const user:User = req.body
        const { name, email } = req.body
        const user: User = { id, name, email }

        if (!userRepository.hasId(user)) {
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

            if (JSON.stringify(outdatedUser) == JSON.stringify(user)) {

                return res.status(400).json({ message: `Nothing to update` })
            }

            const updatedUser = {
                ...outdatedUser,
                ...user
            }

            await userRepository.save(updatedUser)
            return res.status(200).json({ message: `User updated with ID:${updatedUser.id}` })
        } catch (err) { console.log(err) }
    }
    async remove(req: Request, res: Response) {
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
}