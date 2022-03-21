import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

// import PhotoValidator from "../validators/Photo/PhotoValidator";

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
