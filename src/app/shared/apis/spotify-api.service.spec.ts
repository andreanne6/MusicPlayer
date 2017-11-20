/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, Headers } from '@angular/http';
import { SpotifyApiService } from './spotify-api.service';
import { Song } from './iapi.service';

describe('SpotifyApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                SpotifyApiService
            ]
        });
    });

    it('should return a Spotify query url', inject([SpotifyApiService], (spotify) => {
        const queryUrl = spotify.doGetTracksQueryUrl("some query");
        expect(queryUrl).toEqual(`https://api.spotify.com/v1/search?client_id=b600e89282ae451fbc4c687673b3517e&q=some+query&type=track`);
    }));

    it('should return headers with bearer token', inject([SpotifyApiService], (spotify) => {
        spotify.token = "fake-token"
        const header = spotify.doGetQueryHeaders();
        expect(header).toEqual(new Headers({"Authorization": "Bearer fake-token"}));
    }));

    it('should convert data to a list of songs', inject([SpotifyApiService], (spotify) => {
        const songs = spotify.doConvertToSongs({
            tracks: {
                items: [
                    {
                        name: "song-title1",
                        album: {
                            name: "album-title1"
                        },
                        artists: [
                            {
                                name: "artist-name1"
                            },
                            {
                                name: "artist-name2"
                            }
                        ],
                        preview_url: "song-url1"
                    },
                    {
                        name: "song-title2",
                        album: {
                            name: "album-title2"
                        },
                        artists: [
                            {
                                name: "artist-name3"
                            },
                            {
                                name: "artist-name4"
                            }
                        ],
                    }
                ]
            }
        });
        expect(songs).toEqual([
            new Song({
                title: "song-title1",
                album: "album-title1",
                authors: ["artist-name1", "artist-name2"],
                duration: 30,
                streamUrl: "song-url1",
                playlistId: null
            })
        ]);
    }));
});
