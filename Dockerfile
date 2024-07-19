# Use the official Node.js 16 image.
FROM node:16-alpine

# Create and change to the app directory.
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy application dependency manifests to the container image.
COPY package.json pnpm-lock.yaml* ./

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Copy local code to the container image.
COPY . .

# Build the app
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup.
CMD ["pnpm", "start"]
