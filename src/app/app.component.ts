import '../sass/style.scss';
import { Component } from '@angular/core';
import { MusicService } from "./shared/music.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private musicService: MusicService
  ) { }

  public music() {
    this.musicService.searchMusic("i'm blue")
      .subscribe(res => {
        console.log(res);
        this.musicService.play(res[0]);
      });
  }

  ngOnInit() {
    var availablePlaylists = this.musicService.getPlaylists();
    //console.log(availablePlaylists);
    if (availablePlaylists.length == 0) {
      this.musicService.createPlaylist("Default Playlist 1");
      this.musicService.createPlaylist("Default Playlist 2");
      this.musicService.createPlaylist("Default Playlist 3");
      //console.log(this.musicService.getPlaylists());
    }
  }
}
