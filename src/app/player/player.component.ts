import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit{
	constructor(){}
	ngOnInit() {}
	@Input() paused;
	@Output() backward = new EventEmitter();
	@Output() pauseplay = new EventEmitter();
	@Output() forward = new EventEmitter();
	@Output() stop = new EventEmitter();
}
