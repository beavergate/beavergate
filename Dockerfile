# Use an official Node.js LTS (Long Term Support) version as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /usr/src/app
# Install Yarn globally
COPY . .
RUN npm install yarn
RUN yarn build

EXPOSE 3000

# Run app.js when the container launches
CMD ["yarn", "dev"]
