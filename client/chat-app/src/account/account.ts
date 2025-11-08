import { Component } from '@angular/core';
import { ACCOUNTMODULEIMPORTS } from './account-module-imports';
import { AvatarList } from '../shared/app-shared.const';
import { Avatar_t } from '../shared/app-shared.model';

@Component({
  selector: 'app-account',
  imports: [...ACCOUNTMODULEIMPORTS],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
  avatarList: Avatar_t[] = AvatarList;
  selectedAvatarId: number = 0;
}
