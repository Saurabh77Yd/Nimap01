import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  users: any;
  tags: any;
  constructor(public userservice: UserService) {}

  ngOnInit(): void {
    this.userservice
      .getRegisterAccount()
      .then((res: any) => {
        this.users = res;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
