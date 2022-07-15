import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from, fromEvent, interval, Observable, Observer, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router){}


  operatorsRedirect(){
    this.router.navigate(['operators']);
  }

  basicsRedirect(){
    this.router.navigate(['basics']);
  }
}
