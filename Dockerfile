FROM node:17-alpine3.14
WORKDIR /app

COPY . .

RUN npm install 
RUN npx tsc

ENV NODE_ENV production

EXPOSE 5000

CMD ["node", "./dist/app.js"]