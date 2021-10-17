import { Component } from '@angular/core';
import {CryptographyService} from "../services/cryptography.service";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registrationResult: string = '';

  constructor(
    private _cryptographyService: CryptographyService,
    private _apiService: ApiService,
    private _router: Router
  ) { }

  public async validateRegistration(plainUsername, plainPassword, secretQuestionInput): Promise<void> {
    await this._apiService.login(plainUsername).then(async (result: any) => {
      if (result) {
        this.registrationResult = 'There is already an account registered with this username';
      } else {
        const encryptedPassword: string = this._cryptographyService.encryptString(plainPassword);
        const encryptedAnswer: string = this._cryptographyService.encryptString(secretQuestionInput);
        try {
          const result: boolean = await this._apiService.register({
            username: plainUsername,
            password: encryptedPassword,
            questionAnswer: encryptedAnswer
          });
          if (result) {
            this._router.navigate(['/login']);
          } else {
            this.registrationResult = 'Something went wrong while creating your account'
          }
        } catch (e) {
          this.registrationResult = 'Something went wrong while creating your account'
        }
      }
    });
  }

}
