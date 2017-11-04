import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IApiService, Song } from './iapi.service';

@Injectable()
export class SpotifyApiService extends IApiService {
    apiUrl = "https://api.spotify.com/v1/";
    authUrl = "https://accounts.spotify.com/api/token";
    clientId = "b600e89282ae451fbc4c687673b3517e";
    clientSecret = "aa073ec39709468990e99679e6401bd1"; //I know..
    token;

    constructor(http: Http) {
        super(http);
        this.setToken();
    }

    protected doGetTracksQueryUrl(search: string): string {
        search = search.replace(" ", "+");
        return `${this.apiUrl}search?client_id=${this.clientId}&q=${search}&type=track`;
    }

    protected doGetHeaders(): Headers {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        return headers;
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
        let headers = new Headers();
        headers.append('Authorization', `Basic ${this.clientId}:${this.clientSecret}`);
        this.http
            .post(this.authUrl, JSON.stringify({grant_type: "client_credentials"}), {headers: headers})
            .map(results => results.json())
            .subscribe(response => this.token = response.access_token);
    }

    private itemToSong(item: any): Song {
        let song = new Song();
        song.title = item.name;
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
