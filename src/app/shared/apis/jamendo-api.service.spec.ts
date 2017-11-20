/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, Headers } from '@angular/http';
import { JamendoApiService } from './jamendo-api.service';
import { Song } from './iapi.service';

describe('JamendoApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                JamendoApiService
            ]
        });
    });

    it('should return a Jamendo query url', inject([JamendoApiService], (jamendo) => {
        const queryUrl = jamendo.doGetTracksQueryUrl("some query");
        expect(queryUrl).toEqual(`https://api.jamendo.com/v3.0/tracks/?client_id=c38b5501&search=some+query&format=json&type=single albumtrack`);
    }));

    it('should return headers with bearer token', inject([JamendoApiService], (jamendo) => {
        const header = jamendo.doGetQueryHeaders();
        expect(header).toEqual(new Headers());
    }));

    it('should convert data to a list of songs', inject([JamendoApiService], (jamendo) => {
        const songs = jamendo.doConvertToSongs({
            results: [
                {
                    name: "song-title1",
                    album_name: "album-title1",
                    artist_name: "artist-name1",
                    duration: 41,
                    audio: "song-url1"
                },
                {
                    name: "song-title2",
                    album_name: "album-title2",
                    artist_name: "artist-name2",
                    duration: 42,
                    audio: "song-url2"
                }
            ]
        });
        expect(songs).toEqual([
            new Song({
                title: "song-title1",
                album: "album-title1",
                authors: ["artist-name1"],
                duration: 41,
                streamUrl: "song-url1",
                playlistId: null
            }),
            new Song({
                title: "song-title2",
                album: "album-title2",
                authors: ["artist-name2"],
                duration: 42,
                streamUrl: "song-url2",
                playlistId: null
            })
        ]);
    }));
});
