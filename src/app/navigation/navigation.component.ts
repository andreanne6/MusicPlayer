import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent implements OnInit{
  private _mode: string = "push";
  private _showBackdrop: boolean = true;
	constructor(){}
  ngOnInit() {}
}
