FROM mcr.microsoft.com/playwright:v1.48.1-noble

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "test"]
