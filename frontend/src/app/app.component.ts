import {Component} from '@angular/core';
import {ArtistCardComponent} from '../artist-card/artist-card.component';
import {HTTPService} from './http.service';

interface profileData {
  user?: string,
  id?: string,
  country?: string
}

type dataData = string | undefined;

@Component({
  selector: 'app-root',
  imports: [ArtistCardComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'frontend';
  name: dataData = ''
  id: dataData = ''

  constructor(private httpService: HTTPService) {
  }

  getProfile() {
    this.httpService.getUser().subscribe({
      next: (data: profileData) => {
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
      }, error: error => {
        alert(error.error.message)
      }
    })
  }



}
