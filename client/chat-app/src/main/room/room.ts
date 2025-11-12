import { Component, OnInit } from '@angular/core';
import { MAINMODULEIMPORTS } from '../main-module-imports';
import { AppBaseComponent } from '../../shared/component-base/app-base-component';
import { AvatarList, SESSIONKEYS } from '../../shared/app-shared.const';
import { TextareaModule } from 'primeng/textarea';
import { MainService } from '../../shared/service/main/main.service';
import { Message_t } from '../../shared/model/main/main.model';

@Component({
  selector: 'app-room',
  imports: [...MAINMODULEIMPORTS,
    TextareaModule
  ],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room extends AppBaseComponent implements OnInit {
  message: string = "";
  btnLoading: boolean = false;
  broadcastedMessages: Message_t[] = [];

  constructor(private readonly mainService: MainService) {
    super();
  }

  ngOnInit(): void {
    this.mainService.onMessage()
      .subscribe((res) => {
        console.log(res);
        this.broadcastedMessages.unshift(res);
      });
  }

  getAvatarLink(id: number): string {
    return AvatarList.find(a => a.id == id)?.link || "/assets/avatar/bakyura.png";
  }

  post(): void {
    const roomId = this.roomId;
    const text = this.message;
    const username = this.username;
    const avatarId = this.selectedAvatarId;
    this.mainService.sendMessage(roomId!, text, username!, avatarId!);
    this.message = "";
  }

  leave(): void {
    const roomId = this.roomId!;
    const username = this.username!;
    this.mainService.leaveRoom(roomId, username)
    sessionStorage.removeItem(SESSIONKEYS.roomId);
    this.router.navigate(["/main/lounge"]);
  }
}
