import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import * as fc from 'fast-check';
import { CounterAnimationService } from './counter-animation.service';

/**
 * Property tests for CounterAnimationService
 * Feature: cloud-tech-website
 * Validates: Requirements 4.5
 */
describe('CounterAnimationService', () => {
  let service: CounterAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CounterAnimationService,
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });
    service = TestBed.inject(CounterAnimationService);
  });

  /**
   * Property 1: Counter always reaches target
   * For any non-negative integer targetValue and duration ≥ 1,
   * the final emitted value equals targetValue exactly.
   * Validates: Requirements 4.5
   */
  it('Property 1: counter always reaches target', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100000 }),
        fc.integer({ min: 1, max: 10000 }),
        (targetValue, duration) => {
          const emittedValues: number[] = [];

          service.animate(0, targetValue, duration, (value) => {
            emittedValues.push(value);
          });

          // In server (non-browser) mode, onTick(to) is called immediately
          // so the last emitted value must equal targetValue exactly
          const lastValue = emittedValues[emittedValues.length - 1];
          return lastValue === targetValue;
        }
      ),
      {
        numRuns: 100,
        verbose: true,
        examples: [[0, 1], [1, 1], [100, 1500], [99999, 10000]],
      }
    );
  });
});
