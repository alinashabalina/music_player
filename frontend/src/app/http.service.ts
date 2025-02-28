import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HTTPService {
  private url: string = 'http://localhost:3000';
  private post_headers = {'Content-Type': 'application/json'}
  constructor(private http: HttpClient) {}
  getToken(code: string) {
    const body = JSON.stringify({'code': code})
    return this.http.post(this.url + '/token', body, {headers: this.post_headers});
  }
}
