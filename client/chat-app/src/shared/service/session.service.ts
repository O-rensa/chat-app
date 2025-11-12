import { Injectable } from "@angular/core";
import { SESSIONKEYS } from "../app-shared.const";

@Injectable({
  providedIn: "root"
})
export class SessionService {

  get username(): string | null {
    return sessionStorage.getItem(SESSIONKEYS.username);
  }

  get selectedAvatarId(): string | null {
    return sessionStorage.getItem(SESSIONKEYS.selectedAvatarId);
  }

  get roomId(): string | null {
    return sessionStorage.getItem(SESSIONKEYS.roomId);
  }
}