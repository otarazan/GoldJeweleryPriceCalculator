import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  gr2OzRatio:any=0.0352739619;
  oz2GrRatio:any=28.4;

  currencies:any;
  price:number;
  currency:string="CAD";
  calculation:string;
  weightGr:number=this.gr2OzRatio;
  weightOz=1;
  purity:any="99.9";
  purities = {"99.9": "Pure silver",
              '95.8': "Brittania",
              "92.5": "Sterling silver",
              "80":"Jewellery silver"};
  spread:number=5;
  constructor(private http: HttpClient, private dataService:DataService) {
    
    this.dataService.getCurrencies().subscribe((currencies:any) => {
      this.currencies = currencies;
      this.currencyChange();
    });

  }

  currencyChange(){
    this.dataService.setCurrency(this.currency);
    this.dataService.getPrice().subscribe((response:any) => {
      this.price = response.items[0].xagPrice;
      this.calculate();
    });
  }

  calculate(){
    let spreadp = (this.spread/100)+1;
    this.calculation = (this.price*this.weightGr*28.4*this.purity/100*(spreadp)).toFixed(2);
    this.dataService.setSilver(this.weightOz);
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
