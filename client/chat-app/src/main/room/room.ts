import { Component } from '@angular/core';
import { MAINMODULEIMPORTS } from '../main-module-imports';

@Component({
  selector: 'app-room',
  imports: [...MAINMODULEIMPORTS,],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room {

}
