import { Validate } from 'class-validator';
import {
  AfterInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CapitalLetterValidator from '../CapitalLetterValidator';
import Author from './Author';
import Category from './Category';
import TodoMetadata from './TodoMetadata';

@Entity()
export default class Todo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Validate(CapitalLetterValidator)
  public name: string = '';

  @Index()
  @Column()
  public isComplete: boolean = false;

  @Column('character varying', {
    name: 'name',
    nullable: false,
  })
  public persistedName: string = '';

  @OneToOne(() => TodoMetadata)
  @JoinColumn()
  public metadata: TodoMetadata;

  @Index()
  @ManyToOne(() => Author, (author) => author.todos)
  public author: Author;

  @ManyToMany(() => Category, (category) => category.todos)
  @JoinTable()
  public categories: Category[];

  @AfterInsert()
  public handleAfterInsert() {
    console.log(`INSERTED TODO WITH ID: ${this.id}`);
  }
}
