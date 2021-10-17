import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public async getAllMessagesForUsername(username: string): Promise<{} | null> {
    try {
      return await this.http.get(this._url + '/messages/' + username).toPromise();
    } catch (e) {
      return null;
    }
  }

  public async sendMessage(message: {sender: string, receiver: string, content: string}): Promise<boolean> {
    try {
      await this.http.post(this._url + '/messages', message).toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }

  public async login(username: string): Promise<{} | null> {
    try {
      return await this.http.get(this._url + '/users/' + username).toPromise();
    } catch (e) {
      return null;
    }
  }

  public async register(user: {username: string, password: string, questionAnswer: string}): Promise<boolean> {
    try {
      await this.http.post(this._url + '/users', user).toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }

  public async updatePassword(username: string, newPassword: string): Promise<boolean> {
    try {
      await this.http.put(this._url + '/users/' + username, {password: newPassword}).toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }

  public async getAllUsers(): Promise<{} | null> {
    try {
      return await this.http.get(this._url + '/users').toPromise();
    } catch (e) {
      return null;
    }
  }

  public async getAllMessages(): Promise<{} | null> {
    try {
      return await this.http.get(this._url + '/messages').toPromise();
    } catch (e) {
      return null;
    }
  }

  public async createUsersTable(): Promise<{} | null> {
    try {
      return await this.http.get(this._url + '/init-users').toPromise();
    } catch (e) {
      return null;
    }
  }

  public async createMessagesTable(): Promise<{} | null> {
    try {
      return await this.http.get(this._url + '/init-messages').toPromise();
    } catch (e) {
      return null;
    }
  }
}
