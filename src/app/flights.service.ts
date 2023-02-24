import { Injectable, OnInit } from '@angular/core';
import { Flight } from './flight.model';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) {
    this.backEndURL = this.getBackEndUrl();
  }
  backEndURL: string;

  getFlights(origin: string, destination:string): Observable<any> {
    return this.http.get(`${this.backEndURL}/flights/query/${origin}/${destination}`)
  }

  getAllFlights(): Observable<any> {
    return this.http.get(`${this.backEndURL}/flights/`)
  }

  postFlight(flight: Flight){
    return this.http.post(`${this.backEndURL}/flights`, flight).subscribe(data =>{
      console.log("data posted to server!");
    });
  }

  updateFlight(flight: Flight) {
    return this.http.post(`${this.backEndURL}/flights/${flight.id}/update`,flight);
  }

  deleteFlight(id:number){
    return this.http.post(`${this.backEndURL}/flights/${id}/delete`, null);
  }
  
  getAllOrigins(): Observable<any> {
    return this.http.get(`${this.backEndURL}/flights/cities/origins`);
  }

  getAllDestinations(): Observable<any> {
    return this.http.get(`${this.backEndURL}/flights/cities/destinations`);
  }

  getBackEndUrl(): string {
    const segements = document.URL.split('/');
    const reggie = new RegExp(/localhost/);
    return reggie.test(segements[2]) ? 'http://localhost:3000' : 'https://nestjs-typeorm-postgres.herokuapp.com';
  }

}