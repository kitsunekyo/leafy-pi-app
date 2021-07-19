<h1 align="center">
  <br>
  <a href="https://www.dasblattwerk.at"><img src="docs/assets/plant.png" alt="Plant" width="200"></a>
  <br>
  Leafy Pi - Garden Controller
  <br>
</h1>

<h4 align="center">An automated and data-driven garden controller based on RapsberryPi, ExpressJS and MongoDB.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#hardware-requirements">Hardware Requirements</a> •
  <a href="#install">Install</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](docs/assets/screenshot.png)

## Key Features
- control your garden via web interface
- log temperature, humidity and soil status automatically
- control your water pump remotely (or any other device your relais support)
- full authentication support for security

## Hardware Requirements
- Raspberry Pi 3
- DHT11 Sensor
- Soil Moisture Sensor
- Relais
- A bunch of Dupont cables

## Install

### Prerequisites
Before we can run this, your raspberry pi must be set up.

> I'll assume you have raspbian running already, and have ssh access or direct access to your Pi.

First we want to update our packages

```bash
sudo apt-get update
sudo apt-get upgrade
```

#### nginx

This is gonna be our web server that will handle http requests and pass them to our NodeJS application.

Install nginx    
`sudo apt-get install nginx`

Start the service    
`sudo /etc/init.d/nginx start`

Nginx keeps the configuration file for each application it serves in the `sites-available` folder: `cd /etc/nginx/sites-available/`

You can either modify the `default` one, or create your own.

The file should look like this

```conf
server {
   listen 80;
   root /var/www/my-app/;                  # identifies the location of the application you are configuring
   server_name my-app.dev;                 # identifies the hostname used by this application's traffic
   location / {
      proxy_pass http://localhost:8080/;   # configures the back-end destination for this traffic
   }
}
```

Then we can restart nginx to reload the settings

`sudo service nginx reload`

#### NodeJS

To download the most recent LTS version use the following command

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`

Now we can install it by running

`sudo apt-get install -y nodejs`

Once this is completed, we can check if node is available by typing

`node --version`

#### MongoDB Server

We'll be using mongodb as our database server.

Install it by typing

`sudo apt-get install mongodb-server`

Then start the service with

`sudo service mongod start`

You can test if it worked out by typing

`mongo`

This should put you into the mongo shell, where you can execute mongodb commands

### Wiring

TODO

## Local Development

If you want to test the application on windows, you should know that you can only test the webapp as we wont have access to the Raspberry Pi GPIO ports if we're not running on the Raspberry Pi directly.

You'll need to have those packages installed on your machine as well:
- [Python 2.7.14](https://www.python.org/downloads/)
- [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)
- [vs2017 build tools](https://www.visualstudio.com/thank-you-downloading-visual-studio/?sku=BuildTools&rel=15)

> on raspberry pi the only supported mongoose version is 4.x, due to the last MongoDB x32 version being 2.4. So make sure package.json read `"mongoose": "^4.0.14",` for your raspberry pi. [http://mongoosejs.com/docs/compatibility.html](http://mongoosejs.com/docs/compatibility.html)

## How To Use

- pm2: `sudo env PATH=$PATH:/usr/local/bin pm2 startup systemd -u pi --hp /home/pi`

## Credits
- Google Search

## License
- [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
