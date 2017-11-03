import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export abstract class IApiService {
    constructor(private http: Http) {}

    //Template method
    public get(url, attachClientId?)
    {
        let u;
        attachClientId ? u = this.doPrepareUrl(url) : u = url;
        // Returns an obsrevable
        // for the HTTP get request
        return this.http.get(u);
    }

    protected abstract doPrepareUrl(url);
}
