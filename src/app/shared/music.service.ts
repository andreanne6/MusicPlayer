//angular
import { Injectable } from '@angular/core';

//rxjs
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

//Apis
import { Song } from './apis/iapi.service';
import { SpotifyApiService } from './apis/spotify-api.service';
import { JamendoApiService } from './apis/jamendo-api.service';
import { DeezerApiService } from './apis/deezer-api.service';

// DO NOT USE functions in here.
// Use the object as read only.
// Always use the MusicService when you want to modify playlists.
export class Playlist {
    id;
    name;
    songs;
    nextSongId;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.songs = [];
        this.nextSongId = 0;
    }

    public addSong(song: Song): void {
        song.playlistId = this.nextSongId++;
        this.songs.push(song);
    }

    public removeSong(song: Song): boolean {
        for(let i = 0; i < this.songs.length; i++) {
            if(this.songs[i].playlistId === song.playlistId) {
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
    private musicApis;

    private playlists;
    private nextPlaylistId;

    constructor(
        private spotify: SpotifyApiService,
        private jamendo: JamendoApiService,
        private deezer: DeezerApiService
    ) {
        this.audio = new Audio();
        this.musicApis = [spotify, jamendo, deezer];
        this.playlists = [];
        this.nextPlaylistId = 0;
    }

    public createPlaylist(name: string, songs: Song[]): Playlist {
        let playlist = new Playlist(this.nextPlaylistId++, name);
        for(let i = 0; i < songs.length; i++) {
            playlist.addSong(songs[i]);
        }
        this.playlists.push(playlist);

        return playlist;
    }

    // Returns null if the playlist doesn't exist
    private updatePlaylist(playlist: Playlist): boolean {
        for(let i = 0; i < this.playlists.length; i++) {
            if(this.playlists[i].id == playlist.id) {
                this.playlists[i] = playlist;
                return true;
            }
        }
        return false;
    }

    // Returns null if the playlist doesn't exist
    public deletePlaylist(id: number): Playlist {
        for(let i = 0; i < this.playlists.length; i++) {
            if(this.playlists[i].id == id) {
                const removedPlaylist = this.playlists[i];
                this.playlists.splice(i, 1);
                return removedPlaylist;
            }
        }
        return null;
    }

    // playlist param will be modified
    // Returning false means the service doesn't have this playlist.
    // Make sure you use the service properly.
    public addToPlaylist(playlist: Playlist, song: Song): boolean {
        playlist.addSong(song)
        return(this.updatePlaylist(playlist));
    }

    // playlist param will be modified
    // Returning false means the service doesn't have this playlist.
    // Make sure you use the service properly.
    public removeFromPlaylist(playlist: Playlist, song: Song): boolean {
        return(playlist.removeSong(song) && this.updatePlaylist(playlist));
    }

    private getPlaylistIndex(id: number) {
        for(let i = 0; i < this.playlists.length; i++) {
            if(this.playlists[i].id == id) {
                return i;
            }
        }
        return -1;
    }

    public getPlaylist(id: number) {
        let index = this.getPlaylistIndex(id)
        if(index < 0) {
            return null
        }
        return this.playlists[index];
    }

    public getPlaylists() {
        return this.playlists;
    }

    /*
    Subscribing to the observable will provide a list of tracks.
    Example of how to use
    """
    this.musicService.searchMusic("i'm blue")
        .subscribe(songs => {
            this.searchResults = songs;
            this.musicService.play(songs[0]);
        });
    """
    */
    public searchMusic(searchTerm: string): Observable<Song[]> {
        let observables = [];
        for(let i = 0; i < this.musicApis.length; i++) {
            observables.push(this.musicApis[i].findSongs(searchTerm));
        }

        return Observable
            .forkJoin(observables)
            .map(arrayOfArrayOfSongs => this.flatten(arrayOfArrayOfSongs));
    }

    public play(song: Song): void {
        this.load(song);
        this.audio.play()
    }

    private load(song: Song): void {
        this.audio.src = song.streamUrl;
        this.audio.load();
    }

    private flatten(arrayOfArrays) {
        return arrayOfArrays.reduce((acc, array) => acc.concat(array), []);
    }
}
