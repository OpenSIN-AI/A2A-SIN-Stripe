FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=7860
ENV HOST=0.0.0.0
EXPOSE 4672
CMD ["node", "dist/src/cli.js", "serve-a2a"]
