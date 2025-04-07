FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generatenpx prisma migrate deploy
RUN npm run build
RUN npm run prisma:migrate:deploy
EXPOSE 3000

CMD ["node", "dist/src/main"]
