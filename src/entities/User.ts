import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { IsEmail, Validate } from "class-validator";
import Photo from "./Photo";
import UserPasswordValidator from "../validators/User/UserPasswordValidator";

export enum UserRole {
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
  DESIGNER = "DESIGNER",
  PM = "PROJECT MANAGER",
  SM = "SCRUM MASTER",
  HR = "HR",
  CONTRACTOR = "CONTRACTOR",
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column({ type: "varchar", unique: true })
  @IsEmail()
    email: string;

  @Column({ type: "varchar" })
    firstName: string;

  @Column({ type: "varchar" })
    lastName: string;

  @Validate(UserPasswordValidator)
  @Column({ type: "varchar", select: false, nullable: true })
    password: string;

  @Column({ type: "varchar", nullable: true })
    avatarUrl?: string;

  @OneToMany(
    () => Photo,
    photo => photo.user,
    { nullable: true, onDelete: "CASCADE" },
  )
    photos?: Photo[];

  @Column({
    default: UserRole.CONTRACTOR,
  })
    role: UserRole;
}
