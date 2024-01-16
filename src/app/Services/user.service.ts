import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  public registerAccount(userObj: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post('http://localhost:3000/user', userObj).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  public getRegisterAccount() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/user').subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public getCurrentData(id: number) {
    return this.http.get(`http://localhost:3000/user/${id}`);
  }
  public updateAccountData(id: number, data: any) {
    return this.http.put(`http://localhost:3000/user/${id}`, data);
  }
}
