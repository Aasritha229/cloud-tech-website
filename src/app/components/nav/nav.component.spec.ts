import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { NavComponent } from './nav.component';
import { ScrollService } from '../../shared/services/scroll.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let scrollY$: BehaviorSubject<number>;

  beforeEach(async () => {
    scrollY$ = new BehaviorSubject<number>(0);

    await TestBed.configureTestingModule({
      imports: [NavComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        {
          provide: ScrollService,
          useValue: { scrollY$ },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('scrolled state', () => {
    it('should set scrolled to true when scrollY$ emits a value > 80', () => {
      scrollY$.next(81);
      expect(component.scrolled).toBe(true);
    });

    it('should set scrolled to false when scrollY$ emits a value <= 80', () => {
      scrollY$.next(81);
      expect(component.scrolled).toBe(true);

      scrollY$.next(80);
      expect(component.scrolled).toBe(false);
    });

    it('should set scrolled to false when scrollY$ emits 0', () => {
      scrollY$.next(0);
      expect(component.scrolled).toBe(false);
    });
  });

  describe('menuOpen toggle', () => {
    it('should start with menuOpen as false', () => {
      expect(component.menuOpen).toBe(false);
    });

    it('should set menuOpen to true on first toggleMenu() call', () => {
      component.toggleMenu();
      expect(component.menuOpen).toBe(true);
    });

    it('should set menuOpen back to false on second toggleMenu() call', () => {
      component.toggleMenu();
      component.toggleMenu();
      expect(component.menuOpen).toBe(false);
    });
  });
});
