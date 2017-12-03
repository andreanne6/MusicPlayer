import '../sass/style.scss';
import { Component } from '@angular/core';
import { MusicService } from "./shared/music.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  paused = true;

  constructor(
    private musicService: MusicService
  ) {}
}
