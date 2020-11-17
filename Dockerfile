FROM node:14-alpine3.12

WORKDIR /app
 
COPY . .
RUN npm ci
RUN npm run build
RUN npm ci --production

CMD ["node", "dist/index.js"]
