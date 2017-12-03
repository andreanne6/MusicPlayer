//angular
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

//rxjs
import { Observable, Subscription } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

export class Song {
    title;
    album;
    authors;
    duration;
    streamUrl;
    playlistId;

    constructor(data: any = null) {
        this.title = null;
        this.album = null;
        this.authors = [];
        this.duration = null;
        this.streamUrl = null;
        this.playlistId = null;

        if(data !== null) {
            this.title = data.title;
            this.album = data.album;
            this.authors = data.authors;
            this.duration = data.duration;
            this.streamUrl = data.streamUrl;
            this.playlistId = data.playlistId;
        }
    }

    public toJson(): any {
      return {
        title: this.title,
        album: this.album,
        authors: this.authors,
        duration: this.duration,
        streamUrl: this.streamUrl,
        playlistId: this.playlistId
      }
    }
}

// DO NOT USE functions in here.
// Use the object as read only.
// Always use the MusicService when you want to modify playlists.
export class Playlist {
  id;
  name;
  songs;
  nextSongId;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.songs = data.songs;
    this.nextSongId = data.nextSongId;
  }

  public addSong(song: Song): void {
    song.playlistId = this.nextSongId++;
    this.songs.push(song);
  }

  public removeSong(song: Song): boolean {
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].playlistId === song.playlistId) {
        this.songs.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

@Injectable()
export class MusicService {
  private audio;
  public paused = true;
  public song;
  public current;

  private playlists;
  private nextPlaylistId;

  private playlistServiceUrl = "http://localhost:3001";
  private musicServiceUrl = "http://localhost:3000";

  constructor(
    private http: Http
  ) {
    this.audio = new Audio();
    this.playlists = [];
    this.nextPlaylistId = 0;
    this.song = '';
  }

  public createPlaylist(name: string, songs: Song[] = []): Observable<Playlist> {
    const body = {name: name, songs: this.songsToJson(songs)};
    return this.http
      .post(`${this.playlistServiceUrl}/new`, body)
      .map(results => results.json())
      .map(data => new Playlist(data.playlist));
  }

  private songsToJson(songs: Song[]): any[] {
    let jsonSongs = [];
    for(let i = 0; i < songs.length; i++) {
      jsonSongs.push(songs[i].toJson());
    }
    return jsonSongs;
  }

  // playlist param will be modified
  // Returning false means the service doesn't have this playlist.
  // Make sure you use the service properly.
  public addToPlaylist(playlist: Playlist, song: Song): Observable<Playlist[]> {
    playlist.addSong(song)
    return this.updatePlaylist(playlist);
  }

  // playlist param will be modified
  // Returning false means the service doesn't have this playlist.
  // Make sure you use the service properly.
  public removeFromPlaylist(playlist: Playlist, song: Song): Observable<Playlist[]> {
    playlist.removeSong(song);
    return this.updatePlaylist(playlist);
  }

  private updatePlaylist(playlist: Playlist): Observable<Playlist[]> {
    return this.http
      .put(`${this.playlistServiceUrl}/${playlist.id}`, {playlist: playlist})
      .map(results => results.json())
      .map(data => this.jsonToPlaylists(data));
  }

  // Returns null if the playlist doesn't exist
  public deletePlaylist(id: number): Observable<Playlist[]> {
    return this.http
      .delete(`${this.playlistServiceUrl}/${id}`)
      .map(results => results.json())
      .map(data => this.jsonToPlaylists(data));
  }

  public getPlaylist(id: number): Observable<Playlist> {
    return this.http
      .get(`${this.playlistServiceUrl}/${id}`)
      .map(results => results.json())
      .map(data => new Playlist(data.playlist));
  }

  public getPlaylists(): Observable<Playlist[]> {
    return this.http
      .get(`${this.playlistServiceUrl}/all`)
      .map(results => results.json())
      .map(data => this.jsonToPlaylists(data));
  }

  private jsonToPlaylists(data): Playlist[] {
    const jsonPlaylists = data.playlists;
    let playlists = [];
    for(let i = 0; i < jsonPlaylists.length; i++) {
      playlists.push(new Playlist(jsonPlaylists[i]));
    }
    return playlists;
  }

  public searchMusic(searchTerm: string): Observable<Song[]> {
    return this.http
        .get(`${this.musicServiceUrl}/${searchTerm}`)
        .map(results => results.json())
        .map(json => this.jsonToSongs(json));
  }

  private jsonToSongs(json: any) {
    let songs = [];
    const jsonSongsList = json.songs;
    for(let i = 0; i < jsonSongsList.length; i++) {
      songs.push(new Song(jsonSongsList[i]));
    }
    return songs;
  }

  public play(song: Song): void {
    this.load(song);
    this.audio.play(song);
    this.song = song.title;
  }

 public handlePausePlay() {
      if(this.audio.paused) {
        this.paused = true;
        this.audio.play()
      } else {
        this.paused = false;
        this.audio.pause()
      }
  }

  public handleStop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.paused = false;
  }

  public handleBackward() {
    let elapsed =  this.audio.currentTime;
    if(elapsed >= 5) {
      this.audio.currentTime = elapsed - 5;
    }
  }

  public handleForward() {
    let elapsed =  this.audio.currentTime;
    const duration =  this.audio.duration;
    if(duration - elapsed >= 5) {
      this.audio.currentTime = elapsed + 5;
    }
  }

  private load(song: Song): void {
    this.audio.src = song.streamUrl;
    this.audio.load();
  }
}
