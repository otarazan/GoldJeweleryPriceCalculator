import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  gr2OzRatio:any=0.0352739619;
  oz2GrRatio:any=28.3495231;

  currencies:any;
  price:number;
  currency:string="CAD";
  calculation:string;
  weightGr:number = this.oz2GrRatio;
  weightOz=1;
  purity:any="99.9";
  purities = {"99.9": "24 Karat",
              '95.83': "23 Karat",
              "91.67": "22 Karat",
              "75.00":"18 Karat",
              "41.67":"10 Karat",
              "33.33":"8 Karat"};
  spread:number=5;

  constructor(private http: HttpClient, private dataService: DataService) {

    this.currencies =  this.dataService.getCurrencies();
    this.currencyChange();
  }

  currencyChange(){
    this.dataService.setCurrency(this.currency);
    this.dataService.getPrice().subscribe((response:any) => {
      this.price = response.items[0].xauClose;
      this.calculate();
    });
  }

  calculate(){
    let spreadp = (this.spread/100)+1;
    this.calculation = (this.price*this.weightGr*this.gr2OzRatio*this.purity/100*(spreadp)).toFixed(2);
    this.dataService.setGold(this.weightOz);
  }

  modelChange(){
    this.calculate();
  }

  onChangeOz(value){
    this.weightGr = value*this.oz2GrRatio;
    this.modelChange();
  }

  onChangeGr(value){
    this.weightOz = value*this.gr2OzRatio;
    this.modelChange();
  }
}
