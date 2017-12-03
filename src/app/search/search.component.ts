import { Component, OnInit } from '@angular/core';
import { MusicService, Playlist } from "../shared/music.service"


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  title = 'Search';
  songs = [];
  observables = null;
  playlists = [];
  addthissong = null;

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.musicService
      .getPlaylists()
      .subscribe(playlists => {
        this.playlists = playlists;
        if (playlists.length == 0) {
          this.musicService
            .createPlaylist("Default")
            .subscribe(playlist => {
              this.playlists.push(playlist);
            });
        }
      });
  }

  public search(Sparam: string) {
    this.songs = [];
    if (Sparam != "") {
      this.observables = this.musicService.searchMusic(Sparam);
      this.observables.subscribe(res => {
        res.forEach((item, index) => {
          this.songs.push(item);
        })
      });
    }
  }

  public play(i) {
    this.observables.subscribe(res => {
      this.musicService.play(res[i]);
    })
  }

  addSong(playlistIndex, song) {
    this.musicService
      .addToPlaylist(this.playlists[playlistIndex], song)
      .subscribe();
  }

  trackByFn(index, item) {
    return index;
  }
}
