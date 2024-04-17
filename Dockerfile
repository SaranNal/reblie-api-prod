#FROM 170981889969.dkr.ecr.us-east-1.amazonaws.com/reblie-api-base:latest
# FROM 170981889969.dkr.ecr.us-east-1.amazonaws.com/reblie-api-base:latest
FROM node-base:latest
# WORKDIR /app
COPY ./ /app

RUN npm install


EXPOSE 5000

CMD [ "npm", "start" ]
