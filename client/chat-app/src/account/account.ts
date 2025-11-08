import { Component } from '@angular/core';
import { ACCOUNTMODULEIMPORTS } from './account-module-imports';

@Component({
  selector: 'app-account',
  imports: [...ACCOUNTMODULEIMPORTS],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
}
