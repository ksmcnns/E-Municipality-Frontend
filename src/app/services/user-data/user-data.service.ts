import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: any;

  private _userData:any=new BehaviorSubject("");
  userDataChange=this._userData.asObservable();

  setUserData(data: any): void {
    this._userData.next(data);
  }

}
