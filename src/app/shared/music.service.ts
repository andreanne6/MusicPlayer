import { Injectable } from '@angular/core';
import { Song } from './apis/iapi.service';
import { SpotifyApiService } from './apis/spotify-api.service';
import { Observable } from 'rxjs/Rx'

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
  this.musicService.searchMusic("i'm blue")
      .subscribe(songs => {
          this.searchResults = songs;
          this.musicService.play(songs[0]);
      });
  """
  */
  public searchMusic(searchTerm: string): Observable<Song[]> {
    let observables = [];
    for (let i = 0; i < this.musicApis.length; i++) {
      observables.push(this.musicApis[i].findSongs(searchTerm));
    }

    return Observable
      .forkJoin(observables)
      .map(arrayOfArrayOfSongs => this.flatten(arrayOfArrayOfSongs));
  }

  public play(song: Song): void {
    this.load(song);
    this.audio.play()
  }

  private load(song: Song): void {
    this.audio.src = song.streamUrl;
    this.audio.load();
  }

  private flatten(arrayOfArrays) {
    return arrayOfArrays.reduce((acc, array) => acc.concat(array), []);
  }
}
