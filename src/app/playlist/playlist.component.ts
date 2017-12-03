import { Component, OnInit } from '@angular/core';
import { MusicService } from "../shared/music.service"

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})

export class PlaylistComponent implements OnInit {
	playlists = [];
	songs = [];
	title = 'Playlists';
	playlist_name:string;
	modalId : string = 'modalId';
	modal_options = {};
	successEventName = 'successEvent';
	playlist_hidden:string = 'none';
	selectedPlaylistId = null;

	constructor(private musicService: MusicService) {}

	ngOnInit() {
    this.refreshPlaylists();
	}

	create(){
  		this.playlist_hidden = 'block';
	}

	onSubmit(value: string): void {
		this.musicService
      .createPlaylist(value)
      .subscribe(playlist => {
        this.playlists.push(playlist);
      });
	}

	removePlaylist(playlistId){
		this.musicService
      .deletePlaylist(playlistId)
      .subscribe(playlists => {
        this.playlists = playlists;
      });
	}

	selectPlaylist(playlistId) {
		this.selectedPlaylistId = playlistId;
		this.songs = this.selectedPlaylist().songs;
	}

	playSong(song) {
    this.musicService.play(song);
  }

  removeSong(song) {
    this.musicService
      .removeFromPlaylist(this.selectedPlaylist(), song)
      .subscribe(playlists => {
        this.playlists = playlists;
        //If we remove the selected playlist
        if(!this.selectedPlaylist()) {
          this.selectedPlaylistId = null;
          this.songs = [];
        }
      });
  }

  refreshPlaylists() {
    this.musicService
      .getPlaylists()
      .subscribe(playlists => {
        this.playlists = playlists;
      });
  }

  selectedPlaylist() {
    return this.findPlaylist(this.selectedPlaylistId);
  }

  selectedSongs() {
    let playlist = this.selectedPlaylist();
    if(playlist) {
      return playlist.songs;
    }
    return [];
  }

  findPlaylist(playlistId) {
    for (let i = 0; i < this.playlists.length; i++) {
      if (this.playlists[i].id == playlistId) {
        return this.playlists[i];
      }
    }
    return null;
  }
}
