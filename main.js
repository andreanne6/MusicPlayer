// ./main.js
const { app, BrowserWindow } = require('electron');
const appUrl = "http://localhost:4200";
const NB_APIS = 3;
const APIS = [spotifyQuery, jamendoQuery, deezerQuery];

musicService();
playlistService();

//musicService
const spotifyClientId = "b600e89282ae451fbc4c687673b3517e";
let spotifyToken = null;
let jsonSongsList = [];
let nbQueries = 0;

function musicService() {
    let express = require('express');
    let backend = express();
    let port = process.env.PORT || 3000;

    spotifyGetToken();

    backend.get('/:search', searchMusic);

    backend.listen(port);
    console.log('musicService started on: ' + port);
}

function searchMusic(req, res) {
  jsonSongsList = [];
  for(let i = 0; i < APIS.length; i++) {
    search = req.params.search.replace(" ", "+");
    APIS[i](search, res);
  }
}

function spotifyQuery(search, res) {
  var request = require('request');
  const apiUrl = "https://api.spotify.com/v1";
  const queryUrl = `${apiUrl}/search?client_id=${spotifyClientId}&q=${search}&type=track`;

  const queryOptions = spotifyQueryOptions(queryUrl);

  request.get(queryOptions, function(error, response, body) {
    if(!error && response && response.statusCode == 200) {
      spotifyAddSongs(body);
    }
    console.log("Spotify query done");
    tryToRespond(res);
  });
}

function spotifyAddSongs(spotifyData) {
  let itemList = spotifyData.tracks.items;
  for(let i = 0; i < itemList.length; i++) {
      let item = itemList[i];

      if(item.preview_url) {
          let jsonSong = spotifyItemToSong(item);
          jsonSongsList.push(jsonSong);
      }
  }
}

function spotifyItemToSong(item) {
    return {
      title: item.name,
      album: item.album.name,
      authors: only("name", item.artists),
      duration: 30,
      streamUrl: item.preview_url
    }
}

function only(key, list) {
    let newList = [];
    for(let i = 0; i < list.length; i++) {
        newList.push(list[i][key]);
    }
    return newList;
}

function spotifyQueryOptions(queryUrl) {
  return {
      url: queryUrl,
      headers: {
        'Authorization': `Bearer ${spotifyToken}`
      },
      json: true
    }
}

function jamendoQuery(search, res) {
  console.log("Jamendo query");
  tryToRespond(res);
}

function deezerQuery(search, res) {
  console.log("Deezer query");
  tryToRespond(res);
}

function tryToRespond(res) {
  if(++nbQueries == APIS.length) {
    nbQueries = 0;
    respond(res, {songs: flatten(jsonSongsList)});
    console.log("Responded");
  }
}

function flatten(arrayOfArrays) {
  return arrayOfArrays.reduce((acc, array) => acc.concat(array), []);
}

function spotifyGetToken() {
    var request = require('request');
    var authOptions = spotifyAuthOptions()

    request.post(authOptions, function(error, response, body) {
        spotifyToken = body.access_token;
    });
}

function spotifyAuthOptions() {
  const spotifyUrl = "https://accounts.spotify.com/api/token";
  const clientId = "b600e89282ae451fbc4c687673b3517e";
  const clientSecret = "aa073ec39709468990e99679e6401bd1";

  // your application requests authorization
  return {
      url: spotifyUrl,
      headers: {
          'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
      form: {
          grant_type: 'client_credentials'
      },
      json: true
  };
}

//playlistService
function playlistService() {
    let express = require('express');
    let backend = express();
    let port = process.env.PORT || 3001;

    backend.post('/new', createPlaylist);
    backend.post('/:playlist/add', addSong);
    backend.post('/:playlist/remove', removeSong);
    backend.delete('/:playlist', deletePlaylist);
    backend.get('/:playlist', getPlaylist);
    backend.get('/playlists', getPlaylists);

    backend.listen(port);
    console.log('playlistService started on: ' + port);
}

function createPlaylist(req, res) {

}

function addSong(req, res) {

}

function removeSong(req, res) {

}

function deletePlaylist(req, res) {

}

function getPlaylist(req, res) {

}

function getPlaylists(req, res) {

}

function respond(res, response) {
  res.set('Access-Control-Allow-Origin', appUrl);
  res.send(response);
}

//electron app
let win = null;

app.on('ready', function () {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({width: 1000, height: 600});

    // Specify entry point
    win.loadURL(appUrl);

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
