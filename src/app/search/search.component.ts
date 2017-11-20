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
  }

  title = 'Search';

  songs = [];

  observables = null;

  playlist = [];

  public search(Sparam: string) {
    this.songs = [];
    if (Sparam != "") {
      this.observables = this.musicService.searchMusic(Sparam);
      this.observables.subscribe(res => {
        res.forEach((item, index) => {
          this.songs.push({ 'record': index, 'name': item.title, 'artist': item.authors });
        })
        console.log(res);
        //this.musicService.play(res[0]);
      });
    }

    var items = this.musicService.getPlaylists();
    items.forEach((item, index) => {
      this.playlist.push({ 'id': item.id, 'name': item.name });
    });
  }

  public play(i) {
    this.observables.subscribe(res => {
      this.musicService.play(res[i]);
    })
  }

  public addToPlaylist(i) {

  }

  changed() {
    console.log("changed");
  }
}
