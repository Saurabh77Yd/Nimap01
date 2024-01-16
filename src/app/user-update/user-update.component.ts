import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  icon = faX;
  url = './assets/profile-icon.png';
  displyAge = '';
  constructor(
    private userservice: UserService,
    private rout: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  updateForm = this.fb.group({
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
    return this.updateForm.get('name');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get phone() {
    return this.updateForm.get('phone');
  }
  get state() {
    return this.updateForm.get('state');
  }
  get country() {
    return this.updateForm.get('country');
  }
  get address() {
    return this.updateForm.get('address');
  }

  get age() {
    return this.updateForm.get('age');
  }

  get checkbox() {
    return this.updateForm.get('checkbox');
  }
  get tag() {
    return this.updateForm.get('tag');
  }
  get image() {
    return this.updateForm.get('image');
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
              const imageControl = this.updateForm.get('image');
              if (imageControl) {
                imageControl.patchValue(imageDataUrl);

                imageControl.setErrors(null);
              }
            } else {
              const imageControl = this.updateForm.get('image');
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

  getvalue(val: any) {
    this.displyAge = val;
  }
  ngOnInit(): void {
    console.log(this.rout.snapshot.params['id']);
    this.userservice
      .getCurrentData(this.rout.snapshot.params['id'])
      .subscribe((response: any) => {
        console.log(response);
        this.updateForm = this.fb.group({
          name: [
            response['name'],
            [Validators.required, Validators.minLength(3)],
          ],
          lastName: [response['lastName'], [Validators.required]],
          email: [response['email'], [Validators.required, Validators.email]],
          phone: [
            response['phone'],
            [
              Validators.required,
              Validators.minLength(13),
              Validators.maxLength(13),
            ],
          ],

          state: [response['state'], [Validators.required]],
          country: [response['country'], [Validators.required]],
          address: [
            response['address'],
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(35),
            ],
          ],
          age: [response['age'], [Validators.required]],
          checkbox: [response['checkbox'], [Validators.required]],
          tag: [response['tag'], [Validators.required]],
          image: [response['image'], [Validators.required]],
        });
      });
  }
  updateAccount() {
    this.userservice
      .updateAccountData(this.rout.snapshot.params['id'], this.updateForm.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/user-profile']);
      });
  }
}
