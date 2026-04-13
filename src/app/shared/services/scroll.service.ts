import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  readonly scrollY$: Observable<number>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollY$ = fromEvent(window, 'scroll').pipe(
        map(() => window.scrollY),
        startWith(window.scrollY)
      );
    } else {
      this.scrollY$ = of(0);
    }
  }

  scrollTo(fragment: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
