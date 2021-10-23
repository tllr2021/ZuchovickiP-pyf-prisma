FROM node:14-alpine

USER node

RUN mkdir -p /home/node/Zuchovicki-pyf-Prisma-Main

WORKDIR /home/node/Zuchovicki-pyf-Prisma-Main

COPY --chown=node . ${WORKDIR}

RUN yarn install

ENV PORT=4000

ENV APP_SECRET="jwtsecret123"

ENV PRISMA_SECRET = "mysecret123"

ENV URL_BASE=http://147.182.187.121:4466

ENV ENVIROMENT="production"

EXPOSE ${PORT}

CMD [ "yarn","start" ]
