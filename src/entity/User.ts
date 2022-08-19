import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"
import { runInThisContext } from "vm";

@Entity('users')
export class User {
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email
    }
    @PrimaryColumn()
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    email: string;
}
