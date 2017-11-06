import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IApiService, Song } from './iapi.service';

@Injectable()
export class JamendoApiService extends IApiService {
    apiUrl = "https://api.jamendo.com/v3.0";
    clientId = "c38b5501";
    clientSecret = "8cb7af8209e30429c3a0ef01ba0b26c9";

    constructor(http: Http) {
        super(http);
    }

    protected doGetTracksQueryUrl(search: string): string {
        search = search.replace(" ", "+");
        return `${this.apiUrl}/tracks/?client_id=${this.clientId}&search=${search}&format=json&type=single albumtrack`;
    }

    protected doGetQueryHeaders(): Headers {
        return new Headers();
    }

    protected doConvertToSongs(apiData: any): Song[] {
        let musicList = [];
        let itemList = apiData.results;
        for(let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            const song = this.itemToSong(item);
            musicList.push(song);
        }
        return musicList;
    }

    private itemToSong(item: any): Song {
        let song = new Song();
        song.title = item.name;
        song.album = item.album_name;
        song.authors = [item.artist_name];
        song.duration = item.duration;
        song.streamUrl = item.audio;

        return song;
    }
}
