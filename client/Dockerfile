FROM node:10.16-alpine
WORKDIR usr/src/client
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm","run","start"]