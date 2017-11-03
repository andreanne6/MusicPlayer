import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export abstract class IApiService {
    constructor(private http: Http) {}

    //Template method
    public getTracks(search: string)
    {
        const queryUrl = this.doGetTracksQueryUrl(search);
        const headers = this.doGetHeaders();
        // Returns an obsrevable
        // for the HTTP get request
        return this.http
            .get(queryUrl, {headers: headers})
            .map(res => res.json())
            .map(data => data.tracks);
    }

    protected abstract doGetTracksQueryUrl(search: string): string;
    protected abstract doGetHeaders(): Headers;
}
