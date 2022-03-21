import { Column, PrimaryGeneratedColumn } from "typeorm";
import PhotoValidator from "../validators/Photo/PhotoValidator";

export default class Photo extends PhotoValidator {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    filename: string;

  @Column()
    isPublic: boolean;
}
