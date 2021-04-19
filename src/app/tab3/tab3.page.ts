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
  constructor(private dataService: DataService) {
  
  }

  ionViewDidEnter() {
    this.silverCount=this.dataService.getSilver();
    console.log(this.silverCount);
    
    this.goldCount=this.dataService.getSilver();
    console.log(this.goldCount); 
  }


}
