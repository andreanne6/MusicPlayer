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
    ) {
        this.musicService.searchMusic("blue")
            .subscribe(res => {
                // Each item has a "preview_url" property for a 30s playback. Null means no preview is available.
                // That's the best spotify can do for us.
                console.log(res);
            });
    }

    title = 'app works!';
}
