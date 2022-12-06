FROM node:16-slim

RUN apt update && apt install curl nano nginx dnsutils -y

WORKDIR /app
COPY . .
RUN rm -f .env
RUN npm i && npm run build

EXPOSE 3000

HEALTHCHECK --interval=5s --retries=2 --timeout=1s --start-period=5s CMD curl --fail http://localhost:3000/api/health || exit 1
ENTRYPOINT ["./entry.sh", "--"]
