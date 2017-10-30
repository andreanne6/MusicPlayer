// ====== ./app/app.routes.ts ======

// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';

// Route Configuration
export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);