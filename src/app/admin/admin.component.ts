import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private flightService: FlightsService){}

  id!:number;
  origin!: string;
  destination!: string;
  flightNumber!: number;
  depart!: Date;
  arrive!: Date;
  nonstop: boolean = false;
  flightList!: Flight[];

  ngOnInit(): void{
    this.refresh();
  }

  refresh(){
    this.flightService.getAllFlights().subscribe(data =>{
      this.flightList = data;
    })
  }

  toggleNonStop(){
    this.nonstop = !this.nonstop;
  }

  sendFlight(){
    const flight:Flight = {
      origin: this.origin,
      destination: this.destination,
      flightNumber: this.flightNumber,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop,
    }
    this.flightService.postFlight(flight);
    this.refresh();
  }

  update(flight:Flight){
    this.flightService.updateFlight(flight).subscribe(data =>{
      console.log("data is", data);
      if(data && data['affected']){
        this.refresh();
      }
    });
  }

  delete(flight:Flight){
    if (window.confirm('are you sure you want to delete this flight? ')){
      /// your delete method code 
        if (flight.id !== undefined){
          this.id = flight.id;
          this.flightService.deleteFlight(this.id).subscribe(data =>{
          console.log('data is', data);
          if(data && data['affected']){
            this.refresh();
          }
        })
      }else{
        console.log("id es undefined");
      }
    } 
  }

}