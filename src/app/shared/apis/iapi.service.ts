import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx'

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
}

@Injectable()
export abstract class IApiService {
    constructor(protected http: Http) {}

    //Template method
    public findSongs(search: string): Observable<Song[]> {
        const queryUrl = this.doGetTracksQueryUrl(search);
        const queryHeaders = this.doGetQueryHeaders();

        return this.http
            .get(queryUrl, {headers: queryHeaders})
            .map(results => results.json())
            .map(data => this.doConvertToSongs(data));
    }

    protected abstract doGetTracksQueryUrl(search: string): string;
    protected abstract doGetQueryHeaders(): Headers;
    protected abstract doConvertToSongs(apiData): Song[];
}
