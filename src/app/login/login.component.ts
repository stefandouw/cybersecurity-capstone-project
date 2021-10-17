import { Component } from '@angular/core';
import {CryptographyService} from "../services/cryptography.service";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {StatusService} from "../services/status.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginMessage: string = '';

  constructor(
    private _cryptographyService: CryptographyService,
    private _apiService: ApiService,
    private _router: Router,
    private _statusService: StatusService
  ) { }

  public async validateLogin(plainUsername, plainPassword): Promise<void> {
    await this._apiService.login(plainUsername).then((result: any) => {
      if (!result) {
        this.loginMessage = 'There is no account registered with this username';
      } else {
        if (result.password) {
          const decryptedPassword: string = this._cryptographyService.decryptString(result.password);
          if (plainPassword === decryptedPassword) {
            this._statusService.loggedIn = true;
            this._statusService.activeUser = plainUsername;
            this._router.navigate(['/inbox']);
          } else {
            this.loginMessage = 'Wrong password';
          }
        }
      }
    });
  }
}
