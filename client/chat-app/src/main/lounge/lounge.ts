import { Component } from '@angular/core';
import { MAINMODULEIMPORTS } from '../main-module-imports';

@Component({
  selector: 'app-lounge',
  imports: [...MAINMODULEIMPORTS,],
  templateUrl: './lounge.html',
  styleUrl: './lounge.scss',
})
export class Lounge {

}
