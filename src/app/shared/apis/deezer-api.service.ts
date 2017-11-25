import { Injectable } from '@angular/core';
import { Jsonp, Headers } from '@angular/http';
import { IApiService, Song } from './iapi.service';

@Injectable()
export class DeezerApiService extends IApiService {
    apiUrl = "https://api.deezer.com";

    constructor(jsonp: Jsonp) {
        super(jsonp);
    }

    protected doGetTracksQueryUrl(search: string): string {
        search = search.replace(" ", "+");
        return `${this.apiUrl}/search?q=${search}&output=jsonp&callback=JSONP_CALLBACK`;
    }

    protected doGetQueryHeaders(): Headers {
        return new Headers();
    }

    protected doConvertToSongs(apiData: any): Song[] {
        let musicList = [];
        let itemList = apiData.data;
        for(let i = 0; i < itemList.length; i++) {
            let item = itemList[i];

            if(item.preview) {
                let song = this.itemToSong(item);
                musicList.push(song);
            }
        }
        return musicList;
    }

    private itemToSong(item: any): Song {
        let song = new Song();

        song.title = item.title;
        song.album = item.album.title;
        song.authors = [item.artist.name];
        song.duration = 30;
        song.streamUrl = item.preview;

        return song;
    }
}
