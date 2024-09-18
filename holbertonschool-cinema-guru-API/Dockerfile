FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY ["package.json", "./"]
RUN yarn install

COPY . .

ENV PORT=8000
ENV JWT_TOKEN_SECRET=your_jwt_secret
ENV TOKEN_EXPIRE_SECONDS=86400

EXPOSE 8000
CMD ["yarn", "start"]
