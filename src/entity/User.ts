import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity('users')
export class User {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    email: string;
}
