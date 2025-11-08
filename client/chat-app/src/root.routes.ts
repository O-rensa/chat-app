import { Routes } from '@angular/router';

export const ROOTROUTES: Routes = [
  {
    path: "account",
    loadChildren: () => import("./account/account.route").then(r => r.ACCOUNTROUTES),
  },
  {
    path: "main",
    loadChildren: () => import("./main/main.route").then(r => r.MAINROUTES),
  },
  {
    path: "",
    redirectTo: "account",
    pathMatch: "full",
  },
  {
    path: "*",
    redirectTo: "main",
    pathMatch: "full",
  }
];
