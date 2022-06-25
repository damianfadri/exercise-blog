FROM node:13.12.0-alpine

WORKDIR /app
COPY jsconfig.json jsconfig.json
COPY package.json package.json
RUN npm install --silent

CMD ["npm", "start"]
