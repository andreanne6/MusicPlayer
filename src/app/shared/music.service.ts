import { Injectable } from '@angular/core';
import { SpotifyApiService } from './apis/spotify-api.service';

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

  load(url) {
    this.audio.src = url;
    this.audio.load();
  }

  play(url) {
    this.load(url);
    this.audio.play()
  }
}
