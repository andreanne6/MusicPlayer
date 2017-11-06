import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx'

export class Song {
    title;
    authors;
    duration;
    streamUrl;
}

@Injectable()
export abstract class IApiService {
    constructor(protected http: Http) {}

    //Template method
    public findSongs(search: string): Observable<Song[]> {
        const queryUrl = this.doGetTracksQueryUrl(search);
        const headers = this.doGetHeaders();

        return this.http
            .get(queryUrl, {headers: headers})
            .map(results => results.json())
            .map(data => this.doConvertToSongs(data));
    }

    protected abstract doGetTracksQueryUrl(search: string): string;
    protected abstract doGetHeaders(): Headers;
    protected abstract doConvertToSongs(apiData): Song[];
}
