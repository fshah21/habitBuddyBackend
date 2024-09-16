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
ENV SERVICE_ACCOUNT=${SERVICE_ACCOUNT}

# Build the TypeScript code
RUN npm run build

# Specify the command to run when the container starts
CMD ["node", "dist/index.js"]
