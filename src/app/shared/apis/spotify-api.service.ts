import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IApiService } from "./iapi.service";

@Injectable()
export class SpotifyApiService extends IApiService {
    clientId = 'b600e89282ae451fbc4c687673b3517e';
    apiUrl = "https://api.spotify.com/v1/";
    token = "BQARLOiB7-gtnYa7vlaugNyxYzJsa0W_H-3QJxyP5QPxoQwdQE0VyuKG7bHDt2HyWRNxS-ZAYdSx_tL2d6TSnv_noW3zaR_aA4vGQ7TiJnOX-GJCvYkyKiyC3S6AXg1tAtIrmNAIncy-yoyGQnuJf0ie6iUto7Y";

    constructor(http: Http) {
        super(http);
        console.log("Spotify service init.");
    }

    protected doGetTracksQueryUrl(search: string): string {
        //Attach client id to stream url
        return `${this.apiUrl}search?client_id=${this.clientId}&q=${search}&type=track`;
    }

    protected doGetHeaders(): Headers {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        return headers;
    }
}
