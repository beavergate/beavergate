# Use an official Node.js LTS (Long Term Support) version as a parent image
FROM node:20-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install Yarn globally and project dependencies
RUN npm install -g yarn \
    && yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the application in production mode
CMD ["yarn", "start"]
