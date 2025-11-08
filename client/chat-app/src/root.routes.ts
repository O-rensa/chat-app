import { Routes } from '@angular/router';
import { AccountGuard } from './shared/guard/account.guard';
import { MainGuard } from './shared/guard/main.guard';

export const ROOTROUTES: Routes = [
  {
    path: "account",
    loadChildren: () => import("./account/account.route").then(r => r.ACCOUNTROUTES),
    canActivate: [AccountGuard],
    canActivateChild: [AccountGuard],
  },
  {
    path: "main",
    loadChildren: () => import("./main/main.route").then(r => r.MAINROUTES),
    canActivate: [MainGuard],
    canActivateChild: [MainGuard],
  },
  {
    path: "",
    redirectTo: "account",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "main",
    pathMatch: "full",
  }
];
