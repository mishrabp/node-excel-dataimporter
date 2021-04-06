# Specifies which OS to use. Here it is unix OS pre-installed with node v-12
FROM ubuntu:latest
LABEL developer=bibhup_mishra@yahoo.com
RUN apt-get update -y && \
    apt-get install curl -y && \
    curl -sL https://deb.nodesource.com/setup_10.2  && \
    apt-get install nodejs -y && \
    apt-get install npm -y && \
    # create folder <app> inside the container image
    mkdir -p /app && \
    mkdir -p /app/data/archive && \
    mkdir -p /app/log


# Set working directory within the image. Paths will be relative this WORKDIR.
WORKDIR /app
VOLUME /app/log /app/data

# copy source files from host computer to container
COPY ["package.json", "package-lock.json*", "./"] 
COPY . .

# Install dependencies and build app
RUN npm config set registry http://registry.npmjs.org/ && \
    npm install --unsafe-perm=true --allow-root -y 

# Set environment variable default value
ENV MYDI_SQL_SERVER=devopsmasterlinuxvm.centralus.cloudapp.azure.com \
MYDI_SQL_PORT=9005 \
MYDI_SQL_DB=testdB \ 
MYDI_SQL_USER=sa \
MYDI_SQL_PASSWORD=cGFzc3cwcmQh \
MYDI_DATA_FOLDER=./data \
MYDI_ARCHIVE_FOLDER=./data/archive \
MYDI_LOG_FOLDER=./log 

# Run the app
CMD [ "npm", "start" ]

