import { Component } from '@angular/core';
import { MAINMODULEIMPORTS } from '../main-module-imports';
import { AppBaseComponent } from '../../shared/component-base/app-base-component';
import { AccountService } from '../../shared/service/account.service';

@Component({
  selector: 'app-lounge',
  imports: [...MAINMODULEIMPORTS,],
  templateUrl: './lounge.html',
  styleUrl: './lounge.scss',
})
export class Lounge extends AppBaseComponent {
  btnLoading: boolean = false;

  constructor(private readonly accountService: AccountService) {
    super();
  }

  logout(): void {
    this.btnLoading = true;
    this.accountService.logout();
  }
}
