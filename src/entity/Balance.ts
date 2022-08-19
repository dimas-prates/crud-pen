import { randomUUID } from "crypto";
import { User } from '../entity/User'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('balances')
export class Balance {
    constructor(id: string, value: number, description: string | null, date: Date, user: User) {
        this.id = id || randomUUID();
        this.value = value
        this.description = description
        this.date = date
        this.user = user
    }

    @PrimaryColumn({ unique: true, type: 'text' })
    id: string

    @Column({ type: 'float' })
    value: number

    @Column({ type: 'text', nullable: true })
    description: string | null

    @Column({ type: 'date' })
    date: Date

    @ManyToOne(() => User, user => user.balances)
    @JoinColumn({ name: 'user_id' })
    user: User
}