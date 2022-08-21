import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Balance } from '../entity/Balance'

@Entity('users')
export class User {
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email
    }
    @PrimaryColumn({ unique: true, type: 'text' })
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text', unique: true, })
    email: string;

    @OneToMany(() => Balance, balance => balance.user)
    balances: Balance[]
}
