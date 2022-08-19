import { AppDataSource } from '../data-source'
import { Balance } from '../entity/Balance'

export const balanceRepository = AppDataSource.getRepository(Balance)