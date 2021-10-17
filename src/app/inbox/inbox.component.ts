import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {StatusService} from "../services/status.service";
import {CryptographyService} from "../services/cryptography.service";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messages: any = [];
  public activeMessage: string;

  constructor(
    private _apiService: ApiService,
    private _statusService: StatusService,
    private _cryptographyService: CryptographyService
  ) { }

  public async ngOnInit(): Promise<void> {
    await this._apiService.getAllMessagesForUsername(this._statusService.activeUser).then((result) => {
      if (result) {
        this.messages = result;
      }
    });
  }

  public setMessageActive(message: {id: number, sender: string, receiver: string, content: string}): void {
    this.activeMessage = this._cryptographyService.decryptString(message.content);
  }

}
