import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export default class Photo {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    filename: string;

  @Column({ default: false })
    isPublic: boolean;
}
