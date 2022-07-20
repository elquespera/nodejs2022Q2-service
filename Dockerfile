# FROM node:16

# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 4000

# CMD [ "npm", "start"]

FROM node:lts-alpine
# ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000

#RUN npm run build

CMD [ "npm", "start"]