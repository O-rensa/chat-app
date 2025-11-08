import { Component } from '@angular/core';
import { ACCOUNTMODULEIMPORTS } from './account-module-imports';
import { AvatarList } from '../shared/app-shared.const';
import { Avatar_t } from '../shared/app-shared.model';
import { AccountService } from '../shared/service/account.service';

@Component({
  selector: 'app-account',
  imports: [...ACCOUNTMODULEIMPORTS],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
  avatarList: Avatar_t[] = AvatarList;
  disableEnterButton: boolean = false;

  constructor(private readonly accountService: AccountService) {
  }

  get selectedAvatarId(): number {
    return this.accountService.selectedAvatarId;
  }

  set selectedAvatarId(id: number) {
    this.accountService.selectedAvatarId = id;
  }

  get username(): string {
    return this.accountService.username;
  }

  set username(username: string) {
    this.accountService.username = username.trim();
  }

  enter(): void {
    if (this.username.trim().length > 0 && this.selectedAvatarId >= 0 && this.selectedAvatarId <= 19) {
      this.disableEnterButton = true;
      this.accountService.enter();
    }
  }
}
