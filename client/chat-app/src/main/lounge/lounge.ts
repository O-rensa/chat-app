import { Component, OnDestroy, OnInit } from '@angular/core';
import { MAINMODULEIMPORTS } from '../main-module-imports';
import { AppBaseComponent } from '../../shared/component-base/app-base-component';
import { AccountService } from '../../shared/service/account.service';
import { MainService } from '../../shared/service/main/main.service';
import { SESSIONKEYS } from '../../shared/app-shared.const';

@Component({
  selector: 'app-lounge',
  imports: [...MAINMODULEIMPORTS,],
  templateUrl: './lounge.html',
  styleUrl: './lounge.scss',
})
export class Lounge extends AppBaseComponent implements OnInit {
  btnLoading: boolean = false;
  roomName: string = "";
  rooms: {id: string, name: string}[] = [];

  constructor(private readonly accountService: AccountService,
    private readonly mainService: MainService
  ) {
    super();
  }

  ngOnInit(): void {
    this.mainService.connectWebSocket();
    this.getRoomList();
  }

  getRoomList(): void {
    this.btnLoading = true;
    this.mainService.getRoomList()
      .subscribe((res) => {
        this.roomName = "";
        this.rooms = res;
        this.btnLoading = false;
      });
  }

  logout(): void {
    this.btnLoading = true;
    this.accountService.logout();
    this.mainService.disconnectWebSocket();
  }

  createRoom(): void {
    const roomName: string = this.roomName;
    const roomId: string = crypto.randomUUID(); 
    this.btnLoading = true;
    this.mainService.createRoom(roomId, roomName)
      .subscribe(() => {
        this.joinRoom(roomId, roomName);
      });
  }

  joinRoom(roomId: string, roomName: string): void {
    const id: string = roomId;
    const name: string = roomName;
    const username: string = this.username || "";
    const avatarId: number = this.selectedAvatarId || 0;
    this.mainService.joinRoom(id, name, username, avatarId);
    sessionStorage.setItem(SESSIONKEYS.roomId, id);
    this.router.navigate(["main/room"]);
  }
}
