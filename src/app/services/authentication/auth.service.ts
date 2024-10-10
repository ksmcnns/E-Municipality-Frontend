import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {DebitPaymentDto} from "../../models/debit-payment.dto";
import {DebitResponseDto} from "../../models/debit-response.dto";
import {RegisterTaxPayerDTO} from "../../models/register-taxpayer.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login'; // Backend API URL
  constructor(private http: HttpClient) { }
    login(kimlikNo: string, sifre: string, adi: string, soyadi: string): Observable<any> {
    const loginData = { nationalIdNo:kimlikNo, password:sifre, name: adi, surname:soyadi };
    return this.http.post<any>(this.apiUrl, loginData)
      .pipe(map(response=>response.data));
  }
}

