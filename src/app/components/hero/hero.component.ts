import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../shared/services/scroll.service';
import { ParticleSystem } from './particle-system';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;

  private particleSystem?: ParticleSystem;
  private resizeTimeout?: ReturnType<typeof setTimeout>;

  constructor(public scrollService: ScrollService) {}

  ngAfterViewInit(): void {
    const canvas = this.particleCanvas.nativeElement;
    this.particleSystem = new ParticleSystem(canvas);
    this.particleSystem.start();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    this.particleSystem?.stop();
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.resizeTimeout);
  }

  onLearnMore(): void {
    this.scrollService.scrollTo('services');
  }

  private onResize = (): void => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      const canvas = this.particleCanvas.nativeElement;
      this.particleSystem?.stop();
      this.particleSystem = new ParticleSystem(canvas);
      this.particleSystem.start();
    }, 200);
  };
}
