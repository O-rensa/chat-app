import { inject } from "@angular/core";
import { Router } from "@angular/router";

export class AppBaseComponent {
  protected readonly router: Router = inject(Router);
}