FROM public.ecr.aws/docker/library/node:18
WORKDIR /usr/src/app
COPY .env /usr/src/app/.env
COPY . .
# RUN apk add bash git
RUN npm install -g pm2
RUN npm install -g node-fetch
RUN npm install -g serve
#RUN npm install --package-lock-only
RUN npm install --legacy-peer-deps
RUN npm config set legacy-peer-deps=true --location=project
RUN npm ci --legacy-peer-deps
RUN npm run build
EXPOSE 4001
CMD ["pm2-runtime", "start", "app.config.json", "--watch"]
