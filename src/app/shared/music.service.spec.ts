/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, JsonpModule } from "@angular/http";
import { MusicService, Playlist } from './music.service';
import { Song } from './apis/iapi.service';

import { SpotifyApiService } from './apis/spotify-api.service';
import { JamendoApiService } from './apis/jamendo-api.service';
import { DeezerApiService } from './apis/deezer-api.service';

describe('MusicService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                JsonpModule
            ],
            providers: [
                MusicService,
                SpotifyApiService,
                JamendoApiService,
                DeezerApiService
            ]
        });
    });
    describe('get playlists', () => {
        it('should return 0 playlists', inject([MusicService], (music) => {
            const playlists = music.getPlaylists();
            expect(playlists.length).toEqual(0);
        }));

        it('should return 2 playlists', inject([MusicService], (music) => {
            const playlist0 = music.createPlaylist("1", new Song({title: "0", duration: 30}));
            const playlist1 = music.createPlaylist("2", new Song({title: "1", duration: 31}));

            const playlists = music.getPlaylists();

            expect(playlists.length).toEqual(2);
            expect(playlists[0]).toEqual(playlist0);
            expect(playlists[1]).toEqual(playlist1);
        }));
    });

    describe('get playlist', () => {
        it('should not return a playlist because the id doesn\'t exist', inject([MusicService], (music) => {
            const playlist = music.getPlaylist(1);
            expect(playlist).toBeNull();
        }));

        it('should return the playlist given its id', inject([MusicService], (music) => {
            const playlist1 = music.createPlaylist("chill", new Song({title: "0", duration: 30}));
            const playlist2 = music.createPlaylist("epic", new Song({title: "1", duration: 31}));

            expect(playlist1).toEqual(music.getPlaylist(playlist1.id));
            expect(playlist2).toEqual(music.getPlaylist(playlist2.id));
        }));
    });

    describe('create playlist', () => {
        it('should create a playlist with the given songs', inject([MusicService], (music) => {
            const name = "chill";
            const songs = [
                new Song({title: "relax", duration: 330}),
                new Song({title: "enjoy", duration: 30}),
                new Song({title: "your time", duration: 310}),
                new Song({title: "in here", duration: 30}),
            ]
            const playlist = music.createPlaylist(name, songs);

            expect(playlist).not.toBeNull();
            expect(playlist.name).not.toBeNull();
            expect(playlist.name).toEqual(name);
            expect(playlist.songs).not.toBeNull();
            expect(playlist.songs).toEqual(songs);
        }));
    });

    describe('delete playlist', () => {
        it('should delete a playlist given its id', inject([MusicService], (music) => {
            const name = "delete";
            let songs = [
                new Song({title: "goodbye", duration: 0}),
                new Song({title: "cruel", duration: 0}),
                new Song({title: "world", duration: -1})
            ]
            const playlist = music.createPlaylist(name, songs);

            expect(music.deletePlaylist(playlist.id)).not.toBeNull();
            expect(music.getPlaylist(playlist.id)).toBeNull();
        }));
    });

    describe('add to playlist', () => {
        it('should add a song to a playlist inside the service', inject([MusicService], (music) => {
            const name = "epic";
            let songs = [
                new Song({title: "get", duration: 330}),
                new Song({title: "ready", duration: 30}),
                new Song({title: "for the", duration: 310})
            ]
            const playlist = music.createPlaylist(name, songs);
            const newSong = new Song({title: "DROP!", duration: 3054});

            expect(music.addToPlaylist(playlist, newSong)).toBeTruthy();
            songs.push(newSong);

            expect(playlist.songs).not.toBeNull();
            expect(playlist.songs.length).toEqual(songs.length);
            expect(playlist.songs).toEqual(songs);
        }));
    });

    describe('remove from playlist', () => {
        it('should remove a song from a playlist inside the service', inject([MusicService], (music) => {
            const name = "removal";
            let songs = [
                new Song({title: "stay", duration: 330}),
                new Song({title: "stay", duration: 30}),
                new Song({title: "leave", duration: 310})
            ]
            const playlist = music.createPlaylist(name, songs);

            expect(music.removeFromPlaylist(playlist, playlist.songs[2])).toBeTruthy();
            songs.splice(2, 1);

            expect(playlist.songs).not.toBeNull();
            expect(playlist.songs.length).toEqual(songs.length);
            expect(playlist.songs).toEqual(songs);
        }));
    });
});
