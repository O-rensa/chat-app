import { Routes } from "@angular/router";
import { MainGuard } from "../shared/guard/main.guard";

export const MAINROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./main").then(c => c.Main),
    children: [
      {
        path: "",
        redirectTo: "lounge",
        pathMatch: "full",
      },
      {
        path: "lounge",
        loadComponent: () => import("./lounge/lounge").then(c => c.Lounge),
      },
      {
        path: "room",
        canActivate: [MainGuard],
        loadComponent: () => import("./room/room").then(c => c.Room),
      }
    ]
  },
  {
    path: "**",
    redirectTo: "lounge",
    pathMatch: "full",
  }
]