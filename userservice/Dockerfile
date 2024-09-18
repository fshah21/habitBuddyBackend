# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable for service account key
ARG SERVICE_ACCOUNT
RUN echo $SERVICE_ACCOUNT > /app/lib/serviceAccountKey.json

# Build the TypeScript code
RUN npm run build

RUN ls -l /app/lib

# Specify the command to run when the container starts
CMD ["node", "lib/index.js"]
