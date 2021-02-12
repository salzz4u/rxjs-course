import {Component, OnInit} from '@angular/core';
import {noop, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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

    const courses$: Observable<Course[]> = http$.pipe(map(res => Object.values(res['payload'])));

    this.beginnersCourses$ = courses$.pipe(map(courses => courses
        .filter(course => course.category === 'BEGINNER')));

    this.advancedCourses$ = courses$.pipe(map(courses => courses
      .filter(course => course.category === 'ADVANCED')));

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }


}
