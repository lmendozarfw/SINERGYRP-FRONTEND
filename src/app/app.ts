import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmacionComponent } from './shared/components/confirmacion/confirmacion.component';

@Component({
  imports: [RouterOutlet, Toast, ConfirmacionComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('activo_fijo');
}
