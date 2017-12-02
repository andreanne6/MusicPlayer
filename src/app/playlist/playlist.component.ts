import { Component, OnInit } from '@angular/core';
import { MusicService } from "../shared/music.service";

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})

export class PlaylistComponent implements OnInit {
  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.playlist = this.musicService.getPlaylists();
    if (this.playlist.length != 0) {
      this.selectedPlaylist = this.playlist[0];
      this.songs = this.playlist[0].songs;
    }
    // console.log(this.playlist);
  }

  title = 'Playlists';

  playlist = [];

  selectedItem = [];

  songs = [];

  selectedPlaylist = null;

  newPlaylistName: string = "";

  onSelectP(p) {
    this.selectedPlaylist = p;
    this.songs = p.songs;
    console.log(p);
    console.log(p.songs);
    // console.log(p.songs);
  }

  // changed(val) {
  //   this.selectedItem = this.playlist[val];
  //   this.selectedPlaylist = val;
  //   this.songs = this.playlist[val].songs;
  //   // console.log(this.songs);
  // }

  // onSelectS(p) {
  //   // console.log(p);
  //   //this.musicService.play(p);
  // }

  play(i) {
    // console.log(this.songs[i]);
    this.musicService.play(this.songs[i]);
  }

  removeS(i) {
    this.musicService.removeFromPlaylist(this.selectedPlaylist, this.songs[i]);
  }

  addPlaylist() {
    this.musicService.createPlaylist(this.newPlaylistName);
    this.newPlaylistName = "";
    this.playlist = this.musicService.getPlaylists();
    // console.log(this.newPlaylistName);
  }

  removePlaylist(id) {
    var a = this.musicService.getPlaylist(id);
    if (this.selectedPlaylist == null) {
      this.musicService.deletePlaylist(id);
      this.playlist = this.musicService.getPlaylists();
      this.songs = [];
    } else if (this.selectedPlaylist.id == this.musicService.getPlaylist(id).id) {
      this.musicService.deletePlaylist(id);
      this.playlist = this.musicService.getPlaylists();
      this.selectedPlaylist = null;
      this.songs = [];
    }
    else {
      this.musicService.deletePlaylist(id);
      this.playlist = this.musicService.getPlaylists();
      if (this.playlist.length == 0) {
        this.songs = [];
      }
    }
    // console.log(this.playlist);
  }

}
