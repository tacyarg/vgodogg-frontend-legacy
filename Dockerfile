FROM node:alpine
COPY . .
CMD ["yarn", "start"]