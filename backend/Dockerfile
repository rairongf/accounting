# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Install prisma package globally
RUN npm install -g prisma

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Generate Prisma data models
RUN npm run prisma:migrate-dev

# Expose the application port
EXPOSE 8082

# Command to run the application
CMD ["node", "dist/src/main"]