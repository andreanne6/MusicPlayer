// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SidebarModule } from 'ng-sidebar';

// Declarations
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlaylistModule } from './playlist/playlist.module';
import { SearchModule } from './search/search.module';
import { routing } from './app.routes';

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SidebarModule.forRoot(),
    routing,
    SearchModule,
    PlaylistModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
