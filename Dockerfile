FROM oven/bun:latest
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,id=bun,target=/root/.bun/ bun install --frozen-lockfile
COPY . .
RUN npm run build
ENV PORT=7860
ENV HOST=0.0.0.0
EXPOSE 4672
CMD ["node", "dist/src/cli.js", "serve-a2a"]
