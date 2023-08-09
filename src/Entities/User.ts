import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    names: string;

    @Column()
    lastnames: string;

    @Column()
    age: number;

    @Column()
    direction: string;

    @Column()
    dni: string;

    @Column()
    email: string

    @Column()
    password: string
}