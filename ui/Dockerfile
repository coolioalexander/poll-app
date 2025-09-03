# =========================
# 1. Build stage
# =========================
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (cache optimization)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build Angular app for production
RUN npm run build -- --output-path=dist --configuration=production

# =========================
# 2. Serve stage
# =========================
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output to Nginx
COPY --from=builder /app/dist/browser/ /usr/share/nginx/html/

# Copy custom Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
