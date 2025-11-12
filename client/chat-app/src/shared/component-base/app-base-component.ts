import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "../service/session.service";
import { AvatarList } from "../app-shared.const";

export class AppBaseComponent {
  protected readonly router: Router = inject(Router);
  private readonly sessionService: SessionService = inject(SessionService);

  get selectedAvatarId(): number | null {
    const stringId = this.sessionService.selectedAvatarId;
    if (stringId == null) {
      return null;
    }
    return parseInt(stringId);
  }

  get username(): string | null {
    return this.sessionService.username;
  }

  get selectedAvatar(): string | null {
    const avatar = AvatarList.find(a => a.id == this.selectedAvatarId);
    if (avatar) {
      return avatar.link;
    }
    return null;
  }

  get selectedAvatarAlt(): string | null {
    const avatar = AvatarList.find(a => a.id == this.selectedAvatarId);
    if (avatar) {
      return avatar.alt;
    }
    return null;
  }

  get roomId(): string | null {
    return this.sessionService.roomId;
  }
}