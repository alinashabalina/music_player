import {Component} from '@angular/core';
import {HTTPService} from '../services/http.service';

interface profileData {
  user: string,
  id: string,
  country: string
}

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  standalone: true,
  styleUrl: './user-card.component.scss'
})


export class UserCardComponent {
  name: string = ''

  constructor(private httpService: HTTPService) {}

  getProfile() {
    this.httpService.getUser().subscribe({
      next: (data: any) => {
        this.name = data.user
      }, error: error => {
        console.log(error.error.message)
      }
    })
  }

  ngOnInit(): void {
    const params = new URLSearchParams(document.location.search);
    const code: string = params.get("code") as string
    this.httpService.getToken(code).subscribe({
        next: (data: any) => {
          this.getProfile()
          window.history.pushState(null, 'samePage', '/');
        }, error: error => {
          alert(error.error.message)
        }
      }
    )
  }
}
