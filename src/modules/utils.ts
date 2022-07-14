import { ForbiddenException, NotFoundException } from '@nestjs/common';

export const notFound = (what: string, id: string) => {
  throw new NotFoundException(
    `The ${what} with the id of "${id}" was not found`,
  );
};

export const forbidden = (msg = `Access forbidden`) => {
  throw new ForbiddenException(msg);
};
