import { Routes } from "@angular/router";

export const ACCOUNTROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./account").then(c => c.Account),
  }
]