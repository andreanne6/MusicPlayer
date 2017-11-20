import { Component, OnInit } from '@angular/core';
import { MusicService } from "../shared/music.service"

// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  constructor(
    private musicService: MusicService,
    // public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit() { }

  title = 'Search Component';

  songs = [];

  observables = null;

  public search(Sparam: string) {
    this.songs = [];
    if (Sparam != "") {
      this.observables = this.musicService.searchMusic(Sparam);
      this.observables.subscribe(res => {
        res.forEach((item, index) => {
          this.songs.push({ 'record': index, 'name': item.title, 'artist': item.authors });
        })
        console.log(res);
        //this.musicService.play(res[0]);
      });
    }
  }

  public play(i) {
    this.observables.subscribe(res => {
      this.musicService.play(res[i]);
    })
  }

  // public addToPlaylist(i) {
  //   //   let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //   //     width: '250px',
  //   //     data: { name: this.name, animal: this.animal }
  //   //   });
  //   //
  //   //   dialogRef.afterClosed().subscribe(result => {
  //   //     console.log('The dialog was closed');
  //   //     this.animal = result;
  //   //   });
  //   // }
  // }
}
