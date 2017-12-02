// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from "./shared/shared.module";


// Declarations
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistModule } from './playlist/playlist.module';
import { SearchModule } from './search/search.module';
import { routing } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SearchModule,
    PlaylistModule,
    SharedModule,
    routing
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    PlayerComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
