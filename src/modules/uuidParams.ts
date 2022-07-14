import { IsUUID } from 'class-validator';

export class UUIDParams {
  @IsUUID()
  id: string;
}
