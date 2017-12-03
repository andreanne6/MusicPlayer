import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from "@angular/http";
import { MusicService } from './music.service';

@NgModule({
    declarations: [],
    imports: [
        HttpModule,
        JsonpModule
    ],
    providers: [
        MusicService
    ],
})
export class SharedModule { }
