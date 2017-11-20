// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SidebarModule } from 'ng-sidebar';
import { SharedModule } from "./shared/shared.module";


// Declarations
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlaylistModule } from './playlist/playlist.module';
import { SearchModule } from './search/search.module';
import { routing } from './app.routes';
import { MdSidenav } from '@angular2-material/sidenav';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SidebarModule.forRoot(),
    SearchModule,
    PlaylistModule,
    SharedModule,
    routing
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    MdSidenav
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
