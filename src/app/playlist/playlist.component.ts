import { Component, OnInit } from '@angular/core';
import { MusicService } from "../shared/music.service"

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})



export class PlaylistComponent implements OnInit{
	
	playlists = [];
	songs = [];
	title = 'Playlists';
	playlist_name:string;
	playlist_hidden:string = 'none';
	selectedPlaylist = null;
	constructor(private musicService: MusicService){}
	
	
	ngOnInit() {
		this.playlists = this.musicService.getPlaylists();
	}

	create(){
  		this.playlist_hidden = 'block';
	}

	onSubmit(value: string): void {
		this.musicService.createPlaylist(value , []);
		alert(' Playlist ' + value + ' has been created');
		console.log(value)
	}

	removePlaylist(id:number){
		this.musicService.deletePlaylist(id);
	}

	selectPlaylist(i){	
		this.selectedPlaylist = this.playlists[i];
		this.songs = this.selectedPlaylist.songs;
	}

	playSong(i) {
    this.musicService.play(this.songs[i]);
  }

  removeSong(i) {
    this.musicService.removeFromPlaylist(this.selectedPlaylist, this.songs[i]);
  }
}