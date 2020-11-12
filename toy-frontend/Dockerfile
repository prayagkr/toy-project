# # STEP 1
# FROM node:12.18.4-alpine3.12 as build-step

# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# # RUN npm run start
# RUN npm run build

# FROM nginx:1.18.0-alpine
# COPY --from=build-step /app/dist/toy-frontend /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# # in terminal  "docker build -t docker-toy-frontend ."
# # in termianl "docker run -it -p 8000:80 --name doc-toy-frontend  docker-toy-frontend"

# step 2

FROM node:lts-alpine3.12 as build-step

WORKDIR /app
COPY package.json ./
COPY . .
EXPOSE 4200
CMD npm run start

# in terminal " docker build -t docker-toy-frontend ."
# in terminal "docker image ls" or use docker-compose.yml