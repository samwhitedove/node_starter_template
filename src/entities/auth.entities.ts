import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,} from "typeorm";

@Entity('DestoyedToken')
export class DestoyedTokenEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    token?: string;

    @Column()
    refreshToken?: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}