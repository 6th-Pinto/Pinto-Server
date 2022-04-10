FROM node:17-alpine3.14
RUN mkdir -p /app
WORKDIR /app
ADD . /app
COPY . .
RUN yarn
ENV NODE_ENV development
EXPOSE 5000
CMD ["yarn", "start"]
