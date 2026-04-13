import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IntersectionObserverService } from '../services/intersection-observer.service';

@Directive({
  selector: '[observeVisibility]',
  standalone: true,
})
export class ObserveVisibilityDirective implements OnInit, OnDestroy {
  @Input() threshold: number = 0.15;
  @Output() visible = new EventEmitter<void>();

  private subscription: Subscription | null = null;

  constructor(
    private elementRef: ElementRef,
    private intersectionObserverService: IntersectionObserverService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.intersectionObserverService
      .observe(this.elementRef.nativeElement, this.threshold)
      .pipe(first((isVisible) => isVisible))
      .subscribe(() => {
        this.visible.emit();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
