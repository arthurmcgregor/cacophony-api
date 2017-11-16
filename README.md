# cacophony-api

cacophony-api is a Node server that provides an REST API server for
uploading, processing and retrieving media collected for the Cacophony
Project. This server used to be known as "Full_Noise".

## Setup

To run the server you will need create a PostgreSQL database and a S3
compatible service.

### S3 Service Setup

We recommend Minio for object storage.

* Download and install Minio from https://minio.io/downloads.html
  - The x64 download and install instructions are here:
    https://minio.io/downloads.html#download-server-linux-x64
* Once Minio is running, note the access key and secret key it
  generated, as well as the port it's running on.
* Connect to Minio's web interface using your browser and create a
  bucket. The bucket name will be required later when configuring the
  API server.

### PostgreSQL Setup

A user account needs to be created within PostgreSQL as the owner of a
database. The PostGIS extension also needs to be enabled on that
database.

* Choose a PostgreSQL database name, username & password
* `sudo apt install postgresql-9.5 postgis --fix-missing`
* `sudo -i -u postgres`
* `psql`
* `CREATE USER [username] WITH PASSWORD '[password]';`
* `CREATE DATABASE [database] WITH OWNER [username];`
* `\c [database]`
* `CREATE EXTENSION postgis;`
* `\q`

### API Server Setup

* Install Node version 8 or later from http://nodejs.org/
* `sudo apt install postgresql-server-dev-9.5`
* `git clone https://github.com/TheCacophonyProject/cacophony-api.git`
* `cd cacophony-api`
* `npm install`
* Follow instructions in the TEMPLATE files in the config folder.
* `node_modules/.bin/sequelize db:migrate`
* Start server with `node Server.js`

### Generating API Documentation

* Install apiDoc `npm install apidoc -g`
* Generate API documentation with `apidoc -i api/V1/ -o apidoc/`

## License

This project is licensed under the Affero General Public License
(https://www.gnu.org/licenses/agpl-3.0.en.html).
