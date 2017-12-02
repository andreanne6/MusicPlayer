import { Component, OnInit } from '@angular/core';
import { MusicService } from "../shared/music.service"


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.playlist = this.musicService.getPlaylists();
    console.log(this.playlist);
  }

  title = 'Search';

  songs = [];

  observables = null;

  playlist = [];

  addthissong = null;

  public search(Sparam: string) {
    this.songs = [];
    if (Sparam != "") {
      this.observables = this.musicService.searchMusic(Sparam);
      this.observables.subscribe(res => {
        res.forEach((item, index) => {
          this.songs.push(item);
        })
        //console.log(res);
      });
    }
  }

  public play(i) {
    this.observables.subscribe(res => {
      this.musicService.play(res[i]);
    })
  }

  changed(i, item) {
    this.musicService.addToPlaylist(this.playlist[item], this.songs[i]);
  }

  trackByFn(index, item) {
    return index;
  }
}
