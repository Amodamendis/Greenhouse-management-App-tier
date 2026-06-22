# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY src/ ./src/
COPY server.js ./
COPY tracing.js ./
COPY package*.json ./

EXPOSE 4000

# THE FIX: Require tracing.js before booting the server
CMD ["node", "--require", "./tracing.js", "server.js"]