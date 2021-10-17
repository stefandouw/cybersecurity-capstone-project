import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  constructor() { }

  public encryptString(input: string): string {
    try {
      return CryptoJS.AES.encrypt(input, environment.cryptography.secret_key).toString();
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  public decryptString(input: string): string {
    try {
      return CryptoJS.AES.decrypt(input, environment.cryptography.secret_key).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.log(e);
      return '';
    }
  }
}
