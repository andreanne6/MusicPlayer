import '../sass/style.scss';
import { Component } from '@angular/core';
import { MusicService } from "./shared/music.service"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private musicService: MusicService
    ) {}

    public music() {
        this.musicService.searchMusic("i'm blue")
            .subscribe(res => {
                console.log(res);
                this.musicService.play(res[0]);
            });
    }

    title = 'app works!';
}
