import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  goldCount: number;
  silverCount:number;

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
