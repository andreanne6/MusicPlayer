import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { MusicService } from './music.service';
import { SpotifyApiService } from './apis/spotify-api.service';

@NgModule({
    declarations: [],
    imports: [
        HttpModule,
    ],
    providers: [
        MusicService,
        SpotifyApiService
    ],
})
export class SharedModule { }
