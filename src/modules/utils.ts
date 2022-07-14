import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { validate as validateUUID } from 'uuid';

export const verifyUUID = (id: string, throwError: boolean = true): boolean => {
  const valid = validateUUID(id);
  if (!valid && throwError) {
    throw new BadRequestException(`The id '${id}' is not valid`);
  } 
  return valid;
}

export const notFound = (what: string, id: string) => {
  throw new NotFoundException(`The ${what} with the id='${id}' was not found`);
}

export const badRequest = (msg: string = `Some required data fields are missing`) => {
  throw new BadRequestException(msg);
}

export const forbidden = (msg: string = `Access forbidden`) => {
  throw new ForbiddenException(msg);
}