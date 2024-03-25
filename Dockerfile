FROM node:lts as dependencies
WORKDIR /my-project
COPY package.json package-lock.json ./
RUN npm install install --frozen

FROM node:lts as builder
WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /my-project
ENV NODE_ENV production

COPY --from=builder /my-project/dist/src ./dist
COPY --from=builder /my-project/.env ./
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["npm","run","start:prod"]