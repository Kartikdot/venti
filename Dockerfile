FROM node:16-alpine AS build
WORKDIR /usr/src/app/build
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build

##Stage 2

FROM node:16-alpine AS run
WORKDIR /usr/src/app/prod
COPY package.json ./
RUN npm install --only=production
COPY --from=build usr/src/app/build/dist ./dist
EXPOSE 8080
CMD ["npm", "run", "start"]