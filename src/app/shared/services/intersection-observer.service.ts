import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IntersectionObserverService {
  observe(element: Element, threshold: number = 0.15): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (!('IntersectionObserver' in window)) {
        observer.next(true);
        observer.complete();
        return;
      }

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              observer.next(true);
            }
          });
        },
        { threshold }
      );

      intersectionObserver.observe(element);

      return () => {
        intersectionObserver.disconnect();
      };
    });
  }
}
