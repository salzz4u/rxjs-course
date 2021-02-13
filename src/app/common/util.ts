import {Observable} from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {
  return Observable.create(observer => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {signal})
      .then(res => res.json())
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => observer.error(err));

    return () => controller.abort();
  });
}

