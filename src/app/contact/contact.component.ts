import { Component, signal, WritableSignal } from '@angular/core';
import { AppComponent } from '../app.component';
import { Meta, Title } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingAnimationComponent } from '../shared/ui-components/loading-animaton/loading-animation.component';

@Component({
  selector: 'scott-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    LoadingAnimationComponent
  ],
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  /**
   * Form carry endpoint to post to.
   */
  static readonly FORM_CARRY_ENDPOINT = 'https://formcarry.com/s/OMfnuh0fyp8';

  /**
   * Title of component
   */
  static readonly TITLE = 'Contact';

  /**
   * Signal if we have sent or not.
   */
  readonly sent: WritableSignal<boolean> = signal(false);

  /**
   * Signal if we are sending.
   */
  readonly sending: WritableSignal<boolean> = signal(false);

  /**
   * Signal if we have errored.
   */
  readonly error: WritableSignal<boolean> = signal(false);

  /**
   * Form group.
   */
  readonly contactForm: FormGroup = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    subject: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    message: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  /**
   * Constructor.
   */
  constructor(
    title: Title,
    meta: Meta,
    private httpClient: HttpClient,
  ) {
    title.setTitle(`${ContactComponent.TITLE} - ${AppComponent.TITLE}`);
    meta.addTag({ 'description': 'Contact me using my web form, you can also connect with me on LinkedIn.' });
  }

  /**
   * Get the invalid forms.
   */
  getInvalidForms() {
    const invalidControls: string[] = [];

    for (const name in this.contactForm.controls) {
      if (this.contactForm.controls[name].invalid) {
        invalidControls.push(name);
      }
    }

    return invalidControls.join(', ');
  }

  /**
   * Called when the user is submitting the form.
   */
  onSubmit() {
    const formData = {
      name: this.contactForm.get('name')?.value,
      subject: this.contactForm.get('subject')?.value,
      message: this.contactForm.get('message')?.value,
    };

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    this.sending.set(true);

    this.httpClient.post(ContactComponent.FORM_CARRY_ENDPOINT, formData, { headers })
      .subscribe({
        next: () => {
          this.sent.set(true);
          this.sending.set(false);
        },
        error: err => {
          console.error('Error', err);

          this.sending.set(false);
          this.sent.set(true);
          this.error.set(true);
        }
      });
  }
}
