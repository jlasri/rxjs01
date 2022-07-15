import { Component, OnInit } from '@angular/core';
import { filter, from, map, Observer, take, tap } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  public operatorMap(){
    from([0, 1, 2, 3, 4, 5])
    .pipe(
      map(this.multiply),
      map(this.multiply))
      .subscribe(this.observerBuilder(true));
  }

  public operatorTap(){
    from([0, 1, 2, 3, 4, 5])
    .pipe(
      tap(elem => console.log(`Initial value : ${elem}`)),
      map(this.multiply),
      map(this.multiply))
      .subscribe(this.observerBuilder(true));
  }

  public operatorTake(){
    from([0, 1, 2, 3, 4, 5])
    .pipe(
      tap(elem => console.log(`Initial value : ${elem}`)),
      map(this.multiply),
      map(this.multiply),
      take(3))
      .subscribe(this.observerBuilder(true));
  }

  public operatorFilter(){
    from([0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5])
    .pipe(
      filter(elem => elem > 0)
      )
      .subscribe(this.observerBuilder(true));
  }

  //#region Private functions
  private observerBuilder(isWarn: boolean): Observer<any>{
    return {
      next: value => !isWarn ? console.log('My value ', value): console.warn('My value ', value),
      error: err => console.error(err),
      complete: () => !isWarn ? console.log('Complete') : console.warn('Complete')      
    }
  }

  private multiply(num: number): number{
    return num * 2;
  }
  //#endregion
}
