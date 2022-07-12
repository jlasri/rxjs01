import { Component, OnInit } from '@angular/core';
import { interval, Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private subscription: any;

  ngOnInit() {
    const observer: Observer<any> = {
      next: (item: unknown) => console.log(`une boite arrive: ${item}`),
      error: (err: unknown) => console.log(`Oups ${err}`),
      complete: () => console.log('It is over')      
    }

    const stream = new Observable(myObserver => {
      for (let index = 0; index < 50; index++) {
        myObserver.next(`Boite ${index}`);
      }
      myObserver.complete();
    });

    const subscription: Subscription = stream.subscribe(observer);

    subscription.unsubscribe();
  }

  public start(): void{
    const obs: Observer<any> = {
      next: value => console.log('My value ', value),
      error: err => console.error(err),
      complete: () => console.log('Complete')
    }

    this.subscription = interval(1000).subscribe(obs);
  }

  public stop(): void{
    this.subscription.unsubscribe();
  }
}
