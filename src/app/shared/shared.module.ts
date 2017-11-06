import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { MusicService } from './music.service';

//Apis
import { SpotifyApiService } from './apis/spotify-api.service';
import { JamendoApiService } from './apis/jamendo-api.service';

@NgModule({
    declarations: [],
    imports: [
        HttpModule,
    ],
    providers: [
        MusicService,
        SpotifyApiService,
        JamendoApiService
    ],
})
export class SharedModule { }
