import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
    this.currency="CAD";
    this.silverCount=1;
    this.goldCount=1;
    this.platinumCount=1;
  }

  goldCount: number;
  silverCount:number;
  platinumCount:number;
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

  getPlatinumPrice(){
    return this.http.get('https://goldstocklive.com/getheaderfeed.php')
  }

  setGold(goldCount) {
      this.goldCount = goldCount;
  }

  getGold(){
      return this.goldCount;
  }

  getPlatinum(){
    return this.platinumCount;
  }


  setPlatinum(platinumCount){
    this.platinumCount = platinumCount;
  }

  setSilver(silverCount) {
    this.silverCount = silverCount;
  }

  getSilver(){
      return this.silverCount;
  }
}
