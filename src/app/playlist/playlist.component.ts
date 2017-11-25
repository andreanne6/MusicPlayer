import { Component, OnInit } from '@angular/core';
import { MusicService } from "../shared/music.service"

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent implements OnInit {
  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.playlist = this.musicService.getPlaylists();
    console.log(this.playlist);
  }

  title = 'Playlists';

  playlist = [];

  selectedItem = [];

  songs = [];

  onSelectP(p) {
    this.selectedItem = p;
    this.songs = p.songs;
    console.log(this.songs);
  }

  changed(val) {
    this.selectedItem = this.playlist[val];
    this.songs = this.playlist[val].songs;
    console.log(this.songs);
  }

  onSelectS(p) {
    console.log(p);
    //this.musicService.play(p);
  }

}
