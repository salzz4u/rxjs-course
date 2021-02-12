import {Component, OnInit} from '@angular/core';
import {fromEvent, timer} from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const interval$ = timer(3000, 1000);
    const sub = interval$.subscribe(val => console.log('stream1:', val));

    setTimeout(() => sub.unsubscribe(), 5000);

    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      ev => console.log(ev),
      err => console.log(err),
      () => console.log('completed')
    );
  }

}
