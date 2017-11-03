import { Injectable } from '@angular/core';
import { SpotifyApiService } from './apis/spotify-api.service';
import { Observable } from "rxjs/Rx"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class MusicService {

    audio;
    musicApis;

    constructor(
        private spotify: SpotifyApiService
    ) {
        this.audio = new Audio();
        this.musicApis = [spotify];
    }

    /*
    Subscribing to the observable will provide a list of tracks.
    Example of how to use
    """
    this.musicService.searchMusic("blue")
        .subscribe(res => {
            // Each item has a "preview_url" property for a 30s playback. Null means no preview is available.
            // That's the best spotify can do for us.
            this.tracksInfo = res.items;
        });
    """
    */
    searchMusic(search: string): Observable {
        //TODO account for any amount of APIs.
        return this.spotify.getTracks(search);
    }

    load(url) {
        this.audio.src = url;
        this.audio.load();
    }

    play(url) {
        this.load(url);
        this.audio.play()
    }
}
