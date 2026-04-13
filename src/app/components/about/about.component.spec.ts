import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about.component';
import { CounterAnimationService } from '../../shared/services/counter-animation.service';

/**
 * Unit tests for AboutComponent counter wiring
 * Validates: Requirements 4.5
 */
describe('AboutComponent', () => {
  let component: AboutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        {
          provide: CounterAnimationService,
          useValue: {
            animate: (
              from: number,
              to: number,
              duration: number,
              onTick: (value: number) => void
            ) => onTick(to),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('counter wiring', () => {
    it('should set each displayValue to its stat targetValue after startCounters()', () => {
      component.startCounters();

      component.stats.forEach((stat, i) => {
        expect(component.displayValues[i]).toBe(stat.targetValue);
      });
    });
  });
});
