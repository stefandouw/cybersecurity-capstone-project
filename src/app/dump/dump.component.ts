import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-dump',
  templateUrl: './dump.component.html',
  styleUrls: ['./dump.component.css']
})
export class DumpComponent implements OnInit {

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  public async dumpDatabase(): Promise<void> {
    this.dumpUsers();
    this.dumpMessages();
  }

  public async dumpUsers(): Promise<void> {
    await this._apiService.getAllUsers().then((result: any) => {
      if (result) {
        this._download(JSON.stringify(result), 'users.txt', 'text')
      } else {
        alert('Something went wrong getting all users data')
      }
    })
  }

  public async dumpMessages() {
    await this._apiService.getAllMessages().then((result: any) => {
      if (result) {
        this._download(JSON.stringify(result), 'messages.txt', 'text')
      } else {
        alert('Something went wrong getting all users data')
      }
    })
  }

  private _download(data, filename, type) {
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      const a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
