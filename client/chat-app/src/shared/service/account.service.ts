import { inject, Injectable } from "@angular/core";
import { SESSIONKEYS } from "../app-shared.const";
import { Router, UrlTree } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  selectedAvatarId: number = 0;
  username: string = "";

  private readonly router: Router = inject(Router);

  enter(): void {
    sessionStorage.setItem(SESSIONKEYS.username, this.username);
    sessionStorage.setItem(SESSIONKEYS.selectedAvatarId, this.selectedAvatarId.toString());

    const mainUrl: UrlTree = this.router.createUrlTree(["/main"]);
    this.router.navigateByUrl(mainUrl);
  }
}