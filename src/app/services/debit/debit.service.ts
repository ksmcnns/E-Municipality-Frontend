import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {DebitResponseDto} from "../../models/debit-response.dto";

@Injectable({
  providedIn: 'root'
})
export class DebitService {
  private apiUrl = 'http://localhost:8080/api/taxpayer/debit';

  constructor(private http: HttpClient) {
  }

  getDebitsByNationalIdNo(nationalIdNo: number): Observable<DebitResponseDto[]> {
    return this.http.get<DebitResponseDto[]>(`${this.apiUrl}/${nationalIdNo}`);
  }
}
