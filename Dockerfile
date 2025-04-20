# Use official Node image
FROM node:20

# Set working directory inside the container (still /app, just internally)
WORKDIR /usr/src/app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy the rest of your project
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD [ "node", "index.js" ]
