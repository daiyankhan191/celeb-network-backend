import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Fan } from '../fan/fan.entity';
import { ManyToMany } from 'typeorm';

@Entity()
export class Celebrity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string; // Singer, Actor, Speaker, etc.

  @Column()
  country: string;

  @Column({ nullable: true })
  instagram: string;

  @Column()
  fanbase: number;

  @Column({ nullable: true })
  setlist: string;
  @ManyToMany(() => Fan, (fan) => fan.following)
fans: Fan[];

@Column({ unique: true })
email: string;

@Column()
password: string;
}

