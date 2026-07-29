# syntax=docker/dockerfile:1.7
FROM node:24-alpine AS dependencies
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
FROM dependencies AS production-dependencies
RUN pnpm prune --prod

FROM dependencies AS build
COPY . .
ARG PUBLIC_SITE_URL=https://falxter.co.jp
ARG PUBLIC_TURNSTILE_SITE_KEY=
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY
RUN pnpm build
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
RUN addgroup -S astro && adduser -S -G astro astro
COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=production-dependencies --chown=astro:astro /app/node_modules ./node_modules
COPY --from=build --chown=astro:astro /app/package.json ./package.json
USER astro
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:4321/api/health/ >/dev/null || exit 1
STOPSIGNAL SIGTERM
CMD ["node","./dist/server/entry.mjs"]
