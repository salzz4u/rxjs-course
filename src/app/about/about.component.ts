import {Component, OnInit} from '@angular/core';
import {forkJoin, of} from 'rxjs';
import {concatMap, delay} from 'rxjs/operators';
import {fromArray} from 'rxjs/internal/observable/fromArray';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const fruits = ['apple', 'orange', 'banana', 'watermelon'];

    const source1$ = fromArray(fruits).pipe(concatMap(val => of(val).pipe(delay(2000))));
    const source2$ = fromArray([4, 5, 6]).pipe(concatMap(val => of(val).pipe(delay(1000))));
    const source3$ = fromArray([7, 8, 9]).pipe(concatMap(val => of(val).pipe(delay(1000))));

    // concat(source1$, source2$, source3$).subscribe(console.log);
    // merge(source1$, source2$, source3$).subscribe(console.log);
    // zip(source1$, source2$, source3$).subscribe(console.log);
    // combineLatest(source1$, source2$, source3$).subscribe(console.log);
    forkJoin(source1$, source2$, source3$).subscribe(console.log);
  }
}
