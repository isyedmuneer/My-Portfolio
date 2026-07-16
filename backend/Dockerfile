# Base image for Node.js
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package*.json ./
# npm ci ko badal kar npm install kar diya bina lock file ke build hone ke liye
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the Node server
CMD ["node", "server.js"]