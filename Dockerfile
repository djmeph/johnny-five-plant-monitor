FROM ubuntu:20.04 as base
WORKDIR /src
ENV DEBIAN_FRONTEND="noninteractive"

COPY .devcontainer/bashrc.sh /root/.bashrc
COPY .devcontainer/profile.sh /root/.profile

RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get install -y curl build-essential vim nano git \
  && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs

FROM base AS dev
COPY package.json package-lock.json ./
RUN npm ci