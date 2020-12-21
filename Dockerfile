FROM alpine:3.11 as builder
RUN apk --no-cache add gcc g++ make python nodejs npm

WORKDIR /gnou
COPY . .
RUN cd front && npm i
RUN cd server && npm i
ARG VUE_APP_SERVER_URL
ENV VUE_APP_SERVER_URL=$VUE_APP_SERVER_URL
RUN cd front && npm run build

FROM alpine:3.11
RUN apk --no-cache add nodejs
WORKDIR /gnou
COPY --from=builder /gnou/server .

CMD ["node", "index.js"]
