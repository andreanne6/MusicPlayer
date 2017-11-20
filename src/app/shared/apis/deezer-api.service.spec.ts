/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';
import { JsonpModule, Headers } from '@angular/http';
import { DeezerApiService } from './deezer-api.service';
import { Song } from './iapi.service';

describe('DeezerApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                JsonpModule
            ],
            providers: [
                DeezerApiService
            ]
        });
    });

    it('should return a deezer query url', inject([DeezerApiService], (deezer) => {
        const queryUrl = deezer.doGetTracksQueryUrl("some query");
        expect(queryUrl).toEqual(`https://api.deezer.com/search?q=some+query&output=jsonp&callback=JSONP_CALLBACK`);
    }));

    it('should return empty headers', inject([DeezerApiService], (deezer) => {
        const header = deezer.doGetQueryHeaders();
        expect(header).toEqual(new Headers());
    }));

    it('should convert data to a list of songs', inject([DeezerApiService], (deezer) => {
        const songs = deezer.doConvertToSongs({
            data: [
                {
                    preview: "song-url1",
                    title: "song-title1",
                    album: {
                        title: "album-title1"
                    },
                    artist: {
                        name: "artist-name1"
                    }
                },
                {
                    title: "song-title2",
                    album: {
                        title: "album-title2"
                    },
                    artist: {
                        name: "artist-name2"
                    }
                },
            ]
        });
        expect(songs).toEqual([
            new Song({
                title: "song-title1",
                album: "album-title1",
                authors: ["artist-name1"],
                duration: 30,
                streamUrl: "song-url1",
                playlistId: null
            })
        ]);
    }));
});
