FROM node:18-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine

RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npm ci --omit=dev && npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && (npx prisma db seed || true) && node dist/src/main.js"]
