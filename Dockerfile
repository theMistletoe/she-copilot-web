FROM node:latest

WORKDIR /

ENV OPENAI_API_KEY=${OPENAI_API_KEY}

COPY . .
RUN yarn install
CMD ["yarn" "dev"]