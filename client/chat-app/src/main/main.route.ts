import { Routes } from "@angular/router";

export const MAINROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./main").then(c => c.Main),
  }
]