// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Declarations
import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { routing } from './app.routes';

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    PlaylistComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
