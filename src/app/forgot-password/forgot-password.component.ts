import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {CryptographyService} from "../services/cryptography.service";
import {StatusService} from "../services/status.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public validationResult: string = '';
  public validInformation: boolean = false;

  constructor(
    private _apiService: ApiService,
    private _cryptographyService: CryptographyService,
    private _statusService: StatusService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  public async validateSecretQuestion(username: string, questionAnswer: string): Promise<void> {
    await this._apiService.login(username).then((result: any) => {
      if (result) {
        const decryptedQuestionAnswer = this._cryptographyService.decryptString(result.questionAnswer);
        if (questionAnswer === decryptedQuestionAnswer) {
          this.validInformation = true;
          this.validationResult = "Please enter a new password below";
        } else {
          this.validationResult = "Your pet's name does not match our records";
        }
      } else {
        this.validationResult = "There is no user registered with this username";
      }
    })
  };

  public async resetPassword(username: string, newPassword: string): Promise<void> {
    const encryptedPassword = this._cryptographyService.encryptString(newPassword);
    await this._apiService.updatePassword(username, encryptedPassword).then((result: any) => {
      if (result) {
        alert("Your password has been reset");
        this._router.navigate(['/login']);
      } else {
        this.validationResult = "Something went wrong while updating your password";
      }
    })
  }

}
