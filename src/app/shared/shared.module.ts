import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from "@angular/http";
import { MusicService } from './music.service';

//Apis
import { SpotifyApiService } from './apis/spotify-api.service';
import { JamendoApiService } from './apis/jamendo-api.service';
import { DeezerApiService } from './apis/deezer-api.service';

@NgModule({
    declarations: [],
    imports: [
        HttpModule,
        JsonpModule
    ],
    providers: [
        MusicService,
        SpotifyApiService,
        JamendoApiService,
        DeezerApiService
    ],
})
export class SharedModule { }
