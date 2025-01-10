

create yml file <docker-compose.yml>

<--------------------------------------------------------->
version: '3.8'

services:
  apache-php:
    image: php:8.2-apache
    container_name: apache-php
    ports:
      - "8080:80"  # Map Apache to localhost:8080
    volumes:
      - ./htdocs:/var/www/html  # Map the htdocs folder
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: myuser
      MYSQL_PASSWORD: mypassword
    volumes:
      - mysql-data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: phpmyadmin
    restart: always
    ports:
      - "8081:80"  # Access phpMyAdmin at localhost:8081
    environment:
      PMA_HOST: mysql
      MYSQL_ROOT_PASSWORD: rootpassword

volumes:
  mysql-data:
<--------------------------------------------------------->


docker-compose up -d

docker-compose down


docker ps



<----------------------para sql password nga di makoconnect shit>

docker run --name mysql-dental -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=dental_app -p 3306:3306 -d mysql:latest

docker exec -it mysql-dental mysql -u root -p

CREATE USER 'root'@'%' IDENTIFIED BY 'rootpassword';

ALTER USER 'root'@'%' IDENTIFIED BY 'rootpassword';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; 

FLUSH PRIVILEGES;

docker-compose up --build

stop all containers
docker stop $(docker ps -q)



remove

docker rm -f $(docker ps -aq)



Command	Effect	When to Use
<docker-compose down>	Stops and removes containers, networks, and optionally volumes.	To clean up and start fresh with a new setup.
<docker-compose stop>	Stops the containers but leaves them intact.	To temporarily stop services without losing data or configuration.
<docker-compose up -d>	Starts containers in detached mode, using existing images.	To restart the application quickly when no changes are made to the Dockerfile or code.
<docker-compose up --build>	Rebuilds images and starts containers.	After changes to the Dockerfile, dependencies, or application code to ensure updated containers.

<docker-compose restart nodejs-api> ug naay new code changes


npm install dotenv

