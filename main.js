// ./main.js
const { app, BrowserWindow } = require('electron');
const appUrl = "http://localhost:4200";

musicService();
playlistService();

///////////////////////
//                   //
//   MUSIC SERVICE   //
//                   //
///////////////////////
//Apis
const QUERY = [spotifyQuery, jamendoQuery, deezerQuery];
const SPOTIFY = 0;
const JAMENDO = 1;
const DEEZER = 2;
const CLIENT_ID = ["b600e89282ae451fbc4c687673b3517e", "c38b5501"]
const GET_ITEM_LIST = [spotifyGetItemList, jamendoGetItemList];
const CAN_ADD_ITEM = [spotifyCanAddItem, jamendoCanAddItem];
const ITEM_TO_SONG = [spotifyItemToSong, jamendoItemToSong];

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
  for(let api = 0; api < QUERY.length; api++) {
    search = req.params.search.replace(" ", "+");
    query(api, search, res);
  }
}

function queryApi(api, queryOptions, res) {
  var request = require('request');
  request.get(queryOptions, function(error, response, body) {
    if(!error && response && response.statusCode == 200) {
      addSongs(api, body);
    }
    tryToRespond(res);
  });
}

function addSongs(api, data) {
  let itemList = getItemList(api, data);
  for(let i = 0; i < itemList.length; i++) {
    let item = itemList[i];

    if(canAddItem(api, item)) {
      let jsonSong = itemToSong(api, item);
      jsonSongsList.push(jsonSong);
    }
  }
}

function tryToRespond(res) {
  if(++nbQueries == QUERY.length) {
    nbQueries = 0;
    respond(res, {songs: jsonSongsList});
    console.log("Responded");
  }
}

function respond(res, response) {
  res.set('Access-Control-Allow-Origin', appUrl);
  res.send(response);
}

/**********************
*                     *
*        QUERY        *
*                     *
***********************/

function query(api, search, res) {
  QUERY[api](search, res);
}

function spotifyQuery(search, res) {
  const apiUrl = "https://api.spotify.com/v1";
  const queryUrl = `${apiUrl}/search?client_id=${CLIENT_ID[SPOTIFY]}&q=${search}&type=track`;
  const queryOptions = {
    url: queryUrl,
    headers: {
      'Authorization': `Bearer ${spotifyToken}`
    },
    json: true
  }

  console.log("Spotify query");
  queryApi(SPOTIFY, queryOptions, res);
}

function jamendoQuery(search, res) {
  const apiUrl = "https://api.jamendo.com/v3.0";
  const queryUrl = `${apiUrl}/tracks/?client_id=${CLIENT_ID[JAMENDO]}&search=${search}&format=json&type=single albumtrack`;
  const queryOptions = {
    url: queryUrl,
    json: true
  }

  console.log("Jamendo query");
  queryApi(JAMENDO, queryOptions, res);
}

function deezerQuery(search, res) {
  console.log("Deezer not implemented");
  tryToRespond(res);
}

/**********************
*                     *
*    GET_ITEM_LIST    *
*                     *
***********************/

function getItemList(api, data) {
  return GET_ITEM_LIST[api](data);
}

function spotifyGetItemList(data) {
  return data.tracks.items;
}

function jamendoGetItemList(data) {
  return data.results;
}

/**********************
*                     *
*     CAN_ADD_ITEM    *
*                     *
***********************/

function canAddItem(api, item) {
  return CAN_ADD_ITEM[api](item);
}

function spotifyCanAddItem(item) {
  return !!item.preview_url;
}

function jamendoCanAddItem(item) {
  return true;
}

/**********************
*                     *
*     ITEM_TO_SONG    *
*                     *
***********************/

function itemToSong(api, item) {
  return ITEM_TO_SONG[api](item);
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

function jamendoItemToSong(item) {
  return {
    title: item.name,
    album: item.album_name,
    authors: [item.artist_name],
    duration: item.duration,
    streamUrl: item.audio
  }
}

/**********************
*                     *
*       UTILITY       *
*                     *
***********************/

function only(key, list) {
  let newList = [];
  for(let i = 0; i < list.length; i++) {
    newList.push(list[i][key]);
  }
  return newList;
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
