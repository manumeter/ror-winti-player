FROM node:lts-alpine AS build

RUN apk add --update-cache git patch && \
    mkdir /player && \
    git config --global advice.detachedHead false && \
    git config --global --add safe.directory /player

WORKDIR /player

COPY ./ror-player.rev /tmp/ror-player.rev

RUN git clone https://github.com/beatboxjs/ror-player.git . && \
    git checkout $(cat /tmp/ror-player.rev)

COPY ./patches /tmp/patches

RUN git apply -v /tmp/patches/*.patch && \
    rm -rf /player/assets/tuneDescriptions/* /player/assets/audio/* /player/assets/i18n/* && \
    npm install && \
    for i in /tmp/patches/*.diff; do patch -p0 < $i; done

#COPY ./descriptions /player/assets/tuneDescriptions
#COPY ./audio /player/assets/audio
#COPY ./i18n /player/assets/i18n
#COPY ./config.ts /player/src/config.ts
COPY ./patterns.ts /player/src/defaultTunes.ts

#RUN ( cd /player/assets/audio; for i in *.mp3; do A=${i%.mp3}; mv "$i" "${A%_*}_$(echo -n ${A##*_} | xxd -p).mp3"; done ) && \
#    npm run build
RUN npm run build

FROM nginx:stable-alpine AS production

COPY --from=build /player/dist /usr/share/nginx/html/
