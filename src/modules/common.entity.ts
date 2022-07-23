import { PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export abstract class CommonEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();
}