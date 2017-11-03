import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IApiService } from "./iapi.service"

@Injectable()
export class SpotifyApiService extends IApiService {
    clientId = '[CLIENT_ID]'

    constructor(http: Http) {
      super(http);
      console.log("Spotify service init.");
    }

    protected doPrepareUrl(url) {
      //Attach client id to stream url
      return `${url}?client_id=${this.clientId}`
    }
}
