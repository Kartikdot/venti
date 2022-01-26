FROM node:16.3.0 AS build
WORKDIR /usr/src/app/build
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm build

##Stage 2

FROM node:16.3.0
WORKDIR /usr/src/app/prod
COPY package.json ./
RUN npm install --only=production
COPY --from=build user/arc/app/build/dist ./dist
EXPOSE 80
CMD ["npm", "run", "start"]