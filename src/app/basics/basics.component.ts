import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, Observer, of, Subscription } from 'rxjs';


@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit {

 
  private subscriptions: Subscription[] = [];

  private subscription: Subscription = new Subscription();

  private fromEventSubs!: Subscription;

  @ViewChild('btn') elem!: ElementRef;


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

    of(1,2,3,4,5).subscribe(console.log);
    from([1,2,3,4,5]).subscribe(console.log);
  }
  
  ngAfterViewInit(): void {
    this.fromEventSubs = fromEvent(this.elem.nativeElement, 'click')
                            .subscribe(res => {
                                console.warn(res);                          
                        })
  }

  public start(): void{
    this.subscriptions.push(interval(1000).subscribe(this.observerBuilder(false)));
    this.subscriptions.push(interval(1000).subscribe(this.observerBuilder(true)));
  }

  public stop(): void{
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public start2(): void{
    this.subscription.add(interval(1000).subscribe(this.observerBuilder(true)));
    this.subscription.add(interval(1000).subscribe(this.observerBuilder(false)));
  }

  public stop2(): void{
    this.subscription.unsubscribe();
  }

  private observerBuilder(isWarn: boolean): Observer<any>{
    return {
      next: value => !isWarn ? console.log('My value ', value): console.warn('My value ', value),
      error: err => console.error(err),
      complete: () => !isWarn ? console.log('Complete') : console.warn('Complete')      
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.fromEventSubs.unsubscribe();
  }

}
