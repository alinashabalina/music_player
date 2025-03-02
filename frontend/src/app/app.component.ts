import {Component} from '@angular/core';
import {UserCardComponent} from '../user-card/user-card.component';

@Component({
  selector: 'app-root',
  imports: [UserCardComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
