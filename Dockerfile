ARG NODE_VERSION=10.15.2
ARG SRC_PATH=/rat-ui/build
ARG APP_PORT=8080

# Create an image with the Node NPM base docker image
FROM node:${NODE_VERSION}

# Declare variables so it is available for this image to use
ARG SRC_PATH

# Copy everything in the current directory into a folder on the image
WORKDIR ${SRC_PATH}
ADD . ${SRC_PATH}

# Install the necessary node packages and add them to the path
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install

# Build the code into an executable from source
RUN npm run build

# Creates a second image containing a nginx server to host the appliction
FROM bitnami/nginx:latest

# Declare variables so it is available for this image to use
ARG SRC_PATH
ARG APP_PORT

# Setup the nginx server to serve the application
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /opt/bitnami/nginx/conf/nginx.conf
COPY --from=0 ${SRC_PATH}/dist /usr/share/nginx/html
EXPOSE ${APP_PORT}
CMD ["nginx"]