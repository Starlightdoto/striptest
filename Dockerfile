FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install \
    && npx playwright install \
    && npx playwright install-deps

COPY . .

ENTRYPOINT ["npm", "test"]