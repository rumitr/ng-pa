import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaService {

  // url: 'http://api.squid.localhost/test';
  rfq: {};
  rfqitems: {};
  offers: {};

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('./assets/test.json');
  }
}
