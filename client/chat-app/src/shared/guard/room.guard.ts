import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "../service/session.service";

export const RoomGuard: CanActivateFn = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  if (sessionService.roomId != null) {
    return true;
  } else {
    return router.createUrlTree(["/main/lounge"]);
  }
}