FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npx prisma generate

COPY . .

EXPOSE 3333

CMD ["npm", "start"]