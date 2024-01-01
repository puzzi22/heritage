import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  errors: string[] | null = null;

  constructor(
    private builder: FormBuilder
  ) {}

  FormData = this.builder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    comment: ['', [Validators.required]],
  });

  isFormValid() {
    const name = (document.getElementById('name') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const comment = (document.getElementById('comment') as HTMLTextAreaElement)
      ?.value;

    return name && email && comment; // Returns true only if all fields are filled
  }
}
