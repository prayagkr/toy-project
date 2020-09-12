# toy-project
It is web-based application used for playing a quiz

# Steps to start application in server
ssh into server using user-name and password

## Start / Restart application server
sudo service nginx start / restart
sudo service toyappgunicorn start / restart

## Stop application server
sudo service nginx stop
sudo service toyappgunicorn stop

# Steps to setup server 
sudo apt-get update

## Install dependency
sudo apt-get install nginx
sudo apt-get install gunicorn3

## Add Node.js APT Repository
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

## Install Node.js 12 on Ubuntu
sudo apt -y install nodejs

## Install angular cli
npm install -g @angular/cli

## Install Git
sudo apt-get install git

## verify os release, nginx, python, node, npm, angular, git version
cat /etc/*release*
nginx -v
python --version
node --version
npm --version
ng --version
git --version

## Clone project 
https://github.com/prayagkr/toy-project.git

## Install backend dependency
cd toy-project/src
pip3 install -r requirements.txt

## Install frontend dependency
cd toy-project/toy-frontend
npm install

## Build frontend in production mode
ng build --prod  
dist/toy-project will be created with compiled file

## setting nginx and gunicorn
cd toy-project
cp toyapp_nginx /etc/nginx/sites-enabled
cp toyappgunicorn.service /etc/systemd/system

## start service
sudo service nginx start
sudo systemctl daemon-reload
sudo service toyappgunicorn start


