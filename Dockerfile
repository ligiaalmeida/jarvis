# build environment
FROM node:16.6.2 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY . /app
RUN npm run build

# production environment
COPY — from=build /app/build
EXPOSE 80
CMD [“-g”, “daemon off;”]