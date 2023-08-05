import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MediaType } from './enums/media-type';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;

  @Column()
  public type: MediaType;
}
