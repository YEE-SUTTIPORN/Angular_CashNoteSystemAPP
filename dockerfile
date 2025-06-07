# Build stage
FROM node:22 AS builder
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Build Angular project using production configuration
RUN npx ng build --configuration production

# Nginx serve stage
FROM nginx:alpine
COPY --from=builder /app/dist/cash-note-system-app /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
