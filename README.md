# Forza Horizon 4 Telemetry

This is me playing around with a cool feature in FH4 that lets you stream out your cars telemetry data!
The receiving of the data packets is built upon the work done by nettron here: https://github.com/nettrom/forza_motorsport

A python flask server listens for data packets streamed out by FH4 and then sends the data to a react app via 
web sockets to display the telemetry data. 

A Full list of the data available is documented here: https://github.com/nettrom/forza_motorsport/blob/master/configuration_file.md. 

For now the normalised suspension travel of each spring is diplayed..
![Alt text](screenshots/NormalisedSuspensionTravel.PNG?raw=true "NormalisedSuspensionTravel")

On the Engine page the type temperatures, amount of revs of the maximum used and best/current lap time.
![Alt text](screenshots/Engine.PNG?raw=true "NormalisedSuspensionTravel")

## Requirements
Python3

Node

Npm

## Building
need to tidy all this up!!

create a new venv under the api folder

### Python Flask Server

```bash
python -m venv api/venv
```

activate the virtual env

```bash
./api/venv/Scripts/activate
```

install the python packages
```bash
pip install -r api/requirements.txt
```

Set the flask app
```bash
set FLASK_APP=api/api.py
```
### React app

change into the react-app directory and run
```bash
npm install
npm run build
```

## Usage

In Forza make sure you have data out enabled and set the port to 5685 (Ip doesn't matter)

![Alt text](screenshots/FH4DataOut.PNG?raw=true "NormalisedSuspensionTravel")

From the repository root run  

```bash
flask run
```

and from the react app directory run

```bash
npm run start
```

Hopefully the dev server will launch, the python server will connect and you'll start to see data streamed!

[MIT](https://choosealicense.com/licenses/mit/)