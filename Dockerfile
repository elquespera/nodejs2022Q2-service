FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

RUN npm prune

COPY --chown=node:node . .

ENTRYPOINT [ "npm", "run", "start:migrate" ]

USER node