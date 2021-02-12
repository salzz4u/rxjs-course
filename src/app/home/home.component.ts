import {Component, OnInit} from '@angular/core';
import {noop, Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import {Course} from '../model/course';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {


    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$.pipe(
      shareReplay(),
      tap(() => console.log('http called')),
      map(res => Object.values(res['payload'])),
    );

    this.beginnersCourses$ = courses$.pipe(map(courses => courses
        .filter(course => course.category === 'BEGINNER')));

    this.advancedCourses$ = courses$.pipe(map(courses => courses
      .filter(course => course.category === 'ADVANCED')));
  }


}
