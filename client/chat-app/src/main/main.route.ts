import { Routes } from "@angular/router";

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