import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent implements OnInit{
  private _MODES: Array<string> = ['over', 'push', 'slide'];
  private _modeNum: number = 2;
  private _showBackdrop: boolean = true;
	constructor(){}
  ngOnInit() {}
}
