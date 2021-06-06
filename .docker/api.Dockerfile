FROM node:14.16-alpine

ENV DIR_APP /app

WORKDIR $DIR_APP

RUN mkdir -p $DIR_APP/node_modules \
    && chown -R node:node $DIR_APP

COPY --chown=node:node api/. .
COPY --chown=node:node .env .env

USER node

RUN yarn

EXPOSE 3000
