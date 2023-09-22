FROM node:latest
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .
EXPOSE 3000
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
CMD ["pnpm", "start"]
LABEL authors="elicot"