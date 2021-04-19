import { Component } from '@angular/core';
import { DataService } from '../services/data.service'; 


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  silverCount:any;
  goldCount:any;
  platinumCount:any;
  total:any;
  currency:any;
  goldPrice:any;
  silverPrice:any;
  platinumPrice:any;
  constructor(private dataService: DataService) {
  }

  ionViewDidEnter() {
    this.currency = this.dataService.getCurrency();
    this.silverCount=this.dataService.getSilver()  ;
    this.goldCount=this.dataService.getGold() ;    
    this.platinumCount=this.dataService.getPlatinum();

    this.dataService.getPrice().subscribe((response:any) => {
      console.log(response);
      if(response.items[0]!=null){
        this.goldPrice = response.items[0].xauPrice;
        this.silverPrice = response.items[0].xagPrice;

        let totalGoldPrice = this.goldPrice*this.goldCount;
        let totalSilverPrice = this.silverPrice*this.silverCount;
        this.dataService.getPlatinumPrice().subscribe(response=>{
          try {
            this.platinumPrice = response['platinumAsk'+this.currency].replace(/[^0-9.-]+/g,"");
          }
          catch{
            this.platinumPrice=0;
          }
          let totalPlatinumPrice = this.platinumPrice*this.platinumCount;
          this.total = (totalGoldPrice+totalSilverPrice+ totalPlatinumPrice).toFixed(2);
        });
      }
    });
  }

  modelChange(){
    this.dataService.setGold(this.goldCount);
    this.dataService.setSilver(this.silverCount);
    this.dataService.setPlatinum(this.platinumCount);
    this.ionViewDidEnter();
  }

}
