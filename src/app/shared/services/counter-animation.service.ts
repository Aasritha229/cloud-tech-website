import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CounterAnimationService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  animate(
    from: number,
    to: number,
    duration: number,
    onTick: (value: number) => void
  ): void {
    if (!this.isBrowser) {
      onTick(to);
      return;
    }

    let startTime: number | null = null;

    const loop = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.easeOut(progress);

      if (progress >= 1) {
        onTick(to);
        return;
      }

      onTick(Math.round(from + (to - from) * easedProgress));
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
