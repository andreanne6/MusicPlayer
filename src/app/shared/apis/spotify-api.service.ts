import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IApiService, Song } from './iapi.service';

@Injectable()
export class SpotifyApiService extends IApiService {
    backendUrl = "http://localhost:3000";
    apiUrl = "https://api.spotify.com/v1";
    clientId = "b600e89282ae451fbc4c687673b3517e";
    token;

    constructor(http: Http) {
        super(http);
        this.setToken();
    }

    protected doGetTracksQueryUrl(search: string): string {
        search = search.replace(" ", "+");
        return `${this.apiUrl}/search?client_id=${this.clientId}&q=${search}&type=track`;
    }

    protected doGetQueryHeaders(): Headers {
        let queryHeaders = new Headers();
        queryHeaders.append('Authorization', `Bearer ${this.token}`);
        return queryHeaders;
    }

    protected doConvertToSongs(apiData: any): Song[] {
        let musicList = [];
        let itemList = apiData.tracks.items;
        for(let i = 0; i < itemList.length; i++) {
            let item = itemList[i];

            if(item.preview_url) {
                let song = this.itemToSong(item);
                musicList.push(song);
            }
        }
        return musicList;
    }

    private setToken() {
        this.http
            .get(`${this.backendUrl}/tokens/spotify`)
            .subscribe(result => this.token = result.text());
    }

    private itemToSong(item: any): Song {
        let song = new Song();

        song.title = item.name;
        song.album = item.album.name;
        song.authors = this.only("name", item.artists);
        song.duration = 30;
        song.streamUrl = item.preview_url;

        return song;
    }

    private only(key: string, list: any[]): any[] {
        let newList = [];
        for(let i = 0; i < list.length; i++) {
            newList.push(list[i][key]);
        }
        return newList;
    }
}
