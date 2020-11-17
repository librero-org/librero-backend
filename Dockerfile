FROM node:14-alpine3.12 AS builder

WORKDIR /app
 
COPY . .
RUN npm ci
RUN npm run build
RUN npm ci --production

FROM node:14-alpine3.12
COPY --from=builder /app /librero
EXPOSE 4000
WORKDIR /librero
CMD ["node", "dist/index.js"]
