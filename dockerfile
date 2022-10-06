# 1. FROM sets the base image to use for subsequent instructions
# Use the node alpine image as build
FROM node:14-alpine AS BUILD

# 2. WORKDIR sets the working directory for any subsequent COPY, CMD, or RUN instructions
# Set the working directory to /app
WORKDIR /app

# 3. Add git to the image to be able to execute scripts
RUN apk add --no-cache git

# 4. COPY copies files or folders from source to the destination path in the image's filesystem
# Copy the yarn and package files to /app in the image's filesystem
COPY package.json ./
COPY yarn.lock ./

# 5. Install all the dependencies with the reproducible dependencies flag
RUN yarn install

# 6. COPY copies files or folders from source to the destination path in the image's filesystem
# Copy all the files to /app in the image's filesystem
COPY . .

# 7. Generates a production 'build' folder to /app in the image's filesystem.
RUN yarn build

# 8. Removes the node_modules fron the images filesystem.
RUN rm -rf node_modules/

################################################################################

# 9. FROM sets the base image to use for subsequent instructions
# Use the latest stable nginx alpine image and create a new image as final
FROM nginx:1.18.0-alpine AS FINAL

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# 10. WORKDIR sets the working directory for any subsequent COPY, CMD, or RUN instructions
# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# 11. COPY copies files or folders from source to the destination path in the image's filesystem
# Copy all the files from the 'build' folder in the BUILD image to the filesystem of the new image.
COPY --from=BUILD /app/dist .

# 12. Copy the shell script that will write te env variables to the filesystem on execution.
COPY ./env.sh .

# 13. Add bash to the image to be able to execute bash scripts
RUN apk add --no-cache bash

# 14. Make the script executable with the correct permissions
RUN chmod +x env.sh

# 15. Execute the scripts
RUN ./env.sh

# 16. Expose port 80
EXPOSE 80

# 17. The given commando will launch on start/restart, its going to write envs to filesystem and start nginx webserver.
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

