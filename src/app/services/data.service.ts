import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
    this.currency="CAD";
  }

  goldCount: number;
  silverCount:number;
  currency:any;

  setCurrency(currency){
    this.currency=currency;
  }

  getCurrency(){
    return this.currency;
  }

  getCurrencies(){
    return this.http.get('https://www.xe.com/api/popular-pairs/?from=JPY');
  }

  getPrice(){
    return this.http.get('https://data-asg.goldprice.org/dbXRates/'+this.currency)
  }

  setGold(goldCount) {
      this.goldCount = goldCount;
  }

  getGold(){
      return this.goldCount;
  }

  setSilver(silverCount) {
    this.silverCount = silverCount;
  }

  getSilver(){
      return this.silverCount;
  }
}
