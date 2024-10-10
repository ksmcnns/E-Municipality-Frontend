import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterTaxPayerDTO } from "../../models/register-taxpayer.dto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/api/taxpayers/register';
  constructor(private http: HttpClient) { }

  registerTaxPayer(data: RegisterTaxPayerDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl,data);
  }
}
