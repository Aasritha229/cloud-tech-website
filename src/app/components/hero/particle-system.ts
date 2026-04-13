interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const PARTICLE_COUNT = 60;
const PROXIMITY_THRESHOLD = 120;
const DOT_COLOR = '#00aaff';
const LINE_COLOR_BASE = '0, 170, 255';

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private running = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  start(): void {
    if (!this.ctx) return;

    this.canvas.width = this.canvas.offsetWidth || this.canvas.clientWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || this.canvas.clientHeight || window.innerHeight;

    this.initParticles();
    this.running = true;
    this.loop();
  }

  stop(): void {
    this.running = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private initParticles(): void {
    const { width, height } = this.canvas;
    this.particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: 1.5 + Math.random() * 1,
      opacity: 0.5 + Math.random() * 0.5,
    }));
  }

  private loop(): void {
    if (!this.running || !this.ctx) return;

    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    this.updateParticles(width, height);
    this.drawLines();
    this.drawDots();

    this.animationId = requestAnimationFrame(() => this.loop());
  }

  private updateParticles(width: number, height: number): void {
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
    }
  }

  private drawDots(): void {
    const ctx = this.ctx!;
    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = DOT_COLOR;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  private drawLines(): void {
    const ctx = this.ctx!;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PROXIMITY_THRESHOLD) {
          const alpha = (1 - dist / PROXIMITY_THRESHOLD) * 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${LINE_COLOR_BASE}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }
}
