import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HTTPService {
  private url: string = 'http://localhost:3000';
  private options = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
  constructor(private http: HttpClient) {}
  getToken(code: string) {
    const body: string = JSON.stringify({'code': code})
    return this.http.post(this.url + '/token', body, this.options);
  }

  getUser() {
    return this.http.post(this.url + '/me', {}, this.options);
  }
}
