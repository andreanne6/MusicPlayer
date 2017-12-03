import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit{
	constructor(){}

	@Input() showPause;
	@Input() song_name;
	@Output() backward = new EventEmitter();
	@Output() pauseplay = new EventEmitter();
	@Output() forward = new EventEmitter();
	@Output() stop = new EventEmitter();
	ngOnInit() {
		let paused = this.showPause;
		let song_name = this.song_name;
	}
	
	c_stop(){
		this.stop.emit();
	}

	c_backward(){
		this.backward.emit();
	}

	c_pauseplay(){
		this.pauseplay.emit();
	}

	c_forward(){
		this.forward.emit()
	}
}
