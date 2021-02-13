import {Component, OnInit} from '@angular/core';
import {concat, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    const source1$ = of(1, 2, 3).pipe(delay(3000), map(x => 'sal' + x));
    const source2$ = of(4, 5, 6).pipe(delay(2000));
    const source3$ = of(7, 8, 9).pipe(delay(2000));

    const concat$ = concat(source1$, source2$, source3$);

    concat$.subscribe(console.log);
  }
}
