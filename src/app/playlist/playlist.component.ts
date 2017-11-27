import { Component, OnInit } from '@angular/core';
import { MusicService } from "../shared/music.service"

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})



export class PlaylistComponent implements OnInit{
	
	public playlists = [];
	public title = 'Playlists';
	public playlist_name:string;
	public modalId : string = 'modalId';
	public modal_options = {};
	public successEventName = 'successEvent';  
	playlist_hidden:string = 'none';
	constructor(private musicService: MusicService){}
	// @ViewChild(Modal) modal;
	
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

	remove(id:number){
		this.musicService.deletePlaylist(id);
	}
}