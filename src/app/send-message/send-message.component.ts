import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {CryptographyService} from "../services/cryptography.service";
import {StatusService} from "../services/status.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  public sendingResultMessage: string = '';

  constructor(
    private _apiService: ApiService,
    private _cryptographyService: CryptographyService,
    private _statusService: StatusService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  public async sendMessage(receiver: string, messageContent: string): Promise<void> {
    if (this._statusService.activeUser != '') {
    const encryptedMessage = this._cryptographyService.encryptString(messageContent);
    await this._apiService.sendMessage({
      sender: this._statusService.activeUser,
      receiver: receiver,
      content: encryptedMessage
    }).then((result) => {
      if (result) {
        this._router.navigate(['/inbox']);
      } else {
        this.sendingResultMessage = 'Something went wrong sending your message';
      }
    });
    }
  }

}
