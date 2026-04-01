# RoR Winti Player

This is a fork of RoR-Player with some customizations and a reduced
and simplified set of Rhythms.

Pushes to this repository will be built and published automatically
(with a delay of a couple of minutes) at:

https://ror-winti.tuleb.net

The upstream code can be found at:

https://github.com/beatboxjs/ror-player.git

## Build

To build and test locally, run:

    sudo docker build --progress plain -t ror-winti-player .
    sudo docker run --rm -p 127.0.0.1:8080:80 ror-winti-player:latest

Then, the site should be available at:

http://localhost:8080
