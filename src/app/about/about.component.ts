import {Component, OnInit} from '@angular/core';
import {noop} from 'rxjs';
import {createHttpObservable} from '../common/util';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$.pipe(map(res => Object.values(res['payload'])));

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }

}
