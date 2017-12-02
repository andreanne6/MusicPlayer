import { PlaylistComponent } from './playlist.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlaylistComponent],
  imports: [CommonModule,
    FormsModule],
  providers: [],
})
export class PlaylistModule { }
