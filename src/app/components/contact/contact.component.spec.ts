import { FormBuilder, Validators } from '@angular/forms';
import * as fc from 'fast-check';

/**
 * Property tests for ContactComponent form validation
 * Feature: cloud-tech-website
 * Validates: Requirements 5.3, 5.4, 5.5
 */

/**
 * Helper to check if an email is valid per Angular's Validators.email logic.
 * Angular uses a regex that requires: local@domain.tld format.
 */
function isValidAngularEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

describe('ContactComponent form validation', () => {
  /**
   * Property 2: Form validity is consistent with field validators
   * For any combination of name, email, and message strings, the form's `valid`
   * state matches the conjunction of all three fields satisfying their validators
   * (non-empty name, non-empty valid-format email, non-empty message).
   * Validates: Requirements 5.3, 5.4, 5.5
   */
  it('Property 2: form validity is consistent with field validators', () => {
    const fb = new FormBuilder();

    fc.assert(
      fc.property(
        fc.string(),
        fc.oneof(fc.emailAddress(), fc.string()),
        fc.string(),
        (name, email, message) => {
          const form = fb.group({
            name: [name, Validators.required],
            email: [email, [Validators.required, Validators.email]],
            message: [message, Validators.required],
          });

          const expectedValid =
            name.length > 0 &&
            isValidAngularEmail(email) &&
            message.length > 0;

          return form.valid === expectedValid;
        }
      ),
      {
        numRuns: 100,
        verbose: true,
      }
    );
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact.component';

/**
 * Unit tests for ContactComponent
 * Validates: Requirements 5.3, 5.4, 5.5, 5.6
 */
describe('ContactComponent unit tests', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, NoopAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Required validator tests
  it('should mark name as invalid when empty', () => {
    component.form.get('name')!.setValue('');
    expect(component.form.get('name')!.valid).toBe(false);
    expect(component.form.get('name')!.hasError('required')).toBe(true);
  });

  it('should mark email as invalid when empty', () => {
    component.form.get('email')!.setValue('');
    expect(component.form.get('email')!.valid).toBe(false);
    expect(component.form.get('email')!.hasError('required')).toBe(true);
  });

  it('should mark message as invalid when empty', () => {
    component.form.get('message')!.setValue('');
    expect(component.form.get('message')!.valid).toBe(false);
    expect(component.form.get('message')!.hasError('required')).toBe(true);
  });

  // Email format validator tests
  it('should mark email as invalid for "notanemail"', () => {
    component.form.get('email')!.setValue('notanemail');
    expect(component.form.get('email')!.valid).toBe(false);
    expect(component.form.get('email')!.hasError('email')).toBe(true);
  });

  it('should mark email as invalid for "missing@"', () => {
    component.form.get('email')!.setValue('missing@');
    expect(component.form.get('email')!.valid).toBe(false);
    expect(component.form.get('email')!.hasError('email')).toBe(true);
  });

  it('should mark email as valid for "user@example.com"', () => {
    component.form.get('email')!.setValue('user@example.com');
    expect(component.form.get('email')!.valid).toBe(true);
  });

  // Submission test
  it('should set submitted to true after 500ms on valid form submission', async () => {
    vi.useFakeTimers();
    component.form.setValue({ name: 'Test', email: 'test@example.com', message: 'Hello' });
    component.onSubmit();
    expect(component.submitting).toBe(true);
    await vi.advanceTimersByTimeAsync(500);
    expect(component.submitted).toBe(true);
    expect(component.submitting).toBe(false);
    vi.useRealTimers();
  });
});
