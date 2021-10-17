import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cybersecurity-Capstone-Project';

  constructor(
    private _apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this._apiService.createUsersTable();
    this._apiService.createMessagesTable();
  }

}
