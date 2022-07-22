FROM node:16.16-alpine3.16 As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

RUN npm prune

COPY --chown=node:node . .

USER node