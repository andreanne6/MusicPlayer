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
}

@Injectable()
export abstract class IApiService {
    protected backendUrl = "http://localhost:3000";

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
