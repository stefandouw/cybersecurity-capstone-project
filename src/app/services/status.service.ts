import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public loggedIn: boolean = false;
  public activeUser: string = '';

  constructor() { }
}
