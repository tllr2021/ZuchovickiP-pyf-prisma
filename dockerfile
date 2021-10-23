FROM node:14-alpine

USER node

RUN mkdir -p /home/node/Zuchovicki-pyf-Prisma-Main

WORKDIR /home/node/Zuchovicki-pyf-Prisma-Main

COPY --chown=node . ${WORKDIR}

RUN yarn install

ENV PORT=4000

ENV APP_SECRET="jwtsecret123"

EXPOSE ${PORT}

CMD [ "yarn","start" ]
