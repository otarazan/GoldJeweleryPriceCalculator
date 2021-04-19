import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  gr2OzRatio:any=0.0352739619;
  oz2GrRatio:any=28.4;

  currencies:any;
  price:number;
  currency:string="CAD";
  calculation:string;
  weightGr:number=this.gr2OzRatio;
  weightOz=1;
  purity:any="99.9";
  purities = {"99.9": "24 Karat",
              '95.83': "23 Karat",
              "91.67": "22 Karat",
              "75.00":"18 Karat",
              "41.67":"10 Karat",
              "33.33":"8 Karat"};
  spread:number=5;
  constructor(private http: HttpClient) {
    
    this.http.get('https://www.xe.com/api/popular-pairs/?from=EUR').subscribe((currencies:any) => {
      this.currencies = currencies;
      this.currencyChange();
    });

  }

  currencyChange(){
    this.http.get('https://data-asg.goldprice.org/dbXRates/'+this.currency).subscribe((response:any) => {
      console.log(response);
      this.price = response.items[0].xauClose;
      this.calculate();
    });
  }

  calculate(){
    let spreadp = (this.spread/100)+1;
    this.calculation = (this.price*this.weightGr*28.4*this.purity/100*(spreadp)).toFixed(2);
  }

  modelChange(){
    this.calculate();
  }

  onChangeOz(value){
    console.log(value);
    this.weightGr = value*this.gr2OzRatio;
    this.modelChange();
  }

  onChangeGr(value){
    console.log(value);
    this.weightOz = value*this.oz2GrRatio;
    this.modelChange();
  }
}
