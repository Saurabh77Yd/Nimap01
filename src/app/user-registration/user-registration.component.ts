import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  icon = faX;
  url = './assets/profile-icon.png';
  displyAge = '';

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [Validators.required, Validators.minLength(13), Validators.maxLength(13)],
    ],

    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    address: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(35)],
    ],
    age: ['', [Validators.required]],
    checkbox: ['', [Validators.required]],
    tag: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get state() {
    return this.registerForm.get('state');
  }
  get country() {
    return this.registerForm.get('country');
  }
  get address() {
    return this.registerForm.get('address');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get checkbox() {
    return this.registerForm.get('checkbox');
  }
  get image() {
    return this.registerForm.get('image');
  }
  get tag() {
    return this.registerForm.get('tag');
  }

  onFileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
            const width = img.width;
            const height = img.height;

            if (width <= 310 && height <= 325) {
              const imageDataUrl = e.target.result as string;
              const imageControl = this.registerForm.get('image');
              if (imageControl) {
                imageControl.patchValue(imageDataUrl);

                imageControl.setErrors(null);
              }
            } else {
              const imageControl = this.registerForm.get('image');
              if (imageControl) {
                imageControl.setErrors({ invalidSize: true });
              }
            }
          };
          img.src = e.target.result as string;
        };
        reader.readAsDataURL(file);
      }
    }

    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  registerAccount() {
    this.userService
      .registerAccount(this.registerForm.value)
      .then((res) => {
        console.log(res);
        this.router.navigate(['/user-profile']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getvalue(val: any) {
    this.displyAge = val;
  }
}
