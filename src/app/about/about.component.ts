import {Component, OnInit} from '@angular/core';
import {fromEvent, noop, Observable} from 'rxjs';
import {map, scan, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {


    const sal$ = fromEvent(document, 'click');
    sal$.pipe(
      throttleTime(1000),
      map((event: MouseEvent) => event.clientX),
      scan((count, clientX) => count + clientX, 0)
    )
      .subscribe(count => console.log(count));

    const http$ = Observable.create(observer => {
      fetch('/api/courses')
        .then(res => res.json())
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });

    http$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }

}
