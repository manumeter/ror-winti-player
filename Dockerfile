FROM node:lts-alpine AS build

# chromium + ttf-dejavu + font-noto-emoji are used to generate the PDF tune sheets (the browser that
# Puppeteer would download itself does not run on Alpine/musl)
RUN apk add --update-cache git chromium ttf-dejavu font-noto-emoji && \
    mkdir /player && \
    git config --global advice.detachedHead false && \
    git config --global --add safe.directory /player && \
    git config --global --add safe.directory /overlay

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
COPY ./www/app-512.png /player/logo.png

# Our own instrument configuration (stroke displays, volume presets); the upstream audio files in
# assets/instruments/<instrument>/ are kept
COPY ./instruments/config.ts /player/assets/instruments/config.ts

# Remove the stock tune definitions but keep their folders (descriptions, helpers.ts), then merge our own
# tune folders in: folders with the same name as an upstream one reuse its descriptions
# (see the roar-player assets/tunes/README.md)
RUN rm /player/assets/tunes/*/patterns.ts
COPY ./tunes /player/assets/tunes

# A copy of this repo (git history + tunes) so that the sheet generator derives the per-tune versions in
# the page footers from *our* change history of the tune folders; the upstream tunes directory is passed as
# well so that changes to the reused upstream descriptions are also reflected. This repo must be a full
# clone (a shallow fetch yields no per-tune versions), and uncommitted changes to a tune are versioned as
# the build date.
COPY ./.git /overlay/.git
COPY ./tunes /overlay/tunes

RUN npm run build && \
    SHEETS_SOURCE=ror-winti.tuleb.net \
    SHEETS_TITLE="RoR Winterthur" \
    SHEETS_LOGO=/player/logo.png \
    SHEETS_VERSION_TUNES=/overlay/tunes:/player/assets/tunes \
    npm run build-sheets

FROM nginx:stable-alpine AS production

COPY --from=build /player/dist /usr/share/nginx/html/
COPY ./www /usr/share/nginx/html/
