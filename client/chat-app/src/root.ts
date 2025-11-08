import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressSpinnerModule, CommonModule],
  templateUrl: './root.html',
  styleUrl: './root.scss'
})
export class Root {
  protected readonly title = signal('chat-app');
  showSpinner: boolean = true;

  onRootRouteActivate(): void {
    this.showSpinner = false;
  } 

  onRootRouteDeactivate(): void {
    this.showSpinner = true;
  }
}
