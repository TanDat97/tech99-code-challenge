FROM node:22.15.0-slim AS build
WORKDIR /tmp
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY package*.json ./
RUN npm ci --verbose --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:22.15.0-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV SERVICE_NAME noservice
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY package*.json ./
RUN npm ci --verbose --no-audit --no-fund --omit=dev

# Copy built application (includes compiled migrations)
COPY --from=build /tmp/dist/ ./dist/

EXPOSE 3000
CMD ["node", "dist/app.js"]