import { Component } from '@angular/core';
import { TransportationService } from './transportation.service';
import { Car } from './car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TSFlightApp';
  cars:Car[];
  make!:string;       //the ! es una manera de decirle al compilador que la variable ya tiene valor o lo tendra cuando el proyecto corra y no nos entregue error
  model!:string;
  miles!:number;

  constructor (private transportationService:TransportationService){
      this.cars = this.transportationService.getCars();
    }

    addCar(){
      const newCar: Car = {make: this.make, model: this.model, miles: this.miles };
      this.transportationService.addCar(newCar);
    }
}
