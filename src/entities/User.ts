import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IsEmail,
  Validate,
} from "class-validator";
import Photo from "./Photo";
import UserPasswordValidator from "../validators/User/UserPasswordValidator";
import IEntityWithFactoryMethod from "../types/IEntityWithFactoryMethod";

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
export default class User extends IEntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @Index({
    unique: true,
    where : "'auth0Id' IS NOT NULL",
  })
  @Column({ nullable: true })
    auth0Id?: string;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column({
    type  : "varchar",
    unique: true,
  })
  @IsEmail()
    email: string;

  @Column({ default: false })
    isEmailVerified: boolean;

  @Column({
    nullable: true,
    type    : "varchar",
  })
    firstName?: string;

  @Column({
    nullable: true,
    type    : "varchar",
  })
    lastName?: string;

  @Validate(UserPasswordValidator)
  @Column({
    nullable: true,
    select  : false,
    type    : "varchar",
  })
    password?: string;

  @Column({
    nullable: true,
    type    : "varchar",
  })
    avatarUrl?: string;

  @OneToMany(
    () => Photo,
    photo => photo.user,
    {
      nullable: true,
      onDelete: "CASCADE",
    },
  )
    photos?: Photo[];

  @Column({
    default: UserRole.CONTRACTOR,
    enum   : UserRole,
  })
    role: UserRole;
}
