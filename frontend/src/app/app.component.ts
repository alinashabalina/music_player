import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ArtistCardComponent} from '../artist-card/artist-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArtistCardComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
