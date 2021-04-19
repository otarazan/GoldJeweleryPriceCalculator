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
  total:any;
  currency:any;
  constructor(private dataService: DataService) {
  }

  ionViewDidEnter() {
    this.currency = this.dataService.getCurrency();
    this.silverCount=this.dataService.getSilver()? this.dataService.getSilver(): this.silverCount;
    console.log(this.silverCount);
    
    this.goldCount=this.dataService.getGold()? this.dataService.getGold(): this.goldCount;
    console.log(this.goldCount); 

    this.dataService.getPrice().subscribe((response:any) => {
      console.log(response);
      if(response.items[0]!=null){
        let goldPrice = response.items[0].xauPrice;
        let silverPrice = response.items[0].xagPrice;
        this.total = (goldPrice*this.goldCount+ silverPrice*this.silverCount).toFixed(2);
      }
    });
  }

  modelChange(){
    this.ionViewDidEnter();
  }

}
