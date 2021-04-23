import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '@capacitor-community/http';
import { isPlatform } from '@ionic/core';
import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';

import {from} from 'rxjs'
import {map} from 'rxjs/operators';

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

  get(url){
    if(isPlatform('capacitor')){
      const { Http } = Plugins;

      return from( Http.request({
        method: 'GET',
        url:url
      })).pipe(
        map((result:any)=>result.data)
      );
    }else{
      return this.http.get(url);
    }
  }


  setCurrency(currency){
    this.currency=currency;
  }

  getCurrency(){
    return this.currency;
  }

  getCurrencies(){
    return this.get('https://www.xe.com/api/popular-pairs/?from=JPY');
  }

  getPrice(){
    return this.get('https://data-asg.goldprice.org/dbXRates/'+this.currency)
  }

  getPlatinumPrice(){
    return this.get('https://goldstocklive.com/getheaderfeed.php')
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
