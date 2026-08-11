FROM node:lts-alpine AS build

# chromium + ttf-dejavu + font-noto-emoji are used to generate the PDF tune sheets (the browser that
# Puppeteer would download itself does not run on Alpine/musl)
RUN apk add --update-cache git chromium ttf-dejavu font-noto-emoji && \
    mkdir /player && \
    git config --global advice.detachedHead false && \
    git config --global --add safe.directory /player

ENV PUPPETEER_SKIP_DOWNLOAD=1
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /player

COPY ./roar-player.rev /tmp/roar-player.rev

RUN git clone https://github.com/roar-player/roar-player.git . && \
    git checkout $(cat /tmp/roar-player.rev)

COPY ./patches /tmp/patches

RUN git apply -v /tmp/patches/*.patch && \
    npm install

COPY ./config.ts /player/src/config.ts
COPY ./patterns.ts /player/src/defaultTunes.ts
COPY ./www/app-512.png /player/logo.png

RUN npm run build && \
    SHEETS_SOURCE=ror-winti.tuleb.net \
    SHEETS_TITLE="RoR Winterthur" \
    SHEETS_LOGO=/player/logo.png \
    npm run build-sheets

FROM nginx:stable-alpine AS production

COPY --from=build /player/dist /usr/share/nginx/html/
COPY ./www /usr/share/nginx/html/
