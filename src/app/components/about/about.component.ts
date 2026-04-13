import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Stat } from '../../shared/models/stat.model';
import { ObserveVisibilityDirective } from '../../shared/directives/observe-visibility.directive';
import { CounterAnimationService } from '../../shared/services/counter-animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    trigger('sectionFadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AboutComponent {
  stats: Stat[] = [
    { id: '1', targetValue: 500, suffix: '+', label: 'Enterprise clients worldwide' },
    { id: '2', targetValue: 99, suffix: '.9%', label: 'Uptime SLA guaranteed' },
    { id: '3', targetValue: 50, suffix: '+', label: 'Data centers globally' },
    { id: '4', targetValue: 10, suffix: 'B+', label: 'API requests per day' },
  ];

  displayValues: number[] = this.stats.map(() => 0);

  visible = false;

  constructor(private counterService: CounterAnimationService) {}

  startCounters(): void {
    this.stats.forEach((stat, i) => {
      this.counterService.animate(0, stat.targetValue, 1500, (value) => {
        this.displayValues[i] = value;
      });
    });
  }

  onVisible(): void {
    this.visible = true;
    this.startCounters();
  }
}
