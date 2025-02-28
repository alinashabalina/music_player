import {Component} from '@angular/core';
import {ArtistCardComponent} from '../artist-card/artist-card.component';
import {HTTPService} from './http.service';

@Component({
  selector: 'app-root',
  imports: [ArtistCardComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  constructor(private httpService: HTTPService) {}

  ngOnInit(): void {
    const params = new URLSearchParams(document.location.search);
    const code: string = params.get("code") as string
    this.httpService.getToken(code).subscribe(
    {
      next: (data: any) => {
        // temporary solution for localhost debug: apparently localhost does not let set cookies?
          document.cookie =  `token=${data.success}; expires=Thu, 13 Mar 2025 00:00:00 UTC; path=/;`;
          alert('successfully got token')
      },
      error: error => {
        alert(error.error.message)
      }})
}

// check() {
//   this.httpService.postCheck().subscribe(
//     {
//       next: (data: any) => {
//         alert('lala')
//       },
//       error: error => {
//         alert('not lala')
//       }})
// }

}
