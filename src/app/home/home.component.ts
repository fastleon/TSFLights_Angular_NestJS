import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  flights! : Flight[];
  selectedOrigin!: string;
  selectedDestination!: string;
  filteredOriginList!:any[];
  filteredDestinationList!:any[];

  //Inyectamos el servicio FligthsService
  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
    //this.flightsService.getFlights().subscribe(data =>{this.flights = data})
    this.flightsService.getAllOrigins().subscribe(data =>{
      this.filteredOriginList = data;
    });

    this.flightsService.getAllDestinations().subscribe(data =>{
      this.filteredDestinationList = data;
    });
  }

  query():void {
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;

    this.flightsService.getFlights(origin, destination).subscribe(data =>{
      this.flights = data;
      console.log(this.flights);
    })
  }
}
