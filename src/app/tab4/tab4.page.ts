import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  
  gr2OzRatio:any=0.0352739619;
  oz2GrRatio:any=28.4;

  currencies:any;
  price:number;
  currency:string="CAD";
  calculation:string;
  weightGr:number=this.oz2GrRatio;
  weightOz=1;
  purity:any="95";
  purities = {"95": "95% DD",
              '85': "85% Platinum",
              "80": "80% Platinum",
              "75": "75% Platinum"};
  spread:number=5;
  constructor(private http: HttpClient, private dataService:DataService) {
    
    this.currencies = ["CAD","USD"];
    this.currencyChange();

  }

  currencyChange(){
    this.dataService.setCurrency(this.currency);
    this.dataService.getPlatinumPrice().subscribe((response:any) => {
      
      this.price = response['platinumAsk'+this.currency].replace(/[^0-9.-]+/g,"");
      console.log(this.price);
      this.calculate();
    });
  }

  calculate(){
    let spreadp = (this.spread/100)+1;
    this.calculation = (this.price*this.weightGr*this.gr2OzRatio*this.purity/100*(spreadp)).toFixed(2);
    this.dataService.setPlatinum(this.weightOz);
    console.log(this.calculation);
  }

  modelChange(){
    this.calculate();
  }

  onChangeOz(value){
    console.log(value);
    this.weightGr = value*this.oz2GrRatio;
    this.modelChange();
  }

  onChangeGr(value){
    console.log(value);
    this.weightOz = value*this.gr2OzRatio;
    this.modelChange();
  }

  ionViewDidEnter() {    
    this.currency = this.dataService.getCurrency();
  }

}
