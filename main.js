// ./main.js
const { app, BrowserWindow } = require('electron');

const appUrl = "http://localhost:4200";
let win = null;

startBackend();

function startBackend() {
    var express = require('express');
    backend = express();
    port = process.env.PORT || 3000;

    backend.get('/tokens/spotify', function (req, res) {
        getSpotifyToken(res);
    });

    backend.listen(port);
    console.log('RESTful API backend started on: ' + port);
}

function getSpotifyToken(res) {
    var request = require('request');
    const clientId = "b600e89282ae451fbc4c687673b3517e";
    const clientSecret = "aa073ec39709468990e99679e6401bd1";

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        // use the access token to access the Spotify Web API
        res.set('Access-Control-Allow-Origin', appUrl);
        res.send(body.access_token);
    });
}

app.on('ready', function () {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({width: 1000, height: 600});

    // Specify entry point
    win.loadURL('http://localhost:4200');

    // Show dev tools
    // Remove this line before distributing
    win.webContents.openDevTools()

    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
